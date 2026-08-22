import { useId, useState } from 'react';
import { faq, work } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { Frame } from '../ui/Frame';

/**
 * Closed by default, which is the whole trick: the objection-handling the
 * conversion playbook demands lives here, costing no visible words until a
 * sceptical visitor goes looking for it.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="surface-cream pb-[var(--section-y)]">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{faq.label}</span>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <h2 className="display-lg max-w-[14ch]">{faq.headline}</h2>
            </Reveal>

            <div className="mt-10">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                const panelId = `${baseId}-${i}`;
                return (
                  <Reveal key={item.q} delay={i * 60} y={12}>
                    <div className={`border-t [border-color:var(--rule)] ${isOpen ? 'acc-open' : ''}`}>
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="flex w-full items-center gap-5 py-5 text-left"
                        >
                          <span className="flex-1 text-[0.98rem] font-medium leading-snug">
                            {item.q}
                          </span>
                          <span className="acc-icon dim shrink-0" aria-hidden="true">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" />
                            </svg>
                          </span>
                        </button>
                      </h3>

                      <div className="acc-panel" data-open={isOpen} id={panelId}>
                        <div>
                          <p className="body-copy dim max-w-[52ch] pb-6">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              <div className="border-t [border-color:var(--rule)]" />
            </div>
          </div>

          <Reveal className="lg:col-span-5" delay={140}>
            <Frame
              src={work.art.stack}
              alt="Revigen Forge"
              label="FAQ still"
              className="aspect-[4/5] rounded-2xl lg:sticky lg:top-28"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
