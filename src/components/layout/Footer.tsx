import { contact, footer, nav } from '../../content/site';
import { Reveal } from '../ui/Reveal';

/**
 * Blue block with the email set enormous and the wordmark bleeding off the
 * right edge — the reference's closing gesture. The overflow is the point,
 * so the section clips rather than scrolls.
 */
export function Footer() {
  return (
    <footer className="surface-ink overflow-hidden pt-[var(--section-y)]">
      <div className="shell">
        <Reveal y={10}>
          <p className="label dim">{footer.prompt}</p>
        </Reveal>

        <Reveal delay={80} className="mt-4">
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`}
            className="display-lg -my-1 inline-block break-all py-1 transition-opacity duration-300 hover:opacity-70"
          >
            {contact.email}
          </a>
        </Reveal>

        <div className="mt-14 flex flex-wrap justify-between gap-10">
          <Reveal delay={140}>
            <ul className="flex flex-col">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="dim inline-block py-2.5 text-[0.9rem] transition-colors hover:[color:var(--fg)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="text-right">
            <p className="label dim">Elsewhere</p>
            <ul className="mt-1 flex flex-col">
              {contact.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="dim inline-block py-2.5 text-[0.9rem] transition-colors hover:[color:var(--fg)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Wordmark runs off the edge on purpose */}
      <p className="display-xl mt-12 whitespace-nowrap px-[var(--gutter)] leading-[0.78] opacity-95" aria-hidden="true">
        Revigen Forge
      </p>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t py-5 [border-color:var(--rule)]">
        <p className="label dim">{footer.legal}</p>
        <a href="#top" className="label dim -my-2.5 inline-block py-2.5 transition-colors hover:[color:var(--fg)]">
          Back to top
        </a>
      </div>
    </footer>
  );
}
