import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-gray-100"
        >
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.isNew && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                    </span>
                )}
                {product.isBestSeller && (
                    <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                        HOT
                    </span>
                )}
            </div>

            {/* Wishlist Icon (UI only) */}
            <button
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white text-gray-500 hover:text-red-500 transition-colors"
                title="Wishlist"
            >
                <Heart className="w-4 h-4" />
            </button>

            {/* Image */}
            <Link
                to={`/product/${product.id}`}
                className="block relative aspect-[4/5] overflow-hidden bg-gray-100"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Actions (UI only) */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                        className="bg-white text-dark p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>

                    <Link
                        to={`/product/${product.id}`}
                        className="bg-white text-dark p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-primary hover:text-white"
                        title="View Details"
                    >
                        <Eye size={20} />
                    </Link>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>

                <Link
                    to={`/product/${product.id}`}
                    className="block text-lg font-semibold text-dark hover:text-primary transition-colors mb-2 truncate"
                >
                    {product.name}
                </Link>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">
                            {product.rating}
                        </span>
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
