import React from 'react';
import { Search, User, ShoppingCart, Menu, X, Leaf } from 'lucide-react';

const Header = ({ isMenuOpen, setIsMenuOpen, setIsSearchOpen, MobileMenu }) => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-40">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold flex items-center gap-2 text-green-700">
          <Leaf className="text-green-600" size={32} />
          <span>Nông Sản Sạch</span>
        </a>
        <ul className="hidden lg:flex items-center space-x-8 uppercase text-sm font-medium">
          <li><a href="#billboard" className="hover:text-green-600 transition-colors">Trang Chủ</a></li>
          <li><a href="#company-services" className="hover:text-green-600 transition-colors">Dịch Vụ</a></li>
          <li><a href="#farm-products" className="hover:text-green-600 transition-colors">Sản Phẩm</a></li>
          <li><a href="#gift-baskets" className="hover:text-green-600 transition-colors">Giỏ Quà</a></li>
          <li><a href="#yearly-sale" className="hover:text-green-600 transition-colors">Khuyến Mãi</a></li>
          <li><a href="#latest-blog" className="hover:text-green-600 transition-colors">Tin Tức</a></li>
        </ul>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-green-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="hover:text-green-600 transition-colors">
            <User size={20} />
          </button>
          <button className="hover:text-green-600 transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} />}
    </header>
  );
};

export default Header;