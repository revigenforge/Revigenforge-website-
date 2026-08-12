import type { ReactNode } from 'react';
import { MaskLines, Reveal } from './Reveal';

type SectionHeadProps = {
  index: string;
  label: string;
  lines: readonly string[];
  lede?: string;
  /** Renders to the right of the heading on wide screens. */
  aside?: ReactNode;
  className?: string;
};

/**
 * The editorial header used by every section: a mono index + label sitting
 * on a hairline, then display type rising out of a mask.
 */
export function SectionHead({ index, label, lines, lede, aside, className = '' }: SectionHeadProps) {
  return (
    <header className={className}>
      <Reveal className="flex items-baseline gap-4 border-t pt-4 [border-color:var(--rule)]" y={12}>
        <span className="label tnum opacity-45">{index}</span>
        <span className="label opacity-45">{label}</span>
      </Reveal>

      <div className="mt-10 grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-end">
        <h2 className="display-lg lg:col-span-8 lg:max-w-[22ch]">
          <MaskLines lines={lines} step={80} />
        </h2>

        {(lede || aside) && (
          <div className="lg:col-span-4 lg:pb-2">
            {lede && (
              <Reveal delay={120}>
                <p className="lede max-w-[46ch] opacity-65">{lede}</p>
              </Reveal>
            )}
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
