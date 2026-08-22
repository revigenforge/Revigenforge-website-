import { proof } from '../../content/site';
import { Reveal } from '../ui/Reveal';

/**
 * Testimonials as type, not cards — the supplied graphic used boxes, the
 * reference would set them large on a flat surface. Metrics sit above,
 * because a number a prospect can verify frames the quotes that follow.
 */
export function Proof() {
  const hasMetrics = proof.metrics.length > 0;

  return (
    <section id="proof" className="surface-ink section-y">
      <div className="shell">
        <Reveal y={10}>
          <span className="label opacity-45">{proof.label}</span>
        </Reveal>

        <Reveal delay={80} className="mt-6">
          <h2 className="display-lg">{proof.headline}</h2>
        </Reveal>

        {hasMetrics && (
          <>
            <ul className="mt-12 grid gap-8 border-y py-9 [border-color:var(--rule)] sm:grid-cols-3">
              {proof.metrics.map((m, i) => (
                <Reveal as="li" key={m.label} delay={120 + i * 80}>
                  <p className="display-md tnum" style={{ color: 'var(--color-blue)' }}>
                    {m.value}
                  </p>
                  <p className="label mt-3 opacity-50">{m.label}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={300}>
              <p className="label mt-4 opacity-30">{proof.metricsNote}</p>
            </Reveal>
          </>
        )}

        <ul className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {proof.testimonials.map((t, i) => (
            <Reveal as="li" key={`${t.client}-${i}`} delay={i * 90}>
              <figure>
                <blockquote className="text-[clamp(1.05rem,1.7vw,1.45rem)] leading-snug tracking-[-0.015em]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-baseline gap-3 border-t pt-4 [border-color:var(--rule)]">
                  <span className="label">{t.client}</span>
                  <span className="label opacity-35">{t.sector}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
