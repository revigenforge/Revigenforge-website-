import { useRevealObserver } from './hooks/useReveal';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';
import { Grain } from './components/visuals/Grain';

import { Hero } from './components/sections/Hero';
import { Forge } from './components/sections/Forge';
import { Services } from './components/sections/Services';
import { ApproachFlow } from './components/sections/ApproachFlow';
import { Studio } from './components/sections/Studio';
import { SystemSection } from './components/sections/SystemSection';
import { CallToAction } from './components/sections/CallToAction';

/**
 * Seven sections, four distinct interaction models, one vocabulary.
 *
 * The order is an argument: state the idea (Hero), let the visitor take
 * the studio apart (Forge), show what that buys them (Services), walk the
 * sequence (Approach), meet the people (Studio), see it close the loop
 * (System), then act (Contact).
 *
 * Surfaces alternate black and white so a long scroll reads as chapters.
 * The diagrams all live on black, where the accent can actually glow.
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
        <Forge />

        <div data-surface="light" className="surface-light">
          <Services />
        </div>

        <ApproachFlow />

        <div data-surface="light" className="surface-light">
          <Studio />
        </div>

        <SystemSection />
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
