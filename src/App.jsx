import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Buy from './components/Buy';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <div className="w-full min-h-screen bg-bg-light text-text-dark font-sans antialiased overflow-x-hidden">
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main content layouts */}
      <main className="w-full">
        {/* Fullscreen Hero section */}
        <Hero />

        {/* The Problem & Our Solution Section */}
        <ProblemSolution />

        {/* Buy Plants Bulk Catalog Section */}
        <Buy />

        {/* FAQ Accordion Section */}
        <FAQ />
      </main>

      {/* Footer site links */}
      <Footer />
    </div>
  );
}

export default App;
