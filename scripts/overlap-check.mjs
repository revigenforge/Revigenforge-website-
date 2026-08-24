/**
 * Finds text that collides with other text.
 *
 * Two different failures, both invisible in a diff and easy to miss in a
 * screenshot:
 *
 *   1. CROSS-ELEMENT — two separate pieces of text occupy the same pixels
 *      (absolute positioning, a negative margin, a flex child that refuses
 *      to shrink). Bounding-box intersection is the right tool here.
 *
 *   2. LINE-ON-LINE — the display face runs at line-height < 1, so
 *      consecutive lines of the SAME heading can grow into each other.
 *
 * The second one is measured from PIXELS, not from font metrics, because
 * font metrics lie twice over: `measureText` on the DOM string counts the
 * descender of a lowercase "p" that `text-transform: uppercase` never
 * paints, and `actualBoundingBoxAscent` reports the tallest glyph in the
 * whole string (a typographic apostrophe sits above cap height) rather than
 * what is on any given line. Both inflate the estimate and invent overlaps
 * that are not on screen.
 *
 * So: screenshot each multi-line heading, walk the rows of the bitmap, and
 * find the bands of rows that contain ink. If N rendered lines produce N
 * separate bands, the lines are clear. Fewer bands than lines means ink
 * from one line is touching the next — a real, visible collision.
 *
 *   node scripts/overlap-check.mjs
 */
import { chromium } from 'playwright';

const TARGET = process.env.PREVIEW_URL ?? 'http://localhost:4173/';
const VIEWPORTS = [
  [1440, 900],
  [1280, 800],
  [1024, 768],
  [834, 1112],
  [390, 844],
  [360, 740],
];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

/** Scratch page used purely to decode PNG buffers into pixel rows. */
const decoder = await browser.newPage();
await decoder.setContent('<canvas id="c"></canvas>');

/** Returns, for each row of the image, how many pixels carry ink. */
async function rowInk(pngBuffer) {
  const b64 = pngBuffer.toString('base64');
  return decoder.evaluate(async (data) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + data;
    await img.decode();
    const c = document.getElementById('c');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const { data: px, width, height } = ctx.getImageData(0, 0, img.width, img.height);

    // Background = the modal colour of the first and last rows (the margins
    // above and below the text), so this works on ink, cream or artwork.
    const tally = new Map();
    for (const y of [0, height - 1]) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const k = `${px[i] >> 3},${px[i + 1] >> 3},${px[i + 2] >> 3}`;
        tally.set(k, (tally.get(k) || 0) + 1);
      }
    }
    let bg = [0, 0, 0];
    let best = -1;
    for (const [k, n] of tally) {
      if (n > best) {
        best = n;
        bg = k.split(',').map((v) => Number(v) * 8);
      }
    }

    const rows = [];
    for (let y = 0; y < height; y++) {
      let n = 0;
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const d =
          Math.abs(px[i] - bg[0]) + Math.abs(px[i + 1] - bg[1]) + Math.abs(px[i + 2] - bg[2]);
        if (d > 90) n++; // clearly not background
      }
      rows.push(n);
    }
    return { rows, width };
  }, b64);
}

const fails = [];

