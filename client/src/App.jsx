import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword'; // Thêm import này
import AdminLayout from './components/AdminLayout';
import ProductManager from './components/ProductManager';
import UserManager from './components/UserManager';
import AdminDashboard from './components/AdminDashboard';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> 
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} /> 
      <Route path="products" element={<ProductManager />} /> 
      <Route path="users" element={<UserManager />} /> 
      </Route>
    </Routes>
  );
};

export default App;