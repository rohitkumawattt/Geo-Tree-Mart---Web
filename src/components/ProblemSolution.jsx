import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore, FaLeaf, FaShieldAlt, FaAward } from 'react-icons/fa';
import heroBg from '../assets/hero-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const floatingLeavesRef = useRef([]);

  useEffect(() => {
    const trigger = containerRef.current;
    
    // Smooth slide-in from left for Left Column
    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: window.innerWidth >= 1024 ? -50 : 0, y: window.innerWidth >= 1024 ? 0 : 30 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Smooth slide-in from right/bottom for Right Column
    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: window.innerWidth >= 1024 ? 50 : 0, y: window.innerWidth >= 1024 ? 0 : 40 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // GSAP animation for floating leaves
    floatingLeavesRef.current.forEach((leaf, idx) => {
      if (!leaf) return;
      gsap.to(leaf, {
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        rotation: 'random(-60, 60)',
        duration: 5 + idx * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <section
      id="problem-solution"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden border-b border-primary/5 bg-[#F8FFF8]"
    >
      {/* Background Image (Fog Type) */}
      <img
        src={heroBg}
        alt="GeoTree Mart Forest Background"
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none transform scale-105"
      />

      {/* Light soft white overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/65 to-bg-light" />

      {/* Light radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(248,255,248,0.85)_85%)]" />

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {Array.from({ length: 4 }).map((_, i) => {
          const positions = [
            { top: '15%', left: '8%', size: 'text-2xl', opacity: 'opacity-30' },
            { top: '65%', right: '10%', size: 'text-3xl', opacity: 'opacity-25' },
            { bottom: '15%', left: '12%', size: 'text-xl', opacity: 'opacity-35' },
            { bottom: '40%', right: '8%', size: 'text-2xl', opacity: 'opacity-20' }
          ];
          const pos = positions[i];
          return (
            <div
              key={i}
              ref={(el) => (floatingLeavesRef.current[i] = el)}
              style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
              className={`absolute ${pos.size} ${pos.opacity} text-primary ${i === 0 || i === 2 ? '' : 'hidden md:block'}`}
            >
              <FaLeaf className="transform -rotate-12" />
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Clean Brand Header (Fades in from left) */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 text-left flex flex-col items-start gap-4 will-change-[transform,opacity]"
        >
          <span className="font-display text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-2 inline-block">
            Why GeoTree Mart?
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-text-dark leading-tight tracking-tight">
            Reimagining Bulk Plant Procurement
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed mt-2">
            We bridge the gap between local growers and commercial buyers through digital trust, verified geotagging, and direct marketplace connectivity.
          </p>
          <p className="font-sans text-xs sm:text-sm text-primary font-semibold mt-2 bg-primary/5 px-4 py-3.5 rounded-2xl border border-primary/10 leading-relaxed">
            🌿 "Har nursery ko milega seedha market, aur har buyer ko milega certified quality aur verified tracking."
          </p>
        </div>

        {/* RIGHT COLUMN: Single Premium Glassmorphic Container */}
        <div
          ref={rightColRef}
          className="lg:col-span-7 w-full will-change-[transform,opacity]"
        >
          <div className="w-full rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/60 p-8 sm:p-10 md:p-12 shadow-[0_30px_60px_rgba(27,94,32,0.05)] text-left flex flex-col gap-8">
            
            {/* Core Advantages List */}
            <div className="flex flex-col gap-8 font-sans">
              
              {/* Point 1: Direct B2B */}
              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <FaStore className="text-lg" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                    Direct B2B Marketplace
                  </h4>
                  <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                    "Nurseries ko bade buyers tak direct B2B connectivity."
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
                    Local nurseries list stocks and set transparent prices, bypassing intermediaries to maximize grower profits while lowering procurement costs for buyers.
                  </p>
                </div>
              </div>

              {/* Point 2: GPS Geotag */}
              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <FaLeaf className="text-lg" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                    GPS Geotag Verification
                  </h4>
                  <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                    "Log ped lagate hain aur ab track bhi kar paate hain."
                  </p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1 leading-relaxed">
                    Every listed plant batch is georeferenced at the source nursery. Commercial buyers can verify exact GIS coordinates, species details, and survival logs.
                  </p>
                </div>
              </div>

              {/* Point 3: Transparent Escrow */}
              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <FaShieldAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                    Transparent Escrow Payouts
                  </h4>
                  <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Secure transactions backed by digital escrow. Payouts are routed directly to the nursery's bank account within 24 hours of coordinate and pick-up validation.
                  </p>
                </div>
              </div>

              {/* Point 4: Accredited Quality */}
              <div className="flex gap-4 items-start group">
                <div className="mt-1 w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <FaAward className="text-lg" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                    Accredited Nursery Quality
                  </h4>
                  <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                    Only certified and eco-inspected nurseries can sell on the platform. This ensures high sapling survival rates and healthy plant genetics for all projects.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
