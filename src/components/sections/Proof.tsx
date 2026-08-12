import { proof } from '../../content/site';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

export function Proof() {
  const hasCases = proof.caseStudies.length > 0;
  const hasQuotes = proof.testimonials.length > 0;

  return (
    <section id="proof" className="section-y relative">
      <div className="shell">
        <SectionHead
          index={proof.index}
          label={proof.label}
          lines={proof.headline}
          lede={proof.lede}
        />

        {/* How we hold ourselves accountable */}
        <ul className="mt-20 grid gap-px sm:mt-24 md:grid-cols-3">
          {proof.commitments.map((item, i) => (
            <Reveal
              as="li"
              key={item.n}
              delay={i * 110}
              className="border-t pt-8 [border-color:var(--rule)] md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <span className="label tnum opacity-35">{item.n}</span>
              <h3 className="mt-7 text-[1.35rem] font-medium leading-snug tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="body-copy mt-3 max-w-[40ch] opacity-60">{item.body}</p>
            </Reveal>
          ))}
        </ul>

        {/* Real case studies render here the moment content/site.ts has them. */}
        {hasCases ? (
          <div className="mt-24 grid gap-px border-t [border-color:var(--rule)] md:grid-cols-2">
            {proof.caseStudies.map((item, i) => (
              <Reveal
                key={item.client}
                delay={i * 90}
                className="border-b py-10 [border-color:var(--rule)] md:odd:pr-12 md:even:border-l md:even:pl-12"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label opacity-60">{item.client}</span>
                  <span className="label opacity-35">{item.sector}</span>
                </div>
                <h3 className="display-md mt-6 max-w-[20ch]">{item.headline}</h3>
                <p className="body-copy mt-4 max-w-[46ch] opacity-60">{item.body}</p>
                {item.metrics && (
                  <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="sr-only">{metric.label}</dt>
                        <dd className="display-md text-ember tnum">{metric.value}</dd>
                        <p className="label mt-2 opacity-45">{metric.label}</p>
                      </div>
                    ))}
                  </dl>
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-20 sm:mt-24">
            <div className="flex flex-col justify-between gap-8 border-t pt-10 [border-color:var(--rule)] lg:flex-row lg:items-end">
              <div>
                <h3 className="display-md">{proof.emptyState.title}</h3>
                <p className="body-copy mt-4 max-w-[52ch] opacity-60">
                  {proof.emptyState.body}
                </p>
              </div>
              <Button href="#contact" variant="light" className="self-start lg:self-auto">
                {proof.emptyState.cta}
              </Button>
            </div>
          </Reveal>
        )}

        {hasQuotes && (
          <div className="mt-20 grid gap-10 md:grid-cols-2">
            {proof.testimonials.map((quote, i) => (
              <Reveal
                as="figure"
                key={quote.name}
                delay={i * 100}
                className="border-t pt-8 [border-color:var(--rule)]"
              >
                <blockquote className="display-md max-w-[26ch] text-balance">
                  “{quote.quote}”
                </blockquote>
                <figcaption className="label mt-7 opacity-45">
                  {quote.name} — {quote.role}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
