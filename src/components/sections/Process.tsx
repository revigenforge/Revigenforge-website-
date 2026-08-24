import { process } from '../../content/site';
import { Reveal } from '../ui/Reveal';

/** Four steps, three words each. The whole section is under thirty words. */
export function Process() {
  return (
    <section id="process" className="surface-ink pb-[var(--section-y)]">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{process.label}</span>
        </Reveal>

        {/* Headline left, gloss right — matches Services. Trailing the
            headline on a shared baseline read as an accident. */}
        <Reveal delay={80} className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="display-lg">{process.headline}</h2>
          <p className="body-copy dim mb-1.5 max-w-[24ch]">{process.aside}</p>
        </Reveal>

        <ol className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => {
            // The last move is Compound — the one that is about growth. Its
            // index carries the growth colour so the sequence visibly ends
            // somewhere, rather than just stopping.
            const isLast = i === process.steps.length - 1;
            return (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 80}
              className="border-t pt-6 [border-color:var(--rule)] lg:pr-8"
            >
              <span className={`label tnum ${isLast ? 'growth' : 'dim'}`}>{s.n}</span>
              <h3 className="display-md mt-8">{s.title}</h3>
              <p className="body-copy dim mt-2">{s.line}</p>
            </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
