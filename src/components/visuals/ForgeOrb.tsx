/**
 * The hero's anchor image: a machined dial in white line only.
 * Pure SVG — no raster asset, no stock photography, and no colour, so it
 * sits inside the logo's black-and-white system rather than beside it.
 */
export function ForgeOrb({ className = '' }: { className?: string }) {
  const rings = [
    { r: 118, o: 0.5, dash: '', w: 1 },
    { r: 148, o: 0.3, dash: '', w: 1 },
    { r: 176, o: 0.24, dash: '2 10', w: 1 },
    { r: 212, o: 0.2, dash: '', w: 1 },
    { r: 258, o: 0.13, dash: '1 14', w: 1 },
    { r: 312, o: 0.09, dash: '', w: 1 },
  ];

  // Gauge ticks — what makes this read as an instrument rather than a circle.
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
      o: long ? 0.32 : 0.14,
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
        <radialGradient id="haze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.13" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* A single soft lift so the dial is not floating on flat black */}
      <circle cx="360" cy="360" r="330" fill="url(#haze)" />

      <g className="drift">
        <g stroke="#ffffff" fill="none">
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

        <g stroke="#ffffff" strokeWidth="1">
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

        {/* The two bright arcs — the only emphasis in the drawing */}
        <circle
          cx="360"
          cy="360"
          r="176"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeOpacity="0.92"
          strokeDasharray="150 900"
          strokeLinecap="round"
          transform="rotate(-38 360 360)"
        />
        <circle
          cx="360"
          cy="360"
          r="212"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="60 1200"
          strokeLinecap="round"
          transform="rotate(128 360 360)"
        />
      </g>

      {/* Horizon rule through the centre — the editorial cut */}
      <line x1="0" y1="360" x2="720" y2="360" stroke="#ffffff" strokeOpacity="0.12" />
      <circle cx="360" cy="360" r="2.5" fill="#ffffff" fillOpacity="0.85" />
    </svg>
  );
}
