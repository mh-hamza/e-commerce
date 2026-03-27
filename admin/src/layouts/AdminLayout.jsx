import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  const verifyAdmin = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/admin/verify`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.data.success) {
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Login Error", error);
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;