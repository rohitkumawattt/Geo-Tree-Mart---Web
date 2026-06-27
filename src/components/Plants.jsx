import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStore } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const PLANTS_DATA = [
  { id: 'stringofbanana', name: 'Senecio radicans (String of banana)', category: 'Succulents', price: 99, originalPrice: 199, stock: 1500, origin: 'Jaipur Succulent Nurseries', image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?auto=format&fit=crop&w=600&q=80', desc: 'Senecio radicans is a fast-growing succulent vine with banana-shaped leaves.' },
  { id: 'stringoftears', name: 'Senecio herreianus (String of tears)', category: 'Succulents', price: 89, originalPrice: 149, stock: 1200, origin: 'Organic Life Nursery', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80', desc: 'Senecio herreianus is an elegant trailing succulent with bead-like teardrop leaves.' },
  { id: 'seneciovitalis', name: 'Senecio vitalis (Bare Rooted)', category: 'Succulents', price: 119, originalPrice: 199, stock: 800, origin: 'Clay & Co.', image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80', desc: 'Senecio vitalis is a blue-green decorative succulent resembling spread fingers.' },
  { id: 'crassula', name: 'Crassula sarmentosa (Bare Rooted)', category: 'Succulents', price: 99, originalPrice: 159, stock: 950, origin: 'Sanganer Seedlings Hub', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80', desc: 'Crassula sarmentosa is a scrambling succulent with green-and-cream variegated foliage.' },
  { id: 'succulentcombo', name: 'Succulent Combo A3 (Set of 6)', category: 'Succulents', price: 599, originalPrice: 899, stock: 500, origin: 'Jagatpura Flora Farm', image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&w=400&q=80', desc: 'A curated starter pack of 6 hardy, beautiful live succulents in nursery pots.' },
  { id: 'moneyplant', name: 'Golden Pothos (Money Plant)', category: 'Indoor', price: 45, originalPrice: 65, stock: 32000, origin: 'Jagatpura Flora Farm', image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=400&q=80', desc: 'Trailing air-purifying vine with beautiful golden-variegated green leaves.' }
];

export default function Buy() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

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
      className="relative w-full py-12 bg-bg-light px-6 md:px-12 overflow-hidden"
    >
      {/* Blurred background vectors */}
      <div className="absolute top-1/3 left-0 w-[380px] h-[380px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto">

        {/* Title Area */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-8 flex flex-col items-center">
          <h2 className="font-display md:text-5xl text-4xl sm:text-3xl text-text-dark leading-tight tracking-tight mb-4">
            Green Deals You <span className="text-primary italic">Can't Miss</span>
          </h2>
        </div>

        {/* Plants Catalog Grid - Responsive layout fitting 6 in a row on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          {PLANTS_DATA.map((plant) => (
            <div
              key={plant.id}
              className="w-full will-change-[transform,opacity]"
              onClick={() => window.location.hash = `#product/${plant.id}`}
            >
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
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary-dark text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm border border-black/[0.03] z-10">
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
      </div>

    </section>
  );
}
