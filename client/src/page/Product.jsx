import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";

function Product() {
  const itemsPerPage = 15;
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [farmProducts, setFarmProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = new URLSearchParams(location.search);
  const categoryFromURL = params.get("category") || "Tất cả";
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [message, setMessage] = useState("");

  const categories = ["Tất cả", ...new Set(farmProducts.map((p) => p.Category))];

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải dữ liệu sản phẩm");
        return res.json();
      })
      .then((data) => {
        setFarmProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    const cat = newParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [location.search]);

  const filteredProducts = selectedCategory === "Tất cả" ? farmProducts : farmProducts.filter((p) => p.Category === selectedCategory);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const newParams = new URLSearchParams(location.search);
    if (category === "Tất cả") newParams.delete("category");
    else newParams.set("category", category);
    navigate({ search: newParams.toString() });
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setMessage("Đã thêm sản phẩm vào giỏ hàng");
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) return <div className="text-center mt-10">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Lỗi: {error}</div>;

  return (
    <>
      <Header />
      {message && (
        <div className="fixed top-24 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-fadeIn z-50">
          {message}
        </div>
      )}
      <section className="container mx-auto px-4 mt-28 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Sản Phẩm Nông Sản Sạch</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
              selectedCategory === cat ? "bg-green-600 text-white border-green-600" : "bg-white text-green-700 border-green-400 hover:bg-green-100" }`}>{cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentItems.map((product) => (
            <div key={product._id || product.ProductCode} onClick={() => handleProductClick(product._id || product.ProductCode)}
              className="rounded-lg bg-white shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition cursor-pointer">

              <img src={product.Poster} alt={product.ProductName}className="rounded-lg object-cover aspect-square"/>

              <p className="font-semibold text-gray-900 truncate">{product.ProductName}</p>
              <p className="text-green-600 font-semibold">
                {typeof product.Price === "number" ? product.Price.toLocaleString("vi-VN") + "đ" : "Giá không rõ"}
              </p>
              <p className="text-sm text-gray-500 italic">
                Phân loại: <span className="text-green-600 font-medium">{product.Category}</span>
              </p>
              <button onClick={(e) => addToCart(e, product)}
                className="bg-green-500 text-white rounded-md py-1 hover:bg-green-600 transition">
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-2">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-md ${
            currentPage === 1  ? "bg-gray-300 text-gray-600 cursor-not-allowed"   : "bg-green-500 text-white hover:bg-green-600"  }`} > &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded-md font-medium ${currentPage === i + 1  ? "bg-green-600 text-white": "bg-gray-200 text-gray-700 hover:bg-green-400 hover:text-white"}`}>  {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${ currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600" }`} >
            &gt;
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Product;