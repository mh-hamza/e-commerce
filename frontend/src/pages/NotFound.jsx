import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <div className="relative flex items-center justify-center">
                    <h1 className="text-9xl font-black text-primary">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-dark bg-white px-4 tracking-widest uppercase">Oops!</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>
                    <Link
                        to="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Home size={18} /> Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default NotFound;
