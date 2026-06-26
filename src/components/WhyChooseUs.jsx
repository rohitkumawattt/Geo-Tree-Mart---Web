import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore, FaLeaf, FaTag, FaShieldAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const FEATURES_DATA = [
  {
    icon: FaStore,
    title: "Direct from Growers",
    desc: "We connect you directly with certified local nurseries, ensuring you get fresh plants straight from where they are grown."
  },
  {
    icon: FaLeaf,
    title: "Premium Quality",
    desc: "Every plant is grown under expert nursery supervision, quality-inspected, and guaranteed to have healthy root genetics."
  },
  {
    icon: FaTag,
    title: "Best Market Rates",
    desc: "Buy high-quality plants directly at genuine nursery prices with zero middleman markup."
  },
  {
    icon: FaShieldAlt,
    title: "Transit Guarantee",
    desc: "Fresh and safe delivery right to your doorstep. If your plant is damaged during transit, we provide a free replacement."
  }
];

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 95%',
        }
      }
    );
  }, []);

  return (
    <section
      id="problem-solution"
      ref={containerRef}
      className="relative w-full py-20 bg-bg-light px-6 md:px-12 overflow-hidden"
    >
      {/* Huge faded leaf watermark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <svg className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] text-primary rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 8C8 10 5.9 16.12 5 21C6.9 20.1 13 18 15 9C16.2 9 17.5 9.8 19 11C21 8 21 5 21 5S18 5 17 8M3 21C3.9 16.12 6 10 15 8C14 5 11 5 11 5S11 8 9 11C7.5 9.8 6.2 9 5 9C3 18 3 21 3 21Z" />
        </svg>
      </div>

      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[-100px] w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-96 h-96 bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center group">
          <h2 className="font-display text-3xl sm:text-5xl text-[#0f1f10] leading-tight tracking-tight">
            Why Choose <span className="text-primary italic">GeoTree Mart?</span>
          </h2>
        </div>

        {/* Features Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Dashed Connecting Line behind icons (Desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent border-t border-dashed border-primary/30 z-0 pointer-events-none" />

          {/* 4-Column Centered Feature Grid */}
          <div
            ref={cardsRef}
            className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-12 text-center"
          >
            {FEATURES_DATA.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center group transition-all duration-300"
                >
                  {/* Soft Round Icon Container with Hover Scale & Rotation */}
                  <div className="w-16 h-16 rounded-full bg-white border border-[#e1e2e1] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_10px_25px_rgba(46,125,50,0.25)] transition-all duration-500 relative">
                    <IconComponent className="text-xl transition-transform duration-700 ease-out" />
                  </div>
                  {/* Feature Title */}
                  <h4 className="font-display font-extrabold text-lg text-[#0f1f10] mb-1 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>

                  {/* Tiny Interactive Accent Line */}
                  <div className="w-6 h-[2px] bg-secondary/20 mx-auto mt-1 mb-3 group-hover:w-12 group-hover:bg-primary transition-all duration-300 rounded-full" />

                  {/* Feature Description */}
                  <p className="text-[#0f1f10]/60 text-sm leading-relaxed max-w-xs px-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
