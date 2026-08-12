# Revigen Forge — landing page

Single-page site for Revigen Forge. React + TypeScript + Vite, Tailwind v4 for
layout, self-hosted fonts, no runtime dependencies beyond React.

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

Three things to confirm before launch, all marked with `⚠` in that file:

1. **`contact.email`** — currently the account email on file. Swap it for a
   branded address once DNS is ready.
2. **`contact.social`** — placeholder handles. Point them at the real profiles.
3. **`proof.caseStudies` and `proof.testimonials`** — deliberately empty. No
   client, metric or quote has been invented anywhere on this site. The Proof
   section renders those blocks *only* when the arrays have entries; while they
   are empty it shows an honest "case studies published as engagements complete"
   panel instead. Add one real entry and the fully-styled grid appears.

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
    visuals/               ForgeMark, ForgeOrb, EmberField, Grain
    sections/              one file per page section
```

The page alternates ink and bone surfaces in five chapters — problem (dark),
answer and services (light), why and process (dark), proof and commercials
(light), close (dark). The nav inverts automatically over any element marked
`data-surface="light"`.

## Design notes

- **Type**: Instrument Serif for display, Inter Tight for body, JetBrains Mono
  for labels. All self-hosted via `@fontsource` — no external requests, no FOIT.
- **Motion**: one shared `IntersectionObserver` reveals elements once and then
  unobserves them. Everything is CSS transitions; there is no animation library.
  All motion is disabled under `prefers-reduced-motion`.
- **The hero orb** is inline SVG and the ember field is a small canvas capped at
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

Set `CHROMIUM_PATH` if Playwright cannot find a browser, or `PREVIEW_URL` to
point the checks at a deployed URL.

## The enquiry form

The form composes a `mailto:` and dispatches it through a real anchor. That is
deliberate: it works on any static host with no backend, no third-party form
service, and nothing stored on the site. To move to a real endpoint, replace the
body of `onSubmit` in `src/components/sections/CallToAction.tsx` with a `fetch`.

## Deploying

`vite.config.ts` uses a relative `base`, so `dist/` works on a custom domain, a
GitHub Pages project subpath, or any static host without reconfiguration.
`.github/workflows/deploy.yml` publishes `dist/` to GitHub Pages on push to the
default branch — enable Pages with "GitHub Actions" as the source to use it.
