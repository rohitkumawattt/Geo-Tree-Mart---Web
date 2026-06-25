import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore, FaLeaf, FaShieldAlt, FaAward, FaTruck, FaHeadset } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const FEATURES_DATA = [
  {
    icon: FaStore,
    title: "Direct Nursery Sourcing",
    slogan: "Accredited nurseries se direct healthy plants.",
    desc: "We connect you directly with certified organic nurseries, ensuring you get the freshest plants straight from where they are grown."
  },
  {
    icon: FaLeaf,
    title: "1000+ Plant Varieties",
    slogan: "Indoor, outdoor aur rare exotic plants ka collection.",
    desc: "Explore a vast selection of air-purifying plants, indoor foliage, outdoor flowering plants, succulents, and seasonal varieties."
  },
  {
    icon: FaAward,
    title: "Healthy Plant Genetics",
    slogan: "Quality inspected plants for maximum survival rate.",
    desc: "Every plant is grown under optimal nursery conditions, guaranteeing robust root systems and disease-resistant genetics."
  },
  {
    icon: FaShieldAlt,
    title: "Secure Buyer Escrow",
    slogan: "Secure payment gateway with buyer protection.",
    desc: "Your transactions are protected via secure digital escrow, releasing funds to the nursery only after order pickup confirmation."
  },
  {
    icon: FaTruck,
    title: "Direct Nursery Pickups",
    slogan: "Nursery se direct pickup aur spot inspection.",
    desc: "Skip shipping costs and delivery delays. Order online and pick up your plants directly from the nearby nursery, inspecting them firsthand."
  },
  {
    icon: FaHeadset,
    title: "Free Plant Care Guides",
    slogan: "Har plant ke liye expert watering aur maintenance support.",
    desc: "Access free, step-by-step care consulting from professional horticulturists to help your plants grow and thrive forever."
  }
];

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    // Animations matching the staggered layout
    gsap.fromTo(
      leftColRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      centerColRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.1)',
        scrollTrigger: {
          trigger: centerColRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      rightColRef.current.children,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section
      id="problem-solution"
      ref={containerRef}
      className="relative w-full py-20 bg-gradient-to-b from-[#F8FFF8] to-[#EEFBEF] px-6 md:px-12 overflow-hidden border-b border-primary/5"
    >
      {/* Huge faded leaf watermark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <FaLeaf className="text-[500px] sm:text-[700px] text-primary rotate-45" />
      </div>

      {/* Decorative ambient spots */}
      <div className="absolute top-[20%] left-[-100px] w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-100px] w-96 h-96 bg-secondary/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GeoTree Mart?</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
        </div>

        {/* 3-Column Curved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center">

          {/* LEFT SIDE: 3 points */}
          <div
            ref={leftColRef}
            className="lg:col-span-4 flex flex-col gap-12 order-2 lg:order-1"
          >
            {/* Point 1: Direct Nursery Sourcing (Top-Left) */}
            <div className="flex flex-row gap-4 items-start lg:items-center lg:justify-end text-left lg:text-right group lg:translate-x-12 transition-transform duration-300">
              <div className="flex-1 order-2 lg:order-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[0].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[0].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[0].desc}
                </p>
              </div>
              <div className="order-1 lg:order-2 w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaStore className="text-xl" />
              </div>
            </div>

            {/* Point 2: 1000+ Plant Varieties (Middle-Left) */}
            <div className="flex flex-row gap-4 items-start lg:items-center lg:justify-end text-left lg:text-right group transition-transform duration-300">
              <div className="flex-1 order-2 lg:order-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[1].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[1].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[1].desc}
                </p>
              </div>
              <div className="order-1 lg:order-2 w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaLeaf className="text-xl" />
              </div>
            </div>

            {/* Point 3: Healthy Plant Genetics (Bottom-Left) */}
            <div className="flex flex-row gap-4 items-start lg:items-center lg:justify-end text-left lg:text-right group lg:translate-x-12 transition-transform duration-300">
              <div className="flex-1 order-2 lg:order-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[2].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[2].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[2].desc}
                </p>
              </div>
              <div className="order-1 lg:order-2 w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaAward className="text-xl" />
              </div>
            </div>
          </div>

          {/* CENTER: Circular Portrait */}
          <div
            ref={centerColRef}
            className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 w-full"
          >
            {/* Circular Gradient Frame */}
            <div className="relative w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border-[8px] border-white shadow-[0_25px_60px_rgba(27,94,32,0.18)] bg-gradient-to-b from-[#113a1c] to-[#041006] p-1 z-10 flex items-center justify-center group overflow-hidden">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-white/20 scale-105 animate-pulse-slow pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-primary/10 scale-110 pointer-events-none" />
              
              {/* Horticulturist Portrait Image */}
              <img
                src="./expert-portrait.png"
                alt="GeoTree Mart Sustainability Expert"
                className="w-[92%] h-[92%] object-cover rounded-full select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* RIGHT SIDE: 3 points */}
          <div
            ref={rightColRef}
            className="lg:col-span-4 flex flex-col gap-12 order-3"
          >
            {/* Point 4: Secure Buyer Escrow (Top-Right) */}
            <div className="flex flex-row gap-4 items-start lg:items-center text-left group lg:-translate-x-12 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaShieldAlt className="text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[3].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[3].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[3].desc}
                </p>
              </div>
            </div>

            {/* Point 5: Direct Nursery Pickups (Middle-Right) */}
            <div className="flex flex-row gap-4 items-start lg:items-center text-left group transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaTruck className="text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[4].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[4].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[4].desc}
                </p>
              </div>
            </div>

            {/* Point 6: Free Plant Care Guides (Bottom-Right) */}
            <div className="flex flex-row gap-4 items-start lg:items-center text-left group lg:-translate-x-12 transition-transform duration-300">
              <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 text-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaHeadset className="text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-extrabold text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
                  {FEATURES_DATA[5].title}
                </h4>
                <p className="text-primary font-semibold text-xs mt-0.5">
                  "{FEATURES_DATA[5].slogan}"
                </p>
                <p className="text-text-muted text-sm mt-2 leading-relaxed">
                  {FEATURES_DATA[5].desc}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
