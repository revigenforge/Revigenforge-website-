import { useEffect, useState } from 'react';
import { nav } from '../../content/site';
import { Wordmark } from '../visuals/ForgeMark';

/**
 * Fixed header. Two behaviours worth noting:
 *  - it condenses once you leave the hero
 *  - it inverts to ink type over the light (bone) sections, tracked by an
 *    observer on [data-surface="light"] so the wordmark never disappears
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-surface="light"]'));
    if (!sections.length) return;

    // The header band sits at ~72px; invert whenever a bone section crosses it.
    const BAND = 72;
    let ticking = false;

    const check = () => {
      ticking = false;
      setOnLight(
        sections.some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= BAND && r.bottom >= BAND;
        }),
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const tone = onLight && !open ? 'text-ink' : 'text-bone';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${tone} ${
          scrolled && !open
            ? `py-3 backdrop-blur-md ${onLight ? 'bg-bone/70 border-b border-ink/10' : 'bg-ink/70 border-b border-bone/10'}`
            : 'py-6 border-b border-transparent'
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Wordmark className="relative z-50" />

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-sweep font-display text-[0.68rem] uppercase tracking-[0.18em] opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={nav.cta.href}
              className={`btn-fill hidden whitespace-nowrap border px-5 py-3 font-display text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-500 sm:inline-flex ${
                onLight
                  ? 'border-black/25 hover:border-black hover:text-white [--btn-fill:#000]'
                  : 'border-white/30 hover:border-white hover:text-black [--btn-fill:#fff]'
              }`}
            >
              {nav.cta.label}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-50 -mr-1 flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        data-drawer=""
        data-open={open}
        className={`fixed inset-0 z-40 bg-ink transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pb-12 pt-32">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display-md border-t py-6 transition-[opacity,padding] duration-500 [border-color:var(--rule)] hover:pl-3 hover:opacity-60"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                  transform: open ? 'translateY(0)' : 'translateY(14px)',
                  opacity: open ? 1 : 0,
                  transitionProperty: 'transform, opacity, color, padding',
                }}
              >
                <span className="label mr-4 align-middle opacity-35 tnum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center bg-white px-7 py-5 font-display text-[0.78rem] uppercase tracking-[0.16em] text-black"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </>
  );
}
