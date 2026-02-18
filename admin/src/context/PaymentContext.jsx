import React, { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export const usePayments = () => useContext(PaymentContext);

const initialPayments = [
  { id: 'PAY-1001', orderId: '#ORD-7712', amount: 120.50, method: 'Credit Card', status: 'Success', date: '2023-10-15' },
  { id: 'PAY-1002', orderId: '#ORD-7711', amount: 85.00, method: 'PayPal', status: 'Success', date: '2023-10-14' },
  { id: 'PAY-1003', orderId: '#ORD-7710', amount: 350.20, method: 'Credit Card', status: 'Pending', date: '2023-10-14' },
  { id: 'PAY-1004', orderId: '#ORD-7709', amount: 65.00, method: 'Apple Pay', status: 'Success', date: '2023-10-13' },
  { id: 'PAY-1005', orderId: '#ORD-7708', amount: 210.00, method: 'Credit Card', status: 'Refunded', date: '2023-10-12' },
];

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const refundPayment = (id) => {
    setPayments(payments.map(payment =>
      payment.id === id ? { ...payment, status: 'Refunded' } : payment
    ));
  };

  return (
    <PaymentContext.Provider value={{ payments, refundPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};
