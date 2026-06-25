import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore, FaLeaf, FaShieldAlt, FaAward, FaTruck, FaChartLine } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const floatingLeavesRef = useRef([]);

  useEffect(() => {
    const trigger = containerRef.current;

    // Smooth slide-in from left for Left Column
    gsap.fromTo(
      leftColRef.current,
      { opacity: 0, x: window.innerWidth >= 1024 ? -60 : 0, y: window.innerWidth >= 1024 ? 0 : 30 },
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

    // Smooth scale-up and fade-in for Center Column (the girl portrait)
    gsap.fromTo(
      centerColRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: trigger,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Smooth slide-in from right for Right Column
    gsap.fromTo(
      rightColRef.current,
      { opacity: 0, x: window.innerWidth >= 1024 ? 60 : 0, y: window.innerWidth >= 1024 ? 0 : 30 },
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

    // GSAP animation for floating leaves
    floatingLeavesRef.current.forEach((leaf, idx) => {
      if (!leaf) return;
      gsap.to(leaf, {
        x: 'random(-35, 35)',
        y: 'random(-35, 35)',
        rotation: 'random(-60, 60)',
        duration: 6 + idx * 2,
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
      className="relative w-full py-12 overflow-hidden border-b border-primary/5 bg-[#F8FFF8]"
    >
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Centered Header (Matches "Why Choose Us" style from reference image) */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GeoTree Mart?</span>
          </h2>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">

          {/* LEFT COLUMN: 3 Points (Aligned right on desktop, left on mobile) */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col gap-10 sm:gap-12 order-2 lg:order-1 w-full will-change-[transform,opacity]"
          >
            {/* Point 1: Direct B2B */}
            <div className="flex flex-row lg:flex-row-reverse gap-4 items-start lg:text-right text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaStore className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  Direct B2B Marketplace
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Nurseries ko bade buyers tak direct B2B connectivity."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Local nurseries list stocks and set transparent prices, bypassing intermediaries to maximize grower profits while lowering procurement costs.
                </p>
              </div>
            </div>

            {/* Point 2: GPS Geotag */}
            <div className="flex flex-row lg:flex-row-reverse gap-4 items-start lg:text-right text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaLeaf className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  GPS Geotag Verification
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Log ped lagate hain aur ab track bhi kar paate hain."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Every listed plant batch is georeferenced at the source nursery. Commercial buyers can verify exact GIS coordinates and species details.
                </p>
              </div>
            </div>

            {/* Point 3: Direct Logistics */}
            <div className="flex flex-row lg:flex-row-reverse gap-4 items-start lg:text-right text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaTruck className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  Direct Logistics Support
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Safe transport aur reliable delivery ki tension khatam."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Integrated logistics partners handle bulk sapling transport from nurseries directly to planting sites with optimized routing and handling.
                </p>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Circular Portrait of the Expert Woman with a Tree/Nature above her */}
          <div
            ref={centerColRef}
            className="lg:col-span-4 hidden md:flex flex-col items-center justify-center order-1 lg:order-2 w-full will-change-[transform,opacity]"
          >

            {/* Glowing Circular Frame */}
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border-[6px] border-white shadow-[0_20px_50px_rgba(27,94,32,0.12)] bg-gradient-to-tr from-primary/15 to-secondary/15 p-1.5 z-10 flex items-center justify-center group">

              {/* Outer decorative pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-105 animate-pulse-slow pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-secondary/5 scale-110 animate-pulse pointer-events-none" />

              <img
                src="./favicon.png"
                alt="GeoTree Mart Sustainability Expert"
                className="w-full h-full object-cover rounded-full select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: 3 Points (Aligned left on both desktop and mobile) */}
          <div
            ref={rightColRef}
            className="lg:col-span-4 flex flex-col gap-10 sm:gap-12 order-3 w-full will-change-[transform,opacity]"
          >
            {/* Point 4: Transparent Escrow */}
            <div className="flex flex-row gap-4 items-start text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaShieldAlt className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  Transparent Escrow Payouts
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Payouts direct nursery ke bank account me within 24h."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Secure transactions backed by digital escrow. Payments are routed directly to the nursery's account upon coordinate and pickup validation, bypassing middle-tier agents.
                </p>
              </div>
            </div>

            {/* Point 5: Accredited Quality */}
            <div className="flex flex-row gap-4 items-start text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaAward className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  Accredited Nursery Quality
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Certified aur eco-inspected nurseries se genuine saplings."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Only certified, eco-inspected nursery partners can sell on the platform. This ensures high sapling survival rates and healthy plant genetics for all offset projects.
                </p>
              </div>
            </div>

            {/* Point 6: Live Growth Tracking */}
            <div className="flex flex-row gap-4 items-start text-left group w-full">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <FaChartLine className="text-xl" />
              </div>
              <div className="hidden lg:block h-[1px] w-8 border-t-2 border-dashed border-primary/20 group-hover:border-primary/50 transition-colors duration-300 self-center"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  Live Growth Tracking
                </h4>
                <p className="text-primary font-semibold text-[11px] sm:text-xs mt-0.5">
                  "Saplings ke survival aur health ki regular growth updates."
                </p>
                <p className="text-text-muted text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Periodic GIS coordinates updates and remote health monitoring help corporate buyers track tree survival logs and verify carbon offset impact over time.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
