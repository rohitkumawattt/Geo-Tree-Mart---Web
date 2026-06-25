import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload as DownloadIcon, FiArrowRight as ArrowIcon } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import gsap from 'gsap';
import heroBg from '../assets/hero-bg.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const floatingLeavesRef = useRef([]);

  // GSAP animation for floating leaves following a gentle organic path
  useEffect(() => {
    floatingLeavesRef.current.forEach((leaf, idx) => {
      if (!leaf) return;
      gsap.to(leaf, {
        x: 'random(-40, 40)',
        y: 'random(-40, 40)',
        rotation: 'random(-90, 90)',
        duration: 4 + idx * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);
  const handleDownloadClick = () => {
    const element = document.getElementById('download-badges');
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(element, {
          offset: -80,
          onComplete: () => {
            if (typeof window.triggerDownloadBlink === 'function') {
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

        setTimeout(() => {
          if (typeof window.triggerDownloadBlink === 'function') {
            window.triggerDownloadBlink();
          }
        }, 800);
      }
    }
  };

  // Split title into words for staggered reveal
  const titleText = "Your Online Plant Paradise";
  const words = titleText.split(" ");

  // Container variants for staggered text children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      /* CHANGED: Removed min-h-screen. Added min-h-[65vh] md:min-h-[75vh] to reduce height. */
      /* CHANGED: Reduced pb-24 sm:pb-28 to pb-12 sm:pb-16 to cut down extra bottom space. */
      className="relative w-full min-h-[65vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-bg-light pb-12 sm:pb-16 pt-20"
    >
      {/* Background Image */}
      <img
        src={heroBg}
        alt="GeoTree Mart Forest Background"
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none transform scale-105"
      />

      {/* Light soft white overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/50 to-bg-light" />

      {/* Light radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(248,255,248,0.7)_85%)]" />

      {/* Floating Leaves (Nature + Tech theme) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {Array.from({ length: 6 }).map((_, i) => {
          const positions = [
            { top: '18%', left: '10%', size: 'text-2xl', opacity: 'opacity-40' },
            { top: '25%', right: '12%', size: 'text-4xl', opacity: 'opacity-30' },
            { bottom: '22%', left: '15%', size: 'text-3xl', opacity: 'opacity-35' },
            { bottom: '30%', right: '18%', size: 'text-5xl', opacity: 'opacity-25' },
            { top: '65%', left: '8%', size: 'text-4xl', opacity: 'opacity-20' },
            { top: '45%', right: '5%', size: 'text-2xl', opacity: 'opacity-45' }
          ];
          const pos = positions[i];
          return (
            <div
              key={i}
              ref={(el) => (floatingLeavesRef.current[i] = el)}
              style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
              className={`absolute ${pos.size} ${pos.opacity} text-primary ${i === 0 || i === 5 ? '' : 'hidden md:block'
                }`}
            >
              <FaLeaf className="transform -rotate-12 hover:scale-110 transition-transform duration-300" />
            </div>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-text-dark select-none mt-10">

        {/* Animated Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-6xl leading-[1.05] tracking-tight mb-4 text-text-dark"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0">
              <motion.span
                variants={wordVariants}
                className={`inline-block ${['Paradise'].includes(word)
                  ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                  : ''
                  }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto font-sans font-normal text-base sm:text-lg md:text-xl text-text-muted leading-relaxed mb-10"
        >
          Direct nursery-to-buyer plant procurement. Connecting verified growers with individuals, NGOs, governments, and corporations for transparent, large-scale reforestation.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={handleDownloadClick}
            className="md:w-[327px] w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/35 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus:outline-none"
          >
            <span>Get Started</span>
            <ArrowIcon className="text-lg" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}