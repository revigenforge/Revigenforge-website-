import { forge } from '../../content/site';
import { Reveal, MaskLines } from '../ui/Reveal';
import { RadialMap } from '../interactive/RadialMap';

export function Forge() {
  return (
    <section id="forge" className="relative overflow-hidden py-[clamp(4.5rem,9vw,8rem)]">
      {/* One low bloom so the diagram sits in space rather than on a wall */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-1/2 -z-10 h-[75vmin] w-[75vmin] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 66%)',
        }}
      />

      <div className="shell">
        <RadialMap
          centre={forge.centre}
          branches={forge.branches}
          hint="Select a branch, then a node"
          header={
            <div>
              <Reveal
                className="flex items-baseline gap-4 border-t pt-4 [border-color:var(--rule)]"
                y={12}
              >
                <span className="label tnum opacity-45">{forge.index}</span>
                <span className="label opacity-45">{forge.label}</span>
              </Reveal>

              <h2 className="display-lg mt-8 max-w-[12ch] lg:text-[clamp(2rem,2.9vw,2.9rem)]">
                <MaskLines lines={forge.headline} step={80} />
              </h2>

              <Reveal delay={120}>
                <p className="body-copy mt-5 max-w-[44ch] opacity-55">{forge.lede}</p>
              </Reveal>
            </div>
          }
        />
      </div>
    </section>
  );
}
