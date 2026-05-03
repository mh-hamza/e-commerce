import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishListContext";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart } = useCart();
    const productId = product._id || product.id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 border border-gray-100 relative"
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                        NEW
                    </span>
                )}

                {product.isBestSeller && (
                    <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                        HOT
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    if (isInWishlist(productId)) {
                        removeFromWishlist(productId);
                    } else {
                        addToWishlist(product);
                    }
                }}
                title={isInWishlist(productId) ? "Remove from Wishlist" : "Add to Wishlist"}
                className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition ${isInWishlist(productId) ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-red-500'}`}
            >
                <Heart size={16} fill={isInWishlist(productId) ? "currentColor" : "none"} />
            </button>

            {/* Product Image (Main Link) */}
            <Link
                to={`/product/${productId}`}
                className="block relative aspect-[4/5] overflow-hidden bg-gray-100"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

                    {/* Add to cart button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="bg-white p-2 rounded-full translate-y-4 group-hover:translate-y-0 transition duration-300 hover:bg-primary hover:text-white"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>

                    {/* View Details button (fixed) */}
                    <button
                        onClick={(e) => { e.preventDefault(); navigate(`/product/${productId}`); }}
                        className="bg-white p-2 rounded-full translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75 hover:bg-primary hover:text-white"
                        title="View Details"
                    >
                        <Eye size={20} />
                    </button>

                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>

                <Link
                    to={`/product/${productId}`}
                    className="block text-lg font-semibold text-dark hover:text-primary transition mb-2 truncate"
                >
                    {product.name}
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm text-gray-700">{product.rating}</span>
                    </div>

                    <span className="text-xl font-bold text-primary">
                        ${product.price}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
