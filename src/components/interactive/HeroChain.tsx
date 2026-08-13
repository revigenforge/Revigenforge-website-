import { useEffect, useRef, useState } from 'react';
import { hero } from '../../content/site';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * The chain that opens the site: attention → content → positioning →
 * distribution → conversion.
 *
 * It is the first thing the visitor touches, so it also teaches the
 * vocabulary every later diagram uses — a node is a pill, blue means live,
 * and selecting something writes into a readout. Learn it here and The
 * Forge needs no instructions.
 *
 * Vertical rather than horizontal: it sits in the hero's right column,
 * which keeps it above the fold without shrinking the headline, and a
 * downward chain reads as a sequence more obviously than a row of pills.
 *
 * Left alone it advances on its own so the idea still lands for someone
 * who never interacts. The moment a visitor takes over, it stops.
 */
export function HeroChain() {
  const [active, setActive] = useState(0);
  const [taken, setTaken] = useState(false);
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (taken || reduced) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % hero.chain.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [taken, reduced]);

  const take = (i: number) => {
    setTaken(true);
    setActive(i);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + hero.chain.length) % hero.chain.length;
    take(next);
    listRef.current?.querySelectorAll('button')[next]?.focus();
  };

  const current = hero.chain[active];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between gap-6 border-t pt-4 [border-color:var(--rule)]">
        <span className="label opacity-40">{hero.chainLabel}</span>
        <span className="label opacity-25">{hero.chainHint}</span>
      </div>

      <ul ref={listRef} onKeyDown={onKeyDown} className="mt-6 flex flex-col items-start">
        {hero.chain.map((link, i) => (
          <li key={link.id} className="flex flex-col items-start">
            <button
              type="button"
              onClick={() => take(i)}
              onMouseEnter={() => take(i)}
              onFocus={() => take(i)}
              aria-pressed={i === active}
              className="node"
              data-live={i === active}
              data-muted={i !== active}
            >
              <span className="node-dot" />
              {link.label}
            </button>

            {i < hero.chain.length - 1 && (
              <span
                aria-hidden="true"
                className="ml-[1.1rem] h-4 w-px transition-colors duration-500"
                style={{
                  background: i < active ? 'var(--color-accent)' : 'rgb(255 255 255 / 0.2)',
                }}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Readout — one live line, so the chain explains rather than decorates */}
      <div className="mt-7 min-h-[7rem] border-t pt-5 [border-color:var(--rule)]">
        <p key={current.id} className="readout">
          <span className="block text-[1.02rem] leading-snug tracking-[-0.01em] text-white">
            {current.line}
          </span>
          <span className="body-copy mt-2 block max-w-[38ch] text-white/50">{current.body}</span>
        </p>
      </div>
    </div>
  );
}
