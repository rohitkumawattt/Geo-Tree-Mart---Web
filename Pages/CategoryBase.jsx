import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiSearch, 
  FiFilter, 
  FiStar, 
  FiCheckCircle, 
  FiX, 
  FiMapPin, 
  FiPackage 
} from 'react-icons/fi';

// Rich Mockup Database for categories
const MOCK_PRODUCTS = {
  "Plants": [
    { id: 'neem', name: 'Neem Sapling', category: 'Medicinal', price: 15, unit: 'sapling', stock: 42000, origin: 'Jaipur Organic Greens', rating: 4.8, reviews: 142, image: 'https://images.unsplash.com/photo-1661776358099-38f6daea7752?auto=format&fit=crop&w=600&q=80', desc: 'Hardy native species, ideal for hot climates.' },
    { id: 'mango', name: 'Mango (Kesar)', category: 'Fruit Tree', price: 30, unit: 'sapling', stock: 12000, origin: 'Malviya Nagar Growers', rating: 4.7, reviews: 98, image: 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?auto=format&fit=crop&w=600&q=80', desc: 'Sweet Kesar mango sapling, grafted and ready.' },
    { id: 'guava', name: 'Guava (Amrud)', category: 'Fruit Tree', price: 22, unit: 'sapling', stock: 18000, origin: 'Amer Forest Growers', rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1663315110779-ffaa2fde4f0b?auto=format&fit=crop&w=600&q=80', desc: 'Organic potted guava plant sapling.' },
    { id: 'ashoka', name: 'Ashoka Tree', category: 'Ornamental', price: 28, unit: 'sapling', stock: 15000, origin: 'Sanganer Seedlings Hub', rating: 4.6, reviews: 112, image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80', desc: 'Tall evergreen foliage, perfect for boundary avenues.' },
    { id: 'plumeria', name: 'Plumeria (Champa)', category: 'Flowering', price: 25, unit: 'sapling', stock: 9500, origin: 'Jagatpura Flora Farm', rating: 4.9, reviews: 88, image: 'https://images.unsplash.com/photo-1717748903944-8232cdf47a65?auto=format&fit=crop&w=600&q=80', desc: 'Potted plumeria champa sapling with fragrant white-yellow flowers.' },
    { id: 'peepal', name: 'Peepal Sapling', category: 'Forest Tree', price: 18, unit: 'sapling', stock: 15000, origin: 'Amer Forest Growers', rating: 4.8, reviews: 120, image: 'https://images.unsplash.com/photo-1709314879220-d1619e91bb61?auto=format&fit=crop&w=600&q=80', desc: 'High oxygen output, vital ecological and religious value.' },
    { id: 'aloevera', name: 'Aloe Vera', category: 'Medicinal', price: 12, unit: 'plant', stock: 25000, origin: 'Organic Life Nursery', rating: 4.7, reviews: 205, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80', desc: 'Thick succulent leaves, excellent skin and health benefits.' },
    { id: 'moneyplant', name: 'Money Plant', category: 'Indoor', price: 20, unit: 'plant', stock: 31000, origin: 'Green Gardeners', rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=600&q=80', desc: 'Trailing green vine, excellent air-purifying indoor plant.' }
  ],
  "Pots": [
    { id: 'pot-ceramic-white', name: 'Ceramic Matte White Pot', category: 'Ceramic', price: 80, unit: 'pot', stock: 5000, origin: 'Clay & Co.', rating: 4.8, reviews: 95, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80', desc: 'Elegant matte finish ceramic pot with drainage hole.' },
    { id: 'pot-terracotta', name: 'Terracotta Classic Clay Pot', category: 'Clay', price: 40, unit: 'pot', stock: 15000, origin: 'Jaipur Potteries', rating: 4.6, reviews: 210, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80', desc: 'Traditional breathable red clay pot for healthy roots.' },
    { id: 'pot-coir', name: 'Biodegradable Coir Pot', category: 'Eco-friendly', price: 25, unit: 'pack of 5', stock: 8000, origin: 'EcoGrow Solutions', rating: 4.7, reviews: 43, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80', desc: 'Made from coconut husk, plant directly into soil.' },
    { id: 'pot-plastic-hanging', name: 'Hanging Plastic Pot', category: 'Plastic', price: 35, unit: 'pot', stock: 12000, origin: 'Urban Gardeners', rating: 4.4, reviews: 78, image: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=600&q=80', desc: 'Durable, lightweight hanging planter with chains.' },
    { id: 'pot-self-watering', name: 'Self-Watering Planter', category: 'Smart Planter', price: 120, unit: 'pot', stock: 3500, origin: 'TechGardens', rating: 4.9, reviews: 62, image: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?auto=format&fit=crop&w=600&q=80', desc: 'Double-layer design, holds water reservoir up to 2 weeks.' },
    { id: 'pot-wooden-barrel', name: 'Wooden Barrel Planter', category: 'Rustic Wood', price: 150, unit: 'pot', stock: 1200, origin: 'Heritage Woodworks', rating: 4.7, reviews: 29, image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80', desc: 'Handcrafted oakwood finish barrel for outdoor gardens.' }
  ],
  "Fertilisers": [
    { id: 'fert-vermicompost', name: 'Organic Vermicompost', category: 'Organic Feed', price: 50, unit: '5kg bag', stock: 20000, origin: 'Earthworm Organics', rating: 4.8, reviews: 340, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80', desc: 'Premium worm castings, rich in nitrogen & microbes.' },
    { id: 'fert-neem-cake', name: 'Neem Cake Powder', category: 'Pest Control', price: 60, unit: '2kg bag', stock: 14000, origin: 'BioShield Fertilizers', rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80', desc: 'Natural pesticide and organic fertilizer for soil protection.' },
    { id: 'fert-npk-liquid', name: 'NPK Liquid Nutrient', category: 'Liquid Booster', price: 110, unit: '500ml bottle', stock: 9500, origin: 'AgroGrow Biotech', rating: 4.6, reviews: 104, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80', desc: 'Balanced NPK ratio for rapid flowering and green foliage.' },
    { id: 'fert-bone-meal', name: 'Steamed Bone Meal', category: 'Root Builder', price: 80, unit: '3kg bag', stock: 6000, origin: 'NutriRoot Soils', rating: 4.5, reviews: 88, desc: 'Rich in phosphorus and calcium for strong root development.' },
    { id: 'fert-cocopeat', name: 'Compressed Cocopeat Block', category: 'Soil Medium', price: 45, unit: '5kg block', stock: 18000, origin: 'CocoCoir India', rating: 4.8, reviews: 275, desc: 'Expands up to 75L when wet. Ideal potting mix base.' },
    { id: 'fert-epsom-salt', name: 'Pure Epsom Salt', category: 'Mineral Salt', price: 30, unit: '1kg pack', stock: 11000, origin: 'GreenCare Salts', rating: 4.7, reviews: 152, desc: 'Magnesium sulfate crystals for lush green leaf growth.' }
  ],
  "Seeds": [
    { id: 'seed-tomato', name: 'Hybrid Tomato Seeds', category: 'Vegetable', price: 20, unit: 'pack', stock: 15000, origin: 'Kisan Seeds', rating: 4.5, reviews: 122, image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80', desc: 'High-yield hybrid variety, disease-resistant and juicy.' },
    { id: 'seed-basil', name: 'Sweet Basil Seeds', category: 'Herb', price: 15, unit: 'pack', stock: 9000, origin: 'HerbCulture', rating: 4.7, reviews: 84, desc: 'Aromatic culinary herb, easy to grow on windowsills.' },
    { id: 'seed-marigold', name: 'Marigold Orange Seeds', category: 'Flower', price: 25, unit: 'pack', stock: 11000, origin: 'BloomBuds Nurseries', rating: 4.6, reviews: 165, desc: 'Vibrant orange blooms, natural pest deterrent for gardens.' },
    { id: 'seed-coriander', name: 'Coriander Seeds (Dhaniya)', category: 'Herb', price: 10, unit: 'pack', stock: 30000, origin: 'Desi Seeds Co.', rating: 4.4, reviews: 290, desc: 'Fast-growing kitchen herb, fresh aroma guaranteed.' },
    { id: 'seed-sunflower', name: 'Dwarf Sunflower Seeds', category: 'Flower', price: 30, unit: 'pack', stock: 7500, origin: 'SunGrow Farms', rating: 4.8, reviews: 56, desc: 'Miniature sun-loving plants, perfect for balconies.' },
    { id: 'seed-chilli', name: 'Spicy Guntur Chilli Seeds', category: 'Vegetable', price: 18, unit: 'pack', stock: 12000, origin: 'Teja Seeds', rating: 4.7, reviews: 115, desc: 'Hot and high-yielding red pepper seeds.' }
  ],
  "Garden Tools": [
    { id: 'tool-trowel', name: 'Premium Hand Trowel', category: 'Digging', price: 90, unit: 'piece', stock: 4000, origin: 'MetalForge Tools', rating: 4.8, reviews: 132, desc: 'Rust-resistant carbon steel blade with comfortable grip.' },
    { id: 'tool-pruner', name: 'Classic Bypass Pruner', category: 'Cutting', price: 180, unit: 'piece', stock: 3500, origin: 'TrimCut Sharps', rating: 4.9, reviews: 215, desc: 'Ultra-sharp steel blades for clean stem cuts.' },
    { id: 'tool-nozzle', name: 'Multi-Pattern Spray Nozzle', category: 'Watering', price: 75, unit: 'piece', stock: 6000, origin: 'AquaFlow Fittings', rating: 4.5, reviews: 92, desc: '8 adjustable spray patterns for gentle watering or pressure wash.' },
    { id: 'tool-gloves', name: 'Gardening Protective Gloves', category: 'Safety', price: 40, unit: 'pair', stock: 15000, origin: 'SafeGrip Rubber', rating: 4.6, reviews: 174, desc: 'Nitrile coated puncture-resistant gloves for safe handling.' },
    { id: 'tool-rake', name: 'Premium Garden Rake', category: 'Soil Care', price: 220, unit: 'piece', stock: 1800, origin: 'EarthTools Co.', rating: 4.7, reviews: 53, desc: 'Wide steel teeth for leveling soil and clearing garden leaves.' },
    { id: 'tool-watering-can', name: 'Classical Metal Watering Can', category: 'Watering', price: 190, unit: 'piece', stock: 2400, origin: 'Heritage Copper & Brass', rating: 4.8, reviews: 81, desc: 'Galvanized zinc steel structure with long narrow spout.' }
  ]
};

// Slogan mapping to give each page a premium green theme feeling
const CATEGORY_DETAILS = {
  "Plants": {
    subtitle: "Eco-Friendly Saplings",
    tagline: "Explore botanical excellence raised by certified regional nurseries.",
    gradient: "from-emerald-800 to-green-950",
    bannerAccent: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  "Pots": {
    subtitle: "Artisan Pots & Planters",
    tagline: "Give your green friends a gorgeous home with our premium pots.",
    gradient: "from-green-800 to-emerald-950",
    bannerAccent: "bg-green-500/20 text-green-300 border-green-500/30"
  },
  "Fertilisers": {
    subtitle: "Organic Soil Nutrition",
    tagline: "Boost plant immunity and flowering with certified fertilizers.",
    gradient: "from-emerald-900 to-green-950",
    bannerAccent: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  "Seeds": {
    subtitle: "Certified Seeds",
    tagline: "High germination rate non-GMO seeds for flowers and vegetables.",
    gradient: "from-green-700 to-green-950",
    bannerAccent: "bg-green-500/20 text-green-300 border-green-500/30"
  },
  "Garden Tools": {
    subtitle: "Professional Garden Tools",
    tagline: "Durable, ergonomic, and lightweight steel tools for gardeners.",
    gradient: "from-green-900 to-slate-950",
    bannerAccent: "bg-green-500/20 text-green-300 border-green-500/30"
  }
};

export default function CategoryBase({ categoryName, onClose }) {
  const categoryInfo = CATEGORY_DETAILS[categoryName] || CATEGORY_DETAILS["Plants"];
  const products = MOCK_PRODUCTS[categoryName] || [];

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedNurseries, setSelectedNurseries] = useState([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState('rating'); // rating, price-low, price-high
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Inquiry Modal State
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    quantity: '100',
    message: ''
  });
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

  // Extract unique subcategories and nurseries for filters
  const subcategories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  const nurseries = useMemo(() => {
    return [...new Set(products.map(p => p.origin))];
  }, [products]);

  // Determine dynamic min/max prices of products
  const priceLimits = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 250 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Initialize maxPrice slider limit
  useEffect(() => {
    setMaxPrice(priceLimits.max);
  }, [priceLimits]);

  // Handle inquiry submission
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;

    setIsInquirySubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsInquirySubmitting(false);
      setIsInquirySuccess(true);
    }, 1500);
  };

  const resetInquiry = () => {
    setInquiryProduct(null);
    setInquiryForm({ name: '', phone: '', quantity: '100', message: '' });
    setIsInquirySuccess(false);
  };

  // Toggle filter lists
  const toggleSubcategory = (sub) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(item => item !== sub) : [...prev, sub]
    );
  };

  const toggleNursery = (nursery) => {
    setSelectedNurseries(prev => 
      prev.includes(nursery) ? prev.filter(item => item !== nursery) : [...prev, nursery]
    );
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.desc.toLowerCase().includes(q) || 
        p.origin.toLowerCase().includes(q)
      );
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.category));
    }

    // Nursery filter
    if (selectedNurseries.length > 0) {
      result = result.filter(p => selectedNurseries.includes(p.origin));
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedSubcategories, selectedNurseries, maxPrice, sortBy]);

  // Clean all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubcategories([]);
    setSelectedNurseries([]);
    setMaxPrice(priceLimits.max);
    setSortBy('rating');
  };

  const isPlants = false; // Use the clean light-green base theme with white card layouts

  return (
    <div className={`w-full min-h-screen pb-20 pt-20 transition-all duration-500 ${
      isPlants 
        ? "bg-gradient-to-b from-[#124820] via-[#1B5E20] via-[#A5D6A7] via-[#E8F5E9] to-[#F8FFF8]"
        : "bg-bg-light"
    }`}>
      
      {/* Category Banner/Header */}
      <section className={`relative w-full overflow-hidden bg-gradient-to-br ${categoryInfo.gradient} py-16 md:py-24 px-6 md:px-12 text-white`}>
        
        {/* Floating Background Leaves */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute left-10 top-1/4 h-32 w-32 rounded-full bg-white/20 blur-2xl animate-float" />
          <div className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-white/20 blur-3xl animate-float-reverse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Navigation Button */}
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 mb-6 text-sm font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className={`inline-block text-xs font-bold tracking-widest uppercase border px-3 py-1 rounded-full mb-4 ${categoryInfo.bannerAccent}`}>
                {categoryInfo.subtitle}
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight mb-4">
                {categoryName}
              </h1>
              <p className="font-sans text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                {categoryInfo.tagline}
              </p>
            </div>
            
            <div className="text-white/80 text-sm font-medium border-l border-white/20 pl-4 py-2">
              <span className="text-2xl font-bold text-white block">
                {filteredProducts.length}
              </span>
              verified items available
            </div>
          </div>
        </div>
      </section>

      {/* Main Browse Catalog Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className={`sticky top-28 border shadow-sm rounded-3xl p-6 transition-all ${
              isPlants
                ? "bg-white/10 backdrop-blur-md border-white/10 text-white shadow-xl"
                : "bg-white border-primary/5 text-text-dark"
            }`}>
              
              <div className={`flex items-center justify-between mb-6 pb-4 border-b ${isPlants ? "border-white/10" : "border-gray-100"}`}>
                <h3 className={`font-display font-bold text-lg flex items-center gap-2 ${isPlants ? "text-white" : "text-text-dark"}`}>
                  <FiFilter className={`${isPlants ? "text-emerald-400" : "text-primary"} text-sm`} /> Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className={`text-xs font-bold transition-colors cursor-pointer focus:outline-none ${
                    isPlants ? "text-emerald-300 hover:text-emerald-200" : "text-primary hover:text-primary-dark"
                  }`}
                >
                  Clear All
                </button>
              </div>

              {/* Sub-category Filter */}
              <div className="mb-6">
                <h4 className={`font-display font-bold text-sm mb-3 ${isPlants ? "text-white" : "text-text-dark"}`}>Subcategories</h4>
                <div className="flex flex-col gap-2">
                  {subcategories.map(sub => {
                    const isChecked = selectedSubcategories.includes(sub);
                    return (
                      <button
                        key={sub}
                        onClick={() => toggleSubcategory(sub)}
                        className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isChecked 
                            ? isPlants
                              ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                              : 'bg-primary/10 text-primary border border-primary/20' 
                            : isPlants
                              ? 'bg-white/5 text-white/70 hover:bg-white/10 border border-transparent'
                              : 'bg-gray-50 text-text-muted hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className={`font-display font-bold text-sm mb-3 flex justify-between ${isPlants ? "text-white" : "text-text-dark"}`}>
                  <span>Max Price</span>
                  <span className={isPlants ? "text-emerald-300" : "text-primary"}>₹{maxPrice}</span>
                </h4>
                <input
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none ${
                    isPlants ? "bg-white/20" : "bg-gray-200"
                  }`}
                />
                <div className={`flex justify-between text-[10px] mt-1 font-semibold ${isPlants ? "text-white/60" : "text-text-muted"}`}>
                  <span>₹{priceLimits.min}</span>
                  <span>₹{priceLimits.max}</span>
                </div>
              </div>

              {/* Nursery Origin Filter */}
              <div>
                <h4 className={`font-display font-bold text-sm mb-3 ${isPlants ? "text-white" : "text-text-dark"}`}>Accredited Nursery</h4>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {nurseries.map(nursery => {
                    const isChecked = selectedNurseries.includes(nursery);
                    return (
                      <label 
                        key={nursery} 
                        className={`flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors ${
                          isPlants ? "text-white/70 hover:text-white" : "text-text-muted hover:text-text-dark"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleNursery(nursery)}
                          className={`w-4 h-4 rounded focus:ring-primary/20 accent-primary cursor-pointer ${
                            isPlants ? "border-white/25 bg-white/5" : "border-gray-300 text-primary"
                          }`}
                        />
                        <span className="truncate">{nursery}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Catalog Content Area */}
          <div className="flex-1">
            
            {/* Search, Mobile Filter Trigger, Sort bar */}
            <div className={`border shadow-sm rounded-3xl p-4 mb-6 flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 ${
              isPlants
                ? "bg-white/10 backdrop-blur-md border-white/10 text-white shadow-xl"
                : "bg-white border-primary/5 text-text-dark"
            }`}>
              
              {/* Search input */}
              <div className="relative w-full sm:flex-1">
                <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${isPlants ? "text-white/60" : "text-text-muted"}`} />
                <input
                  type="text"
                  placeholder={`Search in ${categoryName}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full border rounded-2xl py-3 pl-12 pr-4 text-sm transition-all focus:outline-none ${
                    isPlants
                      ? 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:bg-white/10 focus:ring-white/20 focus:border-white/30'
                      : 'bg-gray-50 border-gray-100 text-text-dark placeholder-text-muted focus:bg-white focus:ring-primary/10 focus:border-primary/30'
                  }`}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none ${
                      isPlants ? "text-white/60 hover:text-white" : "text-text-muted hover:text-text-dark"
                    }`}
                  >
                    <FiX />
                  </button>
                )}
              </div>

              {/* Sort and Mobile Filters */}
              <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-between sm:justify-start">
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFiltersMobile(true)}
                  className={`flex items-center gap-2 border px-4 py-3 rounded-2xl text-sm font-semibold transition-colors cursor-pointer focus:outline-none ${
                    isPlants
                      ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      : "border-gray-100 bg-gray-50 hover:bg-gray-100 text-text-dark"
                  }`}
                >
                  <FiFilter className={isPlants ? "text-emerald-400" : "text-primary"} /> Filters
                </button>

                {/* Sort dropdown */}
                <div className={`relative flex items-center gap-2 border rounded-2xl px-4 py-3 text-sm ${
                  isPlants
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-gray-100 bg-gray-50 text-text-dark"
                }`}>
                  <span className={`hidden md:inline font-medium ${isPlants ? "text-white/60" : "text-text-muted"}`}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`bg-transparent font-bold border-none focus:outline-none cursor-pointer pr-1 ${
                      isPlants ? "text-white [&>option]:text-text-dark" : "text-text-dark"
                    }`}
                  >
                    <option value="rating">Top Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Active Filters Tag list */}
            {(selectedSubcategories.length > 0 || selectedNurseries.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`text-xs font-semibold ${isPlants ? "text-white/60" : "text-text-muted"}`}>Active:</span>
                
                {searchQuery && (
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                    isPlants
                      ? "bg-white/10 text-white border-white/20"
                      : "bg-primary/5 text-primary border-primary/10"
                  }`}>
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="cursor-pointer focus:outline-none">
                      <FiX />
                    </button>
                  </span>
                )}

                {selectedSubcategories.map(sub => (
                  <span key={sub} className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                    isPlants
                      ? "bg-white/10 text-white border-white/20"
                      : "bg-primary/5 text-primary border-primary/10"
                  }`}>
                    {sub}
                    <button onClick={() => toggleSubcategory(sub)} className="cursor-pointer focus:outline-none">
                      <FiX />
                    </button>
                  </span>
                ))}

                {selectedNurseries.map(nursery => (
                  <span key={nursery} className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${
                    isPlants
                      ? "bg-white/10 text-white border-white/20"
                      : "bg-primary/5 text-primary border-primary/10"
                  }`}>
                    {nursery}
                    <button onClick={() => toggleNursery(nursery)} className="cursor-pointer focus:outline-none">
                      <FiX />
                    </button>
                  </span>
                ))}

                <button 
                  onClick={clearFilters}
                  className={`text-xs font-bold ml-1 transition-colors cursor-pointer focus:outline-none ${
                    isPlants ? "text-red-300 hover:text-red-200" : "text-red-500 hover:text-red-600"
                  }`}
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map(product => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={product.id}
                      className="group rounded-3xl bg-white border border-primary/5 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Product Image Container */}
                      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Subcategory Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          
                          {/* Rating and Reviews */}
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex text-amber-400">
                              <FiStar className="fill-amber-400 text-xs" />
                            </div>
                            <span className="text-xs font-bold text-text-dark">{product.rating}</span>
                            <span className="text-[10px] text-text-muted font-medium">({product.reviews} reviews)</span>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-display font-black text-lg text-text-dark group-hover:text-primary transition-colors mb-1.5 leading-snug">
                            {product.name}
                          </h3>

                          {/* Product Description */}
                          <p className="text-xs text-text-muted mb-4 line-clamp-2 leading-relaxed">
                            {product.desc}
                          </p>

                        </div>

                        <div>
                          
                          {/* Stock and Nursery */}
                          <div className="flex flex-col gap-1.5 mb-4 border-t border-gray-50 pt-3 text-[11px] font-semibold text-text-muted">
                            <div className="flex items-center gap-1.5">
                              <FiMapPin className="text-primary text-xs shrink-0" />
                              <span className="truncate">{product.origin}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FiPackage className="text-primary text-xs shrink-0" />
                              <span>Stock: {product.stock.toLocaleString()} {product.unit}s</span>
                            </div>
                          </div>

                          {/* Price & Action button */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Bulk Price</span>
                              <span className="font-display text-xl font-black text-primary">
                                ₹{product.price}
                                <span className="text-xs text-text-muted font-normal"> / {product.unit}</span>
                              </span>
                            </div>

                            <button
                              onClick={() => setInquiryProduct(product)}
                              className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none"
                            >
                              Get Quote
                            </button>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-white border border-primary/5 rounded-3xl p-8">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-primary text-2xl" />
                </div>
                <h3 className="font-display font-bold text-lg text-text-dark mb-2">No items found</h3>
                <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
                  We couldn't find any products in {categoryName} matching your current filters. Try relaxing your search terms or expanding filter boundaries.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary text-white font-semibold text-xs px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors cursor-pointer focus:outline-none"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Mobile Drawer Filter Modal */}
      <AnimatePresence>
        {showFiltersMobile && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersMobile(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <h3 className="font-display font-bold text-lg text-text-dark flex items-center gap-2">
                    <FiFilter className="text-primary text-sm" /> Filters
                  </h3>
                  <button
                    onClick={() => setShowFiltersMobile(false)}
                    className="text-text-muted hover:text-text-dark cursor-pointer focus:outline-none"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Subcategory */}
                <div className="mb-6">
                  <h4 className="font-display font-bold text-sm text-text-dark mb-3">Subcategories</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {subcategories.map(sub => {
                      const isChecked = selectedSubcategories.includes(sub);
                      return (
                        <button
                          key={sub}
                          onClick={() => toggleSubcategory(sub)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                            isChecked 
                              ? 'bg-primary/10 text-primary border border-primary/20' 
                              : 'bg-gray-50 text-text-muted border border-transparent'
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <h4 className="font-display font-bold text-sm text-text-dark mb-3 flex justify-between">
                    <span>Max Price</span>
                    <span className="text-primary font-bold">₹{maxPrice}</span>
                  </h4>
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-text-muted mt-1 font-semibold">
                    <span>₹{priceLimits.min}</span>
                    <span>₹{priceLimits.max}</span>
                  </div>
                </div>

                {/* Nursery */}
                <div className="mb-6">
                  <h4 className="font-display font-bold text-sm text-text-dark mb-3">Accredited Nursery</h4>
                  <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
                    {nurseries.map(nursery => {
                      const isChecked = selectedNurseries.includes(nursery);
                      return (
                        <label 
                          key={nursery} 
                          className="flex items-center gap-2.5 text-xs font-medium text-text-muted cursor-pointer hover:text-text-dark"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleNursery(nursery)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                          />
                          <span className="truncate">{nursery}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 bg-gray-50 border border-gray-200 text-text-dark font-bold text-xs rounded-xl cursor-pointer focus:outline-none"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFiltersMobile(false)}
                  className="flex-1 py-3 bg-primary text-white font-bold text-xs rounded-xl cursor-pointer focus:outline-none"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Leads/Inquiry Form Modal */}
      <AnimatePresence>
        {inquiryProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={resetInquiry}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={resetInquiry}
                className="absolute right-6 top-6 text-text-muted hover:text-text-dark transition-colors cursor-pointer focus:outline-none"
              >
                <FiX className="text-xl" />
              </button>

              {!isInquirySuccess ? (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                      Request Catalog Price
                    </span>
                    <h3 className="font-display font-black text-2xl text-text-dark mt-3 leading-snug">
                      Bulk Inquiry for <span className="text-primary">{inquiryProduct.name}</span>
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      Raised by <span className="font-bold text-text-dark">{inquiryProduct.origin}</span>. Stock limit: {inquiryProduct.stock.toLocaleString()} units.
                    </p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                    
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-dark">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-dark">Phone Number (WhatsApp preferred)</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    {/* Quantity Required */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-dark">Required Quantity ({inquiryProduct.unit}s)</label>
                      <input
                        type="number"
                        min="50"
                        required
                        value={inquiryForm.quantity}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, quantity: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                      <span className="text-[10px] text-text-muted font-medium">Minimum order quantity: 50 units for nursery logistics.</span>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-text-dark">Message (Optional)</label>
                      <textarea
                        rows="3"
                        placeholder="Special instructions or logistics requests..."
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isInquirySubmitting}
                      className="w-full mt-2 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer focus:outline-none"
                    >
                      {isInquirySubmitting ? 'Sending Request...' : 'Submit Inquiry'}
                    </button>

                  </form>
                </>
              ) : (
                // Success Screen inside Modal
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 text-primary border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <FiCheckCircle className="text-3xl" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-text-dark mb-2">Inquiry Submitted!</h3>
                  <p className="text-sm text-text-muted max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you <span className="font-bold text-text-dark">{inquiryForm.name}</span>. The grower at <span className="font-bold text-text-dark">{inquiryProduct.origin}</span> has been notified of your interest. They will contact you shortly on <span className="font-bold text-text-dark">{inquiryForm.phone}</span>.
                  </p>
                  
                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6">
                    <span className="text-xs font-bold text-primary block mb-1">Want instant bookings and live tracking?</span>
                    <p className="text-[11px] text-text-muted">Download the GeoTree Mart App to directly communicate with growers and verify nursery credentials.</p>
                  </div>

                  <button
                    onClick={resetInquiry}
                    className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all cursor-pointer focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
