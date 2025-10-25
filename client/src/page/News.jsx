import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Leaf, Sprout } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả', icon: <Leaf size={16} /> },
    { id: 'suc-khoe', name: 'Sức khỏe', icon: <Sprout size={16} /> },
    { id: 'meo-vat', name: 'Mẹo vặt', icon: <Leaf size={16} /> },
    { id: 'huong-dan', name: 'Hướng dẫn', icon: <Sprout size={16} /> },
    { id: 'cong-thuc', name: 'Công thức', icon: <Leaf size={16} /> },
    { id: 'thi-truong', name: 'Thị trường', icon: <Sprout size={16} /> },
    { id: 'tu-trong', name: 'Tự trồng', icon: <Leaf size={16} /> }
  ];

  // 🧠 Hàm định dạng ngày (vì dữ liệu là dạng "15/01/2024")
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${day} tháng ${month}, ${year}`;
  };

  // 🚀 Gọi API từ backend (MongoDB)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 🧩 Lọc theo danh mục
  const filteredNews =
    selectedCategory === 'all'
      ? news
      : news.filter((item) => item.category === selectedCategory);

  // 🕐 Giao diện loading
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-green-50 dark:bg-green-900 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-green-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 dark:bg-green-800"
                  >
                    <div className="h-48 bg-green-200 rounded mb-4"></div>
                    <div className="h-4 bg-green-200 rounded mb-2"></div>
                    <div className="h-4 bg-green-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // 📰 Giao diện chính
  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 dark:bg-green-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Tiêu đề trang */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-green-900 dark:text-green-100 mb-4">
              Tin Tức Nông Sản
            </h1>
            <p className="text-lg text-green-700 dark:text-green-300 max-w-2xl mx-auto">
              Cập nhật những tin tức mới nhất về thực phẩm sạch, công thức nấu ăn và mẹo vặt hữu ích
            </p>
          </div>

          {/* Danh mục lọc */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-800'
                    : 'bg-white dark:bg-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-700 border border-green-200 dark:border-green-700'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Danh sách tin tức */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article
                key={item._id}
                className="bg-white dark:bg-green-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-700 hover:border-green-300 dark:hover:border-green-500"
              >
                <Link to={`/news/${item._id}`} className="relative block group">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'https://via.placeholder.com/400x200/4ADE80/1F2937?text=Tin+Tức+Nông+Sản';
                      }}
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                      <Leaf size={12} />
                      {categories.find((cat) => cat.id === item.category)?.name || 'Khác'}
                    </span>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-green-600 dark:text-green-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{item.readTime || '5 phút'}</span>
                    </div>
                  </div>

                  <Link to={`/news/${item._id}`}>
                    <h2 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {item.title}
                    </h2>
                  </Link>

                  <p className="text-green-700 dark:text-green-300 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-green-100 dark:border-green-700">
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <User size={14} />
                      <span>{item.author || 'Admin'}</span>
                    </div>

                    <Link
                      to={`/news/${item._id}`}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium text-sm transition-colors group"
                    >
                      Đọc tiếp
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Khi không có tin nào */}
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-green-400 dark:text-green-600 text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                Chưa có tin tức nào trong danh mục này
              </h3>
              <p className="text-green-600 dark:text-green-500">
                Vui lòng chọn danh mục khác để xem tin tức
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
