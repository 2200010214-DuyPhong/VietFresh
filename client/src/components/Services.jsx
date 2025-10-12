import React from 'react';
import { Package, Leaf, Shield, Award } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <Package size={28} />, title: 'Giao Hàng Tươi', desc: 'Giao hàng nhanh chóng trong ngày, giữ độ tươi.' },
    { icon: <Leaf size={28} />, title: 'Hữu Cơ 100%', desc: 'Sản phẩm hữu cơ, không hóa chất độc hại.' },
    { icon: <Shield size={28} />, title: 'Nguồn Gốc Rõ Ràng', desc: 'Truy xuất nguồn gốc từ nông trại đến tay bạn.' },
    { icon: <Award size={28} />, title: 'Chất Lượng Cao', desc: 'Được chứng nhận VietGAP, GlobalGAP.' },
  ];

  return (
    <section id="company-services" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="text-green-600 flex-shrink-0">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold uppercase mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;