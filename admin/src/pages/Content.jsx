import React from 'react';
import { Globe, Smartphone, Star, ShoppingBag, FileText, Image } from 'lucide-react';

const pages = [
  { icon: Globe,       label: 'Home Page',       desc: 'Hero banner, featured products, categories', status: 'Live' },
  { icon: ShoppingBag, label: 'Shop / Products',  desc: 'All products listing with filters',          status: 'Live' },
  { icon: Star,        label: 'Product Detail',   desc: 'Single product view with reviews',           status: 'Live' },
  { icon: FileText,    label: 'Checkout',         desc: 'Cart & COD order placement',                 status: 'Live' },
  { icon: Smartphone,  label: 'User Profile',     desc: 'Orders, address & tracking',                status: 'Live' },
  { icon: Image,       label: 'About / Blog',     desc: 'Store info & articles',                     status: 'Soon' },
];

const Content = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Content</h1>
        <p className="text-sm text-gray-500 mt-1">Frontend pages overview for Saad Furni Store</p>
      </div>

      {/* Page Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {pages.map(({ icon: Icon, label, desc, status }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#8B5E3C]/10 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-[#8B5E3C]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-gray-800 text-sm">{label}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {status === 'Live' ? '● Live' : '⏳ Soon'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Store Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">Store Identity</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Store Name',  value: 'Saad Furni Store' },
            { label: 'Tagline',     value: 'Premium Furniture' },
            { label: 'Currency',    value: '₹ INR' },
            { label: 'Language',    value: 'English' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;