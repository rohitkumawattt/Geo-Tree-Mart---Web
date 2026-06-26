import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
  {
    question: "Who can buy plant saplings in bulk from GeoTree Mart?",
    answer: "Our B2B marketplace is designed for large-scale reforestation. Individual eco-conscious buyers, non-governmental organizations (NGOs), government forestry divisions, and corporate entities looking to meet CSR or ESG offset criteria can procure bulk saplings directly from verified nurseries."
  },
  {
    question: "How do nursery partners list their stock?",
    answer: "Registered nurseries can use the partner mobile app to upload batches of plants. They set the species type, available inventory quantity, and the unit price. Before listing is published, the app verifies the GPS location coordinate coordinates to map where the stock is raised."
  },
  {
    question: "Is there any verification of the GPS geotags?",
    answer: "Yes. When a nursery publishes a plant batch, the platform performs a geographic coordinate verification scan. This ensures that every listing represents real, physical plant stock growing at a verified nursery site before commercial buyers can place a purchase."
  },
  {
    question: "How do transaction payouts reach the nursery partners?",
    answer: "GeoTree Mart operates on a secure digital escrow structure. When a buyer completes checkout, payments are cleared and routed directly to the nursery's bank account within 24 hours of coordinate and logistical pickup validation, bypassing middle-tier agents entirely."
  },
  {
    question: "Can nursery partners monitor their stock performance?",
    answer: "Every nursery has access to a dedicated desktop dashboard. This console tracks live inventory balances, transaction logs, earned payouts, and the physical location coordinates of all listed seedling plots."
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    // GSAP height and opacity accordion transitions
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(iconRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);

  return (
    <div className={`mb-4 rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
        ? 'border-primary/30 bg-gradient-to-br from-white to-primary/[0.02] shadow-md shadow-primary/5'
        : 'border-primary/10 bg-white hover:border-primary/20 hover:shadow-sm'
      }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group cursor-pointer"
      >
        <div className="flex items-start gap-3.5 pr-4">
          <FiHelpCircle className={`text-xl mt-0.5 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-primary/40 group-hover:text-primary/75'
            }`} />
          <span className="font-display font-extrabold text-base sm:text-lg text-text-dark leading-snug group-hover:text-primary transition-colors duration-300">
            {faq.question}
          </span>
        </div>
        <span
          ref={iconRef}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white shadow-sm' : 'bg-primary/5 group-hover:bg-primary/10 text-primary'
            }`}
        >
          <FiChevronDown className="text-lg" />
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
        style={{ willChange: 'height, opacity' }}
      >
        <div className="px-5 sm:px-6 pb-6 pt-0">
          <div className="border-l-2 border-primary/20 pl-4 text-sm sm:text-base text-text-muted font-sans leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // Open the first FAQ by default
  const titleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Fade-in header text
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

    // Fade-in accordion items
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 95%',
        }
      }
    );
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-20 bg-[#F8FAF8] px-6 md:px-12 overflow-hidden"
    >
      {/* Decorative background blur spots */}
      <div className="absolute top-[20%] left-[-50px] w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-50px] w-96 h-96 bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating leaves icons */}
      <div className="absolute top-[10%] right-[15%] opacity-[0.03] rotate-12 pointer-events-none hidden md:block">
        <FaLeaf className="text-[120px] text-primary" />
      </div>
      <div className="absolute bottom-[10%] left-[10%] opacity-[0.02] -rotate-45 pointer-events-none hidden md:block">
        <FaLeaf className="text-[160px] text-secondary" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Title area */}
        <div ref={titleRef} className="text-center max-w-2xl mb-12 mx-auto flex flex-col items-center group">
          <h2 className="font-display text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight">
            <span className="italic text-primary">Frequently Asked</span> Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div ref={listRef} className="w-full">
          {FAQ_DATA.map((faq, idx) => (
            <FAQItem
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
