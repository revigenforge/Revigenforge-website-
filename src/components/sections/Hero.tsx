import { hero, contact } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';
import { WordmarkGiant } from '../visuals/ForgeMark';
import { Frame } from '../ui/Frame';
import { work } from '../../content/site';

/**
 * Full-bleed still with the wordmark set enormous across the base — the
 * reference's opening move. The headline states the visitor's symptom
 * rather than announcing the studio; the wordmark handles identity.
 */
export function Hero() {
  return (
    <section id="top" className="surface-ink relative isolate min-h-[100svh] overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <Frame
          src={work.art.hero}
          alt="Revigen Forge"
          label="Hero still"
          className="h-full w-full border-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell flex min-h-[100svh] flex-col justify-between pb-8 pt-28 sm:pt-32">
        <div className="max-w-[34ch] pt-8 sm:pt-14">
          <Reveal y={12}>
            <p className="lede">{hero.tagline}</p>
          </Reveal>

          <Reveal delay={120} className="mt-7">
            <Pill href={contact.cta.href}>{contact.cta.label}</Pill>
          </Reveal>
        </div>

        <div>
          <Reveal delay={180}>
            <h1 className="display-md max-w-[20ch] sm:display-lg">{hero.headline}</h1>
            <p className="lede mt-4 max-w-[38ch] dim">{hero.sub}</p>
          </Reveal>

          <Reveal delay={280} className="mt-8 overflow-hidden">
            <WordmarkGiant className="whitespace-nowrap leading-[0.8]" />
          </Reveal>

          <Reveal
            delay={340}
            className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 [border-color:var(--rule)]"
          >
            <span className="label opacity-55">{hero.proofLine}</span>
            <span className="label opacity-35">{hero.scrollHint}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
