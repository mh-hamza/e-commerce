import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API = 'http://localhost:5000/api/user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('saad_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('saad_token') || null;
    });

    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // localStorage update on User state change
    useEffect(() => {
        if (user) {
            localStorage.setItem('saad_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('saad_user');
        }
    }, [user]);

    // Token change on axios header update                                                                  
    useEffect(() => {
        if (token) {
            localStorage.setItem('saad_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('saad_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // token verify 
    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    const res = await axios.get(`${API}/verify`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (!res.data.success) {
                        logout();
                    } else if (res.data.user) {
                        setUser(res.data.user);
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    logout();
                }
            }
            setIsAuthLoading(false);
        };
        verifyUser();
    }, []);

    // fetch cart and wishlist from database
    const loadCartWishlistFromBackend = async (userToken) => {
        try {
            const res = await axios.get(`${API}/get-cart-wishlist`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            if (res.data.success) {
                // Cart: if data in backend use it
                if (res.data.cart && res.data.cart.length > 0) {
                    localStorage.setItem('saad_cart', JSON.stringify(res.data.cart));
                }
                // Wishlist: if data in backend use it
                if (res.data.wishlist && res.data.wishlist.length > 0) {
                    localStorage.setItem('saad_wishlist', JSON.stringify(res.data.wishlist));
                }
            }
        } catch (error) {
            console.error("Failed to load cart/wishlist from backend:", error);
        }
    };

    // Logout se pehle localStorage ka cart+wishlist backend pe save karo
    const saveCartWishlistToBackend = async (userToken) => {
        try {
            const cart = JSON.parse(localStorage.getItem('saad_cart') || '[]');
            const wishlist = JSON.parse(localStorage.getItem('saad_wishlist') || '[]');

            await axios.post(`${API}/sync-cart-wishlist`,
                { cart, wishlist },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
        } catch (error) {
            console.error("Failed to save cart/wishlist to backend:", error);
        }
    };

    const registerUser = async (fullName, email, password, phone) => {
        try {
            const response = await axios.post(`${API}/register`, {
                fullName,
                email,
                password,
                phone
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API}/login`, { email, password });
            if (response.data.success) {
                const userToken = response.data.token;
                setUser(response.data.userData);
                setToken(userToken);

                // Login ke baad backend se cart+wishlist wapas localStorage mein lao
                await loadCartWishlistFromBackend(userToken);

                // CartContext aur WishlistContext ko reload karne ke liye event fire karo
                window.dispatchEvent(new Event('userLoggedIn'));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        // Pehle localStorage ka data backend pe save karo
        if (token) {
            await saveCartWishlistToBackend(token);
        }

        // Ab user aur token clear karo
        setUser(null);
        setToken(null);

        // localStorage se cart aur wishlist clear karo
        localStorage.removeItem('saad_cart');
        localStorage.removeItem('saad_wishlist');

        // Contexts ko notify karo
        window.dispatchEvent(new Event('userLoggedOut'));
    };

    const updateProfile = async (profileData) => {
        try {
            const res = await axios.put(`${API}/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setUser(res.data.user);
            }
            return res.data;
        } catch (error) {
            console.error("Failed to update profile", error);
            throw error;
        }
    };

    const updateAddress = async (addressData) => {
        try {
            const res = await axios.put(`${API}/address`, { address: addressData }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setUser(res.data.user);
            }
            return res.data;
        } catch (error) {
            console.error("Failed to update address", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthLoading, registerUser, login, logout, updateProfile, updateAddress }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;