import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import { heroSlides } from "../hooks/heroData";
import backgroundWall from "../assets/background-wall.jpg"
import { useState, useEffect } from "react";

// Framer Motion variants for the right-side text details
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
    },
  },
};

const offerVariants = {
  hidden: { scale: 0.7, opacity: 0, rotate: -4 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

const Hero = () => {
  return (
    <section id="home" className="w-full pt-20">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="grid h-[55vh] lg:h-[65vh] w-full grid-cols-1 lg:grid-cols-[60%_40%] overflow-hidden bg-gray-50">

                {/* Left Side (Animated Image with Slide Overlay) */}
                <div className="relative overflow-hidden h-full w-full bg-green-950">
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={isActive ? { scaleX: 0 } : { scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    style={{ transformOrigin: "right center" }}
                    className="absolute inset-0 z-10 bg-green-700"
                  />
                  <motion.picture
                    initial={{
                      scale: 1.3,
                      filter: "blur(8px) brightness(0.7)",
                    }}
                    animate={
                      isActive
                        ? {
                          scale: 1,
                          filter: "blur(0px) brightness(1)",
                        }
                        : {
                          scale: 1.3,
                          filter: "blur(8px) brightness(0.7)",
                        }
                    }
                    transition={{
                      duration: 1.8,
                      ease: [0.25, 1, 0.5, 1],
                      delay: 0.1,
                    }}
                    className="block h-full w-full"
                  >
                    <source
                      media="(max-width: 1023px)"
                      srcSet={slide.MobileImage}
                    />

                    <img
                      src={slide.DesktopImage}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                  </motion.picture>
                  {/* shop button for mobile  */}
                  <motion.div variants={itemVariants}>
                    <motion.button
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="lg:hidden absolute bottom-8 right-8 rounded-full bg-tertiary hover:bg-tertiary/80 px-6 py-2.5 sm:px-8 sm:py-3.5 text-white text-s sm:text-base font-bold tracking-wide shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </div>
                {/* Right Side (Framer Motion Staggered Content) */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isActive ? "visible" : "hidden"}
                  className="hidden lg:flex flex-col items-center justify-center px-6 py-12 text-center lg:px-12 lg:py-0"
                  style={{
                    backgroundImage: `url(${backgroundWall})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* desktop offer card */}
                  <OfferComponent offer={slide.offer} />
                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight font-mono"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.p
                    variants={itemVariants}
                    className="mt-2 sm:mt-4 text-xs sm:text-base lg:text-lg text-gray-500 max-w-md"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-4 sm:mt-8 rounded-full bg-tertiary hover:bg-linear-to-r from-tertiary-dark to-tertiary px-6 py-2.5 sm:px-8 sm:py-3.5 text-white text-xs sm:text-base font-bold tracking-wide shadow-md transition-all duration-300 cursor-pointer"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;


// offer component 

const OfferComponent = ({ offer }) => {
  return (
    <>
      {/* hanging offer component  */}
      < motion.div
        variants={offerVariants}
        className="relative -top-12 -left-24 flex justify-center"
      >
        {/* Rope */}
        < div className="absolute -top-14 left-1/2 h-14 w-[3px] -translate-x-1/2 bg-primary" ></div >
        {/* Board */}
        < motion.div
          animate={{
            rotate: [-4, 4, -4],
          }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative rounded-2xl border-[3px] border-primary bg-white/95 md:px-5 md:py-3 px-3 py-1 shadow-[0_20px_40px_rgba(46,125,50,0.15)]"
        >
          <h3 className="md:text-5xl text-4xl font-black text-primary">
            <span style={{
              fontFamily: "'Syne Mono', monospace"
            }}>{offer} OFF</span>
          </h3>
        </motion.div >
      </motion.div >
    </>
  )
}