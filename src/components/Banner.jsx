import { motion } from 'framer-motion';
import bannerLineArtLeaves from '../assets/banner_line_art_leaves.png';

export default function Banner() {
  const handleCTAClick = (e) => {
    e.preventDefault();
    window.location.hash = '#category/decorative';
  };

  return (
    <section className="w-full py-2 px-6 md:px-12 bg-bg-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[20px] overflow-hidden bg-[#063B2B] text-white min-h-[130px] md:min-h-[160px] flex flex-col md:flex-row items-center justify-between p-0 shadow-md border border-[#053023] group">

          {/* Right curved background block (Light green) */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] bg-[#C8ECD1] rounded-t-[30px] md:rounded-t-none md:rounded-l-[80px] lg:rounded-l-[100px] z-0 transition-transform duration-700" />

          {/* Left Text Side */}
          <div className="w-full md:w-[50%] flex flex-col items-start text-left relative z-10 p-5 md:py-6 md:pl-12 md:pr-4 mb-3 md:mb-0">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#E5C060] font-medium leading-none mb-1 select-none">
              Big Sale
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base tracking-wide mb-4">
              Up to 50% off
            </p>
            <button
              onClick={handleCTAClick}
              className="border border-[#E5C060] text-[#E5C060] hover:bg-[#E5C060] hover:text-[#063B2B] font-display font-black text-[9px] tracking-wider px-5 py-2 rounded transition-all duration-300 cursor-pointer focus:outline-none"
            >
              SHOP NOW
            </button>
          </div>

          {/* Right Plants Illustration Side */}
          <div className="w-full md:w-[48%] h-28 md:h-36 relative z-10 overflow-visible flex items-center justify-center py-4 md:py-0">
            <motion.img
              src={bannerLineArtLeaves}
              alt="Line Art Leaves"
              className="w-auto h-full max-h-[85px] md:max-h-[110px] object-contain select-none mix-blend-multiply"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            />
          </div>

          {/* Clean border overlay for premium look */}
          <div className="absolute inset-0 rounded-[20px] border border-white/5 pointer-events-none z-20" />

        </div>
      </div>
    </section>
  );
}
