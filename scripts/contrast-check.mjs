/**
 * Measures real computed contrast for every visible text node against its
 * effective background, and flags anything under the WCAG AA threshold.
 *
 * This exists because the design leans hard on dimmed text — `dim`,
 * `opacity-45`, `opacity-55` — and opacity silently destroys contrast in a
 * way that looks fine to a designer with good eyes on a bright screen and
 * fails for everyone else. Eyeballing screenshots cannot catch it.
 *
 *   node scripts/contrast-check.mjs
 *
 * HOW THE COLOUR MATHS WORKS, because the obvious approach is wrong:
 * getComputedStyle returns `oklab(0.95 0.001 0.015 / 0.38)` for anything
 * built with color-mix(), and those channels are 0–1 in a perceptual space,
 * not 0–255 sRGB. Parsing the numbers out gives nonsense ratios. Assigning
 * to canvas `fillStyle` and reading it back does NOT normalise it either —
 * Chromium hands the oklab string straight back. The only thing that
 * reliably converts is making the browser *rasterise*: paint the colour and
 * read the pixel. So we composite the real stack — page white, then each
 * ancestor background, then the text colour at its effective alpha — and
 * read sRGB bytes out of the bitmap. That is also exactly what WCAG asks
 * for, since it wants the colour the eye actually receives.
 */
import { chromium } from 'playwright';

const TARGET = process.env.PREVIEW_URL ?? 'http://localhost:4173/';
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(TARGET, { waitUntil: 'networkidle' });

// Reveal-on-scroll hides most of the page; force everything visible first.
await page.evaluate(() => {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-revealed', 'true'));
  document.querySelectorAll('.acc-panel').forEach((el) => el.setAttribute('data-open', 'true'));
});
await page.waitForTimeout(900);

const findings = await page.evaluate(() => {
  const cv = document.createElement('canvas');
  cv.width = 1;
  cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true });

  /**
   * Paint a stack of CSS colours over opaque white and return the sRGB
   * bytes of the result. Canvas does the alpha compositing and the
   * colour-space conversion for us.
   */
  const flatten = (layers) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1, 1);
    for (const [colour, alpha] of layers) {
      if (!colour || colour === 'transparent' || alpha <= 0) continue;
      ctx.globalAlpha = Math.min(1, Math.max(0, alpha));
      ctx.fillStyle = '#ffffff';
      ctx.fillStyle = colour; // invalid values leave the previous value
      ctx.fillRect(0, 0, 1, 1);
    }
    ctx.globalAlpha = 1;
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
  };

  const srgb = (c) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);

  /** Ancestor background colours, outermost first, each with its own opacity. */
  const bgLayers = (el) => {
    const chain = [];
    let node = el;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      chain.push([cs.backgroundColor, parseFloat(cs.opacity || '1')]);
      node = node.parentElement;
    }
    chain.push([getComputedStyle(document.body).backgroundColor, 1]);
    return chain.reverse();
  };

  const out = [];
  const seen = new Set();

  for (const el of document.querySelectorAll(
    'p,span,a,button,h1,h2,h3,h4,li,dt,dd,figcaption,blockquote',
  )) {
    if (el.closest('[aria-hidden="true"]')) continue;

    // Only leaf-ish nodes with their own visible text.
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent.trim())
      .join(' ')
      .trim();
    if (!text || text.length < 2) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;

    // Effective alpha = every ancestor opacity, the element's included.
    let alpha = 1;
    let node = el;
    while (node && node !== document.documentElement) {
      alpha *= parseFloat(getComputedStyle(node).opacity || '1');
      node = node.parentElement;
    }
    if (alpha < 0.04) continue; // effectively invisible; not a contrast problem

    const layers = bgLayers(el);
    const bg = flatten(layers);
    const fg = flatten([...layers, [cs.color, alpha]]);

    const l1 = lum(fg);
    const l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    // WCAG "large text": >=24px, or >=18.66px when bold.
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const min = large ? 3 : 4.5;

    if (ratio >= min) continue;

    const key = `${text.slice(0, 32)}|${Math.round(ratio * 10)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    out.push({
      text: text.slice(0, 46),
      ratio: Math.round(ratio * 100) / 100,
      min,
      size: Math.round(size),
      cls: (el.className || '').toString().slice(0, 56),
    });
  }

  return out.sort((a, b) => a.ratio - b.ratio);
});

await browser.close();

if (!findings.length) {
  console.log('Contrast: all visible text meets WCAG AA.');
} else {
  console.log(`Contrast: ${findings.length} element(s) below AA\n`);
  for (const f of findings) {
    console.log(`  ${String(f.ratio).padStart(5)}:1  (needs ${f.min})  ${f.size}px  "${f.text}"`);
    console.log(`         ${f.cls}`);
  }
  process.exitCode = 1;
}
