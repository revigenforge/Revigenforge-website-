import { useId, useState } from 'react';
import { services } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';

export function Services() {
  // The first row opens by default so the section never reads as a dead list.
  const [open, setOpen] = useState<string | null>(services.items[0].n);
  const baseId = useId();

  return (
    <section id="services" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={services.index}
          label={services.label}
          lines={services.headline}
          lede={services.lede}
        />

        <div className="mt-20 border-t [border-color:var(--rule)] sm:mt-24">
          {services.items.map((service, i) => {
            const isOpen = open === service.n;
            const panelId = `${baseId}-panel-${service.n}`;

            return (
              <Reveal key={service.n} delay={i * 70} y={14}>
                <article
                  className={`row-hover border-b [border-color:var(--rule)] ${
                    isOpen ? 'row-open' : ''
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : service.n)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-start gap-5 py-7 text-left sm:items-center sm:gap-8 md:py-9"
                    >
                      <span
                        className={`label tnum mt-1.5 shrink-0 transition-colors duration-500 sm:mt-0 ${
                          isOpen ? 'opacity-100' : 'opacity-35'
                        }`}
                      >
                        {service.n}
                      </span>

                      <span className="flex-1">
                        <span
                          className="display-md block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                        >
                          {service.title}
                        </span>

                        {/* Below lg the panel hides its summary column, so the
                            summary rides in the header instead. */}
                        <span className="body-copy mt-2 block max-w-[52ch] opacity-50 lg:hidden">
                          {service.summary}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="row-arrow mt-2 shrink-0 sm:mt-0"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div className="row-panel" data-open={isOpen} id={panelId}>
                    <div>
                      <div className="grid gap-x-10 gap-y-8 pb-11 sm:pl-[calc(2ch+2rem)] lg:grid-cols-12">
                        <p className="lede hidden max-w-[30ch] lg:col-span-4 lg:block">
                          {service.summary}
                        </p>

                        <dl className="grid gap-7 lg:col-span-5 sm:grid-cols-1">
                          <Detail term="Who it is for" desc={service.who} />
                          <Detail term="The problem" desc={service.problem} />
                          <Detail term="Why it matters" desc={service.matters} />
                        </dl>

                        <div className="lg:col-span-3">
                          <p className="label mb-4 opacity-35">Includes</p>
                          <ul className="flex flex-wrap gap-2">
                            {service.includes.map((item) => (
                              <li
                                key={item}
                                className="border px-3 py-1.5 font-display text-[0.64rem] uppercase tracking-[0.12em] opacity-70 [border-color:var(--rule)]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Detail({ term, desc }: { term: string; desc: string }) {
  return (
    <div>
      <dt className="label mb-2 opacity-35">{term}</dt>
      <dd className="body-copy max-w-[52ch] opacity-70">{desc}</dd>
    </div>
  );
}
