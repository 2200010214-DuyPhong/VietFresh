import React from 'react';
import { X } from 'lucide-react';

const MobileMenu = ({ setIsMenuOpen }) => {
  const menuItems = [
    { href: '#billboard', label: 'Trang Chủ' },
    { href: '#company-services', label: 'Dịch Vụ' },
    { href: '#farm-products', label: 'Sản Phẩm' },
    { href: '#gift-baskets', label: 'Giỏ Quà' },
    { href: '#yearly-sale', label: 'Khuyến Mãi' },
    { href: '#latest-blog', label: 'Tin Tức' },
  ];

  return (
    <div className="lg:hidden fixed inset-0 bg-green-50 z-50 p-8">
      <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8">
        <X size={24} />
      </button>
      <ul className="space-y-6 mt-16 text-2xl uppercase">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-green-600 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;