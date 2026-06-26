import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const PLANTS_DATA = [
  { id: 'neem', name: 'Neem Sapling', category: 'Medicinal', price: 15, originalPrice: 25, stock: 42000, origin: 'Jaipur Organic Greens', image: 'https://images.unsplash.com/photo-1661776358099-38f6daea7752?auto=format&fit=crop&w=400&q=80', desc: 'Hardy native species, ideal for hot climates.' },
  { id: 'mango', name: 'Mango (Aam)', category: 'Fruit Tree', price: 30, originalPrice: 45, stock: 12000, origin: 'Malviya Nagar Growers', image: 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?auto=format&fit=crop&w=400&q=80', desc: 'Young mango sapling tree in nursery bag.' },
  { id: 'guava', name: 'Guava (Amrud)', category: 'Fruit Tree', price: 22, originalPrice: 35, stock: 18000, origin: 'Amer Forest Growers', image: 'https://images.unsplash.com/photo-1663315110779-ffaa2fde4f0b?auto=format&fit=crop&w=400&q=80', desc: 'Organic potted guava plant sapling.' },
  { id: 'ashoka', name: 'Ashoka Tree', category: 'Ornamental', price: 28, originalPrice: 40, stock: 15000, origin: 'Sanganer Seedlings Hub', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', desc: 'Tall evergreen foliage, perfect for boundary avenues.' },
  { id: 'plumeria', name: 'Plumeria (Champa)', category: 'Flowering', price: 25, originalPrice: 35, stock: 9500, origin: 'Jagatpura Flora Farm', image: 'https://images.unsplash.com/photo-1717748903944-8232cdf47a65?auto=format&fit=crop&w=400&q=80', desc: 'Potted plumeria champa sapling.' },
  { id: 'peepal', name: 'Peepal Sapling', category: 'Forest Tree', price: 18, originalPrice: 28, stock: 15000, origin: 'Amer Forest Growers', image: 'https://images.unsplash.com/photo-1709314879220-d1619e91bb61?auto=format&fit=crop&w=400&q=80', desc: 'High oxygen output, vital ecological value.' }
];

export default function Plants() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const handleMoreClick = (e) => {
    e.preventDefault();
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

  useEffect(() => {
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

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 95%'
        }
      }
    );
  }, []);

  return (
    <section
      id="buy"
      ref={containerRef}
      className="relative w-full py-12 bg-bg-light px-6 md:px-12 overflow-hidden border-b border-primary/5"
    >
      {/* Blurred background vectors */}
      <div className="absolute top-1/3 left-0 w-[380px] h-[380px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Title Area */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center group">
          <h2 className="font-display text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight">
            <span className="italic">Bring Your First</span> <br /> Green Friend Home
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-secondary transition-all duration-500 group-hover:scale-x-150" />
          <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed mt-5">
            Choose from a wide variety of verified plant species raised by accredited local nurseries. Order high-volume stocks directly via our platform app.
          </p>
        </div>

        {/* Plants Catalog Grid - Responsive layout fitting 6 in a row on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          {PLANTS_DATA.map((plant, index) => (
            <div key={plant.id} className="w-full will-change-[transform,opacity]">
              <div 
                className="w-full h-full rounded-2xl border border-primary/5 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300 flex flex-col overflow-hidden group text-left cursor-pointer transform hover:-translate-y-1.5"
                style={{ backgroundColor: index % 2 === 0 ? '#ECF7E9' : '#FFFBF5' }}
              >

                {/* Plant Image Container - Styled with absolute positioning to prevent margins */}
                <div className="relative aspect-square w-full p-2.5">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="absolute inset-2.5 w-[calc(100%-20px)] h-[calc(100%-20px)] object-cover rounded-xl shadow-sm transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Category Pill Badge - Centered bottom matching category list style */}
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-white/50 z-10 whitespace-nowrap">
                    {plant.category}
                  </span>

                  {/* Discount Percentage Badge */}
                  <span className="absolute top-4 right-4 bg-rose-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
                    {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Plant Card Details */}
                <div className="p-3.5 pt-1 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-display font-black text-sm md:text-base text-text-dark leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {plant.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-text-muted text-[10px] mt-1.5 font-semibold truncate">
                      <FaStore className="text-primary text-[10px] flex-shrink-0" />
                      <span className="truncate">{plant.origin}</span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-black/[0.04] flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold">Bulk Price</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-primary font-display font-black text-sm md:text-base leading-none">
                          ₹{plant.price}
                        </span>
                        <span className="text-[10px] text-text-muted/50 line-through font-semibold leading-none">
                          ₹{plant.originalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-bold">Available</span>
                      <span className="inline-block mt-0.5 bg-white text-primary font-sans font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm border border-white/50">
                        {plant.stock >= 1000 ? `${(plant.stock / 1000)}k` : plant.stock} items
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Link to Footer */}
        <div className="flex justify-center mt-10">
          <a
            href="#download-badges"
            onClick={handleMoreClick}
            className="group inline-flex items-center gap-1.5 font-display text-sm font-bold text-primary hover:text-primary-dark transition-colors cursor-pointer focus:outline-none"
          >
            <span>more</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
          </a>
        </div>

      </div>

    </section>
  );
}
