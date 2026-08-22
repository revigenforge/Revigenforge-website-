import type { ReactNode } from 'react';

/**
 * The reference has exactly one button shape: a rounded pill with a filled
 * circular arrow. Using only this keeps the page quiet — every call to
 * action looks identical, so the eye stops re-evaluating them.
 */
export function Pill({
  href,
  children,
  tone = 'light',
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}) {
  const tones = {
    light: 'bg-cream text-ink hover:bg-white',
    dark: 'bg-ink text-cream hover:bg-black',
  };

  return (
    <a href={href} onClick={onClick} className={`pill ${tones[tone]} ${className}`}>
      <span>{children}</span>
      <span className="pill-arrow" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </a>
  );
}
