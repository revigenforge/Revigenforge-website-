import { hero, contact, work } from '../../content/site';
import { Pill } from '../ui/Pill';
import { Reveal } from '../ui/Reveal';
import { Frame } from '../ui/Frame';

/**
 * The visitor's problem, set as the largest thing on the page.
 *
 * THE WORDMARK IS DELIBERATELY ABSENT HERE. It used to run giant across the
 * base of this section, which meant "Revigen Forge" appeared three times in
 * the first screen — nav, backdrop texture, and a lockup set larger than the
 * headline itself. The eye landed on the studio's name before the visitor's
 * problem, which is the opposite of what this studio sells, and it pushed the
 * proof line below the fold. The name now belongs to the footer, bleeding off
 * the edge as the closing gesture: the payoff rather than the greeting.
 *
 * Order follows the playbook — who this is for, the symptom, the reframe,
 * the answer, the action, then proof you can check.
 */
export function Hero() {
  return (
    <section id="top" className="surface-ink relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Backdrop. Kept far right and heavily veiled so the headline sits on
          clean ink — it is texture, not an image to be read. */}
      <div className="absolute inset-0 -z-10">
        <Frame src={work.art.hero} alt="" label="" className="h-full w-full border-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/45" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col justify-center pb-6 pt-32 sm:pt-36">
        <Reveal y={12}>
          <p className="label accent">{hero.audience}</p>
        </Reveal>

        <Reveal delay={100} className="mt-7">
          <h1 className="display-xl max-w-[13ch]">{hero.headline}</h1>
        </Reveal>

        <Reveal delay={200} className="mt-6 max-w-[46ch]">
          <p className="lede dim">{hero.sub}</p>
          <p className="lede mt-1">{hero.tagline}</p>
        </Reveal>

        <Reveal delay={300} className="mt-9">
          <Pill href={contact.cta.href}>{contact.cta.label}</Pill>
        </Reveal>
      </div>

      <div className="shell pb-7">
        <Reveal
          delay={380}
          className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 [border-color:var(--rule)]"
        >
          <span className="label dim">{hero.proofLine}</span>
          <span className="label dim">{hero.scrollHint}</span>
        </Reveal>
      </div>
    </section>
  );
}
