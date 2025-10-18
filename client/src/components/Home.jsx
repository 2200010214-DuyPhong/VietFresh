import React, { useState, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Shield, Clock, Leaf, Truck } from 'lucide-react';
import CustomCursor from './CustomCursor';
import Footer from './Footer';
import Header from './Header';

const farmProducts = [
  { id: 1, name: 'Rau Hữu Cơ', price: 45000, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400', category: 'Rau xanh' },
  { id: 2, name: 'Trái Cây Tươi', price: 89000, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400', category: 'Trái cây' },
  { id: 3, name: 'Gạo Hữu Cơ', price: 55000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', category: 'Ngũ cốc' },
  { id: 4, name: 'Thịt Sạch', price: 125000, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', category: 'Thực phẩm tươi' },
  { id: 5, name: 'Mật Ong Nguyên Chất', price: 150000, image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=400', category: 'Đặc sản' },
];

const comboDeals = [
  { id: 6, name: 'Combo Gia Đình', price: 299000, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', desc: 'Rau + Trái cây + Thịt sạch' },
  { id: 7, name: 'Combo Dinh Dưỡng', price: 399000, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', desc: 'Thực phẩm hữu cơ đa dạng' },
  { id: 8, name: 'Combo Ăn Dặm', price: 199000, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', desc: 'Rau củ quả cho bé' },
  { id: 9, name: 'Combo Detox', price: 99000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', desc: 'Rau xanh + Trái cây tươi' },
];

const bannerSlides = [
  { title: 'Nông Sản Sạch - Sức Khỏe Vàng', subtitle: 'Mua Ngay', image: '/Banner1.png' },
  { title: 'Thực Phẩm Hữu Cơ Chất Lượng', subtitle: 'Khám Phá', image: '/Banner2.png' },
  { title: '100% Tự Nhiên - 0% Hóa Chất', subtitle: 'Trải Nghiệm', image: '/Banner3.png' },
];

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-500">
      <Header onSearchClick={() => setIsSearchOpen(true)} darkMode={darkMode} setDarkMode={setDarkMode} />
      <CustomCursor />

      {/* Tìm kiếm */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center transition-all duration-700 ease-in-out ${isSearchOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform">
          <X size={24} />
        </button>
        <div className="w-full max-w-3xl px-4">
          <div className="relative">
            <input type="search" placeholder="Tìm kiếm pizza yêu thích của bạn..." className="w-full text-2xl border-b-2 border-gray-300 dark:border-gray-600 pb-2 bg-transparent focus:outline-none focus:border-red-500" />
            <button className="absolute right-0 top-0"><Search size={24} className="text-red-500" /></button>
          </div>
          <h5 className="text-sm uppercase tracking-wider mt-10 mb-4">Danh Mục</h5>
          <div className="flex flex-wrap gap-2 text-2xl">
            {['Pizza Cổ Điển', 'Pizza Cao Cấp', 'Pizza Chay', 'Combo', 'Món Phụ', 'Tráng Miệng', 'Đồ Uống'].map((cat, idx) => (
              <a key={idx} href="#" className="hover:text-red-500 transition-colors">
                {cat}
                {idx < 6 && <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Banner */}
      <section id="billboard" className="relative bg-green-50 dark:bg-green-900 pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 ml-20">
            <h1 key={`title-${currentSlide}`} className="text-4xl md:text-6xl font-bold uppercase mb-8 animate-fade-in-up">{bannerSlides[currentSlide].title}</h1>
            <button key={`button-${currentSlide}`} className="bg-green-500 text-white px-8 py-3 uppercase tracking-wider hover:bg-green-600 hover:scale-105 transition-all rounded-full animate-fade-in-up animation-delay-200">{bannerSlides[currentSlide].subtitle}</button>
          </div>
          <div className="md:w-1/2 relative h-96 md:h-auto">
            <img key={`image-${currentSlide}`} src={bannerSlides[currentSlide].image} alt="Nông sản sạch" className="w-full h-96 max-w-md mx-auto object-contain drop-shadow-2xl animate-zoom-in" />
          </div>
        </div>
        <button onClick={() => setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-green-500 hover:scale-110 transition-all bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
          <ChevronLeft size={40} />
        </button>
        <button onClick={() => setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-green-500 hover:scale-110 transition-all bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
          <ChevronRight size={40} />
        </button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-green-500 w-8' : 'bg-white/50 dark:bg-gray-700 hover:bg-white/80'}`} />
          ))}
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 1s ease forwards; }
        .animate-zoom-in { animation: zoomIn 1s ease forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
      `}</style>

      {/* Dịch vụ */}
      <section className="container mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[['Cam Kết Chất Lượng', 'Sản phẩm đảm bảo an toàn và tươi sạch.', <Shield />],
          ['Giao Hàng Nhanh', 'Đảm bảo giao hàng đúng hẹn, đúng giờ.', <Clock />],
          ['100% Tự Nhiên', 'Không hóa chất, không chất bảo quản.', <Leaf />],
          ['Giao Hàng Tận Nơi', 'Phục vụ giao hàng tận nơi toàn quốc.', <Truck />]]
          .map(([title, desc, Icon], idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              {React.cloneElement(Icon, { size: 32, className: 'text-green-600' })}
              <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">{desc}</p>
              </div>
            </div>
          ))}
      </section>

      {/* Nông sản sạch */}
      <section className="container mx-auto px-4 mt-28">
        <h2 className="text-2xl font-bold mb-8">Sản Phẩm Nông Sản Sạch</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {farmProducts.map((p) => (
            <div key={p.id} className="rounded-lg bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition-shadow cursor-pointer">
              <img src={p.image} alt={p.name} className="rounded-lg object-cover aspect-square" />
              <p className="font-semibold truncate">{p.name}</p>
              <p className="text-green-600 font-semibold">{p.price.toLocaleString('vi-VN')}đ</p>
              <button className="bg-green-500 text-white rounded-md py-1 hover:bg-green-600 transition">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>

      {/* Combo Deals */}
      <section className="container mx-auto px-4 mt-28">
        <h2 className="text-2xl font-bold mb-8">Combo Deals Hot</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {comboDeals.map((c) => (
            <div key={c.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <img src={c.image} alt={c.name} className="rounded-xl object-cover w-full aspect-[16/10]" />
              <p className="mt-2 font-semibold truncate">{c.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{c.desc}</p>
              <p className="text-green-600 font-semibold mt-1">{c.price.toLocaleString('vi-VN')}đ</p>
              <button className="mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition w-full">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </div>
  );
};

export default App;
