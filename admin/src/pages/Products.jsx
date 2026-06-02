import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, MoreVertical, ChevronDown } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const {
    products,
    deleteProduct,
    loadingProducts,
    totalProducts,
    totalPages,
    currentPage,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    goToPage
  } = useProducts();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(null);

  const handleEdit = (product) => {
    alert('🚫 Not Allowed');
    // navigate(`/admin/products/edit/${product.id}`, { state: { product } });
  };

  const handleDelete = (id) => {
    alert('🚫 Not Allowed');
    // if (window.confirm('Are you sure you want to delete this product?')) {
    //   deleteProduct(id);
    // }
  };



  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => alert('🚫 Not Allowed')}
          // onClick={() => navigate('/admin/products/add')}
          className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-all hover:opacity-90 shadow-lg"
          style={{ background: 'linear-gradient(135deg, #8B5E3C, #6b4829)', boxShadow: '0 4px 14px rgba(139,94,60,0.35)' }}
        >
          <Plus size={18} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] appearance-none cursor-pointer transition-all"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Sofa">Sofa</option>
            <option value="Bed">Bed</option>
            <option value="Chair">Chair</option>
            <option value="Wardrobe">Wardrobe</option>
            <option value="Office Furniture">Office Furniture</option>
            <option value="Kids Furniture">Kids Furniture</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loadingProducts ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-500">ID: #{product.id.substring(product.id.length - 6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${product.stock < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{ width: `${Math.min(product.stock, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{product.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-[#8B5E3C] hover:bg-[#8B5E3C]/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Search size={32} className="text-gray-300" />
                          <p>No products found.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
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
                    <ChevronDown className="rotate-90" size={16} />
                  </button>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronDown className="-rotate-90" size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
