import { useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import Checkout from './pages/Checkout'
import Shop from './pages/Shop'
import MainLayout from './layout/MainLayout'
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();
  if (isAuthLoading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const GuestRoute = () => {
  const { user, isAuthLoading } = useAuth();
  if (isAuthLoading) return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

function App() {


  return (
    <>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='contact' element={<Contact />} />
              <Route element={<GuestRoute />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>

              <Route path='cart' element={<Cart />} />
              <Route path='wishlist' element={<WishList />} />
              <Route path='shop' element={<Shop />} />

              <Route element={<ProtectedRoute />}>
                <Route path='checkout' element={<Checkout />} />
                <Route path='profile' element={<UserProfile />} />
              </Route>
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App
