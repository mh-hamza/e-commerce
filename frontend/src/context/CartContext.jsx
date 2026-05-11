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

  // on cartItems change update localS
  useEffect(() => {
    localStorage.setItem('saad_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  //  fetch data from database
  useEffect(() => {
    const handleLogin = () => {
      setCartItems(getCartFromStorage());
    };

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

  // Add to cart localStorage 
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

  // Remove from cart localStorage 
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  // Update quantity 
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item => ((item._id || item.id) === id ? { ...item, quantity } : item))
    );
  };


  const clearCart = () => setCartItems([]);


  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}
