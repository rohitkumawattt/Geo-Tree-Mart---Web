import { Swiper, SwiperSlide } from "swiper/react";
import { MdDiscount } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import { heroSlides } from "../hooks/heroData";

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
              <div className="h-[55vh] lg:h-[65vh] w-full overflow-hidden bg-gray-50">
                <div className="relative overflow-hidden h-full w-full bg-green-950">

                  {/* Slide Transition Overlay */}
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={isActive ? { scaleX: 0 } : { scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    style={{ transformOrigin: "right center" }}
                    className="absolute inset-0 z-30 bg-green-700"
                  />

                  {/* Hero Background Image */}
                  <motion.picture
                    initial={{
                      scale: 1.3,
                      filter: "blur(8px) brightness(0.7)",
                    }}
                    animate={
                      isActive
                        ? {
                          scale: 1,
                          filter: "blur(0px) brightness(0.75)",
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

                  {/* Dark fog component */}
                  <div className="absolute inset-0 bg-black/20 md:bg-gradient-to-r md:from-black/60 md:via-black/25 md:to-transparent z-10 pointer-events-none" />

                  {/* Hanging Offer carrd */}
                  <div className="hidden md:block absolute top-20 right-8 sm:right-16 md:right-28 z-20 pointer-events-none">
                    <OfferComponent offer={slide.offer} />
                  </div>

                  {/* Slide Details Content Overlay */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="hidden absolute inset-0 z-20 md:flex flex-col justify-center items-start px-6 sm:px-12 md:px-20 lg:px-32 text-left"
                  >
                    {/* Title */}
                    <motion.h2
                      variants={itemVariants}
                      className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-md leading-tight max-w-2xl"
                    >
                      {slide.title.split(" ").map((word, index) => (
                        <span
                          key={index}
                          className={`${index === 0
                            ? "text-accent ibm-font italic font-medium"
                            : "text-white font-extrabold"
                            } mr-3 inline-block`}
                        >
                          {word}
                        </span>
                      ))}
                    </motion.h2>

                    {/* Dynamic Description */}
                    <motion.p
                      variants={itemVariants}
                      className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200/95 max-w-md sm:max-w-lg font-light tracking-wide leading-relaxed drop-shadow-sm"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Unified Shop Now Button */}
                    <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2.5 rounded-full  px-6 py-3 sm:px-8 sm:py-4 text-white text-sm sm:text-base font-bold shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-primary-dark to-primary"
                      >
                        <span>Shop Now</span>
                        <FaLongArrowAltRight className="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-1.5" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                  {/* mobile button  */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute md:hidden bottom-10 right-10 group flex items-center gap-2.5 rounded-full  px-6 py-3 sm:px-8 sm:py-4 text-white text-sm sm:text-base font-bold shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-primary-dark to-primary"
                  >
                    <span>Shop Now</span>
                    <FaLongArrowAltRight className="text-lg sm:text-xl transition-transform duration-300 group-hover:translate-x-1.5" />
                  </motion.button>


                </div>
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