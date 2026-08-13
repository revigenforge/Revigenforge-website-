import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'light';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
};

const base =
  'group inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap px-7 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] font-display transition-colors duration-500';

/**
 * In a black-and-white system the only "colour" move available is
 * inversion, so that is what every button does on hover.
 */
const variants: Record<Variant, string> = {
  // Solid white block that inverts to black.
  primary: 'btn-fill bg-white text-black hover:text-white [--btn-fill:#000]',
  // Hairline outline on black that fills solid white.
  ghost: 'btn-fill border border-white/30 text-white hover:border-white hover:text-black [--btn-fill:#fff]',
  // For use on white surfaces.
  light: 'btn-fill border border-black/25 text-black hover:border-black hover:text-white [--btn-fill:#000]',
};

export function Button({ href, children, variant = 'primary', className = '', onClick }: ButtonProps) {
  return (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
    >
      <path d="M0 5h12M8.5 1 12.5 5l-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Understated text link with a sweeping underline. */
export function TextLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`link-sweep font-display text-[0.72rem] uppercase tracking-[0.2em] ${className}`}>
      {children}
    </a>
  );
}
