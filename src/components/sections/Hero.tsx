import { hero, marquee } from '../../content/site';
import { Button } from '../ui/Button';
import { MaskLines, Reveal } from '../ui/Reveal';
import { MoteField } from '../visuals/MoteField';
import { ForgeOrb } from '../visuals/ForgeOrb';
import { HeroChain } from '../interactive/HeroChain';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Atmosphere ------------------------------------------------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-60" />

        <div className="absolute -right-[38%] top-[42%] h-[135vmin] w-[135vmin] -translate-y-1/2 opacity-60 sm:-right-[22%] lg:-right-[26%] lg:h-[112vmin] lg:w-[112vmin] lg:opacity-55">
          <ForgeOrb className="h-full w-full" />
        </div>

        <MoteField className="absolute inset-0 h-full w-full" />

        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_18%_45%,var(--color-ink)_42%,transparent_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content ---------------------------------------------------- */}
      <div className="shell relative flex min-h-[100svh] flex-col justify-center pb-14 pt-32 sm:pt-36 lg:pb-16 lg:pt-32">
        {/* The chain lives in the right column so it clears the fold without
            shrinking the headline, and fills a half that was otherwise empty. */}
        <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-12 lg:gap-10 lg:py-0">
          <div className="lg:col-span-7">
          <Reveal className="mb-8 flex items-center gap-3" y={10}>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
            <span className="label opacity-70">{hero.eyebrow}</span>
          </Reveal>

          <h1 className="display-xl dim-line max-w-[13ch]">
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

          <Reveal className="mt-9 lg:mt-11" delay={520}>
              <p className="lede max-w-[46ch] text-white/65">{hero.lede}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
                <Button href={hero.secondaryCta.href} variant="ghost">
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* The site's argument in miniature, and the place the visitor
              learns how every later diagram behaves. */}
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={700} y={14}>
            <HeroChain />
          </Reveal>
        </div>
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
