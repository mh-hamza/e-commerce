import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishListContext';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'lucide-react';

const Wishlist = () => {
    const { wishlistItems, clearWishlist } = useWishlist();

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-dark">My Wishlist</h1>
                <div className="flex items-center gap-4">
                    {wishlistItems.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                            Clear Wishlist
                        </button>
                    )}
                    <Link to="/shop" className="text-primary font-medium hover:underline flex items-center gap-1">
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                </div>
            </div>

            {wishlistItems.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {wishlistItems.map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-400 mb-2">Wishlist is Empty</h2>
                    <p className="text-gray-500 mb-6">Save items you love to revisit later.</p>
                    <Link to="/shop" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90">
                        Explore Products
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
