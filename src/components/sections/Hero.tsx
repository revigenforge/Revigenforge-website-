import { hero, marquee } from '../../content/site';
import { Button } from '../ui/Button';
import { MaskLines, Reveal } from '../ui/Reveal';
import { MoteField } from '../visuals/MoteField';
import { ForgeOrb } from '../visuals/ForgeOrb';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Atmosphere ------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Hairline column grid — structure you feel more than see */}
        <div className="grid-lines absolute inset-0 opacity-60" />

        {/* The orb bleeds off the right edge on desktop; sits behind the
            type, heavily dimmed, on small screens. */}
        <div className="absolute -right-[38%] top-1/2 h-[135vmin] w-[135vmin] -translate-y-1/2 opacity-70 sm:-right-[22%] lg:-right-[6%] lg:h-[112vmin] lg:w-[112vmin] lg:opacity-100">
          <ForgeOrb className="h-full w-full" />
        </div>

        <MoteField className="absolute inset-0 h-full w-full" />

        {/* Vignette keeps the display type legible over the orb */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_50%,var(--color-ink)_28%,transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content ---------------------------------------------------- */}
      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-10 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-12">
        <div className="flex flex-1 flex-col justify-center py-14 lg:py-0">
          <Reveal className="mb-10 flex items-center gap-3" y={10}>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-current" />
            <span className="label opacity-70">{hero.eyebrow}</span>
          </Reveal>

          <h1 className="display-xl dim-line max-w-[15ch]">
            <MaskLines
              immediate
              start={140}
              step={95}
              lines={hero.headline.map((line, i) => (
                <span key={i}>
                  {line.text}
                  {'accent' in line && line.accent ? (
                    <span className="accent">{line.accent}</span>
                  ) : null}
                </span>
              ))}
            />
          </h1>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-6 xl:col-span-5" delay={520}>
              <p className="lede max-w-[52ch] text-white/65">{hero.lede}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                <Button href={hero.secondaryCta.href} variant="ghost">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            {/* Capability index — reads like a contents page */}
            <Reveal className="hidden lg:col-span-4 lg:col-start-9 lg:block" delay={640}>
              <ul className="border-t [border-color:var(--rule)]">
                {hero.meta.map((item) => (
                  <li
                    key={item.k}
                    className="flex items-baseline justify-between gap-6 border-b py-3.5 [border-color:var(--rule)]"
                  >
                    <span className="label tnum opacity-40">{item.k}</span>
                    <span className="font-display text-[0.72rem] uppercase tracking-[0.16em] opacity-80">
                      {item.v}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Reveal className="flex items-end justify-between gap-6" delay={800}>
          <span className="label hidden opacity-35 sm:block">Scroll</span>
          <span className="label max-w-[34ch] text-right opacity-35 sm:text-left">
            Est. studio — content, positioning, conversion
          </span>
        </Reveal>
      </div>

      {/* Capability marquee ----------------------------------------- */}
      <div className="relative border-y py-4 [border-color:var(--rule)]">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div className="marquee-track" key={copy} aria-hidden={copy === 1}>
              {marquee.map((item) => (
                <span
                  key={item}
                  className="flex shrink-0 items-center gap-6 pr-6 font-display text-[0.7rem] uppercase tracking-[0.18em] text-white/55"
                >
                  {item}
                  <span className="h-1 w-1 rotate-45 bg-current opacity-45" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
