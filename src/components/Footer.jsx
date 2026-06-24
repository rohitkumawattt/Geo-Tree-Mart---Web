import { useState, useEffect } from 'react';
import { FaTree, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    window.triggerDownloadBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 2000); // Blink for 2 seconds (2 loops)
    };
    return () => {
      window.triggerDownloadBlink = null;
    };
  }, []);

  const handleAppStoreClick = (e) => {
    e.preventDefault();
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      window.location.href = 'itms-apps://itunes.apple.com/app/id123456789';
    } else {
      window.open('https://apps.apple.com/app/id123456789', '_blank');
    }
  };

  const handlePlayStoreClick = (e) => {
    e.preventDefault();
    const isAndroid = /Android/i.test(navigator.userAgent);
    if (isAndroid) {
      window.location.href = 'market://details?id=com.geotree.mart';
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.geotree.mart', '_blank');
    }
  };

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="footer" className="w-full bg-[#1A1A1A] text-[#F8FFF8]/80 py-10 md:py-12 px-6 md:px-12 relative overflow-hidden select-none border-t border-primary/10">

      {/* Soft background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-secondary/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 pb-8 border-b border-white/10">

        {/* Left Side: Brand and Social Icons */}
        <div className="md:col-span-3 flex flex-col items-start text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
              <FaTree className="text-white text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg leading-none tracking-tight text-white">
                GeoTree <span className="text-secondary font-bold">Mart</span>
              </span>
              <span className="text-[10px] text-accent font-semibold tracking-widest uppercase mt-0.5">
                Eco Technology
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { icon: <FaFacebookF />, url: "#" },
              { icon: <FaTwitter />, url: "#" },
              { icon: <FaLinkedinIn />, url: "#" },
              { icon: <FaInstagram />, url: "#" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-secondary hover:text-white flex items-center justify-center text-sm transition-all duration-300"
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="md:col-span-2 flex flex-col items-start text-left">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">Links</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-semibold">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Why GeoTree Mart?', id: 'problem-solution' },
              { label: 'Geotagging', id: 'geotagging' },
              { label: 'Buy & Sell', id: 'buy' },
              { label: 'FAQ', id: 'faq' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="hover:text-secondary text-[#F8FFF8]/60 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Center-Right: Contact Info */}
        <div className="md:col-span-4 flex flex-col items-start text-left">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">Contact Info</h4>
          <ul className="flex flex-col gap-3 text-sm text-[#F8FFF8]/60">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-secondary mt-1 text-base flex-shrink-0" />
              <span>408-410, 4th Floor, JTM Mall, Jagatpura, Opp. Railway Station, Jaipur, Rajasthan - 302017 India</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-secondary text-base flex-shrink-0" />
              <a href="mailto:info@geoplanetsolution.com" className="hover:text-secondary transition-colors">
                info@geoplanetsolution.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-secondary text-base flex-shrink-0" />
              <a href="tel:+917976528143" className="hover:text-secondary transition-colors">
                +91-7976528143
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side: App Download Badges */}
        <div id="download-badges" className="md:col-span-3 flex flex-col items-start text-left scroll-mt-24">
          <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">Get Our App</h4>
          <div className="flex flex-col lg:flex-row gap-3 w-full">

            {/* App Store button */}
            <button
              onClick={handleAppStoreClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF2D55] hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,45,85,0.25)] text-white transition-all duration-300 flex-1 min-w-[140px] shadow-sm group cursor-pointer focus:outline-none ${
                isBlinking ? 'animate-blink-apple' : ''
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="apple-rainbow" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF2D55" />
                    <stop offset="50%" stopColor="#8E44AD" />
                    <stop offset="100%" stopColor="#007AFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39"
                  fill="url(#apple-rainbow)"
                />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] text-white/50 uppercase tracking-widest font-semibold font-sans">Download on</span>
                <span className="text-xs font-extrabold font-display mt-0.5">App Store</span>
              </div>
            </button>

            {/* Play Store button */}
            <button
              onClick={handlePlayStoreClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#4CAF50] hover:bg-white/10 hover:shadow-[0_0_15px_rgba(76,175,80,0.25)] text-white transition-all duration-300 flex-1 min-w-[140px] shadow-sm group cursor-pointer focus:outline-none ${
                isBlinking ? 'animate-blink-google' : ''
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.25 2.5C3.09 2.66 3 2.92 3 3.25V20.75C3 21.08 3.09 21.34 3.25 21.5L3.31 21.56L12.92 11.95V11.83V11.71L3.31 2.1L3.25 2.16V2.5Z" fill="#00E5FF" />
                <path d="M16.12 15.16L12.92 11.95V11.71L16.12 8.51L16.19 8.55L19.98 10.7C21.06 11.31 21.06 12.31 19.98 12.92L16.19 15.07L16.12 15.16Z" fill="#FFC107" />
                <path d="M12.92 11.83L3.25 21.5C3.41 21.66 3.68 21.68 3.99 21.5L16.12 14.62L12.92 11.83Z" fill="#FF3D00" />
                <path d="M12.92 11.83L16.12 9.04L3.99 2.16C3.68 1.98 3.41 2 3.25 2.16L12.92 11.83Z" fill="#4CAF50" />
              </svg>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[8px] text-white/50 uppercase tracking-widest font-semibold font-sans">Get it on</span>
                <span className="text-xs font-extrabold font-display mt-0.5">Google Play</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8FFF8]/40 font-sans">
        <p>© {currentYear} GeoTree Mart. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-secondary transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
