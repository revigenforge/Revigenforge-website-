import { useEffect } from 'react';

/**
 * Reveals any element carrying [data-reveal] once it enters the viewport.
 * A single shared observer handles the whole page, and each element is
 * unobserved after firing — reveals happen once and cost nothing after.
 */
export function useRevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const show = (el: Element) => el.setAttribute('data-revealed', 'true');

    if (reduced) {
      document.querySelectorAll('[data-reveal]').forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    const scan = () => {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed])')
        .forEach((el) => observer.observe(el));
    };

    scan();

    // Catch nodes added later (accordion panels, conditional blocks).
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
