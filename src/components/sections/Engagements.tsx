import { engagements } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';

export function Engagements() {
  return (
    <section id="engagements" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={engagements.index}
          label={engagements.label}
          lines={engagements.headline}
          lede={engagements.lede}
        />

        <div className="mt-20 grid gap-px sm:mt-24 lg:grid-cols-3">
          {engagements.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 110}
              className={`group relative flex flex-col border-t pt-9 [border-color:var(--rule)] lg:px-9 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l ${
                tier.featured ? 'lg:pb-9' : ''
              }`}
            >
              {/* The featured tier is marked with an ember rule, not a badge
                  shouting "most popular" at the reader. */}
              {tier.featured && (
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-full bg-ember lg:left-9 lg:w-[calc(100%-4.5rem)]"
                />
              )}

              <div className="flex items-baseline justify-between gap-4">
                <span className="label opacity-45">{tier.shape}</span>
                {tier.featured && <span className="label text-ember">Most common</span>}
              </div>

              <h3 className="display-md mt-8">{tier.name}</h3>
              <p className="mt-3 text-[1.05rem] italic opacity-55 [font-family:var(--font-display)]">
                {tier.pitch}
              </p>

              <p className="body-copy mt-7 max-w-[38ch] opacity-65">
                <span className="label mr-2 opacity-45">For</span>
                {tier.for}
              </p>

              <ul className="mt-8 space-y-3 border-t pt-7 [border-color:var(--rule)]">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed opacity-75">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-ember"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex items-center justify-between gap-4 border-t pt-4 [border-color:var(--rule)] lg:mt-auto">
                <span className="label opacity-40">Priced on scope</span>
                <a
                  href="#contact"
                  className="link-sweep -my-1 py-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-ember"
                >
                  Enquire
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <p className="body-copy max-w-[62ch] opacity-50">{engagements.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
