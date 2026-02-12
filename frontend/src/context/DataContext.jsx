import React, { createContext, useContext } from 'react';
import { Truck, Shield, Clock, RefreshCw } from 'lucide-react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const products = [
        {
            id: 1,
            name: "Velvet Cloud Sofa",
            category: "Sofa",
            price: 899,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070",
            images: [
                "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Experience the ultimate comfort with our Velvet Cloud Sofa. Premium fabric, solid wood frame, and memory foam cushions.",
            isNew: true,
            isBestSeller: true
        },
        {
            id: 2,
            name: "Minimalist Oak Table",
            category: "Table",
            price: 349,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=2304",
            images: [
                "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=2304",
                "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "A perfect blend of style and durability. This solid oak dining table fits perfectly in modern homes.",
            isNew: false,
            isBestSeller: true
        },
        {
            id: 3,
            name: "ErgoOffice Chair",
            category: "Office Furniture",
            price: 299,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=2618",
            images: [
                "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=2618",
                "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Work in comfort with the ErgoOffice Chair. Lumbar support, breathable mesh, and adjustable height.",
            isNew: true,
            isBestSeller: false
        },
        {
            id: 4,
            name: "Royal King Bed",
            category: "Bed",
            price: 1299,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1505693416388-b03463126db1?auto=format&fit=crop&q=80&w=2070",
            images: [
                "https://images.unsplash.com/photo-1505693416388-b03463126db1?auto=format&fit=crop&q=80&w=2070",
                "https://images.unsplash.com/photo-1522771753062-5a498b2ae362?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Sleep like royalty. High-quality upholstered headboard and sturdy frame for a peaceful night's sleep.",
            isNew: false,
            isBestSeller: true
        },
        {
            id: 5,
            name: "Modern Lounge Chair",
            category: "Chair",
            price: 199,
            rating: 4.3,
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=2787",
            images: [
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=2787",
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Add a touch of elegance to your living room with our Modern Lounge Chair. Available in multiple colors.",
            isNew: true,
            isBestSeller: false
        },
        {
            id: 6,
            name: "Spacious Wardrobe",
            category: "Wardrobe",
            price: 599,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=2574",
            images: [
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=2574",
                "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Organize your clothes in style. Large capacity with multiple compartments and a sleek finish.",
            isNew: false,
            isBestSeller: false
        },
        {
            id: 7,
            name: "Kids Bunk Bed",
            category: "Kids Furniture",
            price: 499,
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1522771753062-5a498b2ae362?auto=format&fit=crop&q=80&w=2572",
            images: [
                "https://images.unsplash.com/photo-1522771753062-5a498b2ae362?auto=format&fit=crop&q=80&w=2572",
                "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1532423622396-10a3f979251a?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Fun and safe bunk bed for kids. Built-in ladder and safety rails.",
            isNew: true,
            isBestSeller: true
        },
        {
            id: 8,
            name: "Nordic Coffee Table",
            category: "Table",
            price: 149,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=2576",
            images: [
                "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=2576",
                "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
            ],
            description: "Simple, elegant coffee table for your morning brew (and magazines).",
            isNew: false,
            isBestSeller: true
        }
    ];

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
