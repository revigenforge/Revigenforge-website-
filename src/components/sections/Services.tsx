import { useId, useState } from 'react';
import { services, work } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { Frame } from '../ui/Frame';

/**
 * Accordion, closed by default apart from the first row. This is how the
 * page stays near-wordless while still answering "what do you actually
 * do" — one line visible, the detail one tap away.
 */
export function Services() {
  const [open, setOpen] = useState<string | null>(services.items[0].n);
  const baseId = useId();

  return (
    <section id="services" className="surface-cream section-y">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{services.label}</span>
        </Reveal>

        <Reveal delay={80} className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
          <h2 className="display-lg">{services.headline}</h2>
          <p className="body-copy dim mb-1 max-w-[26ch]">{services.aside}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            {services.items.map((item, i) => {
              const isOpen = open === item.n;
              const panelId = `${baseId}-${item.n}`;
              return (
                <Reveal key={item.n} delay={i * 60} y={12}>
                  <div className={`border-t [border-color:var(--rule)] ${isOpen ? 'acc-open' : ''}`}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : item.n)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full items-center gap-5 py-5 text-left"
                      >
                        <span className="label dim tnum shrink-0">{item.n}</span>
                        <span className="display-md flex-1">{item.title}</span>
                        <span className="acc-icon dim shrink-0" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <div className="acc-panel" data-open={isOpen} id={panelId}>
                      <div>
                        <div className="pb-6 pl-[calc(2ch+1.25rem)]">
                          <p className="lede max-w-[34ch]">{item.line}</p>
                          <p className="body-copy dim mt-3 max-w-[46ch]">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <div className="border-t [border-color:var(--rule)]" />
          </div>

          <Reveal className="lg:col-span-5" delay={160}>
            <Frame
              src={work.pieces[1]?.src}
              alt={work.pieces[1]?.alt ?? 'Studio work'}
              label="Services still"
              className="aspect-[4/5] rounded-2xl lg:sticky lg:top-28"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
