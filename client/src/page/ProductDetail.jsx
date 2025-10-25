import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProductDetails();
  }, [id]);

  const getFirstImage = (posterString) => {
    if (!posterString)
      return "https://via.placeholder.com/400x400?text=Ảnh+sản+phẩm";
    const firstImage = posterString.split(",")[0].trim().replace(/\\/g, "/");
    if (/^https?:\/\//.test(firstImage)) return firstImage;
    return `http://localhost:5000/${firstImage.replace(/^\/?images\//, "images/")}`;
  };

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm");
      const data = await response.json();

      const foundProduct = data.find(
        (p) => p._id === id || p.ProductCode === id || p.id === id
      );

      if (foundProduct) {
        setProduct({
          id: foundProduct._id || foundProduct.ProductCode || foundProduct.id,
          name: foundProduct.ProductName,
          price: foundProduct.Price,
          image: getFirstImage(foundProduct.Poster),
          category: foundProduct.Category,
          description: foundProduct.Describe || "Sản phẩm nông nghiệp chất lượng cao",
          purchased: foundProduct.Purchased || Math.floor(Math.random() * 5000) + 1000,
          rating: foundProduct.Rating || (Math.random() * 0.5 + 4.5).toFixed(1),
          features: foundProduct.Features || [
            "Sản phẩm tươi ngon, đảm bảo chất lượng",
            "Thu hoạch và đóng gói theo quy trình an toàn",
            "Bảo quản ở nhiệt độ phù hợp",
            "Phù hợp cho chế biến nhiều món ăn",
          ],
        });

        const suggested = data
          .filter(p => p.Category === foundProduct.Category && p._id !== foundProduct._id)
          .slice(0, 4)
          .map(p => ({
            id: p._id || p.ProductCode || p.id,
            name: p.ProductName,
            price: p.Price,
            image: getFirstImage(p.Poster),
            category: p.Category
          }));
        setSuggestedProducts(suggested);
      } else {
        setError("Không tìm thấy sản phẩm");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }
    if (hasHalfStar)
      stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>);
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300 text-xl">★</span>);
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setMessage(` ${product.name} đã được thêm vào giỏ hàng!`);
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleSuggestedProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-32 py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg">Đang tải thông tin sản phẩm...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="text-center mt-32 py-20 text-red-500">
          <p className="text-xl"> {error || "Không tìm thấy sản phẩm"}</p>
          <button
            onClick={() => navigate("/product")}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Quay lại trang sản phẩm
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 mt-28 mb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 mb-6 hover:text-green-700 transition-colors font-medium"
        >
          <span className="mr-2">←</span>
          Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-2xl object-cover w-full max-w-md h-96 shadow-md hover:shadow-lg transition-shadow"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x400?text=Ảnh+sản+phẩm";
              }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="ml-2 text-gray-600 text-sm">
                  {product.rating} / 5.0 • {product.purchased.toLocaleString("vi-VN")} lượt mua
                </span>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-4">
                <p className="text-3xl font-bold text-green-600">
                  {typeof product.price === "number"
                    ? product.price.toLocaleString("vi-VN") + "đ"
                    : "Liên hệ"}
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h2 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Đặc điểm nổi bật
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all font-semibold text-lg shadow-md hover:shadow-lg"
              >
                🛒 Thêm vào giỏ hàng
              </button>
            </div>

            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-pulse">
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="text-green-600 mr-3">🚚</span>
            Thông tin giao hàng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="text-green-600 text-lg font-semibold mb-2">📦 Miễn phí vận chuyển</div>
              <p className="text-gray-600 text-sm">Cho đơn từ 300.000đ</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="text-green-600 text-lg font-semibold mb-2">⚡ Giao hàng nhanh</div>
              <p className="text-gray-600 text-sm">Trong 2-4 giờ tại nội thành</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
              <div className="text-green-600 text-lg font-semibold mb-2">✅ Đảm bảo chất lượng</div>
              <p className="text-gray-600 text-sm">Đổi trả trong 24h</p>
            </div>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Sản Phẩm Gợi Ý
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((suggestedProduct) => (
                <div
                  key={suggestedProduct.id}
                  onClick={() => handleSuggestedProductClick(suggestedProduct.id)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={suggestedProduct.image}
                      alt={suggestedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300?text=Ảnh+sản+phẩm";
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {suggestedProduct.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {suggestedProduct.name}
                    </h3>
                    <p className="text-green-600 font-bold text-lg">
                      {typeof suggestedProduct.price === "number"
                        ? suggestedProduct.price.toLocaleString("vi-VN") + "đ"
                        : "Liên hệ"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default ProductDetail;