import { useRef, useState, type FormEvent } from 'react';
import { contact, cta } from '../../content/site';
import { MaskLines, Reveal } from '../ui/Reveal';

const EMPTY = { name: '', company: '', links: '', message: '' };

/**
 * Closing statement + enquiry form.
 *
 * The form composes a mailto: rather than posting to an endpoint. That is a
 * deliberate choice for launch — it works on a static host with no backend,
 * no third-party form service and no data stored anywhere. Swap the submit
 * handler for a fetch() when a real endpoint exists.
 */
export function CallToAction() {
  const [values, setValues] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  // Dispatching through a real anchor is more reliable than assigning
  // location.href for mailto: across browsers.
  const mailRef = useRef<HTMLAnchorElement>(null);

  const set = (key: keyof typeof EMPTY) => (event: { target: { value: string } }) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }));

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const body = [
      `Name: ${values.name}`,
      `Company / handle: ${values.company}`,
      `Links: ${values.links}`,
      '',
      "What's stalling:",
      values.message,
    ].join('\n');

    const anchor = mailRef.current;
    if (!anchor) return;

    anchor.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      contact.emailSubject,
    )}&body=${encodeURIComponent(body)}`;
    anchor.click();

    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden section-y">
      {/* Heat rising from the base of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-45%] -z-10 h-[110vmin] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-ember)_22%,transparent),transparent_62%)] blur-2xl"
      />

      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal className="flex items-baseline gap-4 border-t pt-4 [border-color:var(--rule)]" y={12}>
            <span className="label tnum opacity-45">{cta.index}</span>
            <span className="label opacity-45">{cta.label}</span>
          </Reveal>

          <h2 className="display-lg mt-10 max-w-[14ch]">
            <MaskLines
              lines={[
                ...cta.headline,
                <span key="accent" className="accent">
                  {cta.accentLine}
                </span>,
              ]}
              step={85}
            />
          </h2>

          <Reveal delay={140}>
            <p className="lede mt-9 max-w-[46ch] opacity-65">{cta.lede}</p>
          </Reveal>

          <Reveal delay={220}>
            <ul className="mt-10 flex flex-col gap-3">
              {cta.reassure.map((item) => (
                <li key={item} className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] opacity-55">
                  <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-ember" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <a
              href={`mailto:${contact.email}`}
              className="link-sweep mt-9 inline-block py-2 text-[1.05rem] tracking-[-0.01em] opacity-80 transition-opacity hover:opacity-100"
            >
              {contact.email}
            </a>
          </Reveal>
        </div>

        {/* Form ---------------------------------------------------- */}
        <Reveal className="lg:col-span-5 lg:col-start-8" delay={180}>
          <form onSubmit={onSubmit} className="flex flex-col gap-7">
            <Field id="rf-name" label={cta.form.fields.name} value={values.name} onChange={set('name')} required />
            <Field id="rf-company" label={cta.form.fields.company} value={values.company} onChange={set('company')} />
            <Field id="rf-links" label={cta.form.fields.links} value={values.links} onChange={set('links')} placeholder="Instagram, site, anything" />
            <Field
              id="rf-message"
              label={cta.form.fields.message}
              value={values.message}
              onChange={set('message')}
              textarea
              required
            />

            <button
              type="submit"
              className="btn-fill group mt-2 inline-flex items-center justify-between gap-4 border border-bone/25 px-7 py-5 font-mono text-[0.78rem] uppercase tracking-[0.16em] transition-colors duration-500 hover:border-ember hover:text-white"
            >
              {cta.form.submit}
              <svg width="15" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                <path d="M0 5h12M8.5 1 12.5 5l-4 4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            <p className="label leading-relaxed opacity-35" role="status">
              {sent ? 'Your mail app should be open — send it and we will reply.' : cta.form.hint}
            </p>

            <a ref={mailRef} href={`mailto:${contact.email}`} className="hidden" aria-hidden="true" tabIndex={-1}>
              {contact.email}
            </a>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
};

/** Underlined field — no boxes, no glass. The rule lights on focus. */
function Field({ id, label, value, onChange, textarea, required, placeholder }: FieldProps) {
  const shared =
    'peer w-full border-b bg-transparent pb-3 pt-2 text-[1.05rem] tracking-[-0.01em] outline-none transition-colors duration-500 [border-color:var(--rule)] placeholder:text-bone/25 focus:border-ember';

  return (
    <div className="group relative">
      <label htmlFor={id} className="label mb-3 block opacity-40 transition-opacity duration-300 group-focus-within:opacity-70">
        {label}
        {required && <span className="ml-1 text-ember">*</span>}
      </label>

      {textarea ? (
        <textarea id={id} value={value} onChange={onChange} required={required} rows={4} placeholder={placeholder} className={`${shared} resize-none`} />
      ) : (
        <input id={id} type="text" value={value} onChange={onChange} required={required} placeholder={placeholder} className={shared} />
      )}
    </div>
  );
}
