import React from 'react';
import { X, Search } from 'lucide-react';

const SearchPopup = ({ isSearchOpen, setIsSearchOpen }) => {
  const categories = ['Rau Củ Hữu Cơ', 'Trái Cây Tươi', 'Nấm Các Loại', 'Giỏ Quà', 'Gia Vị', 'Đặc Sản', 'Đồ Uống'];

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-300 ease-out opacity-100 scale-100 pointer-events-auto">
      <button
        onClick={() => setIsSearchOpen(false)}
        className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-3xl px-4 relative">
        <div className="relative">
          <input
            type="search"
            placeholder="Tìm kiếm nông sản tươi ngon..."
            className="w-full text-2xl border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-green-500"
          />
          <button className="absolute right-0 top-0">
            <Search size={24} className="text-green-600" />
          </button>
        </div>

        <h5 className="text-sm uppercase tracking-wider mt-10 mb-4">Danh Mục</h5>
        <div className="flex flex-wrap gap-2 text-2xl">
          {categories.map((cat, idx) => (
            <a key={idx} href="#" className="hover:text-green-600 transition-colors">
              {cat}{idx < categories.length - 1 && <span className="mx-2 text-gray-400">/</span>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;