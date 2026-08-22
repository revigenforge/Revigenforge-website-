import { process } from '../../content/site';
import { Reveal } from '../ui/Reveal';

/** Four steps, three words each. The whole section is under thirty words. */
export function Process() {
  return (
    <section id="process" className="surface-ink pb-[var(--section-y)]">
      <div className="shell">
        <Reveal y={10}>
          <span className="label opacity-45">{process.label}</span>
        </Reveal>

        <Reveal delay={80} className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
          <h2 className="display-lg">{process.headline}</h2>
          <p className="body-copy mb-1 opacity-45">{process.aside}</p>
        </Reveal>

        <ol className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 80}
              className="border-t pt-6 [border-color:var(--rule)] lg:pr-8"
            >
              <span className="label tnum opacity-35">{s.n}</span>
              <h3 className="display-md mt-8">{s.title}</h3>
              <p className="body-copy mt-2 opacity-55">{s.line}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
