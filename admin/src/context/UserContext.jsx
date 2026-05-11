import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
const USERS_PER_PAGE = 20;

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const getAdminToken = () => localStorage.getItem('adminToken');

  const fetchUsers = useCallback(async (page = 1, search = '') => {
    try {
      const adminToken = getAdminToken();
      if (!adminToken) return;

      setLoadingUsers(true);
      const res = await axios.get(`${BACKEND_URL}/api/admin/users`, {
        params: { page, limit: USERS_PER_PAGE, search },
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (res.data.success) {
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.page);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchUsers(1, searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchUsers]);

  useEffect(() => {
    // Login to fetch data
    const handleAdminLogin = () => fetchUsers(1, searchTerm);
    window.addEventListener('adminLoggedIn', handleAdminLogin);
    return () => window.removeEventListener('adminLoggedIn', handleAdminLogin);
  }, [fetchUsers, searchTerm]);

  const goToPage = (page) => {
    fetchUsers(page, searchTerm);
  };

  const toggleBlockUser = async (id) => {
    try {
      const adminToken = getAdminToken();
      const res = await axios.put(
        `${BACKEND_URL}/api/admin/users/${id}/block`,
        {},
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (res.data.success) {
        setUsers(users.map(u =>
          u._id === id ? { ...u, isBlocked: res.data.isBlocked } : u
        ));
      }
    } catch (error) {
      console.error("Error toggling user block status:", error);
      alert("Failed to update user status.");
    }
  };

  return (
    <UserContext.Provider value={{
      users,
      loadingUsers,
      totalUsers,
      totalPages,
      currentPage,
      searchTerm,
      setSearchTerm,
      goToPage,
      toggleBlockUser,
      fetchUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
};
