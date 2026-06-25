import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiChevronDown } from 'react-icons/fi';

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
        duration: 0.45,
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
        duration: 0.35,
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
    <div className="border-b border-primary/10 last:border-b-0 py-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group cursor-pointer"
      >
        <span className="font-display font-extrabold text-base sm:text-lg text-text-dark group-hover:text-primary transition-colors duration-300">
          {faq.question}
        </span>
        <span
          ref={iconRef}
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-text-dark/50 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300`}
        >
          <FiChevronDown className="text-lg" />
        </span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
        style={{ willChange: 'height, opacity' }}
      >
        <div className="pb-6 pr-6 sm:pr-12 text-sm sm:text-base text-text-muted font-sans leading-relaxed">
          {faq.answer}
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
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%'
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
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
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
      className="relative w-full py-12 bg-bg-light px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">

        {/* Title area */}
        <div ref={titleRef} className="text-center max-w-2xl mb-8 mx-auto flex flex-col items-center">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-text-dark leading-tight tracking-tight mb-4">
            Frequently Asked
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Questions</span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div
          ref={listRef}
          className="w-full bg-white border border-primary/5 rounded-[32px] p-6 sm:p-10 shadow-sm"
        >
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
