import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminLayout from './components/AdminLayout';
import ProductManager from './components/ProductManager';
import UserManager from './components/UserManager';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Route cha Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Route con */}
        <Route index element={<AdminDashboard />} /> {/* path /admin */}
        <Route path="products" element={<ProductManager />} /> {/* path /admin/products */}
        <Route path="users" element={<UserManager />} /> {/* path /admin/users */}
      </Route>

    </Routes>
  );
};

export default App;
