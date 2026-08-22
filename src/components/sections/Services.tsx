import { useId, useState } from 'react';
import { services } from '../../content/site';
import { Reveal } from '../ui/Reveal';

/**
 * Accordion, closed by default apart from the first row. This is how the
 * page stays near-wordless while still answering "what do you actually
 * do" — one line visible, the detail one tap away.
 *
 * Full width, as in the reference. A sticky poster plate used to sit in a
 * right-hand column; it was the studio's own name at large size for the
 * fourth time on the page, cropped mid-word, and it was the highest-
 * contrast thing in a section that is supposed to be about the client.
 * Removing it also lets the row titles run edge to edge with the toggle
 * pinned to the far margin, which is the treatment the reference uses.
 *
 * The rows are not numbered. This is a menu, not a sequence — see the
 * numbering rule in `site.ts`.
 */
export function Services() {
  const [open, setOpen] = useState<string | null>(services.items[0].title);
  const baseId = useId();

  return (
    <section id="services" className="surface-cream section-y">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{services.label}</span>
        </Reveal>

        {/* Headline left, gloss right — the aside used to trail the headline
            on the same baseline, where two wrapped lines against 96px type
            read as an accident rather than a pairing. */}
        <Reveal delay={80} className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="display-lg">{services.headline}</h2>
          <p className="body-copy dim mb-1.5 max-w-[24ch]">{services.aside}</p>
        </Reveal>

        <div className="mt-12">
          {services.items.map((item, i) => {
            const isOpen = open === item.title;
            const panelId = `${baseId}-${i}`;
            return (
              <Reveal key={item.title} delay={i * 60} y={12}>
                <div className={`border-t [border-color:var(--rule)] ${isOpen ? 'acc-open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.title)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center gap-5 py-5 text-left"
                    >
                      <span className="display-md flex-1">{item.title}</span>
                      <span className="acc-icon dim shrink-0" aria-hidden="true">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.4" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  {/* Promise left, mechanism right. Stacked, these two lines
                      stranded a full-width row; paired, the row reads as a
                      claim and its justification. */}
                  <div className="acc-panel" data-open={isOpen} id={panelId}>
                    <div>
                      <div className="grid gap-x-10 gap-y-3 pb-7 md:grid-cols-2 md:pr-10">
                        <p className="lede max-w-[30ch]">{item.line}</p>
                        <p className="body-copy dim max-w-[46ch]">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t [border-color:var(--rule)]" />
        </div>
      </div>
    </section>
  );
}
