import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Categories', id: 'categories' },
  { label: 'Plants', id: 'buy' },
  { label: 'Why GeoTree Mart?', id: 'problem-solution' },
  { label: 'Feedback', id: 'feedback' },
  { label: 'FAQs', id: 'faq' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor scroll position to highlight active nav item
  useEffect(() => {
    const handleScrollActive = () => {
      if (window.location.hash.startsWith('#category/')) {
        setActiveSection('categories');
        return;
      }

      const scrollPosition = window.scrollY + 140; // 140px offset for top navbar height and early highlight

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollActive);
    window.addEventListener('hashchange', handleScrollActive);
    handleScrollActive(); // Run once initially

    return () => {
      window.removeEventListener('scroll', handleScrollActive);
      window.removeEventListener('hashchange', handleScrollActive);
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const isCategoryPage = window.location.hash.startsWith('#category/');

    if (isCategoryPage) {
      // Return to landing page hash context
      window.location.hash = '';

      // Delay scroll until the home page sections render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { 
              offset: -80,
              onComplete: () => {
                if (id === 'download-badges' && typeof window.triggerDownloadBlink === 'function') {
                  window.triggerDownloadBlink();
                }
              }
            });
          } else {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            if (id === 'download-badges') {
              setTimeout(() => {
                if (typeof window.triggerDownloadBlink === 'function') {
                  window.triggerDownloadBlink();
                }
              }, 800);
            }
          }
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Use window.lenis if available, otherwise fallback to native scroll
        if (window.lenis) {
          window.lenis.scrollTo(element, { 
            offset: -80,
            onComplete: () => {
              if (id === 'download-badges' && typeof window.triggerDownloadBlink === 'function') {
                window.triggerDownloadBlink();
              }
            }
          });
        } else {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          if (id === 'download-badges') {
            setTimeout(() => {
              if (typeof window.triggerDownloadBlink === 'function') {
                window.triggerDownloadBlink();
              }
            }, 800);
          }
        }
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 ${isScrolled
          ? 'glassmorphism shadow-sm'
          : 'bg-white/30 backdrop-blur-[6px] border-b border-white/20'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo Section */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-primary/20 transform transition-transform group-hover:scale-105 duration-300">
              <img src="./favicon.png" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg leading-none tracking-tight text-text-dark">
                GeoTree <span className="text-primary font-bold">Mart</span>
              </span>
              <span className="text-[10px] text-primary font-semibold tracking-widest uppercase">
                <span className='text-black'>By</span> Geo Planet Solution Pvt. Ltd.
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link Menu */}
          <div className="hidden md:flex items-center gap-1 bg-primary/5 p-1 rounded-full border border-primary/10">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${isActive ? 'text-primary-dark font-bold' : 'text-text-dark/70 hover:text-primary'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-primary/10 border border-primary/25 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Call To Action Buttons (Right) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('download-badges')}
              className="relative overflow-hidden group px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm rounded-full shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <span className="relative z-10">Download App</span>
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out rounded-full" />
            </button>
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-dark hover:bg-primary/10 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-bg-light/95 backdrop-blur-lg md:hidden flex flex-col p-6 border-b border-primary/10"
          >
            <div className="flex flex-col gap-4 my-auto">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-3 px-4 rounded-xl text-xl font-bold transition-all ${isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-text-dark hover:bg-primary/5 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('download-badges')}
                className="w-full text-center py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 focus:outline-none"
              >
                Download App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
