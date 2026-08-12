import { brand } from '../../content/site';

/**
 * The mark: a forged ingot seen face-on, with a molten core.
 * Geometric enough to survive a 16px favicon.
 */
export function ForgeMark({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 1.5 30.5 16 16 30.5 1.5 16 16 1.5Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M16 9.5 22.5 16 16 22.5 9.5 16 16 9.5Z" fill="var(--color-ember)" />
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`group -my-2 inline-flex items-center gap-2.5 py-2 ${className}`}
      aria-label={`${brand.name} — back to top`}
    >
      <ForgeMark className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90" />
      <span className="whitespace-nowrap text-[0.78rem] font-medium uppercase leading-none tracking-[0.16em]">
        {brand.name}
      </span>
    </a>
  );
}
