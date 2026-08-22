import { brand } from '../../content/site';

/** The logo, as live text so it stays crisp and flips with the surface. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`wordmark inline-block ${className}`} aria-label={`${brand.name} — top`}>
      {brand.name}
    </a>
  );
}

/** Oversized lockup for the hero and footer, stacked like the logo file. */
export function WordmarkGiant({ className = '' }: { className?: string }) {
  return (
    <p
      className={`select-none [font-family:var(--font-display)] uppercase leading-[0.82] tracking-[-0.02em] ${className}`}
      style={{ fontSize: 'clamp(2.25rem, 8.4vw, 7.5rem)' }}
      aria-hidden="true"
    >
      Revigen Forge
    </p>
  );
}
