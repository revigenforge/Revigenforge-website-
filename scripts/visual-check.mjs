import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] || fileURLToPath(new URL('../.qa-shots/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const TARGET = process.env.PREVIEW_URL ?? 'http://localhost:4173/';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1024, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

const sections = ['top', 'about', 'services', 'work', 'proof', 'process', 'pricing', 'faq', 'contact'];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

const errors = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${vp.name}] ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`[${vp.name}] PAGEERROR ${e.message}`));

  await page.goto(TARGET, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  // Hero
  await page.screenshot({ path: `${OUT}/${vp.name}-00-hero.png` });

  // Reveal everything, then capture each section
  for (const id of sections.slice(1)) {
    const found = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      el?.scrollIntoView({ block: 'start', behavior: 'instant' });
      return Boolean(el);
    }, id);
    if (!found) errors.push(`[${vp.name}] missing section anchor #${id}`);
    await page.waitForTimeout(950);
    await page.screenshot({ path: `${OUT}/${vp.name}-${String(sections.indexOf(id)).padStart(2, '0')}-${id}.png` });
  }

  // Horizontal overflow check
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  if (overflow.scrollW > overflow.clientW + 1) {
    errors.push(`[${vp.name}] HORIZONTAL OVERFLOW ${overflow.scrollW} > ${overflow.clientW}`);
  }

  // Full page (desktop only, it is large)
  if (vp.name === 'desktop') {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });
  }

  await ctx.close();
}

await browser.close();

console.log(errors.length ? 'ISSUES:\n' + errors.join('\n') : 'No console errors, no overflow.');
