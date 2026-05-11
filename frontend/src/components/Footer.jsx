import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-1">
                            <span className="font-black">SAAD</span>
                            <span className="font-light text-dark">FurniStore</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Crafting comfort for your home since 2018. Premium furniture designed for modern living.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-dark hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-dark hover:text-primary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-dark hover:text-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <div>
                        <h3 className="font-bold text-dark mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
                            <li><Link to="/shop?category=Sofa" className="hover:text-primary">Sofas</Link></li>
                            <li><Link to="/shop?category=Bed" className="hover:text-primary">Beds</Link></li>
                            <li><Link to="/shop?category=Chair" className="hover:text-primary">Chairs</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-dark mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
                            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-dark mb-4">Contact</h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-primary shrink-0" size={18} />
                                <span>123 Furniture Lane, Design City, DC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-primary shrink-0" size={18} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-primary shrink-0" size={18} />
                                <span>hello@saadfurnistore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} SAAD FurniStore. All rights reserved.</p>
                    <p>
                        Designed and developed by{' '}
                        <a href="https://mohammadhamza.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                            Mohammad Hamza
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
