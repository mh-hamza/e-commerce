import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'
import { WishlistProvider } from '../context/WishListContext'
import { ToastProvider } from '../context/ToastContext'

const MainLayout = () => {
    return (
        <>
            <ToastProvider>
                <CartProvider>
                    <WishlistProvider>
                        <div className="flex flex-col min-h-screen bg-white">
                            <Navbar />
                            <main className="flex-grow">
                                <Outlet />
                            </main>
                            <Footer />
                        </div>
                    </WishlistProvider>
                </CartProvider>
            </ToastProvider>
        </>
    )
}

export default MainLayout