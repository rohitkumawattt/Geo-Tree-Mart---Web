import { useState, useEffect } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Feedback from './components/Feedback';
import Plants from './components/Plants';
import Banner from './components/Banner';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OurCategories from './components/OurCategories';

// Import pages from the Pages directory
import VegitablePage from '../Pages/Vegitable';
import DecorativePage from '../Pages/Decorative';
import MedicinalPage from '../Pages/Medicinal';
import OutdoorPage from '../Pages/Outdoor';
import FlowringPage from '../Pages/Flowring';
import FruitsPage from '../Pages/Fruits';

function App() {
  useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#category/')) {
        const slug = hash.replace('#category/', '');
        // Map slug back to title case category name
        const validCategories = {
          'vegitable': 'Vegitable',
          'decorative': 'Decorative',
          'medicinal': 'Medicinal',
          'outdoor': 'Outdoor',
          'flowring': 'Flowring',
          'fruits': 'Fruits'
        };
        const matched = validCategories[slug.toLowerCase()];
        if (matched) {
          setSelectedCategory(matched);
          // Scroll back to top immediately upon switching page
          if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          setSelectedCategory(null);
        }
      } else {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once initially

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseCategory = () => {
    window.location.hash = '#categories';
  };

  const renderCategoryPage = () => {
    switch (selectedCategory) {
      case 'Vegitable':
        return <VegitablePage onClose={handleCloseCategory} />;
      case 'Decorative':
        return <DecorativePage onClose={handleCloseCategory} />;
      case 'Medicinal':
        return <MedicinalPage onClose={handleCloseCategory} />;
      case 'Outdoor':
        return <OutdoorPage onClose={handleCloseCategory} />;
      case 'Flowring':
        return <FlowringPage onClose={handleCloseCategory} />;
      case 'Fruits':
        return <FruitsPage onClose={handleCloseCategory} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-light text-text-dark font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        {selectedCategory ? (
          renderCategoryPage()
        ) : (
          <>
            <Hero />
            <OurCategories />
            <Plants />
            <Banner />
            <ProblemSolution />
            <Feedback />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
