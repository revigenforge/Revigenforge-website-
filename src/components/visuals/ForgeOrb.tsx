/**
 * The hero's anchor image: a molten core banded by machined arcs.
 * Pure SVG — no raster asset, no stock photography, scales to any viewport
 * and costs nothing to load.
 */
export function ForgeOrb({ className = '' }: { className?: string }) {
  const rings = [
    { r: 148, o: 0.58, dash: '', w: 1 },
    { r: 176, o: 0.36, dash: '2 10', w: 1 },
    { r: 212, o: 0.3, dash: '', w: 1 },
    { r: 258, o: 0.2, dash: '1 14', w: 1 },
    { r: 312, o: 0.13, dash: '', w: 1 },
  ];

  // Gauge ticks — what makes the thing read as an instrument rather than
  // a glow. Every sixth tick runs long, like a dial.
  const ticks = Array.from({ length: 48 }, (_, i) => {
    const angle = (i / 48) * Math.PI * 2;
    const long = i % 6 === 0;
    const inner = 224;
    const outer = inner + (long ? 16 : 7);
    return {
      x1: 360 + Math.cos(angle) * inner,
      y1: 360 + Math.sin(angle) * inner,
      x2: 360 + Math.cos(angle) * outer,
      y2: 360 + Math.sin(angle) * outer,
      o: long ? 0.36 : 0.16,
    };
  });

  return (
    <svg
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD9A8" />
          <stop offset="22%" stopColor="var(--color-ember-soft)" />
          <stop offset="58%" stopColor="var(--color-ember)" />
          <stop offset="100%" stopColor="var(--color-ember-deep)" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-ember)" stopOpacity="0.24" />
          <stop offset="42%" stopColor="var(--color-ember-deep)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--color-ember-deep)" stopOpacity="0" />
        </radialGradient>

        {/* Cuts the lower half of the core so it reads as heat rising. */}
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>

        <mask id="coreMask">
          <rect width="720" height="720" fill="url(#fade)" />
        </mask>
      </defs>

      {/* Atmospheric bloom */}
      <circle cx="360" cy="360" r="352" fill="url(#bloom)" className="ember-orb" />

      {/* Machined rings */}
      <g stroke="var(--color-bone)" fill="none">
        {rings.map((ring) => (
          <circle
            key={ring.r}
            cx="360"
            cy="360"
            r={ring.r}
            strokeOpacity={ring.o}
            strokeWidth={ring.w}
            strokeDasharray={ring.dash || undefined}
          />
        ))}
      </g>

      {/* Gauge ticks */}
      <g stroke="var(--color-bone)" strokeWidth="1">
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            strokeOpacity={tick.o}
          />
        ))}
      </g>

      {/* Ember arc — the one bright gesture */}
      <circle
        cx="360"
        cy="360"
        r="176"
        stroke="var(--color-ember)"
        strokeWidth="1.5"
        strokeOpacity="0.85"
        strokeDasharray="150 900"
        strokeLinecap="round"
        transform="rotate(-38 360 360)"
      />
      <circle
        cx="360"
        cy="360"
        r="212"
        stroke="var(--color-ember)"
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeDasharray="60 1200"
        strokeLinecap="round"
        transform="rotate(128 360 360)"
      />

      {/* Molten core — kept small and dense so it reads as heat, not haze */}
      <g mask="url(#coreMask)">
        <circle cx="360" cy="360" r="88" fill="url(#core)" className="ember-orb" />
      </g>

      {/* Horizon rule through the core — the editorial cut */}
      <line
        x1="0"
        y1="360"
        x2="720"
        y2="360"
        stroke="var(--color-bone)"
        strokeOpacity="0.14"
      />
    </svg>
  );
}
