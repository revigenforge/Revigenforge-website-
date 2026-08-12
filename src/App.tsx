import { useRevealObserver } from './hooks/useReveal';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Grain } from './components/visuals/Grain';

import { Hero } from './components/sections/Hero';
import { Reality } from './components/sections/Reality';
import { Approach } from './components/sections/Approach';
import { Services } from './components/sections/Services';
import { Difference } from './components/sections/Difference';
import { Process } from './components/sections/Process';
import { Engagements } from './components/sections/Engagements';
import { CallToAction } from './components/sections/CallToAction';

/**
 * The page reads as five chapters, alternating ink and bone:
 *   dark  — the problem
 *   light — the answer and what we sell
 *   dark  — why us, and how it runs
 *   light — commercials
 *   dark  — the close
 * The value flip is the main piece of art direction; it stops a long
 * scroll from feeling like one endless dark template.
 */
export default function App() {
  useRevealObserver();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:font-display focus:text-[0.75rem] focus:uppercase focus:tracking-[0.16em] focus:text-black"
      >
        Skip to content
      </a>

      <Grain />
      <Nav />

      <main id="main">
        <Hero />
        <Reality />

        <div data-surface="light" className="surface-light">
          <Approach />
          <Services />
        </div>

        <Difference />
        <Process />

        <div data-surface="light" className="surface-light">
          <Engagements />
        </div>

        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
