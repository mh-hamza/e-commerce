import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/admin/login`, { email, password });
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        // All contexts notify to admin logim
        window.dispatchEvent(new Event('adminLoggedIn'));
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error", error);
      if (!error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans">

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary opacity-90 z-10"></div>

        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>

        <div className="relative z-20 text-white p-12 max-w-lg">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-6 leading-tight"
          >
            Welcome Back to Admin
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/80 mb-8"
          >
            Manage your e-commerce platform with ease. Monitor sales, track orders, and update products in real-time.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm font-medium bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/20"
          >
            <span>Secure & Fast</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-12 relative"
      >

        <div className="lg:hidden absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-linear-to-br from-gray-50 to-gray-200">
          <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md space-y-8 bg-white/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-8 lg:p-0 rounded-2xl shadow-xl lg:shadow-none border border-white/20 lg:border-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-dark tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to access your account
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">

              {/* Email Field */}
              <div className="relative group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field py-3 bg-white pl-[40px]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="flex items-center justify-between mb-1 ml-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-accent transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10 py-3 bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full py-3 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              Sign in <ArrowRight size={20} />
            </motion.button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-primary hover:text-accent transition-colors">
              Contact Admin
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;