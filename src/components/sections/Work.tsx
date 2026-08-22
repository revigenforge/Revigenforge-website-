import { work } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { Frame } from '../ui/Frame';

/**
 * The reference sets a still *inside* the headline, between two halves of
 * a word. It is the page's most distinctive move, so it is worth the
 * awkward markup: the word splits and the frame sits in the gap.
 */
export function Work() {
  const [a, b, c] = work.pieces;

  return (
    <section id="work" className="surface-cream pb-[var(--section-y)]">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{work.label}</span>
        </Reveal>

        {/* Headline with the frame inset. Both halves come from site.ts —
            they used to be hardcoded here, which quietly broke the rule
            that every word on the page lives in the content file. */}
        <Reveal delay={80} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="display-lg">{work.headlineA}</h2>
          <Frame
            src={work.art.inset}
            alt=""
            label="Inset"
            className="h-[clamp(2.75rem,6vw,4.75rem)] w-[clamp(6rem,14vw,12rem)] rounded-xl"
          />
          <h2 className="display-lg">{work.headlineB}</h2>
        </Reveal>

        {/* Pieces */}
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={120}>
            <Frame
              src={a?.src}
              alt={a?.alt ?? 'Studio plate'}
              label={a ? `${a.client} — ${a.kind}` : 'Plate'}
              className="aspect-[4/3] rounded-2xl"
            />
          </Reveal>

          <Reveal className="md:col-span-5" delay={200}>
            <Frame
              src={b?.src}
              alt={b?.alt ?? 'Studio plate'}
              label={b ? `${b.client} — ${b.kind}` : 'Plate'}
              className="aspect-[4/3] h-full rounded-2xl md:aspect-auto"
            />
          </Reveal>

          <Reveal className="md:col-span-12" delay={260}>
            <Frame
              src={c?.src}
              alt={c?.alt ?? 'Studio plate'}
              label={c ? `${c.client} — ${c.kind}` : 'Plate'}
              className="aspect-[16/9] rounded-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
