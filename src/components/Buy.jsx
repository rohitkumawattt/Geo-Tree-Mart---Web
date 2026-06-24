import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PLANTS_DATA = [
  { id: 'neem', name: 'Neem Sapling', category: 'Medicinal', price: 15, stock: 42000, origin: 'Jaipur Organic Greens', image: 'https://images.unsplash.com/photo-1661776358099-38f6daea7752?auto=format&fit=crop&w=400&q=80', desc: 'Hardy native species, ideal for hot climates.' },
  { id: 'mango', name: 'Mango (Aam)', category: 'Fruit Tree', price: 30, stock: 12000, origin: 'Malviya Nagar Growers', image: 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?auto=format&fit=crop&w=400&q=80', desc: 'Young mango sapling tree in nursery bag.' },
  { id: 'guava', name: 'Guava (Amrud)', category: 'Fruit Tree', price: 22, stock: 18000, origin: 'Amer Forest Growers', image: 'https://images.unsplash.com/photo-1663315110779-ffaa2fde4f0b?auto=format&fit=crop&w=400&q=80', desc: 'Organic potted guava plant sapling.' },
  { id: 'ashoka', name: 'Ashoka Tree', category: 'Ornamental', price: 28, stock: 15000, origin: 'Sanganer Seedlings Hub', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', desc: 'Tall evergreen foliage, perfect for boundary avenues.' },
  { id: 'plumeria', name: 'Plumeria (Champa)', category: 'Flowering', price: 25, stock: 9500, origin: 'Jagatpura Flora Farm', image: 'https://images.unsplash.com/photo-1717748903944-8232cdf47a65?auto=format&fit=crop&w=400&q=80', desc: 'Potted plumeria champa sapling.' },
  { id: 'peepal', name: 'Peepal Sapling', category: 'Forest Tree', price: 18, stock: 15000, origin: 'Amer Forest Growers', image: 'https://images.unsplash.com/photo-1709314879220-d1619e91bb61?auto=format&fit=crop&w=400&q=80', desc: 'High oxygen output, vital ecological value.' }
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
      className="relative w-full py-24 md:py-32 bg-bg-light px-6 md:px-12 overflow-hidden border-b border-primary/5"
    >
      {/* Blurred background vectors */}
      <div className="absolute top-1/3 left-0 w-[380px] h-[380px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Title Area */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="font-display text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-6">
            Nursery Catalog
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            Buy and Sell Trees and Plants
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
            <div
              key={plant.id}
              className="w-full rounded-[24px] bg-white border border-primary/5 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300 flex flex-col overflow-hidden group text-center"
            >

              {/* Plant Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Plant Card Details - Minimalist name only */}
              <div className="p-3 bg-white">
                <h3 className="font-display font-bold text-xs sm:text-sm text-text-dark leading-snug group-hover:text-primary transition-colors truncate">
                  {plant.name}
                </h3>
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
