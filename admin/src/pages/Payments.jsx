import React, { useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import { Truck, CreditCard, Lock, CheckCircle, Clock, XCircle, TrendingUp, IndianRupee } from 'lucide-react';

const Payments = () => {
  const { orders, loadingOrders } = useOrders();

  const stats = useMemo(() => {
    const cod = orders.filter(o => !o.paymentMethod || o.paymentMethod === 'Cash on Delivery');
    const collected = cod.filter(o => o.status === 'Delivered');
    const pending = cod.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
    const cancelled = cod.filter(o => o.status === 'Cancelled');
    const totalCollected = collected.reduce((s, o) => s + (o.totalPrice || 0), 0);
    const totalPending = pending.reduce((s, o) => s + (o.totalPrice || 0), 0);
    return { total: cod.length, collected, pending, cancelled, totalCollected, totalPending };
  }, [orders]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of payment methods and collection status</p>
      </div>

      {/* Active Method Banner */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-[#8B5E3C]/20"
        style={{ background: 'linear-gradient(135deg, #8B5E3C11 0%, #6b482911 100%)' }}>
        <div className="w-14 h-14 rounded-2xl bg-[#8B5E3C] flex items-center justify-center shrink-0">
          <Truck size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">Cash on Delivery</h2>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle size={11} /> Active
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            All orders are currently processed via Cash on Delivery. Payment is collected at the time of delivery.
          </p>
        </div>
        <div className="shrink-0">
          <div className="flex items-center gap-2 opacity-50 cursor-not-allowed bg-white border border-gray-200 px-4 py-2 rounded-xl">
            <Lock size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400 font-medium">Online Payment</span>
            <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full font-bold">Soon</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          {
            label: 'Total COD Orders',
            value: loadingOrders ? '—' : stats.total,
            icon: Truck,
            bg: 'bg-[#8B5E3C]',
            sub: 'All time'
          },
          {
            label: 'Amount Collected',
            value: loadingOrders ? '—' : `₹${stats.totalCollected.toLocaleString('en-IN')}`,
            icon: IndianRupee,
            bg: 'bg-green-500',
            sub: `${stats.collected.length} delivered orders`
          },
          {
            label: 'Pending Collection',
            value: loadingOrders ? '—' : `₹${stats.totalPending.toLocaleString('en-IN')}`,
            icon: Clock,
            bg: 'bg-amber-500',
            sub: `${stats.pending.length} active orders`
          },
          {
            label: 'Lost (Cancelled)',
            value: loadingOrders ? '—' : stats.cancelled.length,
            icon: XCircle,
            bg: 'bg-red-400',
            sub: 'Cancelled orders'
          },
        ].map(({ label, value, icon: Icon, bg, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-bold text-gray-800 mt-0.5">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent COD Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Recent COD Transactions</h2>
          <p className="text-xs text-gray-400 mt-0.5">Orders sorted by newest first</p>
        </div>

        {loadingOrders ? (
          <div className="p-8 text-center text-gray-400">Loading transactions...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Order Status</th>
                  <th className="px-6 py-3">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 15).map(order => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono font-semibold text-gray-700">
                      #{order._id.substring(order._id.length - 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{order.user?.fullName || 'Unknown'}</td>
                    <td className="px-6 py-3.5 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-3.5 font-bold text-gray-800">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      {order.status === 'Delivered' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <CheckCircle size={11} /> Collected
                        </span>
                      ) : order.status === 'Cancelled' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                          <XCircle size={11} /> Not Collected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          <Clock size={11} /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Online Payment Coming Soon */}
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CreditCard size={26} className="text-gray-400" />
        </div>
        <h3 className="font-bold text-gray-700 mb-1">Online Payment Integration</h3>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          Razorpay / Stripe integration is planned for a future update. Currently all orders use Cash on Delivery.
        </p>
        <span className="inline-block mt-4 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full">
          🔒 Coming Soon
        </span>
      </div>

    </div>
  );
};

export default Payments;