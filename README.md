# Revigen Forge

Interactive studio site for Revigen Forge. React + TypeScript + Vite, Tailwind v4
for layout, self-hosted fonts, no runtime dependencies beyond React.

Live at **https://revigenforge.github.io/Revigenforge-website-/**

Themed off the logo: pure black, pure white, geometric sans, plus a single blue
accent reserved for live state. Hierarchy comes from value, weight and space.

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

`services`, the mind-map node copy and the stage descriptions are written from
the studio's positioning (positioning → content → conversion). Check the wording
matches how you actually think and sell — the diagrams are the argument, so
generic node text undoes the whole point of them.

## Structure

```
src/
  content/site.ts          all copy + diagram data, one file
  styles/index.css         design tokens, type scale, motion, diagram language
  hooks/useReveal.ts       one shared IntersectionObserver for the page
  hooks/useMediaQuery.ts   drives the desktop/mobile diagram switch
  components/
    layout/                Nav, Footer
    ui/                    Button, Reveal/MaskLines, SectionHead
    visuals/               ForgeMark (wordmark), ForgeOrb, MoteField, Grain
    interactive/           HeroChain, RadialMap, StageFlow, SystemLoop
    sections/              one file per page section
```

Seven sections: Hero, The Forge, What we do, Approach, The Studio, The System,
Contact. Surfaces alternate black and white so a long scroll reads as chapters;
the diagrams all sit on black, where the accent can actually glow. The nav
inverts automatically over any element marked `data-surface="light"`.

## The diagrams

Four interaction models, deliberately different shapes, one shared vocabulary —
a node is a bordered pill, an edge is a hairline, and **blue means live**. A
visitor who learns the hero chain already knows how the rest behave.

| Section | Shape | What the shape argues |
| --- | --- | --- |
| Hero | Vertical chain | The five links are a sequence |
| The Forge | Radial, hierarchical | Five disciplines hanging off one centre |
| Approach | Vertical spine that fills | The order is the point |
| The System | Closed ring | Conversion feeds the next idea |

Each is built on plain SVG plus absolutely-positioned HTML pills — no graph or
animation library. Geometry is pure maths in a 0–100 square, so the diagrams
scale with their container.

**Below 1024px they are not shrunk, they are replaced.** The radial map becomes
a vertical expandable tree and the ring unrolls into a list that visibly returns
to the start. `useIsDesktop()` picks between them.

Two geometry details worth keeping if you edit `RadialMap`: child nodes
alternate between two radii (`R_CHILD_STEP`) so long neighbouring labels cannot
collide, and every pill is anchored to grow *away* from the centre
(`anchorFor`), which is what stops the left- and right-most labels causing
horizontal overflow.

## Design notes

- **Type**: Poppins for display, headings and labels — it matches the logo
  wordmark — with Inter Tight for body copy. Both self-hosted via `@fontsource`,
  so there are no external requests and no FOIT.
- **One accent, never decorative.** `--color-accent` (#2E6BFF) marks *live*
  state only: the node you selected, the path currently carrying attention, the
  focused control. Everything at rest stays black and white. If you find
  yourself using blue to make something look nicer, that is the rule breaking.
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
npm run check:visual        # 1440 / 1024 / 834 / 390 screenshots into .qa-shots/
npm run check:interaction   # drawer, accordion, form, tap targets, reduced motion
```

`check:interaction` asserts the things that are easy to regress: the primary CTA
stays above the fold at 1440×900, the mobile drawer closes on navigation and
releases the scroll lock, the accordion is single-open, the enquiry form composes
a valid `mailto:`, every tap target is at least 32px, the skip link is the first
tab stop, and nothing stays hidden under `prefers-reduced-motion`.

`check:visual` also fails if a section anchor goes missing, which is what catches
a nav link pointing at a section that no longer exists.

The diagrams have their own assertions, because they can break silently: branch
expansion is single-open, selecting a node rewrites the readout, hidden child
nodes are not tab-focusable, selecting a loop stage lights exactly two edges,
and below 1024px no radial nodes render at all.

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

The site is live on GitHub Pages. `.github/workflows/deploy.yml` lints, builds
and publishes `dist/` on every push to the default branch, and can be run
manually from the Actions tab. Pages is already enabled with "GitHub Actions" as
the source; that was a one-time manual step, because the workflow's
`GITHUB_TOKEN` is not permitted to create a Pages site.

`vite.config.ts` uses a relative `base`, so `dist/` works on a custom domain, a
project subpath, or any static host without reconfiguration.

### Connecting a custom domain

Two things need updating, and neither can be done at runtime because social
scrapers do not execute JavaScript:

1. The three absolute URLs in `index.html` — `canonical`, `og:url` and the two
   image tags — all marked with `⚠`.
2. Add a `public/CNAME` file containing the domain, and point DNS at GitHub
   Pages.

`public/og.png` is the social card, generated at 1200×630 in the brand
typeface. It is a PNG on purpose: most scrapers refuse to render SVG cards.
