import { useEffect, useState } from 'react';
import { nav, contact } from '../../content/site';
import { Wordmark } from '../visuals/ForgeMark';
import { Pill } from '../ui/Pill';

/**
 * Floating capsule nav, as in the reference. It rides over three different
 * surface colours, so rather than trying to invert per section it carries
 * its own ink background — always legible, never fighting the block behind.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="shell flex items-center justify-between gap-4">
          <Wordmark className="relative z-50 text-[0.95rem] text-cream" />

          <nav
            aria-label="Primary"
            className="pointer-events-auto hidden items-center gap-1 rounded-full bg-ink/80 p-1.5 backdrop-blur-md md:flex"
          >
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[0.78rem] text-cream/70 transition-colors duration-300 hover:bg-cream/10 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
            <a
              href={contact.cta.href}
              className="rounded-full px-4 py-2 text-[0.78rem] text-white transition-colors duration-300"
              style={{ background: 'var(--color-blue)' }}
            >
              {contact.cta.label}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-cream backdrop-blur-md md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-400 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-400 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        data-drawer=""
        data-open={open}
        className={`surface-ink fixed inset-0 z-40 transition-[opacity,visibility] duration-400 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pb-12 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-md border-b py-5 [border-color:var(--rule)]"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'none' : 'translateY(12px)',
                  transition: `opacity .4s ${80 + i * 50}ms, transform .4s ${80 + i * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Pill href={contact.cta.href} className="justify-between" onClick={() => setOpen(false)}>
            {contact.cta.label}
          </Pill>
        </div>
      </div>
    </>
  );
}