for (const [w, h] of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(TARGET, { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.setAttribute('data-revealed', 'true'));
    document.querySelectorAll('.acc-panel').forEach((el) => el.setAttribute('data-open', 'true'));
    // The nav floats over everything by design; it would otherwise show up
    // as a cross-element hit against whatever it happens to be above.
    document.querySelectorAll('header, [data-drawer]').forEach((el) => el.remove());
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  /* ---------- 1. cross-element ---------- */
  const cross = await page.evaluate(() => {
    const out = [];
    const label = (el) => {
      const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 38);
      return `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).trim().split(/\s+/)[0] : ''} "${t}"`;
    };
    const nodes = [...document.querySelectorAll('h1,h2,h3,h4,p,span,a,li,dt,dd,blockquote,figcaption,button')].filter(
      (el) => {
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (own.length < 2) return false;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.05) return false;
        const r = el.getBoundingClientRect();
        return r.width > 1 && r.height > 1;
      },
    );
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        if (a.contains(b) || b.contains(a)) continue;
        // The marquee duplicates its track on purpose and scrolls.
        if (a.closest('.marquee') && b.closest('.marquee')) continue;
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        const ox = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const oy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        if (ox > 2 && oy > 2) {
          out.push({ kind: 'cross-element', detail: `${Math.round(ox)}×${Math.round(oy)}px`, a: label(a), b: label(b) });
        }
      }
    }
    return out;
  });
  for (const c of cross) fails.push({ vp: `${w}x${h}`, ...c });

  /* ---------- 2. line-on-line, from pixels ---------- */
  const targets = await page.evaluate(() => {
    const out = [];
    const els = document.querySelectorAll('h1,h2,h3,h4,p,a,span,blockquote,li');
    let id = 0;
    for (const el of els) {
      if (el.closest('.marquee')) continue;
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
      if (own.length < 2) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) continue;
      /* How many visual lines does this element's OWN text render on?
         Measure the text nodes, not the element: a flex row (the pricing
         bullet + its label) returns rects at two different tops for what is
         plainly one line, and counting those as two lines reported every
         list item on the page as a collision. Tops are then clustered with
         a tolerance, since a line's rects can differ by a pixel. */
      const size = parseFloat(cs.fontSize);
      const tops = [];
      for (const node of el.childNodes) {
        if (node.nodeType !== 3 || !node.textContent.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const r of range.getClientRects()) {
          if (r.width > 1 && r.height > 1) tops.push(r.top);
        }
      }
      if (!tops.length) continue;
      tops.sort((a, b) => a - b);
      let lines = 1;
      for (let i = 1; i < tops.length; i++) {
        if (tops[i] - tops[i - 1] > size * 0.35) lines++;
      }
      if (lines < 2) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      el.setAttribute('data-ovl', String(id));
      out.push({
        id: id++,
        lines,
        text: own.replace(/\s+/g, ' ').slice(0, 38),
        cls: String(el.className || '').trim().split(/\s+/)[0] || el.tagName.toLowerCase(),
        size: Math.round(size),
      });
    }
    return out;
  });

  for (const t of targets) {
    /* Capture with vertical padding. An element box hugs its ink, so
       screenshotting the element itself gives a bitmap whose first and last
       rows are already letters — and the background estimate below then
       samples the TEXT colour and inverts the whole measurement. Pad, and
       the outer rows are genuinely background. */
    const box = await page.locator(`[data-ovl="${t.id}"]`).boundingBox();
    if (!box) continue;
    const pad = Math.max(6, Math.round(t.size * 0.4));
    const clip = {
      x: Math.max(0, box.x - 2),
      y: Math.max(0, box.y - pad),
      width: Math.min(box.width + 4, w - Math.max(0, box.x - 2)),
      height: box.height + pad * 2,
    };
    if (clip.width < 4 || clip.height < 4) continue;
    let shot;
    try {
      shot = await page.screenshot({ clip, animations: 'disabled' });
    } catch {
      continue;
    }
    const { rows } = await rowInk(shot);

    // Count bands of consecutive rows that carry ink.
    let bands = 0;
    let inBand = false;
    const bandRows = [];
    let start = 0;
    for (let y = 0; y < rows.length; y++) {
      const ink = rows[y] > 0;
      if (ink && !inBand) {
        inBand = true;
        start = y;
      } else if (!ink && inBand) {
        inBand = false;
        bands++;
        bandRows.push([start, y - 1]);
      }
    }
    if (inBand) {
      bands++;
      bandRows.push([start, rows.length - 1]);
    }

    if (bands < t.lines) {
      fails.push({
        vp: `${w}x${h}`,
        kind: 'line-on-line',
        detail: `${t.lines} rendered lines merged into ${bands} ink band(s) @ ${t.size}px`,
        a: `${t.cls} "${t.text}"`,
        b: '',
      });
    }
  }

  await page.close();
}

await decoder.close();
await browser.close();

if (!fails.length) {
  console.log(`Overlap: none. Checked ${VIEWPORTS.map((v) => v.join('x')).join(', ')}.`);
} else {
  console.log(`Overlap: ${fails.length} collision(s)\n`);
  for (const f of fails) {
    console.log(`  [${f.vp}] ${f.kind} — ${f.detail}`);
    console.log(`         ${f.a}`);
    if (f.b) console.log(`         ${f.b}`);
  }
  process.exitCode = 1;
}
