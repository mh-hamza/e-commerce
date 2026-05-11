import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

const getWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem('saad_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Failed to parse wishlist from localStorage", error);
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(getWishlistFromStorage);

  // Update wishlisht local storage
  useEffect(() => {
    localStorage.setItem('saad_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // fetch data from database
  useEffect(() => {
    const handleLogin = () => {
      setWishlistItems(getWishlistFromStorage());
    };

    const handleLogout = () => {
      setWishlistItems([]);
    };

    window.addEventListener('userLoggedIn', handleLogin);
    window.addEventListener('userLoggedOut', handleLogout);
    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
      window.removeEventListener('userLoggedOut', handleLogout);
    };
  }, []);

  // Add to wishlist localStorage
  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const productId = product._id || product.id;
      if (prev.find(item => (item._id || item.id) === productId)) return prev;
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => (item._id || item.id) === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
