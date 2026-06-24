import React from 'react'
import seed from '../assets/categories/seeds.png'
import fertilizer from '../assets/categories/fertilizer.png'
import pots from '../assets/categories/pots.png'
import tools from '../assets/categories/tools.png'
import plant from '../assets/categories/plants.png'
const categories = [
  { name: "Plants", images: plant },
  { name: "Pots", images: pots },
  { name: "Fertilisers", images: fertilizer },
  { name: "Seeds", images: seed },
  { name: "Garden Tools", images: tools },
];


const OurCategories = () => {
  return (
   <section id="categories" className="relative overflow-hidden bg-primary-dark py-24">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-secondary blur-3xl" />
        <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-accent backdrop-blur-sm">
            Explore Collection
          </span>

          <h2 className="font-display text-5xl font-bold text-white md:text-6xl">
            Our Categories
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-secondary" />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="group flex flex-col items-center"
              >
                <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-secondary/20">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-bg-light">
                    <img
                      src={category.images}
                      alt={category.name}
                      className="w-16 h-16 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    />
                  </div>
                </div>

                <h3 className="mt-5 text-center text-lg font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default OurCategories