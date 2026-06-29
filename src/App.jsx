import React, { useState, useEffect, Suspense, lazy } from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/WhyChooseUs';
import Feedback from './components/Feedback';
import Plants from './components/Plants';
import Banner from './components/Banner';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OurCategories from './components/OurCategories';

// Lazily load pages for optimized initial bundle size and faster initial page paint
const VegetablesPage = lazy(() => import('../Pages/Vegetables'));
const DecorativePage = lazy(() => import('../Pages/Decorative'));
const MedicinalPage = lazy(() => import('../Pages/Medicinal'));
const OutdoorPage = lazy(() => import('../Pages/Outdoor'));
const FlowringPage = lazy(() => import('../Pages/Flowring'));
const FruitsPage = lazy(() => import('../Pages/Fruits'));
const ProductDetailPage = lazy(() => import('../Pages/ProductDetail'));
const BlogPage = lazy(() => import('../Pages/Blog'));
const CartPage = lazy(() => import('../Pages/Cart'));

// Beautiful minimal loading spinner fallback for lazy-loaded route transitions
const LoadingFallback = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-bg-light text-text-muted transition-colors duration-300">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
    <p className="text-xs font-bold uppercase tracking-widest text-primary/70 animate-pulse">Loading Premium Garden Deals...</p>
  </div>
);

function App() {
  useSmoothScroll();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showBlog, setShowBlog] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#blog') {
        setShowBlog(true);
        setShowCart(false);
        setSelectedCategory(null);
        setSelectedProductId(null);
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (hash === '#cart') {
        setShowBlog(false);
        setShowCart(true);
        setSelectedCategory(null);
        setSelectedProductId(null);
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (hash.startsWith('#category/')) {
        setShowBlog(false);
        setShowCart(false);
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
        setShowBlog(false);
        setShowCart(false);
        const id = hash.replace('#product/', '');
        setSelectedProductId(id);
        setSelectedCategory(null);
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        setShowBlog(false);
        setShowCart(false);
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

  const handleCloseBlog = () => {
    window.location.hash = '';
  };

  const handleCloseCart = () => {
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
        <Suspense fallback={<LoadingFallback />}>
          {selectedProductId ? (
            <ProductDetailPage productId={selectedProductId} onClose={handleCloseProduct} />
          ) : showBlog ? (
            <BlogPage onClose={handleCloseBlog} />
          ) : showCart ? (
            <CartPage onClose={handleCloseCart} />
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
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
