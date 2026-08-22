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
3. **One accent colour, never decorative.** `--color-accent` (#2E6BFF) marks
   *live* state only: selected node, active path, focused control. Everything at
   rest is black and white. Using blue to make something look nicer breaks the
   system.
4. **Render before claiming it works.** This repo has two check scripts; run
   both and actually look at the screenshots. Layout bugs here have consistently
   been invisible in the diff and obvious on screen.

## Verifying changes

```bash
npm run build                # tsc + vite
npm run lint
npm run preview              # :4173, needed by both checks
npm run check:visual         # 1440 / 1024 / 834 / 390 → .qa-shots/
npm run check:interaction    # diagrams, drawer, form, a11y, reduced motion
```

In this sandbox Playwright needs `CHROMIUM_PATH` pointing at the local Chromium.
Outbound access to `github.io` is blocked, so the deployed site cannot be
fetched from here — verify deploys via the Actions run status, and say plainly
that the live page was not loaded.

## Skills

Two skills are committed under `.claude/skills/`, so they travel with the clone
and are available to anyone working on this site — not just whoever installed
them on their own machine.

- **`frontend-design`** — visual direction, typography, avoiding templated
  defaults. Most of what changes here is design work, so this earns its place.
- **`ui-ux-pro-max`** — searchable local design data (styles, palettes, font
  pairings, UX guidelines, stacks) plus the Python scripts that query it. ~3.6MB,
  almost all CSV/JSON catalogs. Installed via `npm i -g ui-ux-pro-max-cli` then
  `uipro init --ai claude --global`; the copy here is that output, vendored.

Vendored, not tracked upstream: to update, re-run the CLI and copy the refreshed
`~/.claude/skills/ui-ux-pro-max/` over the committed one.

Neither is used by the build. `npm run lint` and `npm run build` ignore
`.claude/` entirely — verified after adding them.

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
