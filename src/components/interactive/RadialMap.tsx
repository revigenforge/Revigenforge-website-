import { useMemo, useState, type ReactNode } from 'react';
import type { MindNode } from '../../content/site';
import { useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery';

type Centre = { id: string; label: string; summary: string };

type RadialMapProps = {
  centre: Centre;
  branches: readonly MindNode[];
  hint?: string;
  /** Section heading, rendered above the readout in the left column so the
      diagram and its explanation share one screen instead of stacking. */
  header?: ReactNode;
};

/** Polar → cartesian in a 0–100 square, measured from the centre. */
function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * radius, y: 50 + Math.sin(a) * radius };
}

/**
 * Anchor a label pill so it grows away from the centre instead of across
 * it. Without this the pills on the left and right extremes push past the
 * container edge and cause horizontal overflow.
 */
function anchorFor(cos: number) {
  if (cos > 0.3) return 'translate(0, -50%)';
  if (cos < -0.3) return 'translate(-100%, -50%)';
  return 'translate(-50%, -50%)';
}

const R_BRANCH = 27;
const R_CHILD = 40;
/* Alternate children in and out. Two long labels at neighbouring angles
   (e.g. "Campaigns" / "Creative direction") overlap at a single radius,
   and staggering separates them without widening the fan so far that the
   branch stops reading as one group. */
const R_CHILD_STEP = 8;

