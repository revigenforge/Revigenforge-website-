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
  const drawerLink = drawer.getByRole('link', { name: /What we do/i });
  ok(await drawerLink.isVisible(), 'drawer link not visible');
  await drawerLink.click();
  await page.waitForTimeout(900);
  ok((await drawer.getAttribute('data-open')) === 'false', 'drawer did not close on nav click');
  ok(!(await drawerLink.isVisible()), 'drawer still visible after nav click');
  ok(page.url().endsWith('#services'), `nav click did not jump to section (${page.url()})`);
  ok(await page.evaluate(() => document.body.style.overflow === ''), 'body scroll lock not released');

  // Accordion: second row opens, first closes
  const rows = page.locator('#services article > h3 > button');
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
  const cta = page.getByRole('link', { name: /Book a strategy call/i }).first();
  const box = await cta.boundingBox();
  ok(box && box.y + box.height <= 900, `primary CTA below the fold at 1440x900 (y=${box?.y})`);

  // mailto composition — intercept the navigation
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.fill('#rf-name', 'Sam Rivera');
  await page.fill('#rf-company', '@studio');
  await page.fill('#rf-links', 'instagram.com/studio');
  await page.fill('#rf-message', 'Posting daily, no enquiries.');
  await page.getByRole('button', { name: /Send enquiry/i }).click();
  await page.waitForTimeout(400);
  const mailto = await page.evaluate(
    () => document.querySelector('#contact form a[href^="mailto:"]')?.getAttribute('href'),
  );
  ok(mailto?.startsWith('mailto:'), `mailto not composed: ${mailto}`);
  ok(mailto?.includes('Sam%20Rivera'), 'form values missing from mailto body');

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


/* ---- diagrams: the site's main argument, so assert they actually work ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => fails.push(`[diagrams] PAGEERROR ${e.message}`));
  await page.goto(TARGET, { waitUntil: 'networkidle' });

  // Forge: opening a branch reveals its children and rewrites the readout.
  await page.locator('#forge').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const branch = page.locator('#forge button[data-branch]');
  ok((await branch.count()) === 5, `expected 5 forge branches, got ${await branch.count()}`);

  await branch.nth(2).click();
  await page.waitForTimeout(700);
  ok((await branch.nth(2).getAttribute('aria-expanded')) === 'true', 'forge branch did not open');
  ok((await branch.nth(0).getAttribute('aria-expanded')) === 'false', 'previous forge branch stayed open');

  const visibleChildren = await page.locator('#forge .map-node:not([data-hidden="true"])').count();
  ok(visibleChildren > 5, `expected branch children to be revealed, saw ${visibleChildren} nodes`);

  const before = await page.locator('#forge h3').first().textContent();
  const child = page.locator('#forge .map-node[data-hidden="false"]').last();
  await child.click();
  await page.waitForTimeout(500);
  const after = await page.locator('#forge h3').first().textContent();
  ok(before !== after, 'selecting a forge node did not change the readout');

  // Hidden children must not be reachable by keyboard.
  const focusableHidden = await page.locator('#forge .map-node[data-hidden="true"][tabindex="0"]').count();
  ok(focusableHidden === 0, `${focusableHidden} hidden nodes are still tab-focusable`);

  // Approach: selecting a stage rewrites the readout.
  await page.locator('#approach').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const stages = page.locator('#approach .stage');
  ok((await stages.count()) === 6, `expected 6 approach stages, got ${await stages.count()}`);
  const aBefore = await page.locator('#approach-readout').textContent();
  await stages.nth(4).click();
  await page.waitForTimeout(600);
  const aAfter = await page.locator('#approach-readout').textContent();
  ok(aBefore !== aAfter, 'approach readout did not change on stage select');

  // System: selecting a stage lights exactly the in and out edges.
  await page.locator('#system').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const loopNodes = page.locator('#system .map-node');
  ok((await loopNodes.count()) === 6, `expected 6 loop stages, got ${await loopNodes.count()}`);
  await loopNodes.nth(3).click();
  await page.waitForTimeout(500);
  const liveEdges = await page.locator('#system path[data-live="true"]').count();
  ok(liveEdges === 2, `expected 2 live loop edges, got ${liveEdges}`);

  await ctx.close();
}

/* ---- diagrams must become usable trees below the radial breakpoint ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(TARGET, { waitUntil: 'networkidle' });
  await page.locator('#forge').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // No absolutely-positioned radial nodes on mobile — it must be a list.
  ok((await page.locator('#forge .map-node').count()) === 0, 'radial nodes rendered on mobile');

  const mBranch = page.locator('#forge button[data-branch]');
  ok((await mBranch.count()) === 5, 'mobile forge tree missing branches');
  await mBranch.nth(1).click();
  await page.waitForTimeout(700);
  ok((await mBranch.nth(1).getAttribute('aria-expanded')) === 'true', 'mobile branch did not expand');

  await ctx.close();
}

await browser.close();
console.log(fails.length ? 'FAILURES:\n- ' + fails.join('\n- ') : 'All interaction checks passed.');
