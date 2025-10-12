import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import SearchPopup from './components/SearchPopup';
import Banner from './components/Banner';
import Services from './components/Services';
import FarmProducts from './components/FarmProducts';
import GiftBaskets from './components/GiftBaskets';
import SpecialOffer from './components/SpecialOffer';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

import { 
  farmProducts, 
  giftBaskets, 
  bannerSlides 
} from './components/products';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="font-sans">
      <CustomCursor />
      
      <SearchPopup 
        isSearchOpen={isSearchOpen} 
        setIsSearchOpen={setIsSearchOpen} 
      />
      
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsSearchOpen={setIsSearchOpen}
        MobileMenu={MobileMenu}
      />

      <Banner 
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        bannerSlides={bannerSlides}
      />

      <Services />
      
      <FarmProducts farmProducts={farmProducts} />
      
      <GiftBaskets giftBaskets={giftBaskets} />
      
      <SpecialOffer />
      
      <Blog />
      
      <Newsletter />
      
      <Footer />
    </div>
  );
};

export default App;