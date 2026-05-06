import React, { useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import { useUsers } from '../context/UserContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Users, Package, TrendingUp,
  Clock, CheckCircle, XCircle, Truck,
  ArrowRight, AlertCircle, Star
} from 'lucide-react';

const Dashboard = () => {
  const { orders, loadingOrders } = useOrders();
  const { totalUsers, loadingUsers } = useUsers();
  const { products } = useProducts();

  // Derived stats from real data
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Processing').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped' || o.status === 'Out for Delivery').length;
    return { totalRevenue, totalOrders, pendingOrders, deliveredOrders, cancelledOrders, shippedOrders };
  }, [orders]);

  const recentOrders = useMemo(() => [...orders].slice(0, 6), [orders]);

  const statusConfig = {
    'Processing':       { color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-500' },
    'Shipped':          { color: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
    'Out for Delivery': { color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
    'Delivered':        { color: 'bg-green-100 text-green-700',  dot: 'bg-green-500' },
    'Cancelled':        { color: 'bg-red-100 text-red-700',      dot: 'bg-red-500' },
  };

  const StatCard = ({ icon: Icon, label, value, sub, iconBg, loading }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={26} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        {loading ? (
          <div className="h-7 w-24 bg-gray-100 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
        )}
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, Admin! Here's what's happening in your store.
        </p>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
          sub="From all delivered & active orders"
          iconBg="bg-[#8B5E3C]"
          loading={loadingOrders}
        />
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={stats.totalOrders}
          sub={`${stats.pendingOrders} pending`}
          iconBg="bg-blue-500"
          loading={loadingOrders}
        />
        <StatCard
          icon={Users}
          label="Registered Users"
          value={totalUsers}
          sub="All time signups"
          iconBg="bg-indigo-500"
          loading={loadingUsers}
        />
        <StatCard
          icon={Package}
          label="Total Products"
          value={products.length}
          sub="Active listings"
          iconBg="bg-emerald-500"
          loading={false}
        />
      </div>

      {/* Order Status Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Processing', count: stats.pendingOrders,   icon: Clock,         bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-100' },
          { label: 'Shipped',    count: stats.shippedOrders,   icon: Truck,         bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
          { label: 'Delivered',  count: stats.deliveredOrders, icon: CheckCircle,   bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-100' },
          { label: 'Cancelled',  count: stats.cancelledOrders, icon: XCircle,       bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-100' },
        ].map(({ label, count, icon: Icon, bg, text, border }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} px-5 py-4 flex items-center gap-3`}>
            <Icon size={20} className={text} />
            <div>
              <p className={`text-xl font-bold ${text}`}>{loadingOrders ? '—' : count}</p>
              <p className={`text-xs font-medium ${text} opacity-80`}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Orders — takes 2/3 width */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-[#8B5E3C] hover:underline flex items-center gap-1 font-medium">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loadingOrders ? (
            <div className="p-8 text-center text-gray-400">Loading orders...</div>
          ) : recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No orders yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentOrders.map(order => {
                const cfg = statusConfig[order.status] || { color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' };
                return (
                  <div key={order._id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/60 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center shrink-0">
                      <ShoppingBag size={16} className="text-[#8B5E3C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {order.user?.fullName || 'Unknown'} · {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-gray-800">₹{order.totalPrice?.toLocaleString('en-IN')}</p>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Products — takes 1/3 width */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Products</h2>
            <Link to="/admin/products" className="text-sm text-[#8B5E3C] hover:underline flex items-center gap-1 font-medium">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No products yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {products.slice(0, 6).map(product => (
                <div key={product._id || product.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/60 transition-colors">
                  <div className="w-11 h-11 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://placehold.co/44x44?text=?'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">{product.category || 'Uncategorized'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-800">₹{product.price?.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/40">
            <Link
              to="/admin/products/add"
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #8B5E3C, #6b4829)' }}
            >
              <Package size={16} /> Add New Product
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;