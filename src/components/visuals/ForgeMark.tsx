import { brand } from '../../content/site';

/**
 * The logo is a wordmark — geometric sans, two words, no symbol. It is set
 * as live text rather than an image so it stays crisp at every size and
 * inherits the surface colour when the page flips between black and white.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`group -my-2.5 inline-flex items-center py-2.5 ${className}`}
      aria-label={`${brand.name} — back to top`}
    >
      <span className="whitespace-nowrap text-[0.95rem] font-medium leading-none tracking-[-0.03em] [font-family:var(--font-display)]">
        {brand.name}
      </span>
    </a>
  );
}

/**
 * Stacked lockup, matching the logo's two-line arrangement. Used where the
 * mark has room to be presented properly rather than sat in a nav bar.
 */
export function WordmarkStacked({ className = '' }: { className?: string }) {
  return (
    <p
      className={`text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.04em] [font-family:var(--font-display)] ${className}`}
    >
      Revigen
      <br />
      Forge
    </p>
  );
}
