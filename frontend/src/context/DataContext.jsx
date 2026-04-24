import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Shield, Clock, RefreshCw } from 'lucide-react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product/getAllProducts');
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    console.log("--------------------", products);
    const reviews = [
        { id: 1, user: "Sarah L.", rating: 5, comment: "Absolutely love this sofa! So comfy." },
        { id: 2, user: "Mike R.", rating: 4, comment: "Great quality, fast delivery." }
    ];

    const categories = [
        { name: 'Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070', count: '12 Items' },
        { name: 'Bed', image: 'https://images.unsplash.com/photo-1505693416388-b03463126db1?auto=format&fit=crop&q=80&w=2070', count: '8 Items' },
        { name: 'Chair', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=2787', count: '15 Items' },
        { name: 'Table', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=2304', count: '10 Items' },
    ];

    const features = [
        { icon: <Truck size={32} />, title: "Free Shipping", text: "On all orders over $500" },
        { icon: <Shield size={32} />, title: "Secure Payment", text: "100% secure transaction" },
        { icon: <RefreshCw size={32} />, title: "30 Day Returns", text: "Hassle-free returns" },
        { icon: <Clock size={32} />, title: "24/7 Support", text: "Dedicated support team" },
    ];

    const filterCategories = ['All', 'Sofa', 'Bed', 'Chair', 'Table', 'Wardrobe', 'Office Furniture', 'Kids Furniture'];

    return (
        <DataContext.Provider value={{ products, reviews, categories, features, filterCategories }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
