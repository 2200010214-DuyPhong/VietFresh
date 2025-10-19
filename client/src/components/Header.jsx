import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, Moon, Sun, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ onSearchClick, onScrollToService }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <img src="/logo.png" alt="Logo" className="inline w-12 h-12 mr-1" />
        </Link>
        <ul className="hidden lg:flex items-center space-x-8 uppercase text-sm font-medium text-gray-900 dark:text-gray-100">
          <li><Link to="/" className="hover:text-red-500 transition-colors">Trang Chủ</Link></li>
          <li><button onClick={onScrollToService} className="hover:text-red-500 transition-colors">Dịch Vụ</button></li>
          <li><Link to="/product" className="hover:text-red-500 transition-colors">Sản Phẩm</Link></li>
          <li><a href="#combo-deals" className="hover:text-red-500 transition-colors">Combo</a></li>
          <li><a href="#yearly-sale" className="hover:text-red-500 transition-colors">Khuyến Mãi</a></li>
          <li><a href="#latest-blog" className="hover:text-red-500 transition-colors">Tin Tức</a></li>
        </ul>
        <div className="flex items-center space-x-4 text-gray-900 dark:text-gray-100">
          <button onClick={onSearchClick} className="p-2 hover:text-red-500 transition-colors"><Search size={24} /></button>
          <button onClick={() => navigate('/login')} className="hover:text-red-500 transition-colors" aria-label="Login"><User size={20} /></button>
          <button onClick={() => navigate('/admin')} className="hover:text-red-500 transition-colors" aria-label="Admin Page"><Shield size={20} /></button>
          <button onClick={() => navigate('/cart')} className="hover:text-red-500 transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:text-red-500 transition-colors" aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden"><Menu size={24} /></button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-red-50 dark:bg-gray-800 z-50 p-8 transition-colors duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-gray-900 dark:text-gray-100"><X size={24} /></button>
          <ul className="space-y-6 mt-16 text-2xl uppercase text-gray-900 dark:text-gray-100">
            <li><Link to="/" className="hover:text-red-500 transition-colors">Trang Chủ</Link></li>
            <li><button onClick={() => { onScrollToService(); setIsMenuOpen(false); }}>Dịch Vụ</button></li>
            <li><Link to="/product" onClick={() => setIsMenuOpen(false)}>Sản Phẩm</Link></li>
            <li><a href="#combo-deals" onClick={() => setIsMenuOpen(false)}>Combo</a></li>
            <li><a href="#yearly-sale" onClick={() => setIsMenuOpen(false)}>Khuyến Mãi</a></li>
            <li><a href="#latest-blog" onClick={() => setIsMenuOpen(false)}>Tin Tức</a></li>
            <li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
