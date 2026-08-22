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

    /* The -12% bottom margin holds a reveal back until the element is
       meaningfully in view rather than clipping the edge. That is right for
       everything the reader scrolls to and wrong for the first screen: an
       element pinned to the bottom of the viewport on load — the hero's
       proof strip — sits permanently outside the shrunk boundary and never
       fires. It stayed at opacity 0 until the user scrolled past it, by
       which point the hero had gone. So anything already on screen at load
       is revealed directly, and the observer takes over from there. */
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

    const revealFirstScreen = () => {
      for (const el of document.querySelectorAll('[data-reveal]:not([data-revealed])')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) show(el);
      }
    };

    revealFirstScreen();
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
