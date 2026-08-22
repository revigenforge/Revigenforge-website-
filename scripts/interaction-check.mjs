import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../.qa-shots/', import.meta.url));
const TARGET = process.env.PREVIEW_URL ?? 'http://localhost:4173/';
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

/* ---- mobile: drawer + accordion ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(TARGET, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Drawer
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/mobile-drawer.png` });
  const drawer = page.locator('[data-drawer]');
  ok((await drawer.getAttribute('data-open')) === 'true', 'drawer did not open');
  const drawerLink = drawer.getByRole('link', { name: /Services/i });
  ok(await drawerLink.isVisible(), 'drawer link not visible');
  await drawerLink.click();
  await page.waitForTimeout(900);
  ok((await drawer.getAttribute('data-open')) === 'false', 'drawer did not close on nav click');
  ok(!(await drawerLink.isVisible()), 'drawer still visible after nav click');
  ok(page.url().endsWith('#services'), `nav click did not jump to section (${page.url()})`);
  ok(await page.evaluate(() => document.body.style.overflow === ''), 'body scroll lock not released');

  // Accordion: second row opens, first closes
  const rows = page.locator('#services button[aria-expanded]');
  ok((await rows.count()) === 5, `expected 5 service rows, got ${await rows.count()}`);
  ok((await rows.nth(0).getAttribute('aria-expanded')) === 'true', 'first row not open by default');
  await rows.nth(2).click();
  await page.waitForTimeout(800);
  ok((await rows.nth(2).getAttribute('aria-expanded')) === 'true', 'clicked row did not open');
  ok((await rows.nth(0).getAttribute('aria-expanded')) === 'false', 'previous row did not close');
  await page.screenshot({ path: `${OUT}/mobile-accordion.png` });

  // Tap target sizes
  const small = await page.evaluate(() =>
    [...document.querySelectorAll('a[href], button')]
      .filter((el) => el.offsetParent !== null && !el.className.includes('sr-only'))
      .map((el) => ({ t: el.textContent.trim().slice(0, 28), h: Math.round(el.getBoundingClientRect().height) }))
      .filter((x) => x.h > 0 && x.h < 32),
  );
  if (small.length) fails.push(`small tap targets: ${JSON.stringify(small.slice(0, 8))}`);

  await ctx.close();
}

/* ---- desktop: form + keyboard ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(TARGET, { waitUntil: 'networkidle' });

  // Above-the-fold CTA visibility (the 5-second test)
  const cta = page.getByRole('link', { name: /Book a free call/i }).first();
  const box = await cta.boundingBox();
  ok(box && box.y + box.height <= 900, `primary CTA below the fold at 1440x900 (y=${box?.y})`);

  // Contact exposes a real mail link (the form was replaced by a booking CTA).
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const mailto = await page.evaluate(
    () => document.querySelector('#contact a[href^="mailto:"]')?.getAttribute('href'),
  );
  ok(mailto?.startsWith('mailto:'), `no mailto link in contact: ${mailto}`);

  // Keyboard focus ring reaches the skip link first
  await page.reload({ waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim());
  ok(/skip/i.test(focused || ''), `first tab stop was "${focused}", expected skip link`);

  // Reduced motion: everything must be visible, nothing stuck at opacity 0
  await ctx.close();
  const rmCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rmPage = await rmCtx.newPage();
  await rmPage.goto(TARGET, { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(600);
  const hidden = await rmPage.evaluate(() =>
    [...document.querySelectorAll('[data-reveal]')].filter(
      (el) => parseFloat(getComputedStyle(el).opacity) < 0.9,
    ).length,
  );
  ok(hidden === 0, `${hidden} elements still hidden under prefers-reduced-motion`);
  await rmCtx.close();
}


/* ---- accordions: the page's argument lives inside them ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => fails.push(`[accordions] PAGEERROR ${e.message}`));
  await page.goto(TARGET, { waitUntil: 'networkidle' });

  // Services: single-open, and opening one closes the other.
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const svc = page.locator('#services button[aria-expanded]');
  ok((await svc.count()) === 5, `expected 5 services, got ${await svc.count()}`);
  ok((await svc.nth(0).getAttribute('aria-expanded')) === 'true', 'first service not open by default');
  await svc.nth(3).click();
  await page.waitForTimeout(600);
  ok((await svc.nth(3).getAttribute('aria-expanded')) === 'true', 'service did not open');
  ok((await svc.nth(0).getAttribute('aria-expanded')) === 'false', 'previous service stayed open');

  // FAQ: closed by default — this is what keeps the page near-wordless.
  await page.locator('#faq').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const faq = page.locator('#faq button[aria-expanded]');
  ok((await faq.count()) === 5, `expected 5 faq rows, got ${await faq.count()}`);
  const anyOpen = await page.locator('#faq button[aria-expanded="true"]').count();
  ok(anyOpen === 0, 'faq rows should start closed');
  await faq.nth(1).click();
  await page.waitForTimeout(600);
  ok((await faq.nth(1).getAttribute('aria-expanded')) === 'true', 'faq row did not open');

  // Every image slot resolved — a broken plate would be silent otherwise.
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('img')].filter((i) => !i.complete || i.naturalWidth === 0).length,
  );
  ok(broken === 0, `${broken} images failed to load`);

  await ctx.close();
}

await browser.close();
console.log(fails.length ? 'FAILURES:\n- ' + fails.join('\n- ') : 'All interaction checks passed.');
