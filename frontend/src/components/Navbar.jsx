import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const isOpen = false;
    const isUserMenuOpen = false;
    const wishlistItems = [];
    const cartCount = 0;
    const user = null;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
                    <span className="font-black text-3xl">SAAD</span>
                    <span className="font-light text-dark">FurniStore</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-dark'}`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4 text-dark">
                    <Link to="/wishlist" className="relative hover:text-primary transition-colors">
                        <Heart className="w-6 h-6" />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="relative hover:text-primary transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User Menu */}
                    <div className="relative">
                        {user ? (
                            <button
                                className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-full transition-colors border border-transparent hover:border-gray-200"
                            >
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-primary" />
                            </button>
                        ) : (
                            <Link to="/login" className="hover:text-primary transition-colors">
                                <User className="w-6 h-6" />
                            </Link>
                        )}

                        {/* Dropdown */}
                        <AnimatePresence>
                            {isUserMenuOpen && user && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                    ></div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20"
                                    >
                                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                            <p className="font-bold text-dark truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                        >
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        className="md:hidden hover:text-primary transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-lg font-medium ${isActive ? 'text-primary' : 'text-dark'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {!user && (
                                <Link
                                    to="/login"
                                    className="text-lg font-medium text-dark"
                                >
                                    Sign In
                                </Link>
                            )}
                            {user && (
                                <button
                                    className="text-lg font-medium text-red-500 text-left"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
