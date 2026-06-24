import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExclamationCircle, FaCheckCircle, FaSatellite, FaStore } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSolution() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Reveal title elements
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

    // Fade in problem & solution cards
    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section
      id="problem-solution"
      ref={containerRef}
      className="relative w-full py-24 md:py-36 bg-[#F3FFF3] px-6 md:px-12 overflow-hidden border-b border-primary/5"
    >
      {/* Soft blurred background elements */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-primary/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="font-display text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-4 py-1.5 rounded-full mb-6">
            Why GeoTree Mart?
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            The Market Gap & <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Unified Solution</span>
          </h2>
          <p className="font-sans text-base text-text-muted leading-relaxed">
            Reforestation is crucial, but transparency and connectivity are missing. Here is how we bridge the gap between nurseries and large-scale buyers.
          </p>
        </div>

        {/* Problem & Solution Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
        >

          {/* PROBLEM CARD - RED / CORAL TONES */}
          <div className="rounded-[36px] bg-white border border-rose-100 p-8 sm:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shadow-inner">
                  <FaExclamationCircle />
                </span>
                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">The Market Gap</span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-dark">The Current Problem</h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-8 font-sans">
                <div className="flex gap-4">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-text-dark text-base">Unverifiable Tree Planting</h4>
                    <p className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                      "Log ped lagate hain par track nahi kar paate." Individuals and organizations plant thousands of saplings but have no reliable framework to monitor survival and growth.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-text-dark text-base">Nursery Sourcing Barriers</h4>
                    <p className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                      "Nurseries ko bade buyers tak pahunchne mein dikkat aati hai." Local growers are isolated and lack direct communication channels to sell high-volume plant stocks to corporate, NGO, or government buyers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-50/50 text-rose-500 text-xs font-semibold uppercase tracking-wider">
              No long-term tracking // Middlemen barriers
            </div>
          </div>

          {/* SOLUTION CARD - GREEN TONES */}
          <div className="rounded-[36px] bg-white border border-primary/5 p-8 sm:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shadow-inner">
                  <FaCheckCircle />
                </span>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">Our Unified System</span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-dark">The GeoTree Mart Solution</h3>
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-8 font-sans">
                <div className="flex gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-text-dark text-base">Direct Nursery Marketplace</h4>
                    <p className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                      Connecting local growers directly to high-volume buyers. Nurseries can easily list stock lists, set prices, and bypass intermediaries to maximize B2B earnings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-text-dark text-base">GPS Geotag Verification</h4>
                    <p className="font-sans text-sm text-text-muted mt-1 leading-relaxed">
                      Every listed sapling batch includes a verified GPS location coordinate tag. Trace coordinates, species detail, and growth status, solving the post-planting tracking dilemma.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/5 text-primary text-xs font-semibold uppercase tracking-wider">
              GIS Location Tags // Direct Grower Portal
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
