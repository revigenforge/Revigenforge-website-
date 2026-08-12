import { contact, footer } from '../../content/site';
import { Reveal } from '../ui/Reveal';
import { WordmarkStacked } from '../visuals/ForgeMark';

export function Footer() {
  return (
    <footer className="relative border-t [border-color:var(--rule)]">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            {/* The logo presented as it is drawn: stacked, two lines. */}
            <WordmarkStacked />

            <p className="body-copy mt-8 max-w-[34ch] opacity-55">{footer.statement}</p>
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-7" delay={80}>
            <p className="label mb-6 opacity-35">Studio</p>
            <ul className="flex flex-col gap-1">
              {footer.columns[0].links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-sweep inline-block py-2 text-[0.95rem] opacity-70 transition-opacity hover:opacity-100">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-10" delay={140}>
            <p className="label mb-6 opacity-35">Elsewhere</p>
            <ul className="flex flex-col gap-1">
              {contact.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-sweep inline-block py-2 text-[0.95rem] opacity-70 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a href={`mailto:${contact.email}`} className="link-sweep inline-block py-2 text-[0.95rem] opacity-70 transition-opacity hover:opacity-100">
                  {contact.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t pt-7 [border-color:var(--rule)] sm:flex-row sm:items-center sm:justify-between">
          <p className="label opacity-30">{footer.legal}</p>
          <a href="#top" className="link-sweep label -my-2 inline-block py-2.5 opacity-40 transition-opacity hover:opacity-80">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
