import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from './Header';

export default function Login() {
  const navigate = useNavigate();
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [loginData, setLoginData] = useState({ email: "", password: "", remember: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emojis = ['🍃','🥦','🍅','🥕','🍋','🍇','🍎','🥬','🌽'];
    const generated = Array.from({ length: 45 }, () => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 30 + 20}px`,
    }));
    setFloatingEmojis(generated);
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) navigate("/");
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, when: "beforeChildren", staggerChildren: 0.2 }},
    exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" }}
  };
  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 }}
  };
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 }}
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (!user) {
      alert("Email hoặc mật khẩu không đúng!");
      setIsLoading(false);
      return;
    }
    if (loginData.remember) localStorage.setItem("loggedInUser", JSON.stringify(user));
    else sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsLoading(false);
    alert(`Xin chào ${user.fullname}!`);
    navigate("/");
  };

  const handleRegisterRedirect = () => navigate("/register");

  return (
    <motion.div 
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-green-100 overflow-hidden"
      variants={containerVariants} initial="hidden" animate="visible" exit="exit"
    >
      <Header />
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
      >
        {floatingEmojis.map((item, i) => (
          <motion.span
            key={i} className="absolute animate-float"
            style={{ left: item.left, top: item.top, animationDelay: item.delay, fontSize: item.size, opacity: 0.85 }}
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        variants={formVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative bg-white rounded-2xl shadow-xl p-8 w-96 z-10 border border-green-300 backdrop-blur-sm bg-white/95"
      >
        <motion.h2 
          className="text-2xl font-bold text-green-700 mb-5 text-center"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Đăng nhập
        </motion.h2>
        <form onSubmit={handleLogin}>
          <motion.div className="mb-4" variants={inputVariants}>
            <input
              type="email" placeholder="Email" value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
          <motion.div className="mb-4" variants={inputVariants} transition={{ delay: 0.1 }}>
            <input
              type="password" placeholder="Mật khẩu" value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              required
            />
          </motion.div>
          <motion.div className="flex justify-between items-center mb-6" variants={inputVariants} transition={{ delay: 0.2 }}>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox" checked={loginData.remember}
                onChange={e => setLoginData({ ...loginData, remember: e.target.checked })}
                className="mr-2 text-green-600 focus:ring-green-500 transition-all duration-300"
              />
              Ghi nhớ đăng nhập
            </label>
            <motion.button
              type="button" onClick={() => navigate("/forgot-password")}
              className="text-green-600 text-sm hover:underline focus:outline-none"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Quên mật khẩu?
            </motion.button>
          </motion.div>
          <motion.button
            type="submit" disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium relative overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span animate={{ opacity: isLoading ? 0 : 1 }} className="relative z-10">
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.span>
            {isLoading && (
              <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
            <motion.div
              className="absolute inset-0 bg-green-700 rounded-lg"
              initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.p className="mt-6 text-sm text-center text-gray-700" variants={inputVariants} transition={{ delay: 0.3 }}>
            Chưa có tài khoản?{" "}
            <motion.span
              onClick={handleRegisterRedirect}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              whileHover={{ scale: 1.05, color: "#059669" }} whileTap={{ scale: 0.95 }}
            >
              Đăng ký ngay
            </motion.span>
          </motion.p>
        </form>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-300 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-20px) rotate(5deg) scale(1.05); }
          66% { transform: translateY(-10px) rotate(-3deg) scale(0.95); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        input, button { transition: all 0.3s ease; }
        input:focus { transform: translateY(-2px); box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.1); }
      `}</style>
    </motion.div>
  );
}
