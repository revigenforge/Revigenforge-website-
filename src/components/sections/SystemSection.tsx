import { system } from '../../content/site';
import { Reveal, MaskLines } from '../ui/Reveal';
import { SystemLoop } from '../interactive/SystemLoop';

export function SystemSection() {
  return (
    <section id="system" className="relative overflow-hidden py-[clamp(4.5rem,9vw,8rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[28%] top-1/2 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 68%)',
        }}
      />

      <div className="shell">
        <SystemLoop
          header={
            <div>
              <Reveal
                className="flex items-baseline gap-4 border-t pt-4 [border-color:var(--rule)]"
                y={12}
              >
                <span className="label tnum opacity-45">{system.index}</span>
                <span className="label opacity-45">{system.label}</span>
              </Reveal>

              <h2 className="display-lg mt-8 max-w-[14ch] lg:text-[clamp(2rem,2.9vw,2.9rem)]">
                <MaskLines lines={system.headline} step={80} />
              </h2>

              <Reveal delay={120}>
                <p className="body-copy mt-5 max-w-[44ch] opacity-55">{system.lede}</p>
              </Reveal>
            </div>
          }
        />
      </div>
    </section>
  );
}
