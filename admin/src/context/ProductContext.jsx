import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/product/getAllProducts`);
      if (response.data && response.data.success) {
        const fetchedProducts = response.data.products.map(p => ({
          ...p,
          id: p._id
        }));
        setProducts(fetchedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
