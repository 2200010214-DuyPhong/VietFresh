import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, ShoppingBag, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Tổng người dùng",
    value: "1,248",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    title: "Đơn hàng hôm nay",
    value: "152",
    icon: <ShoppingBag className="w-8 h-8 text-green-500" />,
    color: "bg-green-100",
  },
  {
    title: "Doanh thu tháng",
    value: "₫85,200,000",
    icon: <DollarSign className="w-8 h-8 text-yellow-500" />,
    color: "bg-yellow-100",
  },
  {
    title: "Sản phẩm tồn kho",
    value: "320",
    icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-100",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        📊 Bảng điều khiển quản trị
      </motion.h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-500">{item.title}</h3>
                <p className="text-2xl font-semibold text-gray-800 mt-2">
                  {item.value}
                </p>
              </div>
              <div className="p-3 bg-white rounded-full shadow">{item.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📈 Biểu đồ doanh thu (minh họa)
        </h2>
        <div className="h-64 bg-gradient-to-r from-green-200 to-green-400 rounded-xl flex items-end justify-around p-4">
          {[40, 70, 50, 90, 60, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="w-8 bg-white/80 rounded-t-xl"
            ></motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
