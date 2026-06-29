import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Categories', id: 'categories' },
  { label: 'Plants', id: 'buy' },
  { label: 'Why GeoTree Mart?', id: 'problem-solution' },
  { label: 'Feedback', id: 'feedback' },
  { label: 'FAQs', id: 'faq' },
  { label: 'Blog', id: 'blog' }
];

export default function Navbar() {
  const { cartCount } = useCart();
  const displayCount = cartCount > 99 ? '99+' : cartCount;
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Lock background body scroll when the download modal is open
  useEffect(() => {
    if (showDownloadModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDownloadModal]);

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
      const hash = window.location.hash;
      if (hash === '#blog') {
        setActiveSection('blog');
        return;
      }
      if (hash.startsWith('#category/')) {
        setActiveSection('categories');
        return;
      }

      const scrollPosition = window.scrollY + 140; // 140px offset for top navbar height and early highlight

      for (const item of NAV_ITEMS) {
        if (item.id === 'blog') continue;
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

    if (id === 'blog') {
      window.location.hash = '#blog';
      return;
    }

    const currentHash = window.location.hash;
    const isSpecialPage = currentHash.startsWith('#category/') || currentHash === '#blog' || currentHash.startsWith('#product/') || currentHash === '#cart';

    if (isSpecialPage) {
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
        {/* Top blur overlay to blur any content scrolling into the top margins/corners */}
        {isScrolled && (
          <div 
            className="absolute top-0 left-0 w-full h-[72px] -z-10 pointer-events-none"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'linear-gradient(to bottom, rgba(248, 255, 248, 0.45), rgba(248, 255, 248, 0))'
            }}
          />
        )}
        <motion.div
          layout
          className={`mx-auto pointer-events-auto ${isScrolled
            ? 'mt-2.5 w-[95%] max-w-9xl rounded-full bg-white/50 shadow-[0_10px_35px_rgba(0,0,0,0.05)] border border-white/50 py-2 px-6 md:px-8'
            : 'mt-0 w-full rounded-none bg-white/30 border-b border-white/20 py-3 px-6 md:px-10'
            }`}
          style={{
            backdropFilter: isScrolled ? 'blur(24px)' : 'blur(12px)',
            WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'blur(12px)'
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        >
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-md shadow-primary/10 transform transition-all group-hover:scale-105 group-hover:rotate-6 duration-300 border border-primary/5">
                <img src="./favicon.png" alt="" className="w-5.5 h-5.5 object-contain" />
              </div>
              <div className="md:hidden lg:flex flex flex-col">
                <span className="font-display font-black text-base md:text-lg leading-none tracking-tight text-text-dark">
                  GeoTree <span className="text-primary">Mart</span>
                </span>
                <span className="text-[9px] text-primary font-bold tracking-wider mt-0.5">
                  <span className='text-text-muted font-normal'>By</span> Geo Planet Solution
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
                    className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${isActive ? 'text-primary' : 'text-text-dark/70 hover:text-primary'
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
              {/* Desktop Cart Button */}
              <button
                onClick={() => window.location.hash = '#cart'}
                className="relative p-2.5 bg-gray-50 border border-gray-100 text-text-dark hover:bg-gray-100 rounded-full transition-colors cursor-pointer focus:outline-none"
              >
                <FiShoppingCart className="text-base" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black px-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border border-white shadow-sm">
                    {displayCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowDownloadModal(true)}
                className="relative overflow-hidden group px-4 py-1.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 cursor-pointer focus:outline-none"
              >
                <span className="relative z-10">Download App</span>
              </button>
            </div>

            {/* Mobile Cart Button */}
            <button
              onClick={() => window.location.hash = '#cart'}
              className="md:hidden relative p-2.5 bg-gray-50 border border-gray-100 text-text-dark hover:bg-gray-100 rounded-full transition-colors cursor-pointer focus:outline-none mr-2"
            >
              <FiShoppingCart className="text-sm" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black px-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border border-white shadow-sm">
                  {displayCount}
                </span>
              )}
            </button>

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
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowDownloadModal(true);
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-extrabold text-sm rounded-xl shadow-md shadow-primary/20 focus:outline-none cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform"
              >
                Download App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download App Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-center border border-primary/10 overflow-hidden"
              data-lenis-prevent
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-dark text-lg font-bold cursor-pointer focus:outline-none w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <HiX />
              </button>

              {/* Icon/Brand Header */}
              <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-4 border border-primary/20">
                <img src="./favicon.png" alt="" className="w-6 h-6 object-contain" />
              </div>

              <h3 className="font-display font-black text-xl text-text-dark mb-2">
                Get the GeoTree Mart App
              </h3>
              <p className="font-sans text-xs text-text-muted leading-relaxed mb-6">
                Get access to verified nurseries, live GIS tracking, and secure escrow B2B trading right from your phone.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-text-dark hover:bg-primary text-white rounded-xl px-4 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group justify-center shadow-md shadow-text-dark/10 hover:shadow-primary/20"
                >
                  <FaGooglePlay className="text-lg text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-white/60 font-semibold uppercase tracking-wider leading-none">GET IT ON</span>
                    <span className="text-xs font-bold text-white tracking-wide mt-0.5">Google Play</span>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-text-dark hover:bg-primary text-white rounded-xl px-4 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group justify-center shadow-md shadow-text-dark/10 hover:shadow-primary/20"
                >
                  <FaApple className="text-xl text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-white/60 font-semibold uppercase tracking-wider leading-none">Download on the</span>
                    <span className="text-xs font-bold text-white tracking-wide mt-0.5">App Store</span>
                  </div>
                </a>
              </div>

              {/* QR Code Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-[1px] bg-gray-100"></div>
                <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or Scan QR</span>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
              </div>

              {/* QR Code SVG */}
              <div className="inline-flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-2xl p-4 w-full">
                <svg className="w-24 h-24 text-text-dark" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner blocks */}
                  <rect x="0" y="0" width="22" height="22" />
                  <rect x="3" y="3" width="16" height="16" fill="white" />
                  <rect x="6" y="6" width="10" height="10" />
                  
                  <rect x="78" y="0" width="22" height="22" />
                  <rect x="81" y="3" width="16" height="16" fill="white" />
                  <rect x="84" y="6" width="10" height="10" />
                  
                  <rect x="0" y="78" width="22" height="22" />
                  <rect x="3" y="81" width="16" height="16" fill="white" />
                  <rect x="6" y="84" width="10" height="10" />
                  
                  {/* Random dots & grid patterns for QR */}
                  <rect x="30" y="2" width="6" height="6" />
                  <rect x="42" y="5" width="12" height="6" />
                  <rect x="60" y="2" width="6" height="18" />
                  <rect x="36" y="24" width="18" height="6" />
                  <rect x="6" y="30" width="6" height="12" />
                  <rect x="24" y="48" width="12" height="12" />
                  
                  {/* Green brand logo center block */}
                  <rect x="38" y="38" width="24" height="24" fill="white" />
                  <rect x="41" y="41" width="18" height="18" rx="4" fill="#1b5e20" />
                  {/* Inner brand cross/dot */}
                  <circle cx="50" cy="50" r="4" fill="white" />
                  
                  <rect x="72" y="30" width="18" height="6" />
                  <rect x="88" y="42" width="10" height="18" />
                  
                  <rect x="6" y="66" width="18" height="6" />
                  <rect x="30" y="72" width="6" height="18" />
                  <rect x="42" y="78" width="18" height="6" />
                  <rect x="66" y="66" width="12" height="12" />
                  <rect x="84" y="72" width="14" height="6" />
                  <rect x="60" y="84" width="18" height="6" />
                  <rect x="84" y="84" width="10" height="10" />
                </svg>
                <span className="text-[9px] text-text-muted font-bold tracking-wider mt-2.5 uppercase">Scan on Mobile Screen</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
