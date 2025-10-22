import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword'; 
import AdminLayout from './components/AdminLayout';
import ProductManager from './components/ProductManager';
import UserManager from './components/UserManager';
import AdminDashboard from './page/AdminDashboard';
import Product from './page/Product';
import ProductDetail from './components/ProductDetail';
import Cart from './page/Cart';
import CustomCursor from './components/CustomCursor';

const App = () => {
  return (
    <>
<CustomCursor/>
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
    </Routes></>
   
  );
};

export default App;