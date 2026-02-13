import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="container mx-auto px-4 md:px-8 py-16">
            <h1 className="text-4xl font-bold text-center text-dark mb-4">Contact Us</h1>
            <p className="text-center text-gray-500 mb-16 max-w-xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-neutral p-8 rounded-2xl space-y-8">
                        <h3 className="text-2xl font-bold text-dark">Get in Touch</h3>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-primary shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Visit Us</h4>
                                <p className="text-gray-500">123 Lucknow Street, Lucknow City, Uttar Pradesh, India </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-primary shrink-0">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Call Us</h4>
                                <p className="text-gray-500">+91 9876543210</p>
                                <p className="text-gray-400 text-sm">Mon - Fri, 8am - 6pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-primary shrink-0">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Email Us</h4>
                                <p className="text-gray-500">hello@saadfurnistore.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div>
                    <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert("Message sent!"); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="font-bold text-sm text-gray-700">Name</label>
                                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-bold text-sm text-gray-700">Email</label>
                                <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" placeholder="Your email" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-sm text-gray-700">Subject</label>
                            <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" placeholder="How can we help?" />
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold text-sm text-gray-700">Message</label>
                            <textarea required rows="5" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white" placeholder="Your message..."></textarea>
                        </div>

                        <button className="w-full bg-dark text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
