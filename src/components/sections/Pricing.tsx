import { pricing, contact } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';

/**
 * The reference's pricing cards, without prices. Scope is set on the call,
 * so the cards carry shape and inclusions and the note does the rest —
 * inventing a number here would be the one dishonest thing on the page.
 */
export function Pricing() {
  return (
    <section id="pricing" className="surface-cream section-y">
      <div className="shell">
        <Reveal y={10} className="text-center">
          <span className="label dim">{pricing.label}</span>
          <h2 className="display-lg mt-5">{pricing.headline}</h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <Reveal
              as="article"
              key={tier.name}
              delay={i * 100}
              /* The surface utility, not bare bg/text classes — the card
                 has to re-declare the tone scale or its children keep
                 resolving `dim` against the section behind them. */
              className={`flex flex-col rounded-3xl p-7 sm:p-9 ${
                tier.featured ? 'surface-ink' : 'surface-paper'
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="label dim">{tier.shape}</span>
                {tier.featured && <span className="label accent">Most common</span>}
              </div>

              <h3 className="display-md mt-9">{tier.name}</h3>
              <p className="body-copy dim mt-2">{tier.pitch}</p>

              <ul className="mt-8 flex-1 space-y-3 border-t pt-7 [border-color:var(--rule)]">
                {tier.includes.map((inc) => (
                  <li key={inc} className="flex gap-3 text-[0.92rem] leading-snug">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full [background:var(--accent-fill)]"
                    />
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Pill href={contact.cta.href} tone={tier.featured ? 'light' : 'dark'}>
                  {contact.cta.label}
                </Pill>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <p className="body-copy dim mx-auto mt-10 max-w-[52ch] text-center">{pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
