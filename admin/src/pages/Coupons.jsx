import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Plus, Trash2, Power, Percent } from 'lucide-react';


const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('adminToken');
  const API = `${import.meta.env.VITE_BACKEND_API_URL}/api/coupon/admin`;

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setCoupons(res.data.coupons);
      }
    } catch (error) {
      alert('Failed to fetch coupons');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCoupons();
  }, [token]);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    alert('🚫 Not Allowed');
    // if (!code || !discountPercentage) {
    //   alert('Please fill all fields');
    //   return;
    // }
    // try {
    //   setIsSubmitting(true);
    //   const res = await axios.post(`${API}/create`,
    //     { code, discountPercentage: Number(discountPercentage) },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   );
    //   if (res.data.success) {
    //     alert(res.data.message);
    //     setCode('');
    //     setDiscountPercentage('');
    //     fetchCoupons();
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   alert('Failed to create coupon');
    //   console.error(error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const handleToggleStatus = async (id) => {
    alert('🚫 Not Allowed');
    // try {
    //   const res = await axios.put(`${API}/toggle/${id}`, {}, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   if (res.data.success) {
    //     alert(res.data.message);
    //     setCoupons(coupons.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c));
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   alert('Failed to toggle status');
    //   console.error(error);
    // }
  };

  const handleDelete = async (id) => {
    alert('🚫 Not Allowed');
    // if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    // try {
    //   const res = await axios.delete(`${API}/delete/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   if (res.data.success) {
    //     alert(res.data.message);
    //     setCoupons(coupons.filter(c => c._id !== id));
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   alert('Failed to delete coupon');
    //   console.error(error);
    // }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Coupons Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage discount codes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Create Coupon Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <Plus className="text-primary" size={20} /> Add New Coupon
            </h2>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER20"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Discount Percentage</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Percent size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    min="1" max="100"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Generate Coupon'}
              </button>
            </form>
          </div>
        </div>

        {/* Coupons List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <Tag className="text-primary" size={20} />
              <h2 className="text-lg font-bold text-dark">Active & Past Coupons</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading coupons...</div>
            ) : coupons.length === 0 ? (
              <div className="p-12 text-center">
                <Tag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500">No coupons generated yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {coupons.map((coupon) => (
                  <div key={coupon._id} className="p-5 hover:bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${coupon.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {coupon.discountPercentage}%
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-dark text-lg tracking-wider">{coupon.code}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {coupon.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Created: {new Date(coupon.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleToggleStatus(coupon._id)}
                        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${coupon.isActive
                          ? 'border-yellow-200 text-yellow-600 hover:bg-yellow-50'
                          : 'border-green-200 text-green-600 hover:bg-green-50'
                          }`}
                      >
                        <Power size={16} /> {coupon.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Delete Coupon"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Coupons;
