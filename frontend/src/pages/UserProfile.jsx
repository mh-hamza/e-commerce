import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Package, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
    const { user, updateProfile, updateAddress } = useAuth();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    // Profile Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
    });

    // Address Form State
    const [addressData, setAddressData] = useState({
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zip: user?.address?.pincode || '',
    });

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        if (user && token) {
            setLoadingOrders(true);
            axios.get('http://localhost:5000/api/order/user', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setOrders(res.data.orders))
                .catch(err => console.error("Error fetching orders", err))
                .finally(() => setLoadingOrders(false));
        }
    }, [user, token]);

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
            </div>
        );
    }

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setIsEditingProfile(false);
    };

    const handleUpdateAddress = (e) => {
        e.preventDefault();
        const address = {
            ...addressData,
            pincode: addressData.zip
        };
        updateAddress(address);
        setIsEditingAddress(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold text-dark mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Personal Info */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-24 bg-primary/10"></div>
                        <div className="relative flex flex-col items-center mb-6 mt-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white mb-4"
                            />
                            <h2 className="text-xl font-bold text-dark">{user.name}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>

                        {isEditingProfile ? (
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                    <input
                                        type="text"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        readOnly
                                        disabled
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile(false)}
                                        className="flex-1 bg-gray-100 text-dark py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X size={18} /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <User className="text-primary w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Mail className="text-primary w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Phone className="text-primary w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">{user.mobile || 'No mobile added'}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setFormData({ name: user.name, email: user.email, mobile: user.mobile || '' });
                                        setIsEditingProfile(true);
                                    }}
                                    className="w-full mt-4 border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit2 size={18} /> Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Address Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-dark flex items-center gap-2">
                                <MapPin className="text-primary" /> Address Details
                            </h3>
                            {!isEditingAddress && (
                                <button
                                    onClick={() => {
                                        setAddressData({
                                            street: user?.address?.street || '',
                                            city: user?.address?.city || '',
                                            state: user?.address?.state || '',
                                            zip: user?.address?.pincode || '',
                                        });
                                        setIsEditingAddress(true);
                                    }}
                                    className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center gap-2 text-sm"
                                >
                                    <Edit2 size={16} /> Edit Address
                                </button>
                            )}
                        </div>

                        {isEditingAddress ? (
                            <form onSubmit={handleUpdateAddress} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="md:col-span-2">
                                        <input
                                            type="text"
                                            placeholder="Street Address, Area"
                                            required
                                            value={addressData.street}
                                            onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            required
                                            value={addressData.city}
                                            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="State"
                                            required
                                            value={addressData.state}
                                            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="ZIP Code"
                                            required
                                            value={addressData.zip}
                                            onChange={(e) => setAddressData({ ...addressData, zip: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingAddress(false)}
                                        className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 flex items-center gap-2"
                                    >
                                        <Save size={16} /> Save Address
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                {user?.address && user.address.street ? (
                                    <div className="space-y-2">
                                        <p className="text-gray-800 font-medium text-lg">{user.address.street}</p>
                                        <p className="text-gray-600">{user.address.city}, {user.address.state}</p>
                                        <p className="text-gray-600">ZIP: {user.address.pincode}</p>
                                        <p className="text-gray-600">{user.address.country || 'India'}</p>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 mb-4">No address added yet.</p>
                                        <button
                                            onClick={() => setIsEditingAddress(true)}
                                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
                                        >
                                            <Edit2 size={16} /> Add Address
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div className="mt-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-dark flex items-center gap-2 mb-6">
                        <Package className="text-primary" /> My Orders
                    </h3>

                    {loadingOrders ? (
                        <div className="text-center py-8">Loading orders...</div>
                    ) : orders && orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order._id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all">
                                    <div className="flex flex-wrap justify-between items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID: #{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                            <p className="text-sm font-medium text-gray-700 flex items-center gap-1 mt-1">
                                                <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-dark">${order.totalPrice}</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-50" />
                                                <div>
                                                    <p className="font-medium text-dark text-sm">{item.name}</p>
                                                    <p className="text-sm text-gray-500">Qty: {item.qty} × ${item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No orders found.</p>
                            <a href="/shop" className="text-primary font-medium mt-2 hover:underline inline-block">Start Shopping</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
