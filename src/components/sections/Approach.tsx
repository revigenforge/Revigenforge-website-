import { approach } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';

export function Approach() {
  return (
    <section id="approach" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={approach.index}
          label={approach.label}
          lines={approach.headline}
          lede={approach.lede}
        />

        {/* Position → Produce → Convert */}
        <ol className="mt-20 grid gap-px sm:mt-28 md:grid-cols-3">
          {approach.pillars.map((pillar, i) => (
            <Reveal
              as="li"
              key={pillar.n}
              delay={i * 120}
              className="group relative flex flex-col border-t pt-8 [border-color:var(--rule)] md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="label tnum opacity-35">{pillar.n}</span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rotate-45 bg-ember opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <h3 className="display-md mt-8 md:mt-10">{pillar.title}</h3>

              <p className="body-copy mt-4 max-w-[38ch] opacity-65">{pillar.body}</p>

              {/* min-height keeps the three hairlines on one baseline even
                  though the bodies above them differ in length. */}
              <p className="mt-8 border-t pt-4 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.14em] opacity-40 [border-color:var(--rule)] md:mt-auto md:min-h-[5.25rem]">
                {pillar.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
