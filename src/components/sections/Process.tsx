import { process } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';

export function Process() {
  return (
    <section id="process" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={process.index}
          label={process.label}
          lines={process.headline}
          lede={process.lede}
        />

        <ol className="mt-20 sm:mt-28">
          {process.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 90}
              className="group grid grid-cols-1 gap-6 border-t py-10 [border-color:var(--rule)] md:grid-cols-12 md:gap-10 md:py-14"
            >
              {/* Oversized step numeral — the spine of the section */}
              <div className="flex items-baseline gap-5 md:col-span-3 md:block">
                <span className="display-lg block leading-none opacity-15 transition-opacity duration-700 group-hover:opacity-40 tnum">
                  {step.n}
                </span>
                <span className="label mt-0 block opacity-45 md:mt-5">{step.duration}</span>
              </div>

              <h3 className="display-md md:col-span-4 md:pt-2">{step.title}</h3>

              <p className="body-copy max-w-[54ch] opacity-60 md:col-span-5 md:pt-3">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="border-t pt-8 [border-color:var(--rule)]">
          <p className="label opacity-40">
            The diagnostic is written and yours to keep — engagement or not.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
