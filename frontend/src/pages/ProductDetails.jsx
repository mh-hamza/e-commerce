import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Minus, Plus, ArrowRight, Share2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishListContext';
import ProductCard from '../components/ProductCard';

import { useToast } from '../context/ToastContext';

const ProductDetails = () => {
    const { products } = useData();
    const { id } = useParams();
    const product = products.find(p => p._id === id);

    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToast } = useToast();

    const [selectedImage, setSelectedImage] = useState(product ? (product.images ? product.images[0] : product.image) : '');

    // Scroll to top when id changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setQuantity(1);
        if (product) {
            setSelectedImage(product.images ? product.images[0] : product.image);
        }
    }, [id, product]);

    if (!product) {
        return <div className="text-center py-20">Product not found</div>;
    }

    const productId = product._id || product.id;
    const inWishlist = isInWishlist(productId);
    const relatedProducts = products.filter(p => p.category === product.category && (p._id || p.id) !== productId).slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        addToast(`Added ${quantity}x ${product.name} to cart`);
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-8 space-y-16">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
                <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" className="hover:text-primary">Shop</Link> / <span className="text-dark font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="space-y-4">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-100 rounded-2xl overflow-hidden aspect-square md:h-[500px] w-full relative"
                    >
                        <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
                        {product.isNew && (
                            <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">NEW</span>
                        )}
                    </motion.div>

                    {/* Thumbnails */}
                    {product.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* product detail Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">{product.category}</span>
                            <button className="text-gray-400 hover:text-primary transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">({product.rating} Rating)</span>
                        </div>
                        <div className="text-3xl font-bold text-primary">${product.price}</div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="h-px bg-gray-200"></div>

                    {/* buttons */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-dark">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-full">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-3 hover:text-primary transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-3 hover:text-primary transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-dark text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    if (inWishlist) {
                                        removeFromWishlist(productId);
                                        addToast("Removed from wishlist", "info");
                                    } else {
                                        addToWishlist(product);
                                        addToast("Added to wishlist", "success");
                                    }
                                }}
                                className={`py-4 px-4 rounded-full border transition-all hover:-translate-y-1 ${inWishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 hover:border-primary hover:text-primary'}`}
                            >
                                <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-4">
                        <div>
                            <span className="block font-bold text-dark mb-1">SKU</span>
                            DFS-{productId}00
                        </div>
                        <div>
                            <span className="block font-bold text-dark mb-1">Shipping</span>
                            Free Shipping
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="border-t border-gray-100 pt-16">
                    <h2 className="text-2xl font-bold text-dark mb-8">Related Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p._id || p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
