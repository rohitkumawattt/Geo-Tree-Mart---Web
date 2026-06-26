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
import VegetablesPage from '../Pages/Vegetables';
import DecorativePage from '../Pages/Decorative';
import MedicinalPage from '../Pages/Medicinal';
import OutdoorPage from '../Pages/Outdoor';
import FlowringPage from '../Pages/Flowring';
import FruitsPage from '../Pages/Fruits';
import ProductDetailPage from '../Pages/ProductDetail';

function App() {
  useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#category/')) {
        const slug = hash.replace('#category/', '');
        // Map slug back to title case category name
        const validCategories = {
          'vegetables': 'Vegetables',
          'decorative': 'Decorative',
          'medicinal': 'Medicinal',
          'outdoor': 'Outdoor',
          'flowring': 'Flowring',
          'fruits': 'Fruits'
        };
        const matched = validCategories[slug.toLowerCase()];
        if (matched) {
          setSelectedCategory(matched);
          setSelectedProductId(null);
          // Scroll back to top immediately upon switching page
          if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          setSelectedCategory(null);
          setSelectedProductId(null);
        }
      } else if (hash.startsWith('#product/')) {
        const id = hash.replace('#product/', '');
        setSelectedProductId(id);
        setSelectedCategory(null);
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        setSelectedCategory(null);
        setSelectedProductId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once initially

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseCategory = () => {
    window.location.hash = '#categories';
  };

  const handleCloseProduct = () => {
    window.location.hash = '';
  };

  const renderCategoryPage = () => {
    switch (selectedCategory) {
      case 'Vegetables':
        return <VegetablesPage onClose={handleCloseCategory} />;
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
        {selectedProductId ? (
          <ProductDetailPage productId={selectedProductId} onClose={handleCloseProduct} />
        ) : selectedCategory ? (
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
