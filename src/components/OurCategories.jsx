import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vegitables from '../assets/categories/vegitable.png'
import decorative from '../assets/categories/decorative.png'
import Medicinal from '../assets/categories/Medicinal.png'
import outdoor from '../assets/categories/outdoor.png'
import flowring from '../assets/categories/flowring.png'
import fruits from '../assets/categories/fruits.png'

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Vegitable", images: vegitables, color: "#ECF7E9" },
  { name: "Decorative", images: decorative, color: "#fffbf5ff" },
  { name: "Medicinal", images: Medicinal, color: "#ECF7E9" },
  { name: "Outdoor", images: outdoor, color: "#fffbf5ff" },
  { name: "Flowring", images: flowring, color: "#ECF7E9" },
  { name: "Fruits", images: fruits, color: "#fffbf5ff" },
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
    <section id="categories" className="relative overflow-hidden py-12">

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-8 text-center group">
          <h2 ref={titleRef} className="font-display md:text-6xl text-4xl sm:text-3xl">
            <span className='italic'>Explore</span> Collection
          </h2>
          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-secondary transition-all duration-500 group-hover:scale-x-150" />
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
                <div className="flex h-40 w-32 md:h-46 md:w-38 items-center justify-center rounded-md shadow-xl transition-all duration-500 ease-in-out overflow-hidden group-hover:scale-105 p-2" style={{
                  backgroundColor: category.color
                }}>
                  <img
                    src={category.images}
                    alt={category.name}
                    className="relative object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Title */}
                  <h3 className="absolute bottom-2 text-primary/60 bg-white rounded-xl px-4 py-1 border border-white/50 shadow-md text-xs sm:text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
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