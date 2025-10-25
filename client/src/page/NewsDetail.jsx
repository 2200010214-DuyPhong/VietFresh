// src/components/NewsDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Share2, Leaf } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/news/${id}`);
      if (!res.ok) throw new Error("Không thể tải bài viết");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-green-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-green-700 dark:text-green-300">Đang tải bài viết...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !news) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-green-50 dark:bg-green-900 flex flex-col items-center justify-center text-center px-4">
          <p className="text-red-500 text-lg mb-4">{error || "Không tìm thấy bài viết"}</p>
          <Link
            to="/news"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Quay lại trang tin tức
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-green-50 dark:bg-green-900 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Nút quay lại */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 mb-6 transition"
          >
            <ArrowLeft size={20} /> Quay lại
          </button>

          {/* Thông tin bài viết */}
          <div className="flex items-center flex-wrap gap-4 text-sm text-green-700 dark:text-green-300 mb-6">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Leaf size={12} />
              {news.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(news.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{news.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{news.author || "Admin"}</span>
            </div>
          </div>

          {/* Tiêu đề */}
          <h1 className="text-4xl font-bold text-green-900 dark:text-green-100 mb-6">
            {news.title}
          </h1>

          {/* Ảnh đại diện */}
          <div className="mb-8">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-96 object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400/4ADE80/1F2937?text=Tin+Tức";
              }}
            />
          </div>

          {/* Nội dung */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none leading-relaxed mb-10 text-green-800 dark:text-green-200"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Chia sẻ */}
          <div className="border-t border-green-200 dark:border-green-700 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <Share2 size={16} />
                <span>Chia sẻ bài viết:</span>
              </div>
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Facebook
                </button>
                <button className="text-sky-500 hover:text-sky-600 font-medium text-sm">
                  Twitter
                </button>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  Zalo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;
