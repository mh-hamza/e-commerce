import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const { products, loadingProducts, features, categories } = useData();
    const featuredProducts = products.filter(p => p.isBestSeller).slice(0, 4);

    const renderSkeletons = () => (
        [1, 2, 3, 4].map((n) => (
            <div key={n} className="flex flex-col gap-4 w-full">
                <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 animate-pulse rounded w-full mt-2"></div>
            </div>
        ))
    );

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-secondary/30 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute right-0 top-0 w-2/3 h-full bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=2927')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl space-y-6"
                    >
                        <span className="text-primary font-bold tracking-wider uppercase">New Collection 2024</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-dark leading-tight">
                            Comfort Meets <span className="text-primary">Style</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover our exclusive collection of premium furniture designed to transform your living space into a sanctuary of comfort.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/shop" className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                                Shop Now <ArrowRight size={20} />
                            </Link>
                            <Link to="/shop" className="bg-white text-dark border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-all hover:-translate-y-1">
                                Explore Collection
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Section*/}
            <section className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Shop by Category</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of furniture categories designed to suit every corner of your home.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                        >
                            <Link to={`/shop?category=${cat.name}`}>
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold mb-1">{cat.name}</h3>
                                    <span className="text-sm opacity-90 group-hover:translate-x-2 transition-transform inline-block">{cat.count}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-3xl font-bold text-dark">Best Sellers</h2>
                    <Link to="/shop" className="text-primary font-medium hover:underline flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loadingProducts ? renderSkeletons() : featuredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section*/}
            <section className="bg-neutral py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                            >
                                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-2">{feature.title}</h3>
                                <p className="text-gray-500">{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section*/}
            <section className="container mx-auto px-4 md:px-8 max-w-5xl">
                <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Join Our Newsletter</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">Sign up for exclusive offers, new arrivals, and design inspiration directly to your inbox.</p>
                        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-accent border border-gray-200 bg-neutral"
                            />
                            <button type="submit" className="bg-dark text-white px-8 py-4 rounded-full font-bold hover:bg-gray-900 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
