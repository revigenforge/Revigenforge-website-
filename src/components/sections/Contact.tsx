import { cta, contact } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';

/** Closing statement, a marquee of capabilities, one CTA. */
export function Contact() {
  return (
    <section id="contact" className="surface-ink section-y overflow-hidden">
      <div className="shell text-center">
        <Reveal y={10}>
          <span className="label dim">{cta.label}</span>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <h2 className="display-xl">{cta.headline}</h2>
        </Reveal>

        <Reveal delay={160} className="mt-8">
          <p className="lede mx-auto max-w-[46ch] dim">{cta.line}</p>
        </Reveal>

        <Reveal delay={240} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Pill href={contact.cta.href}>{contact.cta.label}</Pill>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`}
            className="dim inline-block py-2.5 text-[0.95rem] underline underline-offset-4 transition-colors hover:[color:var(--fg)]"
          >
            {contact.email}
          </a>
        </Reveal>
      </div>

      <div className="marquee mt-16 border-y py-4 [border-color:var(--rule)]">
        {[0, 1].map((copy) => (
          <div className="marquee-track" key={copy} aria-hidden={copy === 1}>
            {cta.marquee.map((item) => (
              <span key={item} className="display-md ghost flex shrink-0 items-center gap-8 pr-8">
                {item}
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full [background:var(--accent)]"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
