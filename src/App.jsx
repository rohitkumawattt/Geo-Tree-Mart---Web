import { useState, useEffect } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Feedback from './components/Feedback';
import Buy from './components/Buy';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OurCategories from './components/OurCategories';

// Import pages from the Pages directory
import PlantsPage from '../Pages/Plants';
import PotsPage from '../Pages/Pots';
import FertilisersPage from '../Pages/Fertilisers';
import SeedsPage from '../Pages/Seeds';
import GardenToolsPage from '../Pages/GardenTools';
import SoilPage from '../Pages/Soil';

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
          'plants': 'Plants',
          'pots': 'Pots',
          'fertilisers': 'Fertilisers',
          'seeds': 'Seeds',
          'garden-tools': 'Garden Tools',
          'soil': 'Soil'
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
      case 'Plants':
        return <PlantsPage onClose={handleCloseCategory} />;
      case 'Pots':
        return <PotsPage onClose={handleCloseCategory} />;
      case 'Fertilisers':
        return <FertilisersPage onClose={handleCloseCategory} />;
      case 'Seeds':
        return <SeedsPage onClose={handleCloseCategory} />;
      case 'Garden Tools':
        return <GardenToolsPage onClose={handleCloseCategory} />;
      case 'Soil':
        return <SoilPage onClose={handleCloseCategory} />;
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
            <Buy />
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
