import React, { useState } from 'react';
import { useUsers } from '../context/UserContext';
import {
  Search, ChevronLeft, ChevronRight, ShieldOff, ShieldCheck,
  Mail, Phone, MapPin, Calendar, Users as UsersIcon, X
} from 'lucide-react';

const Users = () => {
  const {
    users,
    loadingUsers,
    totalUsers,
    totalPages,
    currentPage,
    searchTerm,
    setSearchTerm,
    goToPage,
    toggleBlockUser,
  } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const avatarColor = (name = '') => {
    const colors = [
      'bg-[#8B5E3C]', 'bg-[#7a5234]', 'bg-[#6b4829]',
      'bg-[#9c6b45]', 'bg-[#a07850]', 'bg-[#5e3d26]'
    ];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  };

  const handleBlock = async (id, e) => {
    e.stopPropagation();
    alert('🚫 Not Allowed');
    // await toggleBlockUser(id);
    // if (selectedUser?._id === id) {
    //   setSelectedUser(prev => prev ? { ...prev, isBlocked: !prev.isBlocked } : null);
    // }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loadingUsers ? 'Loading...' : `${totalUsers} total registered users`}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loadingUsers ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(user => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${avatarColor(user.fullName)}`}>
                          {getInitials(user.fullName)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{user.fullName}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${user.isBlocked
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : 'bg-green-50 text-green-700 border-green-100'
                        }`}>
                        {user.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => handleBlock(user._id, e)}
                        title={user.isBlocked ? 'Unblock User' : 'Block User'}
                        className={`p-2 rounded-lg transition-colors ${user.isBlocked
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-red-500 hover:bg-red-50'
                          }`}
                      >
                        {user.isBlocked ? <ShieldCheck size={18} /> : <ShieldOff size={18} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loadingUsers && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/40">
            <p className="text-sm text-gray-500">
              Page <span className="font-medium text-gray-700">{currentPage}</span> of{' '}
              <span className="font-medium text-gray-700">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">...</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => goToPage(item)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${item === currentPage
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : 'border border-gray-200 text-gray-600 hover:bg-white'
                        }`}
                    >
                      {item}
                    </button>
                  )
                )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedUser(null)}>
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-14" style={{ background: 'linear-gradient(135deg, #8B5E3C 0%, #6b4829 100%)' }}>
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg bg-white/20 backdrop-blur-sm border border-white/30">
                {getInitials(selectedUser.fullName)}
              </div>
              <h2 className="text-xl font-bold text-white mt-3">{selectedUser.fullName}</h2>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${selectedUser.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                {selectedUser.isBlocked ? 'Blocked' : 'Active'}
              </span>
            </div>

            {/* Info Cards */}
            <div className="px-6 mt-8 mb-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 divide-y divide-gray-100">
                <div className="flex items-center gap-3 p-4">
                  <Mail className="text-[#8B5E3C] shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <Phone className="text-[#8B5E3C] shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-gray-800">{selectedUser.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <MapPin className="text-[#8B5E3C] shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedUser.address?.street
                        ? `${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.state} - ${selectedUser.address.pincode}`
                        : 'No address saved'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4">
                  <Calendar className="text-[#8B5E3C] shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Joined On</p>
                    <p className="text-sm font-medium text-gray-800">{new Date(selectedUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={(e) => handleBlock(selectedUser._id, e)}
                className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${selectedUser.isBlocked
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
                  : 'text-white shadow-lg'
                  }`}
                style={!selectedUser.isBlocked ? { background: '#8B5E3C', boxShadow: '0 4px 14px rgba(139,94,60,0.35)' } : {}}
              >
                {selectedUser.isBlocked
                  ? <><ShieldCheck size={18} /> Unblock User</>
                  : <><ShieldOff size={18} /> Block User</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
