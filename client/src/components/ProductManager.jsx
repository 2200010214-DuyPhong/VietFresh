import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const initialProducts = [
  { id: 1, name: "Táo hữu cơ", price: "35.000đ/kg", quantity: 50, description: "Táo đỏ tươi ngon" },
  { id: 2, name: "Cà rốt sạch", price: "25.000đ/kg", quantity: 80, description: "Cà rốt giòn ngọt" },
  { id: 3, name: "Cải bó xôi", price: "30.000đ/kg", quantity: 40, description: "Rau xanh giàu dinh dưỡng" },
];

export default function ProductManager() {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState(null);
  const [editingFields, setEditingFields] = useState({});
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "", description: "" });

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };
  const handleEdit = (id) => setEditingId(id);
  const handleSave = (id) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...editingFields[id] } : p)));
    setEditingId(null);
    setEditingFields({});
  };
  const handleChange = (id, field, value) => {
    setEditingFields({ ...editingFields, [id]: { ...editingFields[id], [field]: value } });
  };
  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) return;
    const nextId = Math.max(...products.map((p) => p.id)) + 1;
    setProducts([...products, { id: nextId, ...newProduct }]);
    setNewProduct({ name: "", price: "", quantity: "", description: "" });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center shadow-md p-4 rounded-xl bg-white">🛒 Quản lý sản phẩm</h1>

      {/* Thêm sản phẩm */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm sản phẩm</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input type="text" placeholder="Tên sản phẩm" className="border rounded-xl px-4 py-2 flex-1" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <input type="text" placeholder="Giá" className="border rounded-xl px-4 py-2 flex-1" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <input type="number" placeholder="Số lượng" className="border rounded-xl px-4 py-2 flex-1" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} />
          <input type="text" placeholder="Mô tả" className="border rounded-xl px-4 py-2 flex-1" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">Thêm</motion.button>
        </div>
      </motion.div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead>
            <tr className="bg-green-600 text-white text-left text-base">
              <th className="py-3 px-4 rounded-tl-2xl">Tên</th>
              <th className="py-3 px-4">Giá</th>
              <th className="py-3 px-4">Số lượng</th>
              <th className="py-3 px-4">Mô tả</th>
              <th className="py-3 px-4 rounded-tr-2xl text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {products.map((p) => (
                <motion.tr key={p.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{editingId === p.id ? <input type="text" className="border rounded-xl px-2 py-1 w-full" value={editingFields[p.id]?.name || p.name} onChange={(e) => handleChange(p.id, "name", e.target.value)} /> : p.name}</td>
                  <td className="py-2 px-4">{editingId === p.id ? <input type="text" className="border rounded-xl px-2 py-1 w-full" value={editingFields[p.id]?.price || p.price} onChange={(e) => handleChange(p.id, "price", e.target.value)} /> : p.price}</td>
                  <td className="py-2 px-4">{editingId === p.id ? <input type="number" className="border rounded-xl px-2 py-1 w-full" value={editingFields[p.id]?.quantity || p.quantity} onChange={(e) => handleChange(p.id, "quantity", e.target.value)} /> : p.quantity}</td>
                  <td className="py-2 px-4">{editingId === p.id ? <input type="text" className="border rounded-xl px-2 py-1 w-full" value={editingFields[p.id]?.description || p.description} onChange={(e) => handleChange(p.id, "description", e.target.value)} /> : p.description}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    {editingId === p.id ? (
                      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleSave(p.id)} className="text-blue-600 hover:text-blue-800 transition text-lg"><FaSave /></motion.button>
                    ) : (
                      <>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(p.id)} className="text-yellow-500 hover:text-yellow-700 transition text-lg"><FaEdit /></motion.button>
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 transition text-lg"><FaTrash /></motion.button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-4">
        <AnimatePresence>
          {products.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2 border-l-4 border-green-600">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-black">{editingId === p.id ? <input type="text" className="border rounded-xl px-2 py-1 w-full" value={editingFields[p.id]?.name || p.name} onChange={(e) => handleChange(p.id, "name", e.target.value)} /> : p.name}</div>
                <div className="flex gap-2 flex-shrink-0">
                  {editingId === p.id ? (
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleSave(p.id)} className="text-blue-600 hover:text-blue-800 transition text-lg"><FaSave /></motion.button>
                  ) : (
                    <>
                      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleEdit(p.id)} className="text-yellow-500 hover:text-yellow-700 transition text-lg"><FaEdit /></motion.button>
                      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800 transition text-lg"><FaTrash /></motion.button>
                    </>
                  )}
                </div>
              </div>
              <div className="text-gray-600 text-sm">Giá: {p.price}</div>
              <div className="text-gray-600 text-sm">Số lượng: {p.quantity}</div>
              <div className="text-gray-600 text-sm">Mô tả: {p.description}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
