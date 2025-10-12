import React from 'react';
import ProductCard from './ProductCard';

const FarmProducts = ({ farmProducts }) => {
  return (
    <section id="farm-products" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold uppercase text-green-800">Nông Sản Tươi Ngon</h2>
          <button className="text-sm uppercase underline hover:no-underline text-green-600">
            Xem Tất Cả
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {farmProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmProducts;