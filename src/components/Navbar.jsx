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
              duration: 0.7,
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
            duration: 0.7,
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
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <motion.div
          layout
          className={`mx-auto pointer-events-auto ${isScrolled
            ? 'mt-3 w-[92%] max-w-7xl rounded-full bg-white/75 backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-white/50 py-3 px-6 md:px-8'
            : 'mt-0 w-full rounded-none bg-white/40 backdrop-blur-[6px] border-b border-white/20 py-4 px-6 md:px-12'
            }`}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        >
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-primary/10 transform transition-all group-hover:scale-105 group-hover:rotate-6 duration-300 border border-primary/5">
                <img src="./favicon.png" alt="" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-base md:text-lg leading-none tracking-tight text-text-dark">
                  GeoTree <span className="text-primary">Mart</span>
                </span>
                <span className="text-[9px] text-primary font-bold tracking-wider uppercase mt-0.5">
                  <span className='text-text-muted font-normal lowercase'>by</span> Geo Planet Solution
                </span>
              </div>
            </button>

            {/* Desktop Navigation Link Menu */}
            <div className="hidden md:flex items-center gap-1 bg-black/[0.02] p-2 rounded-full border border-black/[0.04]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 text-xs font-bold rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${isActive ? 'text-primary' : 'text-text-dark/70 hover:text-primary'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full shadow-sm"
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
                className="relative overflow-hidden group px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <span className="relative z-10">Download App</span>
              </button>
            </div>

            {/* Hamburger Icon for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-text-dark hover:bg-primary/5 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col p-6 rounded-3xl border border-primary/10 shadow-xl top-20"
          >
            <div className="flex flex-col gap-3 my-4">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2.5 px-4 rounded-xl text-base font-extrabold transition-all ${isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-dark hover:bg-primary/5 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('download-badges')}
                className="w-full text-center py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-extrabold text-sm rounded-xl shadow-md shadow-primary/20 focus:outline-none"
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
