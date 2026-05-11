import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext()
export const useCart = () => useContext(CartContext);

const getCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('saad_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to parse cart from localStorage", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCartFromStorage);

  // Jab bhi cartItems badle, localStorage update karo
  useEffect(() => {
    localStorage.setItem('saad_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Login pe backend se data localStorage mein aa gaya — cart reload karo
  useEffect(() => {
    const handleLogin = () => {
      setCartItems(getCartFromStorage());
    };
    // Logout pe cart clear karo (localStorage already clear ho chuka hoga AuthContext mein)
    const handleLogout = () => {
      setCartItems([]);
    };

    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);
    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  // Add to cart (localStorage mein)
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const productId = product._id || product.id;
      const existingItem = prev.find(item => (item._id || item.id) === productId);
      if (existingItem) {
        return prev.map(item =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Remove from cart (localStorage mein)
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  // Update quantity (localStorage mein)
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item => ((item._id || item.id) === id ? { ...item, quantity } : item))
    );
  };

  // Clear cart (localStorage mein)
  const clearCart = () => setCartItems([]);

  // Cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}
