import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiChevronRight, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../src/context/CartContext';

export default function Cart({ onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'success'
  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delivery Thresholds
  const freeShippingThreshold = 249;
  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.phone || !shippingForm.address) return;

    setIsSubmitting(true);
    // Simulate order placement API
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep('success');
    }, 1500);
  };

  const handleSuccessClose = () => {
    clearCart();
    onClose();
  };

  return (
    <section className="w-full min-h-screen pt-[72px] md:pt-[76px] pb-24 bg-[#FAF9F6] text-text-dark font-sans relative">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Navigation & Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6 text-left">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-text-muted/70 tracking-wide mb-6">
          <button onClick={onClose} className="hover:text-primary transition-colors cursor-pointer uppercase">Home</button>
          <FiChevronRight />
          <span className="text-text-dark uppercase tracking-tight">Your Cart</span>
        </div>

        <button
          onClick={onClose}
          className="group inline-flex items-center gap-2 mb-6 text-xs font-black text-primary hover:text-primary-dark bg-white border border-primary/10 hover:border-primary/20 px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
        >
          <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
          BACK TO SHOPPING
        </button>
      </div>

      {/* Main Cart Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          {checkoutStep === 'success' ? (
            /* Success Screen wrapped inside the same styled container */
            <motion.div
              key="success-step"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full bg-white border border-primary/5 rounded-3xl p-8 md:p-12 shadow-sm text-center"
            >
              <div className="w-20 h-20 bg-green-50 text-primary border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <FiCheckCircle className="text-4xl" />
              </div>
              <h2 className="font-display font-black text-3xl text-text-dark mb-3">Order Placed Successfully!</h2>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-8 leading-relaxed">
                Thank you <span className="font-bold text-text-dark">{shippingForm.name}</span>. Your nursery order has been booked. The accredited growers will contact you on <span className="font-bold text-text-dark">{shippingForm.phone}</span> for logistics and dispatch verification.
              </p>

              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                <span className="text-sm font-bold text-primary block mb-1.5">Need Live Escrow and Tracking?</span>
                <p className="text-xs text-text-muted leading-relaxed">Download the GeoTree Mart App to manage bookings, track vehicle dispatch, and communicate directly with local nursery growers.</p>
              </div>

              <button
                onClick={handleSuccessClose}
                className="w-full max-w-xs py-4 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md"
              >
                Return to Home
              </button>
            </motion.div>
          ) : cartItems.length === 0 ? (
            /* Empty State */
            <motion.div
              key="empty-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full bg-white border border-primary/5 rounded-3xl py-16 px-8 shadow-sm text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/5">
                <FiShoppingBag className="text-primary text-3xl" />
              </div>
              <h3 className="font-display font-black text-lg text-text-dark mb-1">Your cart is empty</h3>
              <p className="text-xs text-text-muted max-w-xs mx-auto mb-6 leading-relaxed">
                Looks like you haven't added any premium garden deals to your cart yet. Browse categories to select plants.
              </p>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-8 py-3 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
              >
                Explore Plants Catalog
              </button>
            </motion.div>
          ) : (
            /* Main Cart Layout wrapped in the identical rounded white showcase container */
            <motion.div
              key="cart-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border border-primary/5 p-4 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Items list */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="text-left mb-4">
                  <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-text-dark">
                    Your Shopping <span className="text-primary italic">Cart</span>
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Review your items and select quantities before proceeding.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.potType}`}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-primary/10 transition-all text-left shadow-xs"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-50 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-sm text-text-dark truncate">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-text-muted font-semibold truncate mt-0.5">
                            Origin: <span className="text-text-dark">{item.origin}</span>
                          </p>
                          <span className="inline-block bg-[#e8f5e9] text-[#2e7d32] text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1.5 border border-[#c8e6c9]">
                            {item.potType}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.potType, item.quantity - 1)}
                            className="p-1.5 text-text-muted hover:text-text-dark cursor-pointer hover:bg-gray-200 rounded transition-colors"
                          >
                            <FiMinus className="text-[10px]" />
                          </button>
                          <span className="px-2 text-xs font-black text-text-dark min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.potType, item.quantity + 1)}
                            className="p-1.5 text-text-muted hover:text-text-dark cursor-pointer hover:bg-gray-200 rounded transition-colors"
                          >
                            <FiPlus className="text-[10px]" />
                          </button>
                        </div>

                        {/* Pricing */}
                        <div className="text-right min-w-[70px]">
                          <span className="text-[9px] text-text-muted block font-semibold">₹{item.price} each</span>
                          <span className="font-display text-sm font-black text-primary leading-none block mt-0.5">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.potType)}
                          className="text-gray-300 hover:text-red-500 cursor-pointer p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Checkout Summary & Form */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                {/* Summary Box */}
                <div className="bg-[#FAF9F6] border border-gray-100 rounded-2xl p-6 text-left">
                  <h3 className="font-display font-black text-base text-text-dark mb-4 border-b border-gray-200 pb-3">Order Summary</h3>

                  {/* Free Shipping Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-bold text-text-dark mb-1">
                      <span>
                        {cartTotal >= freeShippingThreshold
                          ? '🎉 You qualify for FREE shipping!'
                          : `Add ₹${(freeShippingThreshold - cartTotal).toFixed(0)} more for FREE shipping`}
                      </span>
                      <span>₹{cartTotal.toFixed(0)} / ₹{freeShippingThreshold}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-text-dark mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-text-muted">Cart Subtotal</span>
                      <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-text-muted">Shipping Fee</span>
                      <span className="font-bold">
                        {shippingCost === 0 ? <span className="text-primary font-black uppercase text-[10px]">Free</span> : `₹${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between text-sm">
                      <span className="font-display font-black">Grand Total</span>
                      <span className="font-display font-black text-primary text-base">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Details Card */}
                <div className="bg-[#FAF9F6] border border-gray-100 rounded-2xl p-6 text-left">
                  <h3 className="font-display font-black text-base text-text-dark mb-4 border-b border-gray-200 pb-3">Delivery Information</h3>

                  <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={shippingForm.name}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp number preferred"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Delivery Address</label>
                      <textarea
                        rows="3"
                        required
                        placeholder="Full delivery location address..."
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-text-dark">Custom Message (Optional)</label>
                      <textarea
                        rows="2"
                        placeholder="Custom logistic requests or nursery instructions..."
                        value={shippingForm.message}
                        onChange={(e) => setShippingForm(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-display font-black text-xs rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer focus:outline-none mt-2 uppercase tracking-wider"
                    >
                      {isSubmitting ? 'Processing Order...' : `Place Order (₹${grandTotal.toFixed(2)})`}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
