import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = useCallback(async (page = 1, limit = 20, search = '') => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) return;

      setLoadingOrders(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/order/admin`, {
        params: { page, limit, search },
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.data.success) {
        setOrders(res.data.orders);
        setTotalOrders(res.data.total);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const goToPage = (page) => {
    fetchOrders(page, 20, searchTerm);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchOrders(1, 20, searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchOrders]);

  useEffect(() => {
    // Login to fetch data 
    const handleAdminLogin = () => fetchOrders(1, 20, searchTerm);
    window.addEventListener('adminLoggedIn', handleAdminLogin);
    return () => window.removeEventListener('adminLoggedIn', handleAdminLogin);
  }, [fetchOrders, searchTerm]);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/api/order/admin/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status");
    }
  };

  const deleteOrder = (id) => {
    // Optional: implement real backend delete if needed, for now just local filter
    setOrders(orders.filter(order => order._id !== id));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loadingOrders,
      totalOrders,
      totalPages,
      currentPage,
      searchTerm,
      setSearchTerm,
      goToPage,
      updateOrderStatus,
      deleteOrder,
      fetchOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};
