import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Payments from './pages/Payments.JSX';
import Content from './pages/Content';
import Settings from './pages/Settings';
import { AdminProvider } from './context/AdminContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { UserProvider } from './context/UserContext';
import { PaymentProvider } from './context/PaymentContext';
import Login from './pages/Login';
import ProductForm from './components/ProductForm';
// Placeholder components
const Placeholder = ({ title }) => <div className="text-2xl font-bold text-gray-400 p-10">{title} Page Coming Soon</div>;

function App() {
  return (
    <Router>
      <AdminProvider>
        <ProductProvider>
          <OrderProvider>
            <UserProvider>
              <PaymentProvider>
                <Routes>
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="users" element={<Users />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="content" element={<Content />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path='products/add' element={<ProductForm />} />
                    <Route path='products/edit/:id' element={<ProductForm />} />
                  </Route>
                  <Route path="/" element={<Navigate to="/admin" replace />} />
                </Routes>
              </PaymentProvider>
            </UserProvider>
          </OrderProvider>
        </ProductProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
