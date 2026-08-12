import { difference } from '../../content/site';
import { MaskLines, Reveal } from '../ui/Reveal';

export function Difference() {
  return (
    <section id="why" className="section-y relative overflow-hidden">
      {/* A single low bloom keeps this block from going flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.07),transparent_68%)] blur-3xl"
      />

      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Sticky heading — the composition changes gear here */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal className="flex items-baseline gap-4 border-t pt-4 [border-color:var(--rule)]" y={12}>
              <span className="label tnum opacity-45">{difference.index}</span>
              <span className="label opacity-45">{difference.label}</span>
            </Reveal>

            <h2 className="display-lg mt-10 max-w-[16ch]">
              <MaskLines lines={difference.headline} step={80} />
            </h2>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {difference.items.map((item, i) => (
            <Reveal
              as="li"
              key={item.n}
              delay={i * 100}
              className="group border-b py-10 first:border-t [border-color:var(--rule)] md:py-12"
            >
              <div className="flex items-baseline gap-6">
                <span className="label tnum shrink-0 opacity-30 transition-opacity duration-500 group-hover:opacity-100">
                  {item.n}
                </span>
                <div>
                  <h3 className="display-md">{item.title}</h3>
                  <p className="body-copy mt-4 max-w-[48ch] opacity-60">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
