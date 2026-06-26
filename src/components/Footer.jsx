import {
  FaLeaf,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaApple,
  FaGooglePlay
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (id) => {
    if (id === 'blog') {
      window.location.hash = '#blog';
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }
    const currentHash = window.location.hash;
    const isSpecialPage = currentHash.startsWith('#category/') || currentHash === '#blog' || currentHash.startsWith('#product/');
    if (isSpecialPage) {
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el);
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleCategoryClick = (categorySlug) => {
    window.location.hash = `#category/${categorySlug}`;
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer id="footer" className="w-full bg-[#0f1f10] text-[#F8FFF8]/80 pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Modern Wave Divider at the top of the footer */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg className="relative block w-full h-[35px] md:h-[55px]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill='white'>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V95.8C67.81,111.31,144.29,103.7,214.34,85.22,250.74,75.6,286.27,66.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Grid Dot Texture Background */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#66BB6A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Botanical Border Background Illustration (Visible all the way to the bottom) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[150px] md:h-[200px] bg-bottom bg-repeat-x bg-contain pointer-events-none opacity-35 mix-blend-screen z-0"
        style={{ backgroundImage: 'url("/footer-bg.png")' }}
      />

      {/* Glowing Ambient Light Orbs */}
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[-50px] right-[-50px] w-[400px] h-[400px] bg-secondary/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto pb-16 relative z-10">

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-3 sm:col-span-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4 group/brand">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shadow-primary/20 transform transition-transform group-hover/brand:scale-105 duration-500">
                <img src="./favicon.png" alt="GeoTree Mart Logo" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl leading-none tracking-tight text-white">
                  GeoTree <span className="text-secondary font-bold">Mart</span>
                </span>
                <span className="text-[10px] text-primary font-bold tracking-widest uppercase mt-0.5">
                  <span className="text-white/70">By</span> Geo Planet Solution
                </span>
              </div>
            </div>
            <p className="text-sm text-white/50 font-medium leading-relaxed max-w-sm mb-4">
              India's first geotagged plant marketplace, connecting gardening enthusiasts with accredited organic nurseries.
            </p>
            <div className="w-full">
              <h5 className="font-display font-extrabold text-white text-xs tracking-wider uppercase mb-3 relative inline-block">
                Download Our App
                <span className="absolute bottom-[-4px] left-0 w-6 h-[1.5px] bg-secondary rounded-full" />
              </h5>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-white/10 rounded-xl px-3.5 py-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <FaGooglePlay className="text-lg text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-white/40 font-semibold uppercase tracking-wider leading-none">GET IT ON</span>
                    <span className="text-xs font-bold text-white tracking-wide mt-0.5">Google Play</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-secondary/40 hover:bg-white/10 rounded-xl px-3.5 py-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <FaApple className="text-xl text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-white/40 font-semibold uppercase tracking-wider leading-none">Download on the</span>
                    <span className="text-xs font-bold text-white tracking-wide mt-0.5">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col items-start text-left lg:pl-2">
            <h5 className="font-display font-extrabold text-white text-sm tracking-wider uppercase mb-4 relative inline-block">
              Explore
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h5>
            <ul className="flex flex-col gap-3.5 text-sm font-semibold font-sans">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Categories', id: 'categories' },
                { label: 'Plants Store', id: 'buy' },
                { label: 'Why Choose Us', id: 'problem-solution' },
                { label: 'Customer Reviews', id: 'feedback' },
                { label: 'FAQs & Support', id: 'faq' },
                { label: 'Nursery Blog', id: 'blog' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="group flex items-center gap-2.5 hover:text-secondary text-white/60 transition-all duration-300 cursor-pointer text-left focus:outline-none transform hover:translate-x-2"
                  >
                    <FaLeaf className="text-[10px] text-secondary scale-0 group-hover:scale-100 transition-transform duration-300 flex-shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Shop Categories */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col items-start text-left lg:pl-2">
            <h5 className="font-display font-extrabold text-white text-sm tracking-wider uppercase mb-4 relative inline-block">
              Categories
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h5>
            <ul className="flex flex-col gap-3.5 text-sm font-semibold font-sans">
              {[
                { label: 'Vegetables', slug: 'vegetables' },
                { label: 'Ornamentals', slug: 'decorative' },
                { label: 'Medicinals', slug: 'medicinal' },
                { label: 'Outdoors', slug: 'outdoor' },
                { label: 'Flowering', slug: 'flowring' },
                { label: 'Fruits', slug: 'fruits' }
              ].map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="group flex items-center gap-2.5 hover:text-secondary text-white/60 transition-all duration-300 cursor-pointer text-left focus:outline-none transform hover:translate-x-2"
                  >
                    <FaLeaf className="text-[10px] text-secondary scale-0 group-hover:scale-100 transition-transform duration-300 flex-shrink-0" />
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col items-start text-left lg:pl-2">
            <h5 className="font-display font-extrabold text-white text-sm tracking-wider uppercase mb-4 relative inline-block">
              Privacy & Info
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h5>
            <ul className="flex flex-col gap-3.5 text-sm font-semibold font-sans">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Settings', href: '#' },
                { label: 'Shipping Policy', href: '#' },
                { label: 'Refund Policy', href: '#' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2.5 hover:text-secondary text-white/60 transition-all duration-300 cursor-pointer text-left focus:outline-none transform hover:translate-x-2"
                  >
                    <FaLeaf className="text-[10px] text-secondary scale-0 group-hover:scale-100 transition-transform duration-300 flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact details */}
          <div className="lg:col-span-3 sm:col-span-1 flex flex-col items-start text-left lg:pl-2">
            <h5 className="font-display font-extrabold text-white text-sm tracking-wider uppercase mb-4 relative inline-block">
              Support
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-secondary rounded-full" />
            </h5>
            <ul className="flex flex-col gap-4 text-sm text-white/60 font-medium w-full font-sans">
              <li className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary text-sm flex-shrink-0 group-hover:bg-secondary/15 group-hover:border-secondary/35 transition-all">
                  <FaMapMarkerAlt />
                </div>
                <a
                  href="https://maps.google.com/?q=JTM+Mall+Jagatpura+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors pt-0.5 leading-relaxed text-xs"
                >
                  408-410, JTM Mall, Jagatpura, Jaipur - 302017
                </a>
              </li>
              <li className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary text-sm flex-shrink-0 group-hover:bg-secondary/15 group-hover:border-secondary/35 transition-all">
                  <FaEnvelope />
                </div>
                <a href="mailto:info@geoplanetsolution.com" className="hover:text-secondary transition-colors text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  info@geoplanetsolution.com
                </a>
              </li>
              <li className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary text-sm flex-shrink-0 group-hover:bg-secondary/15 group-hover:border-secondary/35 transition-all">
                  <FaPhoneAlt />
                </div>
                <a href="tel:+917976528143" className="hover:text-secondary transition-colors text-xs">
                  +91-7976528143
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom links and Copyright (Restored Flat Layout) */}
        <div className="pt-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left relative -top-3 md:-top-5">
            <p className="text-white font-semibold">© {currentYear} GeoTree Mart. All rights reserved.</p>
            <span className="hidden sm:inline text-white/30">|</span>
            <p className="text-[11px] text-white/90 font-semibold">
              Registered Office: Geo Planet Solution Pvt. Ltd.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
