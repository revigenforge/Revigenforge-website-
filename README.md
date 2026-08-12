# Revigen Forge — landing page

Single-page site for Revigen Forge. React + TypeScript + Vite, Tailwind v4 for
layout, self-hosted fonts, no runtime dependencies beyond React.

Themed directly off the logo: pure black, pure white, geometric sans, no accent
colour anywhere. Hierarchy comes from value, weight and space alone.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve dist/ on :4173
```

## Changing the copy

**All site copy lives in [`src/content/site.ts`](src/content/site.ts).** Components
read from it and never hardcode text, so the whole site can be rewritten without
touching a component.

Contact details are confirmed: `revigenforge@gmail.com`, Instagram only. Both
live in `contact`, and the footer renders whatever is in `contact.social`, so
adding a channel later needs no component change.

**There is no invented proof on this site.** No client, metric, testimonial or
price appears anywhere, because none was supplied. Sections that would have
needed them were left out rather than filled with placeholders — there is
deliberately no Proof or case-study section. When real proof exists, add it to
`site.ts` with a matching component; don't soften that rule.

`services` and `engagements` are written from the studio's positioning
(positioning → content → conversion). Check the wording matches how you
actually sell.

## Structure

```
src/
  content/site.ts          all copy, one file
  styles/index.css         design tokens, type scale, motion
  hooks/useReveal.ts       one shared IntersectionObserver for the page
  components/
    layout/                Nav, Footer
    ui/                    Button, Reveal/MaskLines, SectionHead
    visuals/               ForgeMark (wordmark), ForgeOrb, MoteField, Grain
    sections/              one file per page section
```

The page alternates black and white surfaces in five chapters — problem (black),
answer and services (white), why and process (black), commercials (white),
close (black). The nav inverts automatically over any element marked
`data-surface="light"`.

## Design notes

- **Type**: Poppins for display, headings and labels — it matches the logo
  wordmark — with Inter Tight for body copy. Both self-hosted via `@fontsource`,
  so there are no external requests and no FOIT.
- **The logo** is set as live text (`Wordmark` / `WordmarkStacked`), not an
  image, so it stays crisp at any size and flips colour with the surface.
- **Emphasis without colour**: `dim-line` steps the surrounding words back to
  55% while the accent word holds full contrast. That is the whole mechanism
  behind the hero and closing headlines.
- **Motion**: one shared `IntersectionObserver` reveals elements once and then
  unobserves them. Everything is CSS transitions; there is no animation library.
  All motion is disabled under `prefers-reduced-motion`.
- **The hero dial** is inline SVG and the mote field is a small canvas capped at
  34 particles, paused when offscreen or when the tab is hidden. No raster
  imagery or stock photography anywhere on the page.
- **The hero is sized so the headline, the positioning line and both CTAs clear
  the fold at 1440×900.** If you enlarge `display-xl`, re-check that.

## Checks

With `npm run preview` running in another shell:

```bash
npm run lint
npm run check:visual        # screenshots at 1440 / 834 / 390 into .qa-shots/
npm run check:interaction   # drawer, accordion, form, tap targets, reduced motion
```

`check:interaction` asserts the things that are easy to regress: the primary CTA
stays above the fold at 1440×900, the mobile drawer closes on navigation and
releases the scroll lock, the accordion is single-open, the enquiry form composes
a valid `mailto:`, every tap target is at least 32px, the skip link is the first
tab stop, and nothing stays hidden under `prefers-reduced-motion`.

`check:visual` also fails if a section anchor goes missing, which is what catches
a nav link pointing at a section that no longer exists.

Worth knowing when editing headlines: display lines are explicit, one per array
entry, and each is masked for the reveal. If a line wraps, the mask breaks — so
widen the heading's `max-w-[…ch]` rather than letting it wrap.

Set `CHROMIUM_PATH` if Playwright cannot find a browser, or `PREVIEW_URL` to
point the checks at a deployed URL.

## The enquiry form

The form composes a `mailto:` and dispatches it through a real anchor. That is
deliberate: it works on any static host with no backend, no third-party form
service, and nothing stored on the site. To move to a real endpoint, replace the
body of `onSubmit` in `src/components/sections/CallToAction.tsx` with a `fetch`.

## Deploying

Target URL: **https://revigenforge.github.io/Revigenforge-website-/**

`.github/workflows/deploy.yml` lints, builds and publishes `dist/` to GitHub
Pages on every push to the default branch, and can be run manually from the
Actions tab.

**One-time step required before the first deploy succeeds:** in the repository,
go to **Settings → Pages** and set **Source** to **GitHub Actions**, then re-run
the workflow from the Actions tab. This cannot be automated — the workflow's
`GITHUB_TOKEN` is not allowed to create a Pages site, so `configure-pages` fails
with "Resource not accessible by integration" until Pages is switched on by
hand. Every deploy after that is automatic.

`vite.config.ts` uses a relative `base`, so the build works on a project
subpath, a custom domain, or any static host without reconfiguration.

### Connecting a custom domain

Two things need updating, and neither can be done at runtime because social
scrapers do not execute JavaScript:

1. The three absolute URLs in `index.html` — `canonical`, `og:url` and the two
   image tags — all marked with `⚠`.
2. Add a `public/CNAME` file containing the domain, and point the DNS records
   at GitHub Pages.

`public/og.png` is the social card, generated at 1200×630 in the brand
typeface. It is a PNG on purpose: most scrapers refuse to render SVG cards.
