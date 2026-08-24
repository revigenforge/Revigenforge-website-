import { about, contact } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';

/**
 * Statement type where the opening clause is solid and the
 * rest steps back, then three cards where the reference puts its stats —
 * ours carry the spine of the offer instead of numbers we do not have.
 */
export function About() {
  return (
    <section id="about" className="surface-cream section-y">
      <div className="shell">
        <Reveal y={10}>
          <span className="label dim">{about.label}</span>
        </Reveal>

        <Reveal delay={80} className="mt-8">
          <h2 className="display-lg max-w-[18ch] sm:max-w-[22ch]">
            {about.lead} <span className="dim">{about.rest}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {about.cards.map((card, i) => (
            <Reveal
              as="li"
              key={card.title}
              delay={140 + i * 90}
              /* surface-ink, not bg-ink — the card inverts, so it has to
                 re-declare the tone scale for the `dim` children inside. */
              className="surface-ink flex flex-col justify-end rounded-2xl p-6 sm:min-h-[13rem]"
            >
              <h3 className="display-md">{card.title}</h3>
              <p className="body-copy dim mt-2">{card.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={380} className="mt-12">
          <Pill href={contact.cta.href}>{contact.cta.label}</Pill>
        </Reveal>
      </div>
    </section>
  );
}
