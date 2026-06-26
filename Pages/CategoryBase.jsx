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
  FiPackage,
  FiChevronRight
} from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { PRODUCTS_DB } from '../src/data/products';

// Slogan mapping to give each page a premium green theme feeling
const CATEGORY_DETAILS = {
  "Vegetables": {
    subtitle: "Organic Vegetable Seedlings",
    tagline: "Grow your own fresh, organic kitchen garden with certified vegetable saplings.",
    gradient: "from-green-700 to-emerald-950",
    bannerAccent: "bg-green-500/20 text-green-300 border-green-500/30"
  },
  "Decorative": {
    subtitle: "Indoor & Ornamental Plants",
    tagline: "Beautify your living spaces with premium air-purifying and decorative foliage plants.",
    gradient: "from-emerald-800 to-green-950",
    bannerAccent: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
  },
  "Medicinal": {
    subtitle: "Healing & Ayurvedic Herbs",
    tagline: "Support family health and wellness with traditional medicinal herbs and botanical saplings.",
    gradient: "from-teal-800 to-emerald-950",
    bannerAccent: "bg-teal-500/20 text-teal-300 border-teal-500/30"
  },
  "Outdoor": {
    subtitle: "Sun-Loving Hardy Plants",
    tagline: "Robust outdoor plants and avenues designed to thrive in direct sunlight.",
    gradient: "from-green-800 to-slate-950",
    bannerAccent: "bg-green-500/20 text-green-300 border-green-500/30"
  },
  "Flowring": {
    subtitle: "Blooming Floral Delights",
    tagline: "Bring color and fragrance to your home with seasonal and perennial flowering plants.",
    gradient: "from-rose-800 to-green-950",
    bannerAccent: "bg-rose-500/20 text-rose-300 border-rose-500/30"
  },
  "Fruits": {
    subtitle: "Grafted Fruit Trees",
    tagline: "Grow your own orchard with high-yield fruit tree saplings optimized for local climate.",
    gradient: "from-amber-800 to-green-950",
    bannerAccent: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  }
};

export default function CategoryBase({ categoryName, onClose }) {
  const categoryInfo = CATEGORY_DETAILS[categoryName] || CATEGORY_DETAILS["Medicinal"];
  const products = useMemo(() => {
    return PRODUCTS_DB.filter(p => p.parentCategory === categoryName);
  }, [categoryName]);
  const isPlants = false;

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

  return (
    <div className="w-full min-h-screen pt-[72px] md:pt-[76px] pb-20 bg-[#FAF9F6] text-text-dark font-sans relative">
      
      {/* Category Banner/Header */}
      <section className="relative w-full overflow-hidden py-5 md:py-6 px-6 md:px-12 bg-[#F3F6F2] border-b border-primary/5">
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
              <span className="text-text-dark uppercase tracking-tight">
                {categoryName === "Flowring" ? "Flowering" : categoryName}
              </span>
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
                {categoryName === "Vegetables" ? "Vegetable Saplings" : categoryName === "Flowring" ? "Flowering Plants" : `${categoryName} Plants`}
              </h1>
              <p className="font-sans text-xs text-text-muted max-w-xl leading-relaxed">
                {categoryInfo.tagline}
              </p>
            </div>
            
            <div className="text-text-muted text-[10px] font-semibold border-l border-primary/20 pl-4 py-0.5">
              <span className="text-xl font-black text-primary block leading-none mb-1">
                {filteredProducts.length}
              </span>
              grower items ready
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
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
                      onClick={() => window.location.hash = `#product/${product.id}`}
                      className="group rounded-2xl bg-white border border-primary/5 shadow-sm hover:shadow-lg hover:border-primary/10 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
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
                        <div className="absolute top-2.5 left-2.5">
                          <span className="bg-white/90 backdrop-blur-sm text-primary text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Details Box */}
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          
                          {/* Rating and Reviews */}
                          <div className="flex items-center gap-1 mb-1.5">
                            <div className="flex text-amber-400">
                              <FiStar className="fill-amber-400 text-[10px]" />
                            </div>
                            <span className="text-[10px] font-bold text-text-dark">{product.rating}</span>
                            <span className="text-[9px] text-text-muted font-medium">({product.reviews})</span>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-display font-black text-sm md:text-base text-text-dark group-hover:text-primary transition-colors mb-1 leading-snug line-clamp-1">
                            {product.name}
                          </h3>

                          {/* Product Description */}
                          <p className="text-[11px] text-text-muted mb-3 line-clamp-2 leading-relaxed">
                            {product.desc}
                          </p>

                        </div>

                        <div>
                          
                          {/* Stock and Nursery */}
                          <div className="flex flex-col gap-1 mb-3 border-t border-gray-50 pt-2 text-[10px] font-semibold text-text-muted">
                            <div className="flex items-center gap-1">
                              <FiMapPin className="text-primary text-[10px] shrink-0" />
                              <span className="truncate">{product.origin}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiPackage className="text-primary text-[10px] shrink-0" />
                              <span>Stock: {product.stock.toLocaleString()} {product.unit}s</span>
                            </div>
                          </div>

                          {/* Price & Action button */}
                          <div className="flex items-center justify-between pt-0.5">
                            <div className="flex flex-col">
                              <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Bulk Price</span>
                              <span className="font-display text-sm md:text-base font-black text-primary">
                                ₹{product.price}
                                <span className="text-[10px] text-text-muted font-normal"> / {product.unit}</span>
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setInquiryProduct(product);
                              }}
                              className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-[10px] md:text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none"
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


      {/* Bottom Bestseller Showcase (matching the bottom of the screenshot) */}
      <section className="bg-[#FAF9F6] py-16 border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Trending Choice
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl text-text-dark mt-3">
                Customer Choice Bestsellers
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: "moneyplant", name: "Golden Pothos (Air Purifier)", price: "45", unit: "plant", image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?auto=format&fit=crop&w=400&q=80", tag: "Easy Care" },
              { id: "stringofbanana", name: "Senecio radicans (String of banana)", price: "99", unit: "plant", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=400&q=80", tag: "Succulents" },
              { id: "snakeplant", name: "Snake Plant (Sansevieria)", price: "90", unit: "plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80", tag: "Air Purifier" },
              { id: "succulentcombo", name: "Succulent Combo A3 (Set of 6)", price: "599", unit: "combo", image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?auto=format&fit=crop&w=400&q=80", tag: "Combo Pack" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => window.location.hash = `#product/${item.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group cursor-pointer"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-gray-50 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 animate-fade-in" />
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[8px] font-black px-1.5 py-0.5 rounded text-primary shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-xs text-text-dark line-clamp-2 mb-1 font-sans group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <span className="font-display font-black text-xs md:text-sm text-primary">₹{item.price}<span className="text-[9px] md:text-[10px] text-text-muted font-normal font-sans">/{item.unit}</span></span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setInquiryProduct({ name: item.name, origin: "GeoTree Bestsellers Hub", price: item.price, unit: item.unit, stock: 5000, desc: "Bestseller nursery item." });
                    }} 
                    className="text-[9px] md:text-[10px] font-bold text-primary hover:text-primary-dark underline cursor-pointer"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>
            ))}
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
