import React from 'react';
import GiftBasketCard from './GiftBasketCard';

const GiftBaskets = ({ giftBaskets }) => {
  return (
    <section id="gift-baskets" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold uppercase text-green-800">Giỏ Quà Nông Sản</h2>
          <button className="text-sm uppercase underline hover:no-underline text-green-600">
            Xem Thêm
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {giftBaskets.map(product => (
            <GiftBasketCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftBaskets;