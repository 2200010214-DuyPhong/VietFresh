import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner = ({ currentSlide, setCurrentSlide, bannerSlides }) => {
  return (
    <section id="billboard" className="relative bg-gradient-to-br from-green-50 to-emerald-50 pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 ml-10">
            <h1 key={`title-${currentSlide}`} className="text-4xl md:text-6xl font-bold uppercase mb-8 animate-fade-in-up text-green-800">
              {bannerSlides[currentSlide].title}
            </h1>
            <button key={`button-${currentSlide}`} className="bg-green-600 text-white px-8 py-3 uppercase tracking-wider hover:bg-green-700 hover:scale-105 transition-all rounded-full animate-fade-in-up animation-delay-200">
              {bannerSlides[currentSlide].subtitle}
            </button>
          </div>
          <div className="md:w-1/2 relative h-96 md:h-auto">
            <img src={bannerSlides[currentSlide].image} alt="Nông sản" className="mx-auto rounded-3xl drop-shadow-2xl animate-zoom-in" />
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={() => setCurrentSlide(currentSlide === 0 ? bannerSlides.length - 1 : currentSlide - 1)} 
        className="absolute left-4 top-1/2 -translate-y-1/2 hover:text-green-600 hover:scale-110 transition-all bg-white rounded-full p-2 shadow-lg hover:shadow-2xl"
      >
        <ChevronLeft size={40} />
      </button>
      <button 
        onClick={() => setCurrentSlide(currentSlide === bannerSlides.length - 1 ? 0 : currentSlide + 1)} 
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-green-600 hover:scale-110 transition-all bg-white rounded-full p-2 shadow-lg hover:shadow-2xl"
      >
        <ChevronRight size={40} />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentSlide(idx)} 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'bg-green-600 w-8' : 'bg-white/50 hover:bg-white/80'
            }`} 
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>
    </section>
  );
};

export default Banner;