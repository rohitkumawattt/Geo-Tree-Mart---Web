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
    clearCart,
    isLoggedIn,
    userPhone,
    login,
    logout
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'success'
  
  // Local temporary Auth input states
  const [authPhone, setAuthPhone] = useState(userPhone || '');
  const [authStep, setAuthStep] = useState('phone'); // 'phone' | 'otp'
  const [otpVal, setOtpVal] = useState('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: userPhone || '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if logged in/out globally (e.g. from navbar)
  React.useEffect(() => {
    if (!isLoggedIn) {
      setAuthPhone('');
      setOtpVal('');
      setAuthStep('phone');
      setShippingForm(prev => ({ ...prev, phone: '' }));
    } else {
      setShippingForm(prev => ({ ...prev, phone: userPhone }));
    }
  }, [isLoggedIn, userPhone]);

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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authStep === 'phone') {
      if (authPhone.length !== 10) {
        setAuthError('Please enter a valid 10-digit phone number.');
        return;
      }
      setAuthError('');
      setIsAuthSubmitting(true);
      // Simulate sending OTP
      setTimeout(() => {
        setIsAuthSubmitting(false);
        setAuthStep('otp');
      }, 1000);
    } else {
      if (otpVal.length !== 4) {
        setAuthError('Please enter a valid 4-digit OTP.');
        return;
      }
      setAuthError('');
      setIsAuthSubmitting(true);
      // Simulate verifying OTP
      setTimeout(() => {
        setIsAuthSubmitting(false);
        login(authPhone);
      }, 1000);
    }
  };

  const handleSuccessClose = () => {
    clearCart();
    onClose();
  };

  return (
    <section className="w-full min-h-screen pt-[72px] md:pt-[76px] pb-24 bg-bg-light text-text-dark dark:text-gray-105 font-sans relative transition-colors duration-300">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Navigation & Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6 text-left">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-text-muted/70 dark:text-gray-400 tracking-wide mb-6">
          <button onClick={onClose} className="hover:text-primary transition-colors cursor-pointer uppercase">Home</button>
          <FiChevronRight />
          <span className="text-text-dark dark:text-gray-200 uppercase tracking-tight">Your Cart</span>
        </div>

        <button
          onClick={onClose}
          className="group inline-flex items-center gap-2 mb-6 text-xs font-black text-primary hover:text-primary-dark bg-white dark:bg-zinc-950 border border-primary/10 dark:border-zinc-850 hover:border-primary/20 px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
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
              className="w-full bg-white dark:bg-zinc-950 border border-primary/5 dark:border-zinc-900 rounded-3xl p-8 md:p-12 shadow-sm text-center transition-colors duration-300"
            >
              <div className="w-20 h-20 bg-green-50 dark:bg-emerald-950/40 text-primary border border-green-100 dark:border-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <FiCheckCircle className="text-4xl" />
              </div>
              <h2 className="font-display font-black text-3xl text-text-dark dark:text-gray-100 mb-3">Order Placed Successfully!</h2>
              <p className="text-sm text-text-muted dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                Thank you <span className="font-bold text-text-dark dark:text-gray-200">{shippingForm.name}</span>. Your nursery order has been booked. The accredited growers will contact you on <span className="font-bold text-text-dark dark:text-gray-200">{shippingForm.phone}</span> for logistics and dispatch verification.
              </p>

              <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-zinc-800 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                <span className="text-sm font-bold text-primary block mb-1.5">Need Live Escrow and Tracking?</span>
                <p className="text-xs text-text-muted dark:text-gray-400 leading-relaxed">Download the GeoTree Mart App to manage bookings, track vehicle dispatch, and communicate directly with local nursery growers.</p>
              </div>

              <button
                onClick={handleSuccessClose}
                className="w-full max-w-xs py-4 bg-gray-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white font-bold text-sm rounded-xl transition-all cursor-pointer shadow-md"
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
              className="w-full bg-white dark:bg-zinc-950 border border-primary/5 dark:border-zinc-900 rounded-3xl py-16 px-8 shadow-sm text-center transition-colors duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-5 border border-primary/5">
                <FiShoppingBag className="text-primary text-3xl" />
              </div>
              <h3 className="font-display font-black text-lg text-text-dark dark:text-gray-100 mb-1">Your cart is empty</h3>
              <p className="text-xs text-text-muted dark:text-gray-400 max-w-xs mx-auto mb-6 leading-relaxed">
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
              className="bg-white dark:bg-zinc-950 rounded-3xl border border-primary/5 dark:border-zinc-900 p-4 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start transition-colors duration-300"
            >
              {/* Left Column: Items list */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="text-left mb-4">
                  <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-text-dark dark:text-gray-100">
                    Your Shopping <span className="text-primary italic">Cart</span>
                  </h2>
                  <p className="text-xs text-text-muted dark:text-gray-400 mt-1">
                    Review your items and select quantities before proceeding.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.potType}`}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 hover:border-primary/10 transition-all text-left shadow-xs"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-50 dark:border-zinc-800 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-sm text-text-dark dark:text-gray-200 truncate">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-text-muted dark:text-gray-400 font-semibold truncate mt-0.5">
                            Origin: <span className="text-text-dark dark:text-gray-300">{item.origin}</span>
                          </p>
                          <span className="inline-block bg-[#e8f5e9] dark:bg-emerald-950/80 text-[#2e7d32] dark:text-emerald-300 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1.5 border border-[#c8e6c9] dark:border-emerald-900/40">
                            {item.potType}
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 dark:border-zinc-800 pt-3 sm:pt-0">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 dark:border-zinc-800 rounded-lg p-0.5 bg-gray-50/50 dark:bg-zinc-950/40">
                          <button
                            onClick={() => updateQuantity(item.id, item.potType, item.quantity - 1)}
                            className="p-1.5 text-text-muted dark:text-gray-400 hover:text-text-dark dark:hover:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors"
                          >
                            <FiMinus className="text-[10px]" />
                          </button>
                          <span className="px-2 text-xs font-black text-text-dark dark:text-gray-200 min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.potType, item.quantity + 1)}
                            className="p-1.5 text-text-muted dark:text-gray-400 hover:text-text-dark dark:hover:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors"
                          >
                            <FiPlus className="text-[10px]" />
                          </button>
                        </div>

                        {/* Pricing */}
                        <div className="text-right min-w-[70px]">
                          <span className="text-[9px] text-text-muted dark:text-gray-450 block font-semibold">₹{item.price} each</span>
                          <span className="font-display text-sm font-black text-primary leading-none block mt-0.5">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id, item.potType)}
                          className="text-gray-400 dark:text-gray-500 hover:text-red-500 cursor-pointer p-2 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Checkout Summary & Form */}
              <div className="lg:col-span-5 flex flex-col gap-6 w-full text-left">
                {/* Summary Box */}
                <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 text-left transition-colors duration-300">
                  <h3 className="font-display font-black text-base text-text-dark dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-zinc-800 pb-3">Order Summary</h3>

                  {/* Free Shipping Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-[10px] font-bold text-text-dark dark:text-gray-200 mb-1">
                      <span>
                        {cartTotal >= freeShippingThreshold
                          ? '🎉 You qualify for FREE shipping!'
                          : `Add ₹${(freeShippingThreshold - cartTotal).toFixed(0)} more for FREE shipping`}
                      </span>
                      <span>₹{cartTotal.toFixed(0)} / ₹{freeShippingThreshold}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-850 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 text-xs text-text-dark dark:text-gray-200 mb-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-text-muted dark:text-gray-450">Cart Subtotal</span>
                      <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-text-muted dark:text-gray-455 font-semibold">Shipping Fee</span>
                      <span className="font-bold">
                        {shippingCost === 0 ? <span className="text-primary font-black uppercase text-[10px]">Free</span> : `₹${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-zinc-800 my-2"></div>
                    <div className="flex justify-between text-sm">
                      <span className="font-display font-black">Grand Total</span>
                      <span className="font-display font-black text-primary text-base">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Authentication / Delivery Column Wrapper */}
                {!isLoggedIn ? (
                  /* Auth Login/Signup Card */
                  <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 text-left transition-colors duration-300">
                    <div className="mb-4 border-b border-gray-200 dark:border-zinc-800 pb-3">
                      <h3 className="font-display font-black text-base text-text-dark dark:text-gray-100">Login / Signup</h3>
                      <p className="text-[10px] text-text-muted dark:text-gray-400 mt-0.5">Please verify your number to proceed with order booking</p>
                    </div>

                    <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                      {authStep === 'phone' ? (
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-bold text-text-dark dark:text-gray-250">Enter Phone Number</label>
                          <div className="relative flex items-center mt-1">
                            <span className="absolute left-4 text-sm font-bold text-text-muted dark:text-gray-455 font-sans">+91</span>
                            <input
                              type="tel"
                              required
                              placeholder="10-digit number"
                              value={authPhone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setAuthPhone(val);
                                if (authError) setAuthError('');
                              }}
                              className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all font-sans font-bold dark:text-gray-105"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-baseline">
                            <label className="text-xs font-bold text-text-dark dark:text-gray-250">Enter OTP</label>
                            <button
                              type="button"
                              onClick={() => {
                                setAuthStep('phone');
                                setOtpVal('');
                                setAuthError('');
                              }}
                              className="text-[10px] text-primary font-bold hover:underline cursor-pointer focus:outline-none"
                            >
                              Change Number
                            </button>
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Enter 4-digit OTP"
                            value={otpVal}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                              setOtpVal(val);
                              if (authError) setAuthError('');
                            }}
                            className="w-full bg-white dark:bg-zinc-955 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all text-center tracking-widest font-mono font-black mt-1 dark:text-gray-105"
                          />
                          <p className="text-[10px] text-text-muted dark:text-gray-400 mt-1">
                            An OTP has been simulated for <span className="font-bold text-text-dark dark:text-gray-200">+91 {authPhone}</span>. Enter any 4 digits to sign in.
                          </p>
                        </div>
                      )}

                      {authError && (
                        <p className="text-[11px] font-bold text-red-500">{authError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isAuthSubmitting}
                        className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-display font-black text-xs rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer focus:outline-none mt-2 uppercase tracking-wider"
                      >
                        {isAuthSubmitting ? 'Please wait...' : authStep === 'phone' ? 'Get OTP' : 'Verify & Login'}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* Shipping Details Card */
                  <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-2xl p-6 text-left transition-colors duration-300">
                    <div className="flex justify-between items-baseline mb-4 border-b border-gray-200 dark:border-zinc-800 pb-3">
                      <h3 className="font-display font-black text-base text-text-dark dark:text-gray-100">Delivery Information</h3>
                    </div>

                    <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4 text-left">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-text-dark dark:text-gray-250">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your full name"
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all dark:text-gray-105"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-text-dark dark:text-gray-250">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp number preferred"
                          value={shippingForm.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setShippingForm(prev => ({ ...prev, phone: val }));
                          }}
                          className="w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all dark:text-gray-105"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-text-dark dark:text-gray-250">Delivery Address</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Full delivery location address..."
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full bg-white dark:bg-zinc-955 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none dark:text-gray-105"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-text-dark dark:text-gray-250">Custom Message (Optional)</label>
                        <textarea
                          rows="2"
                          placeholder="Custom logistic requests or nursery instructions..."
                          value={shippingForm.message}
                          onChange={(e) => setShippingForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full bg-white dark:bg-zinc-955 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none dark:text-gray-105"
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
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
