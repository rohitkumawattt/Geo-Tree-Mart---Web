import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'details' | 'success'
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

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset checkout step to cart after closing
    setTimeout(() => setCheckoutStep('cart'), 300);
  };

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
    handleClose();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col justify-between"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#FAF9F6]">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-primary text-xl" />
                <h3 className="font-display font-black text-lg text-text-dark">Your Cart</h3>
                {cartItems.length > 0 && (
                  <span className="bg-primary/10 text-primary text-xs font-black px-2.5 py-0.5 rounded-full">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-text-muted hover:text-text-dark cursor-pointer p-1.5 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    /* Empty State */
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-4 border border-primary/5">
                        <FiShoppingBag className="text-primary text-3xl" />
                      </div>
                      <h4 className="font-display font-black text-lg text-text-dark mb-1">Your cart is empty</h4>
                      <p className="text-xs text-text-muted max-w-xs mb-6">
                        Looks like you haven't added any green deals to your cart yet. Explore categories to find plants.
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    /* Cart Items List */
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.id}-${item.potType}`}
                          className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-xs relative group hover:border-primary/10 transition-all"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-50 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="font-display font-extrabold text-xs text-text-dark truncate">
                              {item.name}
                            </h4>
                            <p className="text-[10px] text-text-muted font-semibold truncate mt-0.5">
                              {item.origin}
                            </p>
                            <span className="inline-block bg-[#e8f5e9] text-[#2e7d32] text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 border border-[#c8e6c9]">
                              {item.potType}
                            </span>
                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50/50">
                                <button
                                  onClick={() => updateQuantity(item.id, item.potType, item.quantity - 1)}
                                  className="p-1 text-text-muted hover:text-text-dark cursor-pointer hover:bg-gray-100 rounded"
                                >
                                  <FiMinus className="text-[10px]" />
                                </button>
                                <span className="px-2 text-xs font-black text-text-dark w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.potType, item.quantity + 1)}
                                  className="p-1 text-text-muted hover:text-text-dark cursor-pointer hover:bg-gray-100 rounded"
                                >
                                  <FiPlus className="text-[10px]" />
                                </button>
                              </div>
                              {/* Pricing */}
                              <div className="text-right">
                                <span className="text-[10px] text-text-muted block">₹{item.price} each</span>
                                <span className="font-display text-sm font-black text-primary leading-none">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.id, item.potType)}
                            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 cursor-pointer transition-colors p-1"
                          >
                            <FiTrash2 className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'details' && (
                /* Checkout Form */
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4 text-left">
                  <div className="mb-2">
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                      Secure Shipping Details
                    </span>
                    <h3 className="font-display font-black text-xl text-text-dark mt-2">
                      Complete Order Details
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      Please enter your shipping address and contact details to finalise your booking of <strong className="text-primary">₹{grandTotal.toFixed(2)}</strong>.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-text-dark">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={shippingForm.name}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
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
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all"
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
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-text-dark">Custom Message (Optional)</label>
                    <textarea
                      rows="2"
                      placeholder="Custom logistic requests or nursery instructions..."
                      value={shippingForm.message}
                      onChange={(e) => setShippingForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 focus:border-primary/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-display font-black text-xs rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer focus:outline-none mt-2 uppercase tracking-wider"
                  >
                    {isSubmitting ? 'Processing Order...' : 'Confirm Order Details'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2 bg-gray-50 text-text-muted hover:text-text-dark font-bold text-xs rounded-xl border border-gray-100 transition-colors focus:outline-none cursor-pointer"
                  >
                    Back to Cart
                  </button>
                </form>
              )}

              {checkoutStep === 'success' && (
                /* Success Screen */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 text-primary border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <FiCheckCircle className="text-3xl" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-text-dark mb-2">Order Confirmed!</h3>
                  <p className="text-sm text-text-muted max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you <span className="font-bold text-text-dark">{shippingForm.name}</span>. Your order has been placed. The accredited growers will contact you on <span className="font-bold text-text-dark">{shippingForm.phone}</span> for shipping verification.
                  </p>

                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 mb-6 text-left">
                    <span className="text-xs font-bold text-primary block mb-1">Want instant updates and live tracking?</span>
                    <p className="text-[11px] text-text-muted">Download the GeoTree Mart App to directly communicate with growers and verify nursery logistics.</p>
                  </div>

                  <button
                    onClick={handleSuccessClose}
                    className="w-full py-3 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary (Sticky at bottom, only when items exist and in 'cart' view) */}
            {cartItems.length > 0 && checkoutStep === 'cart' && (
              <div className="border-t border-gray-100 p-6 bg-[#FAF9F6] flex flex-col gap-4 text-left">
                {/* Free Shipping Progress bar */}
                <div>
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

                <div className="flex flex-col gap-1.5 text-xs text-text-dark">
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
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="flex justify-between text-sm">
                    <span className="font-display font-black">Grand Total</span>
                    <span className="font-display font-black text-primary text-base">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('details')}
                  className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-display font-black text-xs rounded-xl tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none uppercase"
                >
                  <span>Proceed to Checkout</span>
                  <FiArrowRight />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
