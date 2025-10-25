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
  const searchQueryFromURL = params.get("q") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromURL);
  const [message, setMessage] = useState("");

  const categories = ["Tất cả", ...new Set(farmProducts.map((p) => p.Category))];

  const getFirstImage = (posterString) => {
    if (!posterString)
      return "https://via.placeholder.com/300x300?text=Ảnh+sản+phẩm";

    const firstImage = posterString.split(",")[0].trim().replace(/\\/g, "/");

    if (/^https?:\/\//.test(firstImage)) return firstImage;

    return `http://localhost:5000/images/${firstImage.replace(/^images\//, "")}`;
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/products")
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
    const query = newParams.get("q");

    if (cat) setSelectedCategory(cat);
    if (query !== null) setSearchQuery(query || "");
    setCurrentPage(1);
  }, [location.search]);

  const filteredProducts = farmProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || product.Category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      (product.ProductName &&
        product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.Category &&
        product.Category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const newParams = new URLSearchParams();

    if (searchQuery) {
      newParams.set("q", searchQuery);
    }

    if (category === "Tất cả") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    navigate(`/product?${newParams.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả");
    setCurrentPage(1);
    navigate("/product");
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
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setMessage("Đã thêm sản phẩm vào giỏ hàng");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleHeaderSearchClick = () => {
    console.log("Header search clicked");
  };

  const showSearchInfo = searchQuery && (
    <div className="text-center mb-6 bg-green-50 dark:bg-gray-800 p-4 rounded-lg">
      <p className="text-lg text-gray-700 dark:text-gray-200">
        Kết quả tìm kiếm cho:{" "}
        <span className="font-semibold text-green-600 dark:text-green-400">
          "{searchQuery}"
        </span>
        {selectedCategory !== "Tất cả" && (
          <span>
            {" "}
            trong danh mục{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {selectedCategory}
            </span>
          </span>
        )}
        <span className="ml-2 text-gray-500 dark:text-gray-400">
          ({filteredProducts.length} sản phẩm)
        </span>
      </p>
      <button
        onClick={clearAllFilters}
        className="mt-2 text-sm text-red-500 hover:text-red-400 underline"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  );

  if (loading)
    return (
      <>
        <Header onSearchClick={handleHeaderSearchClick} />
        <div className="text-center mt-32 py-20 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-lg">Đang tải sản phẩm...</p>
        </div>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Header onSearchClick={handleHeaderSearchClick} />
        <div className="text-center mt-20 py-20 text-red-500 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
          <p className="text-xl">Lỗi: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Thử lại
          </button>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header onSearchClick={handleHeaderSearchClick} />
      {message && (
        <div className="fixed top-24 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md animate-fadeIn z-50">
          {message}
        </div>
      )}
      <section className="container mx-auto px-4 pt-28 mb-20 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700 dark:text-green-400">
          Sản Phẩm Nông Sản Sạch
        </h2>
        {showSearchInfo}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 border-green-400 hover:bg-green-100 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
              Không tìm thấy sản phẩm nào phù hợp.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {currentItems.map((product) => (
                <div
                  key={product._id || product.ProductCode}
                  onClick={() =>
                    handleProductClick(product._id || product.ProductCode)
                  }
                  className="rounded-lg bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col gap-3 hover:shadow-xl transition cursor-pointer group"
                >
                  <img
                    src={getFirstImage(product.Poster)}
                    alt={product.ProductName}
                    className="rounded-lg object-cover aspect-square group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Ảnh+sản+phẩm";
                    }}
                  />
                  <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {product.ProductName}
                  </p>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    {typeof product.Price === "number"
                      ? product.Price.toLocaleString("vi-VN") + "đ"
                      : "Giá không rõ"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Phân loại:{" "}
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {product.Category}
                    </span>
                  </p>
                  <button
                    onClick={(e) => addToCart(e, product)}
                    className="bg-green-500 text-white rounded-md py-1 hover:bg-green-600 transition"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded-md font-medium ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-400 hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Product;
