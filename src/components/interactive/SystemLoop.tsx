import { useMemo, useState, type ReactNode } from 'react';
import { system } from '../../content/site';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

const R = 33;

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * radius, y: 50 + Math.sin(a) * radius };
}

function anchorFor(cos: number) {
  if (cos > 0.35) return 'translate(0, -50%)';
  if (cos < -0.35) return 'translate(-100%, -50%)';
  return 'translate(-50%, -50%)';
}

/**
 * The studio as a closed loop rather than a funnel — conversion feeds the
 * next idea, so the diagram has to come back round.
 *
 * Selecting a stage lights the edge that feeds it and the edge it feeds,
 * which is the actual claim of the section: these stages are not
 * independent, and a weak one starves the next.
 */
export function SystemLoop({ header }: { header?: ReactNode }) {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  const n = system.stages.length;
  const nodes = useMemo(
    () =>
      system.stages.map((s, i) => {
        const angle = -90 + (360 / n) * i;
        return { ...s, angle, ...polar(angle, R) };
      }),
    [n],
  );

  const stage = system.stages[active];
  const prev = (active - 1 + n) % n;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
      {/* Diagram first on desktop, so the eye lands on the loop */}
      <div className="order-1 lg:col-span-7">
        {!isDesktop && <div className="mb-12">{header}</div>}
        {isDesktop ? (
          <div
            className="relative mx-auto aspect-square w-full"
            style={{ maxWidth: 'min(38rem, 60vh)' }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true" fill="none">
              <circle cx="50" cy="50" r={R} className="edge" strokeOpacity="0.12" />

              {/* Arc segments between consecutive stages */}
              {nodes.map((node, i) => {
                const next = nodes[(i + 1) % n];
                const isIncoming = (i + 1) % n === active;
                const isOutgoing = i === active;
                const live = isIncoming || isOutgoing;
                return (
                  <path
                    key={`edge-${node.id}`}
                    d={`M ${node.x} ${node.y} A ${R} ${R} 0 0 1 ${next.x} ${next.y}`}
                    className="edge"
                    data-live={live}
                    data-muted={!live}
                    strokeWidth={live ? 1.4 : 1}
                  />
                );
              })}

              {/* A single mote circling the loop: the system is running */}
              {!reduced && (
                <circle r="0.9" fill="var(--color-accent-soft)">
                  <animateMotion
                    dur="14s"
                    repeatCount="indefinite"
                    path={`M ${50 + R} 50 A ${R} ${R} 0 1 1 ${50 - R} 50 A ${R} ${R} 0 1 1 ${50 + R} 50`}
                  />
                </circle>
              )}
            </svg>

            {nodes.map((node, i) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={i === active}
                className="node map-node"
                data-live={i === active}
                data-muted={i !== active && i !== prev}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: anchorFor(Math.cos((node.angle * Math.PI) / 180)),
                }}
              >
                <span className="node-dot" />
                {node.label}
              </button>
            ))}

            {/* Centre caption */}
            <p className="pointer-events-none absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="label block opacity-30">The loop</span>
              <span className="label mt-2 block opacity-20">Closes on itself</span>
            </p>
          </div>
        ) : (
          /* Mobile: the loop unrolls into a list that visibly returns */
          <ol className="relative border-l pl-6 [border-color:var(--rule)]">
            {system.stages.map((s, i) => {
              const live = i === active;
              return (
                <li key={s.id} className="relative pb-3">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[27px] top-4 h-2 w-2 rounded-full transition-all duration-500"
                    style={{
                      background: live ? 'var(--color-accent)' : 'rgb(255 255 255 / 0.3)',
                      boxShadow: live ? '0 0 12px var(--color-accent)' : 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={live}
                    className="w-full py-2 text-left"
                  >
                    <span
                      className="display-md transition-opacity duration-500"
                      style={{ opacity: live ? 1 : 0.4 }}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
            <li className="label pt-2 opacity-30">↺ back to idea</li>
          </ol>
        )}
      </div>

      {/* Heading + readout share the column */}
      <div className="order-2 lg:col-span-4 lg:col-start-9">
        {isDesktop && header}

        <div
          key={stage.id}
          className="readout mt-8 border-t pt-6 [border-color:var(--rule)] lg:mt-12 lg:min-h-[19rem]"
          aria-live="polite"
        >
          <h3 className="display-md">{stage.label}</h3>
          <p className="body-copy mt-4 max-w-[40ch] opacity-60">{stage.body}</p>

          <dl className="mt-8 space-y-5 border-t pt-6 [border-color:var(--rule)]">
            <Row term="Takes in" desc={stage.takes} />
            <Row term="Hands on" desc={stage.gives} />
            <Row term="Breaks as" desc={stage.breaks} accent />
          </dl>
        </div>

        <p className="label mt-8 opacity-25">{system.hint}</p>
      </div>
    </div>
  );
}

function Row({ term, desc, accent }: { term: string; desc: string; accent?: boolean }) {
  return (
    <div>
      <dt className="label mb-1.5 opacity-35" style={accent ? { color: 'var(--color-accent)' } : undefined}>
        {term}
      </dt>
      <dd className="text-[0.95rem] leading-relaxed opacity-70">{desc}</dd>
    </div>
  );
}
