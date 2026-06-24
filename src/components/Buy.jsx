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

export default function Buy() {
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

  // Stagger entry animations
  useEffect(() => {
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

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
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
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            Bring Your First <br /> Green Friend Home
          </h2>
          <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
            Choose from a wide variety of verified plant species raised by accredited local nurseries. Order high-volume stocks directly via our platform app.
          </p>
        </div>

        {/* Plants Catalog Grid - Responsive layout fitting 6 in a row on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          {PLANTS_DATA.map((plant) => (
            <div key={plant.id} className="w-full will-change-[transform,opacity]">
              <div className="w-full h-full rounded-[20px] bg-white border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300 flex flex-col overflow-hidden group text-left cursor-pointer transform hover:-translate-y-1.5">

                {/* Plant Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary-dark text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm border border-black/[0.03] z-10">
                    {plant.category}
                  </span>

                  {/* Discount Percentage Badge */}
                  <span className="absolute top-3 right-3 bg-rose-500 text-white text-[9.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm z-10">
                    {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Plant Card Details */}
                <div className="p-4 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-text-dark leading-snug group-hover:text-primary transition-colors duration-300 truncate">
                      {plant.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-text-muted text-[11px] mt-1.5 truncate">
                      <FaStore className="text-primary/60 flex-shrink-0" />
                      <span className="truncate">{plant.origin}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">Bulk Price</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-primary font-display font-extrabold text-base leading-none">
                          ₹{plant.price}
                        </span>
                        <span className="text-[11px] text-text-muted/60 line-through font-medium leading-none">
                          ₹{plant.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">Available</span>
                      <span className="text-text-dark font-sans font-bold text-xs leading-none mt-1">
                        {plant.stock >= 1000 ? `${(plant.stock / 1000)}k` : plant.stock}
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
