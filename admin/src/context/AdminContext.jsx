import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState({
    sales: 12500,
    orders: 156,
    products: 42,
    users: 890
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD-7712', customer: 'John Doe', amount: 120, status: 'Delivered', date: '2023-10-15' },
    { id: '#ORD-7711', customer: 'Sarah Smith', amount: 85, status: 'Processing', date: '2023-10-14' },
    { id: '#ORD-7710', customer: 'Mike Johnson', amount: 350, status: 'Pending', date: '2023-10-14' },
    { id: '#ORD-7709', customer: 'Anna Lee', amount: 65, status: 'Delivered', date: '2023-10-13' },
  ]);

  return (
    <AdminContext.Provider value={{ stats, recentOrders }}>
      {children}
    </AdminContext.Provider>
  );
};
