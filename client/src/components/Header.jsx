import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X, Moon, Sun, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ onSearchClick, onScrollToService }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState('');
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

  const submitSearch = (e) => {
    if (e) e.preventDefault();
    const q = query.trim();
    navigate(`/product${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    setQuery('');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'Trang Chủ', path: '/', type: 'link' },
    { label: 'Dịch Vụ', path: '#services', type: 'button', action: onScrollToService },
    { label: 'Sản Phẩm', path: '/product', type: 'link' },
    { label: 'Khuyến Mãi', path: '#yearly-sale', type: 'anchor' },
    { label: 'Tin Tức', path: '/news', type: 'link' }, 
  ];

  const mobileMenuItems = [
    ...menuItems,
    { label: 'Admin', path: '/admin', type: 'link' }
  ];

  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-40 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <img src="/logo.png" alt="Logo" className="inline w-12 h-12 mr-1" />
        </Link>

        <ul className="hidden lg:flex items-center space-x-8 uppercase text-sm font-medium text-gray-900 dark:text-gray-100">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.type === 'link' ? (
                <Link to={item.path} className="hover:text-red-500 transition-colors">
                  {item.label}
                </Link>
              ) : item.type === 'button' ? (
                <button onClick={item.action} className="hover:text-red-500 transition-colors uppercase text-sm font-medium">
                  {item.label}
                </button>
              ) : (
                <a href={item.path} className="hover:text-red-500 transition-colors">
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={submitSearch} className="hidden md:flex items-center gap-2 w-1/3 max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, rau củ, trái cây..."
            className="w-full px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button type="submit" className="p-2 hover:text-red-500 transition-colors" aria-label="Search">
            <Search size={20} />
          </button>
        </form>

        <div className="flex items-center space-x-4 text-gray-900 dark:text-gray-100">
          <button onClick={onSearchClick} className="p-2 hover:text-red-500 transition-colors md:hidden">
            <Search size={24} />
          </button>
          <button onClick={() => handleNavigation('/login')} className="hover:text-red-500 transition-colors" aria-label="Login">
            <User size={20} />
          </button>
          <button onClick={() => handleNavigation('/admin')} className="hover:text-red-500 transition-colors" aria-label="Admin Page">
            <Shield size={20} />
          </button>
          <button className="hover:text-red-500 transition-colors relative" onClick={() => handleNavigation('/cart')}>
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:text-red-500 transition-colors" aria-label="Toggle Dark Mode">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 p-8 transition-colors duration-300">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-gray-900 dark:text-gray-100">
            <X size={24} />
          </button>
          <form onSubmit={submitSearch} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </form>
          <ul className="space-y-6 text-xl uppercase text-gray-900 dark:text-gray-100">
            {mobileMenuItems.map((item) => (
              <li key={item.label}>
                {item.type === 'link' ? (
                  <button onClick={() => handleNavigation(item.path)} className="w-full text-left hover:text-red-500 transition-colors py-2">
                    {item.label}
                  </button>
                ) : item.type === 'button' ? (
                  <button onClick={() => { item.action(); setIsMenuOpen(false); }} className="w-full text-left hover:text-red-500 transition-colors py-2">
                    {item.label}
                  </button>
                ) : (
                  <a href={item.path} onClick={() => setIsMenuOpen(false)} className="block hover:text-red-500 transition-colors py-2">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;