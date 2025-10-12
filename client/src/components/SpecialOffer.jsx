import React from 'react';

const SpecialOffer = () => {
  return (
    <section id="yearly-sale" className="py-24 bg-gradient-to-r from-green-600 to-emerald-600 text-white mt-16">
      <div className="container mx-auto px-4">
        <div className="md:w-1/2">
          <h3 className="text-2xl mb-2 font-semibold">🌱 Ưu Đãi Tháng Này</h3>
          <h2 className="text-5xl font-bold uppercase mb-4">Giảm 30%</h2>
          <p className="text-xl mb-8 opacity-90">Áp dụng cho tất cả rau củ hữu cơ!</p>
          <button className="bg-white text-green-600 px-8 py-3 uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-full font-semibold">
            Mua Ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;