import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiStar, 
  FiMapPin, 
  FiPackage, 
  FiCheckCircle, 
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiShare2,
  FiInfo
} from 'react-icons/fi';
import { FaLeaf, FaTruck, FaGift, FaPercentage, FaBoxOpen } from 'react-icons/fa';
import { PRODUCTS_DB } from '../src/data/products';

export default function ProductDetail({ productId, onClose }) {
  // Option selection states
  const [selectedPot, setSelectedPot] = useState('Bare Rooted');
  const [selectedQuantityOption, setSelectedQuantityOption] = useState(1); // 1, 2, 5, 10
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  
  // Accordion toggle states
  const [openAccordions, setOpenAccordions] = useState({
    howWeWork: false,
    careTips: false,
    shipping: false,
    refundPolicy: false,
    description: true
  });

  // Modal / Inquiry states
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isInquirySubmitting, setIsInquirySubmitting] = useState(false);
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

  // Find current product
  const product = useMemo(() => {
    return PRODUCTS_DB.find(p => p.id === productId);
  }, [productId]);

  // Scroll to top when product changes
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setActiveImageIdx(0);
    setSelectedPot('Bare Rooted');
    setSelectedQuantityOption(1);
  }, [productId]);

  // Programmatically generate additional thumbnail variations using query params
  const productImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      `${product.image}&q=80&w=500&auto=format&fit=crop&sig=1`,
      `${product.image}&q=80&w=500&auto=format&fit=crop&sig=2`,
      `${product.image}&q=80&w=500&auto=format&fit=crop&sig=3`,
      `${product.image}&q=80&w=500&auto=format&fit=crop&sig=4`
    ];
  }, [product]);

  // Similar Products in same category
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS_DB
      .filter(p => p.parentCategory === product.parentCategory && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="w-full min-h-screen pt-[120px] pb-20 px-6 text-center bg-[#FAF9F6]">
        <div className="max-w-md mx-auto bg-white border border-primary/10 rounded-3xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 text-red-500">
            <FaLeaf className="text-2xl" />
          </div>
          <h3 className="font-display font-black text-xl text-text-dark mb-2">Product Not Found</h3>
          <p className="text-sm text-text-muted mb-6">
            The plant you are looking for does not exist or has been removed from our catalog.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Calculate pricing based on selected pot and quantity option
  const getPotExtraCost = () => {
    switch (selectedPot) {
      case '2" White Plastic Pot': return 20;
      case '3" Black Plastic Pot': return 35;
      default: return 0;
    }
  };

  const basePrice = product.price + getPotExtraCost();
  const originalBasePrice = product.originalPrice + getPotExtraCost();

  // Quantity option pricing details
  const quantityOptions = [
    { qty: 1, label: 'Buy 1', discount: 0 },
    { qty: 2, label: 'Buy 2 and get a discount!', discount: 2 },
    { qty: 5, label: 'Buy 5 and get a discount!', discount: 5 },
    { qty: 10, label: 'Buy 10 and get a discount!', discount: 10 }
  ];

  const currentOption = quantityOptions.find(o => o.qty === selectedQuantityOption);
  const finalPricePerUnit = basePrice * (1 - currentOption.discount / 100);
  const totalPrice = finalPricePerUnit * selectedQuantityOption;

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone) return;

    setIsInquirySubmitting(true);
    setTimeout(() => {
      setIsInquirySubmitting(false);
      setIsInquirySuccess(true);
    }, 1500);
  };

  const handleCategoryNav = () => {
    window.location.hash = `#category/${product.parentCategory.toLowerCase()}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.desc,
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="w-full min-h-screen pt-[72px] md:pt-[76px] pb-20 bg-[#FAF9F6] text-text-dark font-sans relative">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Navigation & Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-text-muted/70 tracking-wide mb-6">
          <button onClick={onClose} className="hover:text-primary transition-colors cursor-pointer uppercase">Home</button>
          <FiChevronRight />
          <button onClick={handleCategoryNav} className="hover:text-primary transition-colors cursor-pointer uppercase">
            {product.parentCategory === "Flowring" ? "Flowering" : product.parentCategory}
          </button>
          <FiChevronRight />
          <span className="text-text-dark truncate uppercase tracking-tight">{product.name}</span>
        </div>

        <button
          onClick={onClose}
          className="group inline-flex items-center gap-2 mb-6 text-xs font-black text-primary hover:text-primary-dark bg-white border border-primary/10 hover:border-primary/20 px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
        >
          <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
          BACK TO PRODUCTS
        </button>
      </div>

      {/* Main Showcase Layout */}
      <section className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start bg-white rounded-3xl border border-primary/5 p-4 md:p-8 shadow-sm">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 w-full flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group shadow-inner">
              <img
                src={productImages[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-[#e8f5e9] text-[#2e7d32] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm border border-[#c8e6c9]">
                {product.category}
              </span>
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 md:w-20 aspect-square rounded-xl overflow-hidden border-2 bg-gray-50 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIdx === idx ? 'border-primary shadow-sm scale-95' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`view-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Specifications & Checkout Selection */}
          <div className="md:col-span-6 flex flex-col gap-6 text-left">
            
            {/* Title & Reviews */}
            <div>
              <h1 className="font-display font-black text-2xl lg:text-3xl text-text-dark tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-text-muted">Rating ({product.rating || '4.8'})</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-4 h-4 bg-primary text-white flex items-center justify-center rounded-sm text-[8px]">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-base font-semibold">
                  Rs. {originalBasePrice.toFixed(2)}
                </span>
                <span className="text-primary font-display font-black text-2xl">
                  ₹{basePrice.toFixed(2)}
                </span>
                <span className="bg-amber-100 text-amber-800 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                  Sale
                </span>
              </div>
              <p className="text-[10px] text-text-muted/70 mt-1">Shipping calculated at checkout.</p>
            </div>

            {/* Key Benefits List */}
            <div className="flex flex-col gap-2.5 text-xs text-text-muted font-bold pl-1">
              <div className="flex items-center gap-2">
                <FaTruck className="text-primary text-sm" />
                <span>Free Shipping on all orders over ₹249</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGift className="text-primary text-sm" />
                <span>Exclusive Bonus Offer just for you!</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPercentage className="text-primary text-sm" />
                <span>Get 5% OFF automatically on orders above ₹599</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-primary text-sm" />
                <span>Easy Returns – Compulsory Unboxing Video</span>
              </div>
            </div>

            {/* Buy More & Save More Bulk Pricing Box */}
            <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
              <div className="text-center font-bold text-xs text-text-muted flex items-center justify-center gap-2">
                <span>───</span>
                <span className="font-display font-black tracking-wider text-text-dark">Buy More & Save More 🌿</span>
                <span>───</span>
              </div>

              <div className="flex flex-col gap-2">
                {quantityOptions.map((option) => {
                  const optUnitPrice = basePrice * (1 - option.discount / 100);
                  const optTotalPrice = optUnitPrice * option.qty;
                  const optOriginalTotal = originalBasePrice * option.qty;

                  return (
                    <label
                      key={option.qty}
                      onClick={() => setSelectedQuantityOption(option.qty)}
                      className={`relative flex items-center justify-between border rounded-xl p-3 cursor-pointer transition-all ${
                        selectedQuantityOption === option.qty
                          ? 'border-primary bg-primary/[0.02] shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="qty-discount-option"
                          checked={selectedQuantityOption === option.qty}
                          onChange={() => setSelectedQuantityOption(option.qty)}
                          className="w-3.5 h-3.5 accent-primary cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-extrabold text-text-dark">{option.label}</span>
                          {option.discount > 0 && (
                            <span className="absolute -top-2 right-2 bg-primary text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                              Save {option.discount}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-baseline gap-1.5 justify-end">
                          {option.discount > 0 && (
                            <span className="text-[10px] text-gray-400 line-through font-semibold">
                              ₹{optOriginalTotal.toFixed(2)}
                            </span>
                          )}
                          <span className="text-xs font-black text-primary font-display">
                            ₹{optTotalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowInquiryModal(true)}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-display font-black text-sm rounded-xl tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none uppercase"
              >
                Book Inquiry (₹{totalPrice.toFixed(2)})
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-text-muted hover:text-primary transition-colors cursor-pointer py-1.5 w-fit mx-auto"
              >
                <FiShare2 />
                <span>Share</span>
              </button>
            </div>

            {/* Accordion Specification Details */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              
              {/* How we work */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleAccordion('howWeWork')}
                  className="w-full py-2 flex items-center justify-between text-xs font-extrabold uppercase text-text-dark tracking-wide hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>How we work?</span>
                  {openAccordions.howWeWork ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {openAccordions.howWeWork && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[11px] text-text-muted/90 leading-relaxed py-1 flex flex-col gap-2"
                    >
                      <p>1. We coordinate directly with regional nurseries near you to ensure fresh plant collection.</p>
                      <p>2. Plants are selected manually by expert growers to match standard height and rooting benchmarks.</p>
                      <p>3. Safely secured in bio-ventilated packages and shipped directly to your location.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Care Tips */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleAccordion('careTips')}
                  className="w-full py-2 flex items-center justify-between text-xs font-extrabold uppercase text-text-dark tracking-wide hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Care Tips</span>
                  {openAccordions.careTips ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {openAccordions.careTips && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[11px] text-text-muted/90 leading-relaxed py-1 flex flex-col gap-2"
                    >
                      <p>☀️ <strong>Light:</strong> Thrives in medium to bright indirect sunlight. Avoid keeping under direct harsh noon sun.</p>
                      <p>💧 <strong>Watering:</strong> Water only when the top 1-2 inches of soil feels dry. Succulents prefer dry roots over soggy ones.</p>
                      <p>🪴 <strong>Soil:</strong> Use a fast-draining gritty succulent mix or premium organic cocopeat-vermicompost blend.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-2 flex items-center justify-between text-xs font-extrabold uppercase text-text-dark tracking-wide hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Shipping</span>
                  {openAccordions.shipping ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {openAccordions.shipping && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[11px] text-text-muted/90 leading-relaxed py-1"
                    >
                      Ships within 2-4 business days. Secure packaging ensures the plant stays alive and healthy during the transit period of up to 7 days.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Refund Policy */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => toggleAccordion('refundPolicy')}
                  className="w-full py-2 flex items-center justify-between text-xs font-extrabold uppercase text-text-dark tracking-wide hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Refund Policy</span>
                  {openAccordions.refundPolicy ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {openAccordions.refundPolicy && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[11px] text-text-muted/90 leading-relaxed py-1"
                    >
                      We offer a comprehensive 7-day money-back guarantee. If the plant arrives damaged or dies within 7 days, submit a simple video of package unboxing for a full instant replacement or refund.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Description */}
              <div className="pb-2">
                <button
                  onClick={() => toggleAccordion('description')}
                  className="w-full py-2 flex items-center justify-between text-xs font-extrabold uppercase text-text-dark tracking-wide hover:text-primary transition-colors cursor-pointer text-left"
                >
                  <span>Description</span>
                  {openAccordions.description ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                <AnimatePresence>
                  {openAccordions.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-[11px] text-text-muted/90 leading-relaxed py-1 text-left"
                    >
                      {product.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Suggested Products Section */}
      {similarProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 md:px-8 mt-16 border-t border-primary/5 pt-12 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Related Plants
              </span>
              <h3 className="font-display font-black text-2xl text-text-dark mt-3">
                You may also like
              </h3>
            </div>
            <button
              onClick={handleCategoryNav}
              className="text-xs font-bold text-primary hover:text-primary-dark underline cursor-pointer"
            >
              Browse Full Category &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <div 
                key={item.id} 
                onClick={() => {
                  window.location.hash = `#product/${item.id}`;
                }}
                className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group cursor-pointer"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-gray-50 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">
                      Sale
                    </span>
                  </div>
                  <h4 className="font-display font-extrabold text-xs text-text-dark line-clamp-1 mb-0.5 font-sans group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 my-1">
                    <div className="flex gap-0.5 text-primary text-[8px]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="w-2.5 h-2.5 bg-primary text-white flex items-center justify-center rounded-sm">★</span>
                      ))}
                    </div>
                    <span className="text-[9px] text-text-muted font-bold">(12)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-400 line-through">₹{item.originalPrice}</span>
                    <span className="font-display font-black text-xs text-primary">₹{item.price}</span>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-primary hover:text-primary-dark underline">View</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-2xl p-6 relative"
            >
              <button
                onClick={() => {
                  setShowInquiryModal(false);
                  setIsInquirySuccess(false);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-text-dark text-lg font-bold cursor-pointer"
              >
                ✕
              </button>

              {!isInquirySuccess ? (
                <>
                  <div className="text-left mb-6">
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                      Secure Catalog Booking
                    </span>
                    <h3 className="font-display font-black text-xl text-text-dark mt-3">
                      Complete Your Inquiry Details
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      You are booking {selectedQuantityOption}x {product.name} ({selectedPot}) for a total price of <strong className="text-primary">₹{totalPrice.toFixed(2)}</strong>.
                    </p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4 text-left">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp number preferred"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Message (Optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Include custom queries or delivery instructions..."
                        value={inquiryForm.message}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isInquirySubmitting}
                      className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer focus:outline-none mt-2 uppercase"
                    >
                      {isInquirySubmitting ? 'Sending Request...' : 'Send Inquiry Request'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-green-50 text-primary border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    ✓
                  </div>
                  <h3 className="font-display font-black text-xl text-text-dark mb-1">Inquiry Sent Successfully!</h3>
                  <p className="text-xs text-text-muted max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you <span className="font-bold text-text-dark">{inquiryForm.name}</span>. The accredited grower at <span className="font-bold text-text-dark">{product.origin}</span> has received your booking request for <span className="font-bold text-text-dark">{selectedQuantityOption}x {product.name}</span>. They will respond shortly.
                  </p>
                  
                  <button
                    onClick={() => {
                      setShowInquiryModal(false);
                      setIsInquirySuccess(false);
                      setInquiryForm({ name: '', phone: '', message: '' });
                    }}
                    className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Done
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
