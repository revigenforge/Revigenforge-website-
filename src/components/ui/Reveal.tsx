import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  /** Travel distance before settling. */
  y?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-reveal wrapper. The actual transition lives in CSS; this only
 * marks the element and sets its stagger, so nothing animates on the
 * main thread until the observer flips [data-revealed].
 */
export function Reveal({ children, delay = 0, y, as, className }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;

  return (
    <Tag
      data-reveal=""
      className={className}
      style={{
        '--reveal-delay': `${delay}ms`,
        ...(y !== undefined ? { '--reveal-y': `${y}px` } : {}),
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

type MaskLinesProps = {
  lines: ReadonlyArray<ReactNode>;
  className?: string;
  /** Delay before the first line, ms. */
  start?: number;
  /** Gap between lines, ms. */
  step?: number;
  /** Skip the observer and play immediately (hero on load). */
  immediate?: boolean;
};

/**
 * Display type that rises line-by-line out of a mask. Each line is its own
 * overflow-hidden box, which is what makes the type read as printed rather
 * than faded in.
 */
export function MaskLines({
  lines,
  className,
  start = 0,
  step = 90,
  immediate = false,
}: MaskLinesProps) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="line-mask"
          {...(immediate ? { 'data-revealed': 'true' } : { 'data-reveal': '' })}
          style={{ '--reveal-delay': `${start + i * step}ms` } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
