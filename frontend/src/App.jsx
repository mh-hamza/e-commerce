import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
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
import ProductDetails from './pages/ProductDetails';
function App() {


  return (
    <>
      <DataProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='cart' element={<Cart />} />
            <Route path='wishlist' element={<WishList />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='shop' element={<Shop />} />
            <Route path="product/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </DataProvider>
    </>
  )
}

export default App
