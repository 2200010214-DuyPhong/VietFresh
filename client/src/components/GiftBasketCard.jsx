import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const GiftBasketCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-3 py-1 rounded-full z-10 font-semibold">
          GIỎ QUÀ
        </span>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className={`absolute inset-x-0 bottom-0 flex justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button className="bg-amber-500 text-white px-6 py-2 mb-4 flex items-center gap-2 uppercase text-sm hover:bg-amber-600 transition-colors rounded-full shadow-lg">
            Đặt Ngay <ShoppingCart size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="uppercase font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.desc}</p>
        <span className="text-amber-600 font-bold text-lg">
          {product.price.toLocaleString('vi-VN')}đ
        </span>
      </div>
    </div>
  );
};

export default GiftBasketCard;