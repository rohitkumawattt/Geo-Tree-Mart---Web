import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import seed from '../assets/categories/seeds.png'
import fertilizer from '../assets/categories/fertilizer.png'
import pots from '../assets/categories/pots.png'
import tools from '../assets/categories/tools.png'
import plant from '../assets/categories/plants.png'
import soil from '../assets/categories/soil.png'

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Plants", images: plant },
  { name: "Pots", images: pots },
  { name: "Fertilisers", images: fertilizer },
  { name: "Soil", images: soil },
  { name: "Seeds", images: seed },
  { name: "Garden Tools", images: tools },
];

const OurCategories = () => {
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Title & description entrance animation
    gsap.fromTo(
      titleRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
        }
      }
    );

    // Categories grid cards entrance animation with a spring bounce
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section id="categories" className="relative overflow-hidden bg-primary-dark py-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 ref={titleRef} className="font-display text-2xl sm:text-3xl font-bold text-white md:text-4xl">
            Our Categories
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-secondary" />
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-2 sm:gap-8 sm:grid-cols-3 lg:grid-cols-6 justify-items-center">
          {categories.map((category, index) => {
            const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <a
                href={`#category/${categorySlug}`}
                key={index}
                className="group flex flex-col items-center cursor-pointer no-underline"
              >
                {/* Outer Circle Container (Responsive sizes: h-32 w-32 on mobile, h-40 w-40 on tablet/desktop) */}
                <div className="flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full border border-white/10 bg-white shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-secondary/20">
                  <img
                    src={category.images}
                    alt={category.name}
                    className="w-12 h-12 sm:w-20 sm:h-20 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-4 sm:mt-5 text-center text-base sm:text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent">
                  {category.name}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default OurCategories