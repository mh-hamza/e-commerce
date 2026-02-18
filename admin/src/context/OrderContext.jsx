import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

const initialOrders = [
  { id: '#ORD-7712', customer: 'John Doe', amount: 120.50, status: 'Delivered', date: '2023-10-15', items: 3 },
  { id: '#ORD-7711', customer: 'Sarah Smith', amount: 85.00, status: 'Processing', date: '2023-10-14', items: 1 },
  { id: '#ORD-7710', customer: 'Mike Johnson', amount: 350.20, status: 'Pending', date: '2023-10-14', items: 5 },
  { id: '#ORD-7709', customer: 'Anna Lee', amount: 65.00, status: 'Delivered', date: '2023-10-13', items: 2 },
  { id: '#ORD-7708', customer: 'Robert Brown', amount: 210.00, status: 'Cancelled', date: '2023-10-12', items: 4 },
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrderStatus, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
