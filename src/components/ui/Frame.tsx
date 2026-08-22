/**
 * An image slot that degrades honestly. Until a real still is supplied the
 * frame renders a labelled placeholder rather than a broken image, so the
 * layout can be reviewed and shipped while assets are still coming.
 */
export function Frame({
  src,
  alt,
  label,
  className = '',
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  if (src) {
    return (
      <figure className={`frame ${className}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </figure>
    );
  }

  return (
    <div
      className={`frame grid place-items-center border border-dashed p-6 text-center [border-color:var(--rule)] ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="label dim">{label ?? alt}</span>
    </div>
  );
}
