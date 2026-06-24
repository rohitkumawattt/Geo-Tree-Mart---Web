import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Buy from './components/Buy';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OurCategories from './components/OurCategories';

function App() {
  useSmoothScroll();
  return (
    <div className="w-full min-h-screen bg-bg-light text-text-dark font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Hero />
        <OurCategories />
        <Buy />
        <ProblemSolution />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
