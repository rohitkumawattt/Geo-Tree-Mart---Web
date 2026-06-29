import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('geotree_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('geotree_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, potType = 'Bare Rooted') => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.potType === potType
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        const newQty = Math.min(newItems[existingItemIndex].quantity + Number(quantity), 10000);
        newItems[existingItemIndex].quantity = newQty;
        return newItems;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          origin: product.origin,
          unit: product.unit || 'plant',
          quantity: Math.min(Number(quantity), 10000),
          potType: potType,
        },
      ];
    });
    // Redirect to the dedicated Cart Page immediately
    window.location.hash = '#cart';
  };

  const removeFromCart = (productId, potType = 'Bare Rooted') => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === productId && item.potType === potType))
    );
  };

  const updateQuantity = (productId, potType = 'Bare Rooted', newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, potType);
      return;
    }
    const cappedQty = Math.min(newQty, 10000);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.potType === potType
          ? { ...item, quantity: Number(cappedQty) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('geotree_logged_in') === 'true';
  });
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem('geotree_user_phone') || '';
  });

  const login = (phone) => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    localStorage.setItem('geotree_logged_in', 'true');
    localStorage.setItem('geotree_user_phone', phone);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    localStorage.removeItem('geotree_logged_in');
    localStorage.removeItem('geotree_user_phone');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoggedIn,
        userPhone,
        login,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
