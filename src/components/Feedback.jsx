import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaStar, FaQuoteLeft, FaCheckCircle, FaLeaf } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ramesh Patel",
    role: "Owner, Patel Green Nursery (Anand)",
    text: "GeoTree Mart se pehli baar humare plants ko direct bade B2B buyers mile hain. Escrow payout system se payment 24 ghante me safe aur direct bank me aa jati hai.",
    rating: 5,
    initials: "RP",
    bg: "from-green-50 to-emerald-50"
  },
  {
    id: 2,
    name: "Dr. Sunita Rao",
    role: "Director, EcoRestore NGO",
    text: "Finding certified saplings with verified GPS coordinates was a major challenge for our restoration drives. GeoTree Mart solved this transparently.",
    rating: 5,
    initials: "SR",
    bg: "from-teal-50 to-green-50"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    role: "Landscaping Architect, Bangalore",
    text: "The level of transparency here is unmatched. Verifying GIS coordinates of sapling plots before logistical dispatch saves us massive coordination delays.",
    rating: 5,
    initials: "VM",
    bg: "from-emerald-50 to-teal-50"
  },
  {
    id: 4,
    name: "Harpreet Singh",
    role: "Greenway Nursery, Punjab",
    text: "Pehle middlemen humara bada profit margin kha jaate the. Ab hum direct buyers se connect karte hain aur certified rates par deal hoti hai.",
    rating: 5,
    initials: "HS",
    bg: "from-green-50 to-emerald-50"
  },
  {
    id: 5,
    name: "Meera Deshmukh",
    role: "CSR Lead, Zenith Corporates",
    text: "For our ESG offset projects, sapling survival rate is critical. Buying from certified, eco-inspected nurseries has given us excellent survival logs.",
    rating: 5,
    initials: "MD",
    bg: "from-teal-50 to-emerald-50"
  },
  {
    id: 6,
    name: "Rajesh Yadav",
    role: "Owner, Yadav & Sons Nursery (Prayagraj)",
    text: "Mobile app use karna bahut aasan hai. Stock upload karo aur coordinates auto-verify ho jate hain. Bulk sales ab bilkul tension-free hain.",
    rating: 5,
    initials: "RY",
    bg: "from-green-50 to-teal-50"
  }
];

export default function Feedback() {
  const containerRef = useRef(null);
  const rowRef = useRef(null);
  const titleRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const trigger = containerRef.current;

    // Header text fade-in
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

    // Continuous auto-scroll marquee: translates from xPercent: 0 to -50 infinitely
    const tween = gsap.to(rowRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 30, // Constant speed of auto-scroll
      repeat: -1,
      runBackwards: false
    });

    tweenRef.current = tween;

    return () => {
      if (tween) tween.kill();
    };
  }, []);

  // Pause marquee smoothly on hover
  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 0,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  // Resume marquee smoothly on leave
  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  };

  // Duplicate list to achieve a perfect seamless infinite loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="feedback"
      ref={containerRef}
      className="relative w-full py-12 overflow-hidden bg-[#F8FFF8] border-b border-primary/5"
    >
      {/* Background Soft Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      {/* Title area */}
      <div ref={titleRef} className="text-center max-w-3xl mb-8 mx-auto px-6 flex flex-col items-center">
        <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
          Voices of the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">GeoTree Community</span>
        </h2>
      </div>

      {/* Scrolling Feedback Container */}
      <div className="w-full overflow-hidden py-4 select-none">
        <div
          ref={rowRef}
          className="flex gap-6 w-max px-6 will-change-transform cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {duplicatedTestimonials.map((item, idx) => (
            <FeedbackCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackCard({ item }) {
  return (
    <div className={`w-[300px] sm:w-[380px] flex-shrink-0 rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${item.bg} border border-white/85 shadow-[0_15px_35px_rgba(27,94,32,0.02)] glassmorphism-card hover:shadow-[0_20px_40px_rgba(27,94,32,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between gap-6`}>
      <div className="flex flex-col gap-4">
        {/* Top bar: Stars and Quote icon */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-yellow-500">
            {Array.from({ length: item.rating }).map((_, i) => (
              <FaStar key={i} className="text-sm" />
            ))}
          </div>
          <span className="text-primary/10 text-3xl sm:text-4xl">
            <FaQuoteLeft />
          </span>
        </div>

        {/* Testimonial text */}
        <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
          {item.text}
        </p>
      </div>

      {/* Profile/Author Info */}
      <div className="flex items-center gap-4 border-t border-primary/5 pt-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-display font-bold text-sm flex items-center justify-center shadow-md shadow-primary/15 flex-shrink-0">
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-display font-extrabold text-sm sm:text-base text-text-dark truncate">
              {item.name}
            </h4>
            <span className="text-primary text-xs flex-shrink-0" title="Verified Partner">
              <FaCheckCircle />
            </span>
          </div>
          <p className="font-sans text-[11px] sm:text-xs text-text-muted truncate mt-0.5">
            {item.role}
          </p>
        </div>
      </div>
    </div>
  );
}