export function RadialMap({ centre, branches, hint, header }: RadialMapProps) {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  const [openId, setOpenId] = useState<string | null>(branches[0]?.id ?? null);
  const [readId, setReadId] = useState<string>(branches[0]?.id ?? centre.id);

  /* Geometry is pure and only depends on which branch is open. */
  const layout = useMemo(() => {
    return branches.map((branch, i) => {
      const angle = -90 + (360 / branches.length) * i;
      const pos = polar(angle, R_BRANCH);
      const kids = branch.children ?? [];
      // Fan children through an arc centred on their parent's angle.
      const span = Math.min(23 * (kids.length - 1), 72);
      const children = kids.map((child, k) => {
        const a = kids.length === 1 ? angle : angle - span / 2 + (span / (kids.length - 1)) * k;
        const r = R_CHILD + (k % 2) * R_CHILD_STEP;
        return { ...child, angle: a, radius: r, ...polar(a, r) };
      });
      return { ...branch, angle, ...pos, childNodes: children };
    });
  }, [branches]);

  /* Whatever is selected supplies the readout. */
  const reading = useMemo(() => {
    if (readId === centre.id) return { label: centre.label, summary: centre.summary, trail: [] as string[] };
    for (const b of layout) {
      if (b.id === readId) return { label: b.label, summary: b.summary, trail: [centre.label] };
      const child = b.childNodes.find((c) => c.id === readId);
      if (child) return { label: child.label, summary: child.summary, trail: [centre.label, b.label] };
    }
    return { label: centre.label, summary: centre.summary, trail: [] as string[] };
  }, [readId, layout, centre]);

  const openBranch = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    setReadId(id);
  };

  /* ── Mobile: a vertical expandable tree, not a shrunken diagram ───── */
  if (!isDesktop) {
    return (
      <div className="w-full">
        {header}

        <button
          type="button"
          onClick={() => {
            setOpenId(null);
            setReadId(centre.id);
          }}
          className="node mt-12 w-full justify-center"
          data-live={readId === centre.id}
        >
          <span className="node-dot" />
          {centre.label}
        </button>

        <ul className="mt-3 border-t [border-color:var(--rule)]">
          {layout.map((branch) => {
            const isOpen = openId === branch.id;
            return (
              <li key={branch.id} className="border-b [border-color:var(--rule)]">
                <button
                  type="button"
                  data-branch=""
                  onClick={() => openBranch(branch.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                      style={{
                        background: readId === branch.id ? 'var(--color-accent)' : 'currentColor',
                        opacity: readId === branch.id ? 1 : 0.35,
                      }}
                    />
                    <span className="display-md">{branch.label}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="row-arrow shrink-0 opacity-50"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </button>

                <div className="row-panel" data-open={isOpen}>
                  <div>
                    <p className="body-copy max-w-[46ch] pb-5 opacity-60">{branch.summary}</p>
                    <ul className="space-y-2 pb-6">
                      {branch.childNodes.map((child) => {
                        const live = readId === child.id;
                        return (
                          <li key={child.id}>
                            <button
                              type="button"
                              onClick={() => setReadId(live ? branch.id : child.id)}
                              aria-expanded={live}
                              className="w-full border-l py-2 pl-4 text-left transition-colors duration-400"
                              style={{
                                borderColor: live ? 'var(--color-accent)' : 'var(--rule)',
                              }}
                            >
                              <span
                                className="font-display text-[0.7rem] uppercase tracking-[0.16em] transition-opacity"
                                style={{ opacity: live ? 1 : 0.6 }}
                              >
                                {child.label}
                              </span>
                              <span
                                className="grid transition-[grid-template-rows] duration-500"
                                style={{ gridTemplateRows: live ? '1fr' : '0fr' }}
                              >
                                <span className="overflow-hidden">
                                  <span className="body-copy mt-2 block max-w-[46ch] opacity-55">
                                    {child.summary}
                                  </span>
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  /* ── Desktop: the radial diagram ──────────────────────────────────── */
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      {/* Heading + readout share the column */}
      <div className="lg:col-span-4">
        {header}

        <div className="mt-12 min-h-[15rem] border-t pt-6 [border-color:var(--rule)]">
          <p className="label mb-5 flex flex-wrap items-center gap-2 opacity-35">
            {reading.trail.map((t) => (
              <span key={t} className="flex items-center gap-2">
                {t}
                <span aria-hidden="true">/</span>
              </span>
            ))}
            <span style={{ color: 'var(--color-accent)' }}>{reading.label}</span>
          </p>

          <div key={readId} className="readout">
            <h3 className="display-md">{reading.label}</h3>
            <p className="body-copy mt-4 max-w-[42ch] opacity-60">{reading.summary}</p>
          </div>
        </div>

        {hint && <p className="label mt-8 opacity-25">{hint}</p>}
      </div>

      {/* Diagram */}
      <div className="lg:col-span-8">
        {/* Capped against viewport height as well as width, so the whole
            diagram is visible at once instead of running past the fold. */}
        <div
          className="relative mx-auto aspect-square w-full"
          style={{ maxWidth: 'min(42rem, 62vh)' }}
        >
          {/* Edges sit behind the pills */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            fill="none"
          >
            {/* Orbit rings — quiet structure */}
            <circle cx="50" cy="50" r={R_BRANCH} className="edge" strokeOpacity="0.08" />
            <circle cx="50" cy="50" r={R_CHILD} className="edge" strokeOpacity="0.05" strokeDasharray="0.4 2" />
            <circle cx="50" cy="50" r={R_CHILD + R_CHILD_STEP} className="edge" strokeOpacity="0.04" strokeDasharray="0.4 3" />

            {layout.map((branch) => {
              const live = openId === branch.id;
              return (
                <g key={branch.id}>
                  <line
                    x1="50"
                    y1="50"
                    x2={branch.x}
                    y2={branch.y}
                    className="edge"
                    data-live={live}
                    data-muted={openId !== null && !live}
                  />
                  {/* A pulse travelling the live edge: the diagram is
                      carrying something, not just connecting things. */}
                  {live && !reduced && (
                    <line
                      x1="50"
                      y1="50"
                      x2={branch.x}
                      y2={branch.y}
                      className="edge-pulse"
                      data-animate="true"
                      style={{ ['--dash-len' as string]: '30', ['--pulse-dur' as string]: '2.6s' }}
                      strokeDasharray="4 26"
                    />
                  )}

                  {live &&
                    branch.childNodes.map((child) => (
                      <line
                        key={child.id}
                        x1={branch.x}
                        y1={branch.y}
                        x2={child.x}
                        y2={child.y}
                        className="edge"
                        data-live={readId === child.id}
                      />
                    ))}
                </g>
              );
            })}
          </svg>

          {/* Centre */}
          <button
            type="button"
            onClick={() => {
              setOpenId(null);
              setReadId(centre.id);
            }}
            className="node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !px-6 !py-3.5 !text-[0.72rem]"
            data-live={readId === centre.id}
          >
            <span className="node-dot" />
            {centre.label}
          </button>

          {/* Branches + their children */}
          {layout.map((branch) => {
            const isOpen = openId === branch.id;
            const cos = Math.cos((branch.angle * Math.PI) / 180);
            return (
              <div key={branch.id}>
                <button
                  type="button"
                  data-branch=""
                  onClick={() => openBranch(branch.id)}
                  aria-expanded={isOpen}
                  className="node map-node"
                  data-live={readId === branch.id || isOpen}
                  data-muted={openId !== null && !isOpen}
                  style={{
                    left: `${branch.x}%`,
                    top: `${branch.y}%`,
                    transform: anchorFor(cos),
                  }}
                >
                  <span className="node-dot" />
                  {branch.label}
                </button>

                {branch.childNodes.map((child) => {
                  const c = Math.cos((child.angle * Math.PI) / 180);
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => setReadId(child.id)}
                      tabIndex={isOpen ? 0 : -1}
                      aria-hidden={!isOpen}
                      className="node map-node !text-[0.58rem] !px-3 !py-2"
                      data-hidden={!isOpen}
                      data-live={readId === child.id}
                      style={{
                        left: `${child.x}%`,
                        top: `${child.y}%`,
                        transform: anchorFor(c),
                      }}
                    >
                      {child.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
