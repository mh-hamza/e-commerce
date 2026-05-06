import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: ''
    });

    useEffect(() => {
        if (user) {
            const [firstName, ...lastNameParts] = (user.name || '').split(' ');
            const lastName = lastNameParts.join(' ');
            setFormData({
                firstName: firstName || '',
                lastName: lastName || '',
                email: user.email || '',
                address: user.address?.street || '',
                city: user.address?.city || '',
                zipCode: user.address?.pincode || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user && token) {
            try {
                await axios.put('http://localhost:5000/api/user/address', {
                    address: {
                        street: formData.address,
                        city: formData.city,
                        pincode: formData.zipCode
                    }
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error("Failed to update address", error);
            }
        }

        setTimeout(() => {
            setIsOrderPlaced(true);
            clearCart();

        }, 1500);
    };

    if (cartItems.length === 0 && !isOrderPlaced) {
        return <div className="text-center py-20">Your cart is empty. Please add items to checkout.</div>;
    }

    if (isOrderPlaced) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6"
                >
                    <Check size={48} strokeWidth={4} />
                </motion.div>
                <h1 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8">Thank you for your purchase. Your order #12345 has been placed successfully.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping details */}
                <div>
                    <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">First Name</label>
                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Email Address</label>
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Address</label>
                            <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="123 Main St" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">City</label>
                                <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="New York" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Zip Code</label>
                                <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="10001" />
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mt-8 mb-4">Payment Method (Dummy)</h2>
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 text-sm">
                            <p>For this demo, no payment details are required. Just click "Place Order".</p>
                        </div>
                    </form>
                </div>

                {/* Order details */}
                <div>
                    <div className="bg-neutral p-6 md:p-8 rounded-2xl sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                                            <span>Qty: {item.quantity}</span>
                                            <span>${item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl text-dark pt-2">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            className="mt-6 w-full bg-dark text-white py-4 rounded-full font-bold hover:bg-gray-800 transition-all hover:shadow-lg"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
