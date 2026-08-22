import { about, contact } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';

/**
 * The blue block. Statement type where the opening clause is solid and the
 * rest steps back, then three cards where the reference puts its stats —
 * ours carry the spine of the offer instead of numbers we do not have.
 */
export function About() {
  return (
    <section id="about" className="surface-blue section-y">
      <div className="shell">
        <Reveal y={10}>
          <span className="label opacity-70">{about.label}</span>
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
              key={card.n}
              delay={140 + i * 90}
              className="flex flex-col justify-between rounded-2xl bg-ink p-6 text-cream sm:min-h-[13rem]"
            >
              <span className="label tnum opacity-45">{card.n}</span>
              <div className="mt-10">
                <h3 className="display-md">{card.title}</h3>
                <p className="body-copy mt-2 opacity-60">{card.body}</p>
              </div>
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
