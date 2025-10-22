import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    fullname: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emojis = ['🍃', '🥦', '🍅', '🥕', '🍋', '🍇', '🥒', '🍎', '🌿', '🌽', '🍉'];
    const generated = Array.from({ length: 50 }, () => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      size: `${Math.random() * 35 + 20}px`,
    }));
    setFloatingEmojis(generated);
  }, []);

  // Hiệu ứng cho container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut" 
      } 
    }
  };

  // Hiệu ứng cho form
  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  // Hiệu ứng cho input fields
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Thêm delay để thấy hiệu ứng loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      alert("❌ Mật khẩu xác nhận không khớp!");
      setIsLoading(false);
      return;
    }

    // Kiểm tra email đã tồn tại
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.email === formData.email);
    
    if (existingUser) {
      alert("❌ Email này đã được đăng ký!");
      setIsLoading(false);
      return;
    }

    // Lưu thông tin người dùng
    const newUser = {
      id: Date.now(),
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setIsLoading(false);
    alert("🎉 Đăng ký thành công! Quay lại trang đăng nhập.");
    setTimeout(() => navigate("/login"), 800);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-green-100 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Header />
      
      {/* Floating emojis background với hiệu ứng */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {floatingEmojis.map((item, i) => (
          <motion.span
            key={i}
            className="absolute animate-float"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              fontSize: item.size,
              opacity: 0.8,
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: i * 0.03,
              type: "spring",
              stiffness: 100
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Register Form với hiệu ứng */}
      <motion.form
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-96 z-10 border border-green-300 backdrop-blur-sm bg-white/95 mt-20"
      >
        <motion.h2 
          className="text-2xl font-bold text-green-700 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Đăng ký tài khoản
        </motion.h2>

        <div className="space-y-4">
          <motion.div variants={inputVariants}>
            <input
              type="text"
              placeholder="Họ và tên"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
          
          <motion.div variants={inputVariants} transition={{ delay: 0.1 }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
          
          <motion.div variants={inputVariants} transition={{ delay: 0.2 }}>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
              minLength={6}
            />
          </motion.div>
          
          <motion.div variants={inputVariants} transition={{ delay: 0.3 }}>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium mt-6 relative overflow-hidden"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" 
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            animate={{ opacity: isLoading ? 0 : 1 }}
            className="relative z-10"
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </motion.span>
          
          {/* Loading animation */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
          
          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 bg-green-700 rounded-lg"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.p 
          className="mt-6 text-sm text-center text-gray-700"
          variants={inputVariants}
          transition={{ delay: 0.4 }}
        >
          Đã có tài khoản?{" "}
          <motion.button
            type="button"
            onClick={handleLoginRedirect}
            className="text-green-600 font-semibold hover:underline focus:outline-none"
            whileHover={{ 
              scale: 1.05,
              color: "#059669"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng nhập ngay
          </motion.button>
        </motion.p>
      </motion.form>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-6 h-6 bg-green-400 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-4 h-4 bg-green-300 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-5 h-5 bg-green-200 rounded-full"
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Floating animation CSS với cải tiến */}
      <style>{`
        @keyframes float {
          0% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% { 
            transform: translateY(-25px) rotate(5deg) scale(1.05);
          }
          66% { 
            transform: translateY(-15px) rotate(-3deg) scale(0.95);
          }
          100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Smooth transitions for all interactive elements */
        input, button {
          transition: all 0.3s ease;
        }

        /* Custom focus styles */
        input:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.1);
        }

        /* Password strength indicator (optional) */
        input[type="password"]:valid {
          border-color: #10b981;
        }
      `}</style>
    </motion.div>
  );
}