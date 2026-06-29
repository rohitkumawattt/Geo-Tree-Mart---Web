import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiSearch, FiChevronRight, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const BLOG_POSTS = [
  {
    id: 1,
    productId: "succulentcombo",
    title: "The Ultimate Guide to Watering Succulents Without Killing Them",
    category: "Plant Care",
    date: "June 26, 2026",
    readTime: "4 mins read",
    author: "Dr. Kabir Sharma (GeoTree Mart Botanist)",
    summary: "Succulents are incredibly hardy, yet overwatering is the #1 cause of death. Learn the professional 'soak and dry' method and how to check your soil drainage.",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80",
    content: (
      <>
        <p className="lead text-lg text-text-dark font-medium mb-4">
          If you have ever loved a succulent to death, you are not alone. When you buy premium, geotagged succulents from verified local nurseries on <strong>GeoTree Mart</strong>, they arrive healthy and pre-rooted. However, to keep them thriving at home, you must master their specific watering needs.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">1. The 'Soak and Dry' Method</h3>
        <p className="mb-4">
          The single most important rule is to water the soil, not the leaves, and to soak it thoroughly until water runs out of the bottom drainage hole. Then, <strong>do not water it again until the soil is completely dry</strong> all the way to the bottom of the pot. Do not just rely on testing the surface; stick a wooden skewer or your finger 2 inches into the soil to check for moisture.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 italic text-text-dark font-medium">
          "In the desert, rain comes in heavy downpours followed by long dry spells. Your watering routine should mimic this exact natural cycle."
        </blockquote>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">2. Signs of Overwatering vs. Underwatering</h3>
        <p className="mb-4">
          It is crucial to look at your plant's leaves. They will tell you exactly what they need:
        </p>
        <ul className="list-disc pl-6 mb-4 flex flex-col gap-2">
          <li><strong>Overwatered Succulent:</strong> Leaves become soft, translucent, yellow, and may drop off easily at the slightest touch.</li>
          <li><strong>Underwatered Succulent:</strong> Leaves look wrinkled, shriveled, and lose their plump texture, starting from the bottom of the stem.</li>
        </ul>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">3. The Importance of Drainage</h3>
        <p className="mb-4">
          Succulents hate sitting in soggy soil. Always use a well-draining gritty mix (adding perlite or coarse sand) and plant them in pots with drainage holes. If you are planting in a decorative pot without drainage, keep the plant in its plastic nursery container inside the decorative pot.
        </p>
      </>
    )
  },
  {
    id: 2,
    productId: "snakeplant",
    title: "Top 5 Low-Light Air Purifying Plants for Your Bedroom",
    category: "Indoor Plants",
    date: "June 24, 2026",
    readTime: "6 mins read",
    author: "Neha Verma (Interior Green Designer)",
    summary: "Transform your bedroom into a peaceful sanctuary. These 5 resilient indoor plants release oxygen at night and filter harmful toxins from your indoor air.",
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
    content: (
      <>
        <p className="lead text-lg text-text-dark font-medium mb-4">
          Poor indoor air quality can affect your sleep, focus, and overall well-being. Adding living plants to your bedroom is a natural, low-cost way to filter out toxins. You can find all these healthy, clean-air houseplants from certified growers right here on <strong>GeoTree Mart</strong>.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">1. Snake Plant (Sansevieria)</h3>
        <p className="mb-4">
          Unlike most plants that consume oxygen at night, the Snake Plant converts CO2 into fresh oxygen during the dark hours. It is also extremely low maintenance, thriving in almost total neglect.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">2. ZZ Plant (Zamioculcas zamiifolia)</h3>
        <p className="mb-4">
          With its glossy, dark-green waxy leaves, the ZZ plant looks elegant and survives easily in windowless rooms or dark corners. Water it only once a month.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">3. Peace Lily (Spathiphyllum)</h3>
        <p className="mb-4">
          A powerhouse air purifier, the Peace Lily filters out mold spores and common allergens. It will gracefully droop its leaves when it needs water, taking away the guessing game.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 italic text-text-dark font-medium">
          "Placing 2 or 3 of these clean air champions near your bed can significantly boost humidity levels, reducing dry throat and congestion in air-conditioned rooms."
        </blockquote>
      </>
    )
  },
  {
    id: 3,
    productId: "tomato",
    title: "How to Grow a Rich Kitchen Vegetable Garden from Saplings",
    category: "Vegetables",
    date: "June 20, 2026",
    readTime: "5 mins read",
    author: "Rajesh Kumar (Organic Horticulturist)",
    summary: "Nothing beats the taste of homegrown organic vegetables. Follow these simple steps to successfully transplant seedlings and grow tomatoes, chillies, and herbs.",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80",
    content: (
      <>
        <p className="lead text-lg text-text-dark font-medium mb-4">
          Growing vegetables from seed can be challenging and slow. Transplanting pre-rooted organic saplings from <strong>GeoTree Mart</strong> nurseries is the fastest route to harvesting your own pesticide-free vegetables directly from your balcony or backyard.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">1. Choosing the Right Pots</h3>
        <p className="mb-4">
          Tomatoes and chillies require space for deep root growth. Ensure you use pots that are at least 10–12 inches in diameter with plenty of drainage. Leafy greens like spinach or coriander can grow in shallower, wider rectangular trays.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">2. Potting Soil Mix Recipe</h3>
        <p className="mb-4">
          Commercial garden soil gets compacted too quickly. For container vegetable gardening, mix:
        </p>
        <ul className="list-disc pl-6 mb-4 flex flex-col gap-1">
          <li>40% cocopeat (to retain moisture)</li>
          <li>30% vermicompost or organic compost (for nutrition)</li>
          <li>20% garden soil</li>
          <li>10% sand or perlite (for drainage)</li>
        </ul>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">3. Sunlight and Harvest</h3>
        <p className="mb-4">
          Vegetables are sun-lovers. Place your containers where they receive at least 5–6 hours of direct sunlight daily. Feed your plants organic fertilizer once every two weeks during the growing season for maximum yield.
        </p>
      </>
    )
  },
  {
    id: 4,
    productId: "moneyplant",
    title: "Understanding Plant Feng Shui: Best Placements for Positive Energy",
    category: "Decor",
    date: "June 15, 2026",
    readTime: "4 mins read",
    author: "Shalini Goel (Feng Shui Consultant)",
    summary: "Where you place your plants matters. Learn how to map your space and position Pothos, Jade, and Palms to attract prosperity and health.",
    image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=600&q=80",
    content: (
      <>
        <p className="lead text-lg text-text-dark font-medium mb-4">
          In Feng Shui, plants represent the wood element, signifying growth, vitality, and new beginnings. Decorating your home with healthy feng shui plants from <strong>GeoTree Mart</strong> is a wonderful way to attract positive vibes, balance energy levels, and clear blockages.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">1. The Southeast Corner (Wealth & Prosperity)</h3>
        <p className="mb-4">
          Traditionally, the southeast quadrant of your living room is connected to abundance. Place round-leaved plants like Money Plant (Pothos) or Jade Plants here. Avoid cacti or sharp-leaved plants in this area.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">2. The East Zone (Health & Family)</h3>
        <p className="mb-4">
          Promote health and harmony among family members by placing lush, tall leafy plants like Areca Palms or Bamboo in the east. It keeps the energy circulating and refreshed.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 italic text-text-dark font-medium">
          "Dead or dying leaves create stale energy. Regularly prune brown edges and keep leaves clean from dust to maintain active, positive vibes."
        </blockquote>
      </>
    )
  },
  {
    id: 5,
    productId: "tulsi",
    title: "Medicinal Powerhouses: Planting Your Own Ayurveda Balcony Corner",
    category: "Herbs",
    date: "June 10, 2026",
    readTime: "7 mins read",
    author: "Acharya Dev Vrat (Ayurvedic Practitioner)",
    summary: "Establish your own organic wellness apothecary. Grow and harvest Tulsi, Giloy, Mint, and Lemongrass for herbal teas and home remedies.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    content: (
      <>
        <p className="lead text-lg text-text-dark font-medium mb-4">
          For thousands of years, household gardens in India have double-hatted as pharmacies. Set up a dedicated wellness garden with fresh ayurvedic herbal saplings ordered from local growers via <strong>GeoTree Mart</strong> to have fresh, organic ingredients for daily immune support.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">1. Holy Basil (Tulsi)</h3>
        <p className="mb-4">
          A sacred plant in every Indian household. Consuming 4-5 fresh Tulsi leaves daily boosts respiratory health and helps the body manage stress. It prefers bright sunlight and moist, well-aerated soil.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">2. Giloy (Amrita Vine)</h3>
        <p className="mb-4">
          Known as the 'root of immortality', Giloy is a hardy creeper. Boiling its stems in water creates a powerful decoction (kadha) that is exceptional for boosting platelet counts and curing chronic fevers.
        </p>

        <h3 className="text-xl font-bold text-text-dark mt-6 mb-3">3. Lemongrass & Mint</h3>
        <p className="mb-4">
          Extremely easy to grow in medium pots, lemongrass and mint leaves contain strong aromatic oils. Excellent for digestion, relieving headaches, and brewing cooling afternoon beverages.
        </p>
      </>
    )
  }
];

