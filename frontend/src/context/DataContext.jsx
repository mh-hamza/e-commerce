import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, Shield, Clock, RefreshCw } from 'lucide-react';
import sofaImg from '../assets/sofa-img.avif';
import bedImg from '../assets/bed-img.jpg';
import chairImg from '../assets/chair-img.jfif';
import tableImg from '../assets/table-img.avif';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [sofaCount, setSofaCount] = useState(0);
    const [bedCount, setBedCount] = useState(0);
    const [chairCount, setChairCount] = useState(0);
    const [tableCount, setTableCount] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/product/getAllProducts`);
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    setProducts(response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let sofa = 0;
        let bed = 0;
        let chair = 0;
        let table = 0;

        products.forEach(product => {
            if (!product.category) return;

            if (product.category === 'Sofa') sofa++;
            else if (product.category === 'Bed') bed++;
            else if (product.category === 'Chair') chair++;
            else if (product.category === 'Table') table++;
        });

        setSofaCount(sofa);
        setBedCount(bed);
        setChairCount(chair);
        setTableCount(table);
    }, [products]);

    // console.log("produtcs", products);

    const reviews = [
        { id: 1, user: "Sarah L.", rating: 5, comment: "Absolutely love this sofa! So comfy." },
        { id: 2, user: "Mike R.", rating: 4, comment: "Great quality, fast delivery." }
    ];

    const categories = [
        { name: 'Sofa', image: sofaImg, count: `${sofaCount} Items` },
        { name: 'Bed', image: bedImg, count: `${bedCount} Items` },
        { name: 'Chair', image: chairImg, count: `${chairCount} Items` },
        { name: 'Table', image: tableImg, count: `${tableCount} Items` },
    ];

    const features = [
        { icon: <Truck size={32} />, title: "Free Shipping", text: "On all orders over $500" },
        { icon: <Shield size={32} />, title: "Secure Payment", text: "100% secure transaction" },
        { icon: <RefreshCw size={32} />, title: "30 Day Returns", text: "Hassle-free returns" },
        { icon: <Clock size={32} />, title: "24/7 Support", text: "Dedicated support team" },
    ];

    const filterCategories = ['All', 'Sofa', 'Bed', 'Chair', 'Table', 'Wardrobe', 'Office Furniture', 'Kids Furniture'];

    return (
        <DataContext.Provider value={{ products, loadingProducts, reviews, categories, features, filterCategories }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);