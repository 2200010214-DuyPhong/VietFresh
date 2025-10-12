import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, name: 'Facebook' },
    { icon: <Instagram size={20} />, name: 'Instagram' },
    { icon: <Twitter size={20} />, name: 'Twitter' },
    { icon: <Linkedin size={20} />, name: 'Linkedin' },
    { icon: <Youtube size={20} />, name: 'Youtube' },
  ];

  const quickLinks = [
    { href: '#', label: 'Trang Chủ' },
    { href: '#', label: 'Về Chúng Tôi' },
    { href: '#', label: 'Sản Phẩm' },
    { href: '#', label: 'Tin Tức' },
    { href: '#', label: 'Liên Hệ' },
  ];

  const supportLinks = [
    { href: '#', label: 'Theo Dõi Đơn Hàng' },
    { href: '#', label: 'Chính Sách Giao Hàng' },
    { href: '#', label: 'Chính Sách Đổi Trả' },
    { href: '#', label: 'Câu Hỏi Thường Gặp' },
    { href: '#', label: 'Chứng Nhận' },
  ];

  return (
    <footer className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <a href="#" className="text-2xl font-bold flex items-center gap-2 text-green-700 mb-4">
              <Leaf className="text-green-600" size={32} />
              <span>Nông Sản Sạch</span>
            </a>
            <p className="text-gray-900 mb-4">
              Cung cấp nông sản hữu cơ chất lượng cao từ năm 2015. An toàn và tươi ngon.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:text-green-600 transition-colors"
                  title={social.name}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold uppercase mb-4">Liên Kết</h5>
            <ul className="space-y-2 text-gray-900">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-green-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h5 className="font-semibold uppercase mb-4">Hỗ Trợ</h5>
            <ul className="space-y-2 text-gray-900">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-green-600 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-semibold uppercase mb-4">Liên Hệ</h5>
            <p className="text-gray-900 mb-2">
              Email:{' '}
              <a href="mailto:info@nongsan.com" className="text-green-600 hover:underline">
                contact@nongsan.com
              </a>
            </p>
            <p className="text-gray-900 mb-4">
              Hotline:{' '}
              <a href="tel:+84978372652" className="text-green-600 hover:underline">
                0978 372 652
              </a>
            </p>
            <p className="text-gray-900 text-sm">
              📍 331 Đỗ Mười, Phường An Phú Đông, TP.HCM
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-900 text-sm">
          <p>© 2025 Nông Sản Sạch. Bản quyền thuộc về chúng tôi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;