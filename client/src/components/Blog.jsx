import React from 'react';

const Blog = () => {
  const blogPosts = [
    { date: '15/03/2024', category: 'Mẹo hay', title: 'Cách Bảo Quản Rau Củ Tươi Lâu', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
    { date: '20/03/2024', category: 'Tin tức', title: 'Lợi Ích Của Thực Phẩm Hữu Cơ', img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400' },
    { date: '25/03/2024', category: 'Hướng dẫn', title: 'Nhận Biết Rau Củ Sạch Chất Lượng', img: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400' },
  ];

  return (
    <section id="latest-blog" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold uppercase text-green-800">Tin Tức Nông Nghiệp</h2>
          <button className="text-sm uppercase underline hover:no-underline text-green-600">
            Đọc Thêm
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="overflow-hidden">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <div className="uppercase text-sm text-gray-500 mb-2">
                  <span>{post.date}</span> - <span className="text-green-600">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold uppercase group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;