const CATEGORIES = ["All", "Plant Care", "Indoor Plants", "Vegetables", "Decor", "Herbs"];

export default function Blog({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState(null);

  // Lock background body scroll when the blog modal is open
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePost]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="w-full min-h-screen pt-[72px] md:pt-[76px] pb-24 bg-[#FAF9F6] text-text-dark font-sans relative">

      {/* Category-Style Header Banner (Light Theme, matches CategoryBase.jsx) */}
      <div className="relative w-full overflow-hidden py-5 md:py-6 px-6 md:px-12 bg-[#F3F6F2] border-b border-primary/5">
        {/* Soft botanical background image with low opacity overlay */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none"
        />

        {/* Decorative botanical floating element */}
        <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none hidden lg:block">
          <FaLeaf className="text-primary text-[55px] rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-left">
          {/* Breadcrumbs & Back Button Inline */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-wrap items-center gap-1 text-[10px] font-bold text-text-muted/70 tracking-wide">
              <button onClick={onClose} className="hover:text-primary transition-colors cursor-pointer uppercase">Home</button>
              <FiChevronRight />
              <span className="text-text-dark uppercase tracking-tight">Blog</span>
            </div>

            <button
              onClick={onClose}
              className="group inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary hover:text-primary-dark bg-white border border-primary/10 px-3 py-1 rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow focus:outline-none"
            >
              <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h1 className="font-display font-black text-xl sm:text-2xl tracking-tight text-text-dark mb-1">
                The Green <span className="text-primary italic">Chronicles</span>
              </h1>
              <p className="font-sans text-xs text-text-muted max-w-xl leading-relaxed">
                Welcome to our nursery advice blog! Explore expert tips and gardening guides directly from local nursery botanists.
              </p>
            </div>

            <div className="text-text-muted text-[10px] font-semibold border-l border-primary/20 pl-4 py-0.5">
              <span className="text-xl font-black text-primary block leading-none mb-1">
                {filteredPosts.length}
              </span>
              published guides
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 pb-6 border-b border-black/[0.04]">
          {/* Categories Pills */}
          <div className="flex flex-wrap gap-2 justify-start w-full md:w-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${selectedCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-text-dark border-gray-200 hover:border-gray-400"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-text-dark placeholder-gray-400 focus:outline-none focus:border-primary shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-dark focus:outline-none"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="w-full text-center py-20 bg-white rounded-3xl border border-black/[0.03] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-500">
              <FaLeaf className="text-lg" />
            </div>
            <h4 className="font-display font-bold text-lg text-text-dark mb-1">No Articles Found</h4>
            <p className="text-xs text-text-muted">Try adjusting your filters or search query to find posts.</p>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-3xl border border-black/[0.03] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group cursor-pointer text-left"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-black px-2.5 py-0.5 rounded-full text-primary border border-white/40 shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center gap-4 text-[10px] text-text-muted font-bold mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-base text-text-dark leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted/80 leading-relaxed line-clamp-3 font-medium">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-text-dark truncate flex items-center gap-1.5">
                  <FiUser className="text-primary text-xs" /> {post.author}
                </span>
                <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 hover:underline group-hover:translate-x-1 transition-transform">
                  Read <FiChevronRight />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Blog Post Detail Modal (Retained for backup support if needed) */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none shadow-md"
              >
                <FiX />
              </button>

              {/* Scrollable Container */}
              <div className="w-full overflow-y-auto rounded-3xl flex-grow" data-lenis-prevent>
                {/* Modal Cover Image */}
                <div className="relative h-44 sm:h-52 w-full bg-gray-100 overflow-hidden">
                  <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-6 bg-primary text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {activePost.category}
                  </span>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 text-left">
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-text-muted mb-4 border-b border-gray-100 pb-4">
                    <span className="flex items-center gap-1"><FiCalendar /> {activePost.date}</span>
                    <span className="flex items-center gap-1"><FiClock /> {activePost.readTime}</span>
                    <span className="flex items-center gap-1"><FiUser className="text-primary" /> {activePost.author}</span>
                  </div>

                  <h2 className="font-display font-black text-2xl sm:text-3xl text-text-dark tracking-tight leading-tight mb-6">
                    {activePost.title}
                  </h2>

                  {/* Article Body */}
                  <div className="font-sans text-sm text-text-muted leading-relaxed flex flex-col gap-4">
                    {activePost.content}
                  </div>

                  {/* Return CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-text-muted uppercase block">Written By</span>
                      <span className="text-xs font-black text-text-dark">{activePost.author}</span>
                    </div>
                    <button
                      onClick={() => setActivePost(null)}
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-full transition-colors cursor-pointer focus:outline-none"
                    >
                      Done Reading
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
