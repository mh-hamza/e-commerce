import React, { useState } from 'react';
import { Bell, ShieldCheck, Truck, Package, Lock } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newOrder: true,
    userSignup: true,
    cancelledOrder: false,
  });

  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Store configuration overview</p>
      </div>

      {/* Store Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #8B5E3C, #6b4829)' }}>S</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800">Saad Furni Store</h2>
          <p className="text-sm text-gray-500">admin@saadstore.com</p>
          <p className="text-sm text-gray-500">Uttar Pradesh, India · ₹ INR</p>
        </div>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5">
          <ShieldCheck size={13} /> Super Admin
        </span>
      </div>

      {/* Notification Toggles */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell size={18} className="text-[#8B5E3C]" />
          <h3 className="font-bold text-gray-800">Notifications</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { key: 'newOrder', label: 'New Order Alert', desc: 'When a customer places an order' },
            { key: 'userSignup', label: 'New User Signup', desc: 'When a new customer registers' },
            { key: 'cancelledOrder', label: 'Order Cancelled', desc: 'When an order is cancelled' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${notifications[key] ? 'bg-[#8B5E3C]' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[key] ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Truck, label: 'Payment Method', value: 'Cash on Delivery', color: 'text-[#8B5E3C]', bg: 'bg-[#8B5E3C]/10' },
          { icon: Package, label: 'Shipping', value: 'Free above ₹500', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Lock, label: 'Admin Access', value: 'Password Protected', color: 'text-red-500', bg: 'bg-red-50' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;