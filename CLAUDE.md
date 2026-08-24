# Revigen Forge — working notes

Read this before changing anything. It loads automatically each session.

## Standing rules

1. **Never invent proof.** No testimonials, client names, case studies, metrics,
   logos, review counts or prices unless the user supplied them. This is not a
   stylistic preference — a studio selling trust cannot be caught faking it, and
   fabricated reviews are illegal in several jurisdictions. If a section would
   need proof that does not exist, leave the section out rather than filling it
   with placeholders. See `docs/conversion-playbook.md` for the honest
   alternatives.
2. **All copy lives in `src/content/site.ts`.** Components read from it and
   never hardcode text. Change the site by changing that file.
3. **One accent, and it is green.** Cream leads, ink answers, green does
   the rest. Blue used to sit here; it came from an early reference and
   never meant anything for this brand, whereas green says growth, which is
   what the studio sells. Adding a *second* accent is what this rule exists
   to stop — if a mark needs emphasis and is not accent-worthy, it should be
   `--fg`/`dim`.
   Green owns two full-bleed sections (About and Contact — the thesis and
   the invitation) and otherwise appears as marks: the CTA, pill arrows,
   live figures, markers, the final Compound step. An earlier version of
   this rule said green never owns a section; the studio asked for more of
   it, so the rule changed rather than being quietly broken. Keep it to
   those two blocks — a third would make green the page rather than the
   accent.
   **Three values of one hue**, because no single green clears AA
   everywhere. Never hardcode any of them; `accent` resolves text per
   surface and `--accent-fill` carries the solid:
   - `--color-green` (#15803d) — FILL. White on it 5.02:1; 3.95:1 against
     ink, so a button still separates from the dark nav capsule.
   - `--color-green-lift` (#2fbf71) — TEXT ON INK, 8.31:1.
   - `--color-green-deep` (#0f7a3f) — TEXT ON CREAM, 4.72:1. The fill green
     is 4.37:1 on cream and misses AA for small text, so these cannot merge.
   - `--color-green-surface` (#116634) — the FULL-BLEED BLOCK. Deeper than
     the fill on purpose: white on the fill green is only 5.02:1, so a
     secondary tone there would need 92% white to stay legible and the tone
     scale collapses. This gives white 7.06:1 and `--fg-2` 4.99:1. Small
     marks want brightness; large areas want depth.
   On `surface-accent`, `--accent-fill` is INK, not white — a white pill
   arrow on a green section would put a white glyph on white.
   `scripts/make-art.mjs` bakes the accent into the generated plates — if
   the palette changes, re-run it or the artwork silently keeps the old
   colour.
4. **Never dim text with `opacity-*`. Use the tone scale.** Three tones, set by
   the surface utility: `--fg` full, `dim` (`--fg-2`) safe at any size, `ghost`
   (`--fg-3`) for display type ≥24px only. The percentages are solved against
   WCAG, not chosen by eye — an earlier pass had 51 elements below AA because
   every component picked its own opacity.
   **A block that inverts must apply a surface utility, not bare `bg-*`/
   `text-*`.** `bg-ink text-cream` leaves `--fg-2` resolving against the
   section behind it, so `dim` children come out dark-on-dark. This has been
   the cause of two real bugs (About cards, featured pricing card).
5. **Render before claiming it works.** This repo has three check scripts; run
   all of them and actually look at the screenshots. Layout bugs here have
   consistently been invisible in the diff and obvious on screen. Contrast bugs
   are worse — they are invisible in both, which is why `check:contrast`
   rasterises and measures rather than trusting computed values.

## Verifying changes

```bash
npm run build                # tsc + vite
npm run lint
npm run preview              # :4173, needed by both checks
npm run check:visual         # 1440 / 1024 / 834 / 390 → .qa-shots/
npm run check:interaction    # accordions, drawer, tap targets, a11y, reduced motion
npm run check:contrast       # WCAG AA on every visible text node
npm run check:overlap        # text colliding with text, at six widths
```

`check:overlap` decides line collisions from **pixels**, not font metrics,
and that is deliberate: `measureText` on the DOM string counts the descender
of a lowercase "p" that `text-transform: uppercase` never paints, and
`actualBoundingBoxAscent` reports the tallest glyph in the whole string
rather than what is on a given line. Both invent collisions that are not on
screen — the first two versions of this script reported 51 and then 75
phantom hits. It screenshots each multi-line heading and counts bands of
rows containing ink: N lines that produce fewer than N bands are touching.
Capture the element with padding, or the background estimate samples the
text colour and inverts the whole measurement.

`check:contrast` composites for real — it paints the background stack and the
text colour onto a canvas and reads the pixel back. Do not "simplify" it to
parse `getComputedStyle().color`: anything built with `color-mix()` computes to
`oklab()`, whose channels are 0–1 in a perceptual space, and assigning to canvas
`fillStyle` does **not** normalise it (Chromium hands the oklab string straight
back). Parsing those numbers as sRGB produces confident nonsense — it reported
`1.02:1` for text that was actually fine.

In this sandbox Playwright needs `CHROMIUM_PATH` pointing at the local Chromium.
Outbound access to `github.io` is blocked, so the deployed site cannot be
fetched from here — verify deploys via the Actions run status, and say plainly
that the live page was not loaded.

## Skills

Eight skills are committed under `.claude/skills/` (~4.7MB), so they travel with
the clone and are available to anyone working on this site — not just whoever
installed them on their own machine.

- **`frontend-design`** — visual direction, typography, avoiding templated
  defaults. Most of what changes here is design work, so this earns its place.
  Source: `/mnt/skills/public/frontend-design`.
- **`ui-ux-pro-max`** and six companions (`design`, `design-system`,
  `ui-styling`, `brand`, `banner-design`, `slides`) — design intelligence with
  searchable local catalogs: styles, palettes, font pairings, UX guidelines,
  stacks. Mostly CSV/JSON/Markdown plus Python and a little JS.

The seven came from `npm i -g ui-ux-pro-max-cli` then
`uipro init --ai claude --global`. **Vendored, not tracked upstream** — to
update, re-run that and copy the refreshed `~/.claude/skills/<name>/` over the
committed copies.

None of them affect the build. Vite only reads `src/` and `index.html`, and
`.oxlintrc.json` ignores `.claude/**` — the vendored skills ship their own JS,
which is not ours to lint or fix, and without that ignore a future oxlint could
promote a warning in third-party code into a deploy failure.

## Environment gotcha

**The working tree has repeatedly reset to an older commit between turns.**
Before starting work, run `git fetch` and compare against
`origin/claude/revigen-forge-landing-5uaqyv`; fast-forward if behind. Two
sessions have nearly built on stale state because of this — one push was
rejected and needed a rebase to avoid losing the deploy work.

## What the site is

Seven sections built around four interactive diagrams — hero chain, radial mind
map (The Forge), stage spine (Approach), closed loop (The System). Different
shapes on purpose: the shape carries the argument. One shared vocabulary — a
node is a pill, an edge is a hairline, blue means live.

Below 1024px diagrams are **replaced, not shrunk**: the radial map becomes an
expandable tree, the ring unrolls into a list.

Architecture, design decisions and the custom-domain steps are in `README.md`.
Conversion reasoning and what the site deliberately does not do yet are in
`docs/conversion-playbook.md`.

## Deployment

Live at https://revigenforge.github.io/Revigenforge-website-/ — every push to
the default branch deploys. The default branch is
`claude/revigen-forge-landing-5uaqyv`, not `main`.
