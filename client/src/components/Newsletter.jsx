import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-16 bg-green-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl uppercase mb-2">Nhận Ưu Đãi Đặc Biệt! 🌾</h2>
            <p className="text-green-200">Đăng ký để nhận thông báo về sản phẩm mới và khuyến mãi.</p>
          </div>
          <div className="md:w-1/2">
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="flex-1 px-4 py-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
              <button className="bg-green-600 px-6 py-3 uppercase font-medium hover:bg-green-700 transition-colors rounded-lg">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;