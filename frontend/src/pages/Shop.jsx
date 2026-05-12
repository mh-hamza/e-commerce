import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Shop = () => {
    const { products, loadingProducts, filterCategories: categories } = useData();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [displayLimit, setDisplayLimit] = useState(12); // Start with 12 for better fill
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
    const [priceRange, setPriceRange] = useState(2000);
    const [sortBy, setSortBy] = useState('default');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);


    const loadMoreRef = useRef(null);


    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('All');
        }
    }, [categoryParam]);

    useEffect(() => {
        let result = products;

        // Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Price
        result = result.filter(p => p.price <= priceRange);

        // Sorting
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts([...result]);
    }, [selectedCategory, priceRange, sortBy, products]);

    // Only reset limit when core filters change
    useEffect(() => {
        setDisplayLimit(12);
    }, [selectedCategory, priceRange, sortBy]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingMore && displayLimit < filteredProducts.length) {
                    setIsFetchingMore(true);
                    setTimeout(() => {
                        setDisplayLimit(prev => prev + 6);
                        setIsFetchingMore(false);
                    }, 400);
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [displayLimit, filteredProducts.length, isFetchingMore]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: cat });
        }
        setIsMobileFilterOpen(false);
    };

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-dark">Shop</h1>
                    <p className="text-gray-500 text-sm mt-1">Found {filteredProducts.length} items</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        className="md:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg"
                        onClick={() => setIsMobileFilterOpen(true)}
                    >
                        <Filter size={18} /> Filters
                    </button>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-auto"
                    >
                        <option value="default">Sort by: Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 shrink-0 space-y-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`text-left w-full transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Price Range</h3>
                        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                            <span>$0</span>
                            <span>${priceRange}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            step="50"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </aside>

                {/* Mobile Filter Overlay */}
                <AnimatePresence>
                    {isMobileFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                            onClick={() => setIsMobileFilterOpen(false)}
                        >
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "tween" }}
                                className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-bold">Filters</h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)}><X /></button>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                                        <ul className="space-y-2">
                                            {categories.map(cat => (
                                                <li key={cat}>
                                                    <button
                                                        onClick={() => handleCategoryChange(cat)}
                                                        className={`text-left w-full transition-colors ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-600'}`}
                                                    >
                                                        {cat}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg mb-4">Price Range</h3>
                                        <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
                                            <span>$0</span>
                                            <span>${priceRange}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000"
                                            step="50"
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(Number(e.target.value))}
                                            className="w-full accent-primary"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Product Grid */}
                <div className="flex-1">
                    {loadingProducts ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <ProductSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.slice(0, displayLimit).map(product => (
                                <ProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory('All'); setPriceRange(2000); }}
                                className="mt-4 text-primary font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Observer Sentinel & Loading indicator */}
                    <div ref={loadMoreRef} className="py-12">
                        {displayLimit < filteredProducts.length && (
                            <div className="flex flex-col items-center justify-center gap-4">
                                {isFetchingMore ? (
                                    <div className="flex items-center gap-2 text-primary font-medium">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <p className="text-sm">Bringing more furniture to you...</p>
                                    </div>
                                ) : (
                                    <div className="h-px bg-gray-100 w-full relative">
                                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400 uppercase tracking-widest">
                                            More items below
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
