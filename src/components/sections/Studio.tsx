import { studio } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { WordmarkStacked } from '../visuals/ForgeMark';

/**
 * The human section. Deliberately the quietest block on the page — after
 * three interactive diagrams the visitor needs somewhere to rest, and a
 * studio that claims restraint should demonstrate it somewhere.
 *
 * No credentials, headcount, founding date or client names, because none
 * were supplied.
 */
export function Studio() {
  return (
    <section id="studio" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={studio.index}
          label={studio.label}
          lines={studio.headline}
          lede={studio.lede}
        />

        <div className="mt-16 grid gap-14 sm:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Statement */}
          <Reveal className="lg:col-span-7">
            <p className="text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.4] tracking-[-0.02em] [font-family:var(--font-display)]">
              {studio.statement}
            </p>

            <ul className="mt-14 grid gap-px sm:grid-cols-2">
              {studio.principles.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.n}
                  delay={i * 90}
                  className="border-t pt-6 [border-color:var(--rule)] sm:odd:pr-8 sm:even:pl-8 sm:even:border-l"
                >
                  <span className="label tnum opacity-30">{p.n}</span>
                  <h3 className="mt-5 text-[1.15rem] font-medium leading-snug tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="body-copy mt-2.5 max-w-[38ch] opacity-55">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Plain facts, no inflation */}
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={120}>
            <div className="border-t pt-8 [border-color:var(--rule)]">
              <WordmarkStacked className="opacity-90" />

              <dl className="mt-10">
                {studio.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex flex-col gap-1 border-b py-4 [border-color:var(--rule)] first:border-t"
                  >
                    <dt className="label opacity-30">{f.k}</dt>
                    <dd className="text-[0.95rem] leading-relaxed opacity-70">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
