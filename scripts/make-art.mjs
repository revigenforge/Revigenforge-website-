/**
 * Generates the site's artwork from the brand itself.
 *
 * There is no photography and no portfolio yet, and stock would be worse
 * than nothing for a studio selling art direction. So the imagery is built
 * from the one asset that definitely exists: the wordmark. Each plate is
 * laid out in HTML, rendered through Chromium and saved as a PNG.
 *
 *   node scripts/make-art.mjs          # writes public/art/*.png
 *
 * Re-run after changing the palette or the type. Deterministic — the same
 * input always produces the same plate.
 */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../public/art/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const font = (p) =>
  readFileSync(fileURLToPath(new URL(`../node_modules/${p}`, import.meta.url))).toString('base64');

const ANTON = font('@fontsource/anton/files/anton-latin-400-normal.woff2');
const POPPINS = font('@fontsource/poppins/files/poppins-latin-500-normal.woff2');

const INK = '#0a0a0a';
const CREAM = '#f4efe4';
const BLUE = '#2447d6';

const BASE = `
@font-face{font-family:A;src:url(data:font/woff2;base64,${ANTON}) format('woff2')}
@font-face{font-family:P;src:url(data:font/woff2;base64,${POPPINS}) format('woff2');font-weight:500}
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;position:relative}
.w{font-family:A;text-transform:uppercase;line-height:.8;letter-spacing:-.02em;white-space:nowrap}
.grain{position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")}
`;

/** Each plate: a name, a size, and the body markup. */
const plates = [
  {
    // Hero backdrop — the wordmark cropped so hard it reads as texture.
    name: 'plate-hero',
    w: 1920,
    h: 1200,
    html: `<body style="background:${INK}">
      <div style="position:absolute;inset:0;display:grid;align-content:center;gap:.02em;opacity:.14">
        ${Array.from({ length: 5 })
          .map(
            (_, i) =>
              `<div class="w" style="font-size:300px;color:${CREAM};transform:translateX(${
                i % 2 ? '-14%' : '-4%'
              })">Revigen Forge</div>`,
          )
          .join('')}
      </div>
      <div style="position:absolute;inset:0;background:radial-gradient(120% 90% at 15% 45%, ${INK} 30%, transparent 78%)"></div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:45%;background:linear-gradient(to top,${INK},transparent)"></div>
      <div class="grain"></div>
    </body>`,
  },
  {
    // Rotated lockup on cream — the "studio poster" plate.
    name: 'plate-poster',
    w: 1200,
    h: 1500,
    html: `<body style="background:${CREAM}">
      <div style="position:absolute;inset:-20%;display:grid;align-content:center;gap:.06em;transform:rotate(-22deg)">
        ${Array.from({ length: 7 })
          .map(
            (_, i) =>
              `<div class="w" style="font-size:170px;color:${
                i === 3 ? BLUE : INK
              };opacity:${i === 3 ? 1 : 0.09};transform:translateX(${(i * 9) % 30}%)">Revigen Forge</div>`,
          )
          .join('')}
      </div>
      <div class="grain" style="opacity:.35"></div>
    </body>`,
  },
  {
    // Instrument dial — carried over from the earlier identity work.
    name: 'plate-dial',
    w: 1400,
    h: 1050,
    html: `<body style="background:${INK}">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
        ${[14, 20, 27, 34, 42]
          .map(
            (r, i) =>
              `<circle cx="50" cy="50" r="${r}" fill="none" stroke="${CREAM}" stroke-opacity="${
                0.3 - i * 0.045
              }" stroke-width=".18" ${i % 2 ? 'stroke-dasharray=".5 2"' : ''}/>`,
          )
          .join('')}
        ${Array.from({ length: 60 })
          .map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const long = i % 5 === 0;
            const r1 = 45;
            const r2 = r1 + (long ? 2.4 : 1.1);
            return `<line x1="${50 + Math.cos(a) * r1}" y1="${50 + Math.sin(a) * r1}" x2="${
              50 + Math.cos(a) * r2
            }" y2="${50 + Math.sin(a) * r2}" stroke="${CREAM}" stroke-opacity="${
              long ? 0.28 : 0.12
            }" stroke-width=".16"/>`;
          })
          .join('')}
        <circle cx="50" cy="50" r="27" fill="none" stroke="${BLUE}" stroke-width=".4" stroke-dasharray="22 140" stroke-linecap="round" transform="rotate(-40 50 50)"/>
        <circle cx="50" cy="50" r=".7" fill="${CREAM}" fill-opacity=".8"/>
      </svg>
      <div class="grain" style="opacity:.4"></div>
    </body>`,
  },
  {
    // Monogram, extreme crop. Reads as a graphic mark, not a letter.
    name: 'plate-mark',
    w: 1200,
    h: 1500,
    html: `<body style="background:${BLUE}">
      <div class="w" style="position:absolute;left:-8%;top:50%;transform:translateY(-50%);font-size:1150px;color:${CREAM};opacity:.97;letter-spacing:-.06em">RF</div>
      <div style="position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(0,0,0,.28))"></div>
      <div class="grain" style="opacity:.45"></div>
    </body>`,
  },
  {
    // Stacked lockup, cream on ink — the calm plate.
    name: 'plate-stack',
    w: 1200,
    h: 1500,
    html: `<body style="background:${INK}">
      <div style="position:absolute;inset:0;display:grid;place-content:center">
        <div class="w" style="font-size:230px;color:${CREAM};line-height:.78">Revigen<br>Forge</div>
        <div style="font-family:P;font-size:22px;letter-spacing:.34em;text-transform:uppercase;color:${CREAM};opacity:.4;margin-top:46px">Creative growth studio</div>
      </div>
      <div style="position:absolute;left:0;right:0;top:0;height:38%;background:linear-gradient(to bottom,rgba(36,71,214,.22),transparent)"></div>
      <div class="grain" style="opacity:.42"></div>
    </body>`,
  },
  {
    // Repeating rule field — quiet texture for wide bands.
    name: 'plate-field',
    w: 1920,
    h: 1080,
    html: `<body style="background:${CREAM}">
      <div style="position:absolute;inset:-10%;display:grid;align-content:center;gap:34px;transform:rotate(-8deg)">
        ${Array.from({ length: 16 })
          .map(
            (_, i) =>
              `<div style="font-family:P;font-weight:500;font-size:26px;letter-spacing:.3em;text-transform:uppercase;color:${INK};opacity:${
                i === 8 ? 0.9 : 0.07
              };white-space:nowrap;transform:translateX(${(i * 17) % 40 - 20}%)">Position · Produce · Convert · Position · Produce · Convert</div>`,
          )
          .join('')}
      </div>
      <div class="grain" style="opacity:.3"></div>
    </body>`,
  },
];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);

for (const plate of plates) {
  const page = await browser.newPage({ viewport: { width: plate.w, height: plate.h } });
  await page.setContent(`<style>${BASE}</style>${plate.html}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}${plate.name}.png` });
  await page.close();
  console.log(`wrote art/${plate.name}.png  ${plate.w}×${plate.h}`);
}

await browser.close();
