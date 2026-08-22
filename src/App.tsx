import { useRevealObserver } from './hooks/useReveal';
import { Nav } from './components/layout/Nav';
import { Footer } from './components/layout/Footer';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Work } from './components/sections/Work';
import { Proof } from './components/sections/Proof';
import { Process } from './components/sections/Process';
import { Pricing } from './components/sections/Pricing';
import { Faq } from './components/sections/Faq';
import { Contact } from './components/sections/Contact';

/**
 * Ink → blue → cream → ink → cream → ink → blue.
 *
 * The surface changes are the structure: each full-bleed colour shift
 * signals a new argument, which is what lets the copy stay this short.
 * Cream sections that belong together (services/work, pricing/faq) share
 * one block rather than repeating the flip.
 */
export default function App() {
  useRevealObserver();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cream focus:px-5 focus:py-3 focus:text-[0.8rem] focus:text-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Work />
        <Proof />
        <Process />
        <Pricing />
        <Faq />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
