import { useState } from 'react';
import { approach } from '../../content/site';

/**
 * The approach, as a sequence you walk rather than a list you read.
 *
 * Deliberately vertical where the hero chain is horizontal and The Forge
 * is radial — the shape carries the meaning. The spine fills with accent
 * from the top down to the stage you are on, so "the order matters" is
 * something the visitor sees before they read the sentence saying so.
 */
export function StageFlow() {
  const [active, setActive] = useState(0);
  const stage = approach.stages[active];
  const progress = ((active + 0.5) / approach.stages.length) * 100;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* The spine */}
      <ol className="relative lg:col-span-5">
        {/* Track + fill: the fill is the sequence made visible */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-0 w-px bg-white/12"
        />
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-0 w-px transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            height: `${progress}%`,
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
        />

        {approach.stages.map((s, i) => {
          const live = i === active;
          const passed = i < active;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={live}
                aria-controls="approach-readout"
                className="stage group flex w-full items-start gap-5 py-4 text-left lg:py-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-[15px] w-[15px] shrink-0 rounded-full border transition-all duration-500"
                  style={{
                    borderColor: live || passed ? 'var(--color-accent)' : 'rgb(255 255 255 / 0.25)',
                    background: live ? 'var(--color-accent)' : 'var(--color-ink)',
                    boxShadow: live ? '0 0 16px var(--color-accent)' : 'none',
                  }}
                />

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-3">
                    <span className="label tnum opacity-35">{s.n}</span>
                    <span
                      className="display-md transition-opacity duration-500"
                      style={{ opacity: live ? 1 : 0.45 }}
                    >
                      {s.label}
                    </span>
                  </span>
                  <span
                    className="body-copy mt-1 block transition-opacity duration-500"
                    style={{ opacity: live ? 0.6 : 0.28 }}
                  >
                    {s.line}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Readout */}
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="lg:sticky lg:top-32">
          <div
            id="approach-readout"
            key={stage.id}
            className="readout border-t pt-7 [border-color:var(--rule)]"
            aria-live="polite"
          >
            <div className="flex items-baseline gap-3">
              <span className="label tnum" style={{ color: 'var(--color-accent)' }}>
                {stage.n}
              </span>
              <h3 className="display-md">{stage.label}</h3>
            </div>

            <p className="lede mt-5 max-w-[46ch] opacity-70">{stage.body}</p>

            <ul className="mt-8 space-y-3 border-t pt-6 [border-color:var(--rule)]">
              {stage.points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed opacity-65">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rotate-45"
                    style={{ background: 'var(--color-accent)' }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
