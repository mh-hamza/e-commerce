import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchOrders = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) return;

      setLoadingOrders(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/order/admin`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
    <OrderContext.Provider value={{ orders, loadingOrders, updateOrderStatus, deleteOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
