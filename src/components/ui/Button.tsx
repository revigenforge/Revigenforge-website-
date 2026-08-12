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
  'group inline-flex items-center justify-center gap-3 whitespace-nowrap px-7 py-4 text-[0.8rem] font-medium uppercase tracking-[0.16em] font-mono transition-colors duration-500';

const variants: Record<Variant, string> = {
  // Ember block that inverts to bone on hover.
  primary: 'btn-fill bg-ember text-white hover:text-ink [&::before]:bg-bone',
  // Hairline outline on dark, fills with ember on hover.
  ghost: 'btn-fill border border-bone/25 text-bone hover:border-ember hover:text-white',
  // For use on bone surfaces.
  light: 'btn-fill border border-ink/20 text-ink hover:border-ink hover:text-bone [&::before]:bg-ink',
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
    <a href={href} className={`link-sweep font-mono text-[0.72rem] uppercase tracking-[0.2em] ${className}`}>
      {children}
    </a>
  );
}
