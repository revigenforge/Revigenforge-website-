import { reality } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';

export function Reality() {
  return (
    <section id="reality" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={reality.index}
          label={reality.label}
          lines={reality.headline}
          lede={reality.lede}
        />

        <ul className="mt-20 grid gap-px border-t [border-color:var(--rule)] sm:mt-24 md:grid-cols-2">
          {reality.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.n}
              delay={i * 90}
              className="group relative border-b py-9 pr-6 [border-color:var(--rule)] md:py-12 md:odd:pr-14 md:even:pl-14 md:even:border-l"
            >
              <span className="label tnum block opacity-30 transition-opacity duration-500 group-hover:opacity-100">
                {item.n}
              </span>

              <h3 className="display-md mt-5 max-w-[20ch] text-balance">{item.title}</h3>

              <p className="body-copy mt-4 max-w-[46ch] opacity-55">{item.body}</p>
            </Reveal>
          ))}
        </ul>

        {/* The turn — the line that reframes everything above it */}
        <Reveal className="mt-16 flex justify-end sm:mt-20" delay={120}>
          <p className="display-md dim-line max-w-[24ch] text-balance sm:text-right">
            None of that is a content problem.
            <br className="hidden sm:block" />{' '}
            <span className="accent">It is an architecture problem.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
