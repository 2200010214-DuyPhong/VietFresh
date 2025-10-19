import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  useEffect(() => {
    const emojis = ['🍃', '🥦', '🍅', '🥕', '🍋', '🍇', '🍎', '🥬', '🌽'];
    const generated = Array.from({ length: 40 }, () => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      size: `${Math.random() * 30 + 20}px`,
    }));
    setFloatingEmojis(generated);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (!user) {
      setMessage("Email không tồn tại trong hệ thống!");
      return;
    }
    setMessage(`✅ Liên kết đặt lại mật khẩu đã được gửi đến ${email}.`);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-green-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingEmojis.map((item, i) => (
          <span
            key={i}
            className="absolute animate-float"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              fontSize: item.size,
              opacity: 0.85,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-xl p-8 w-96 z-10 border border-green-300"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-5 text-center">Quên mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Nhập email đã đăng ký"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Gửi yêu cầu
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
        <p className="mt-4 text-sm text-center text-gray-700">
          Nhớ mật khẩu rồi?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold cursor-pointer hover:underline"
          >
            Quay lại đăng nhập
          </span>
        </p>
      </motion.div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(-10deg); }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
