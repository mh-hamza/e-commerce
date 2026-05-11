import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h1 className="text-9xl font-black text-gray-100 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-dark mb-4">Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                The dashboard page you are looking for does not exist or you do not have permission to access it.
            </p>
            <div className="flex gap-4">
                <button 
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={18} /> Go Back
                </button>
                <Link 
                    to="/admin"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <LayoutDashboard size={18} /> Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
