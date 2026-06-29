import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vegetables from '../assets/categories/vegitable.png'
import decorative from '../assets/categories/decorative.png'
import Medicinal from '../assets/categories/Medicinal.png'
import outdoor from '../assets/categories/outdoor.png'
import flowring from '../assets/categories/flowring.png'
import fruits from '../assets/categories/fruits.png'

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Vegetables", images: vegetables, color: "#ECF7E9", scale: 1.15 },
  { name: "Decorative", images: decorative, color: "#fffbf5ff", scale: 1.35 },
  { name: "Medicinal", images: Medicinal, color: "#ECF7E9", scale: 1.25 },
  { name: "Outdoor", images: outdoor, color: "#fffbf5ff", scale: 1.15 },
  { name: "Flowring", images: flowring, color: "#ECF7E9", scale: 1.0 },
  { name: "Fruits", images: fruits, color: "#fffbf5ff", scale: 1.05 },
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
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 95%'
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
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 95%'
        }
      }
    );
  }, []);

  return (
    <section id="categories" className="relative overflow-hidden pt-6 pb-4">
      <style dangerouslySetInnerHTML={{__html: `
        .category-card-img {
          transform: scale(var(--base-scale));
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .group:hover .category-card-img {
          transform: scale(var(--hover-scale)) !important;
        }
      `}} />

      <div className="relative mx-auto">
        {/* Heading */}
        <div className="mb-8 text-center group">
          <h2 ref={titleRef} className="font-display md:text-6xl text-4xl sm:text-3xl">
            <span className='italic text-primary'>Explore</span> Collection
          </h2>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 sm:grid-cols-3 lg:grid-cols-6 justify-items-center">
          {categories.map((category, index) => {
            const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <a
                href={`#category/${categorySlug}`}
                key={index}
                className="group flex flex-col items-center cursor-pointer no-underline"
              >
                {/* Outer Circle Container (Responsive sizes: h-32 w-32 on mobile, h-40 w-40 on tablet/desktop) */}
                <div className="relative flex h-44 w-40 md:h-52 md:w-48 items-center justify-center rounded-2xl shadow-xl transition-all duration-500 ease-in-out overflow-hidden group-hover:scale-105 p-1" style={{
                  backgroundColor: category.color,
                  '--base-scale': String(category.scale),
                  '--hover-scale': String(category.scale * 1.15)
                }}>
                  <img
                    src={category.images}
                    alt={category.name}
                    className="w-full h-full object-contain category-card-img"
                    loading="lazy"
                  />
                  {/* Title */}
                  <h3 className="absolute bottom-3 text-primary/60 bg-white rounded-xl px-4 py-1.5 border border-white/50 shadow-md text-xs sm:text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
                    {category.name}
                  </h3>
                </div>

              </a>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default OurCategories