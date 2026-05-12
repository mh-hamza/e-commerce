import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchProducts = useCallback(async (page = 1, limit = 20, search = '', category = '') => {
    try {
      setLoadingProducts(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/product/getAllProducts`, {
        params: { page, limit, search, category }
      });
      if (response.data && response.data.success) {
        const fetchedProducts = response.data.products.map(p => ({
          ...p,
          id: p._id
        }));
        setProducts(fetchedProducts);
        if (response.data.total !== undefined) {
          setTotalProducts(response.data.total);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const goToPage = (page) => {
    fetchProducts(page, 20, searchTerm, filterCategory);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1, 20, searchTerm, filterCategory);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, filterCategory, fetchProducts]);

  const addProduct = async (product) => {
    await fetchProducts();
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/api/product/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProducts(products.map(p => p.id === id ? { ...response.data.product, id: response.data.product._id } : p));
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/api/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loadingProducts,
      totalProducts,
      totalPages,
      currentPage,
      searchTerm,
      setSearchTerm,
      filterCategory,
      setFilterCategory,
      goToPage,
      addProduct,
      updateProduct,
      deleteProduct,
      fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
