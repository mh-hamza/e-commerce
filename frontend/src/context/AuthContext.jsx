import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

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

    useEffect(() => {
        if (user) {
            localStorage.setItem('saad_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('saad_user');
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            localStorage.setItem('saad_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('saad_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    useEffect(() => {
        const verifyUser = async () => {
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/user/verify', {
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

    const registerUser = async (fullName, email, password, phone) => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
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
            const response = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password
            });
            if (response.data.success) {
                setUser(response.data.userData);
                setToken(response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthLoading, registerUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;