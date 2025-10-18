import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const initialUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Admin" },
  { id: 2, name: "Trần Thị B", email: "b@example.com", role: "User" },
  { id: 3, name: "Lê Văn C", email: "c@example.com", role: "User" },
];

export default function UserManager() {
  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingFields, setEditingFields] = useState({});
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này không?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEdit = (id) => setEditingUserId(id);

  const handleSave = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...editingFields[id] } : user
      )
    );
    setEditingUserId(null);
    setEditingFields({});
  };

  const handleChange = (id, field, value) => {
    setEditingFields({
      ...editingFields,
      [id]: { ...editingFields[id], [field]: value },
    });
  };

  const handleAdd = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    const nextId = Math.max(...users.map((u) => u.id)) + 1;
    setUsers([...users, { id: nextId, ...newUser }]);
    setNewUser({ name: "", email: "", role: "" });
  };

  return (
    <div className="p-4 md:p-8">
      {/* Tiêu đề với icon và hiệu ứng */}
      <motion.h1
        className="text-3xl font-bold text-black mb-6 text-center flex items-center justify-center gap-3 cursor-pointer drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, rotate: 1, color: "#16a34a" }} // hover đổi xanh nổi bật
        transition={{ duration: 0.5 }}
      >
        👤 Quản lý người dùng
      </motion.h1>

      {/* Thêm người dùng */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-md p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Thêm người dùng</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Tên"
            className="border rounded-xl px-4 py-2 flex-1"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl px-4 py-2 flex-1"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Vai trò"
            className="border rounded-xl px-4 py-2 flex-1"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Thêm
          </motion.button>
        </div>
      </motion.div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-2xl shadow-md">
          <thead>
            <tr className="bg-green-600 text-white text-left text-base">
              <th className="py-3 px-4 rounded-tl-2xl">Tên</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Vai trò</th>
              <th className="py-3 px-4 rounded-tr-2xl text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        className="border rounded-xl px-2 py-1 w-full"
                        value={editingFields[user.id]?.name || user.name}
                        onChange={(e) => handleChange(user.id, "name", e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingUserId === user.id ? (
                      <input
                        type="email"
                        className="border rounded-xl px-2 py-1 w-full"
                        value={editingFields[user.id]?.email || user.email}
                        onChange={(e) => handleChange(user.id, "email", e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        className="border rounded-xl px-2 py-1 w-full"
                        value={editingFields[user.id]?.role || user.role}
                        onChange={(e) => handleChange(user.id, "role", e.target.value)}
                      />
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    {editingUserId === user.id ? (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSave(user.id)}
                        className="text-blue-600 hover:text-blue-800 transition text-lg"
                      >
                        <FaSave />
                      </motion.button>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(user.id)}
                          className="text-yellow-500 hover:text-yellow-700 transition text-lg"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition text-lg"
                        >
                          <FaTrash />
                        </motion.button>
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
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-black">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      className="border rounded-xl px-2 py-1 w-full"
                      value={editingFields[user.id]?.name || user.name}
                      onChange={(e) => handleChange(user.id, "name", e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {editingUserId === user.id ? (
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSave(user.id)}
                      className="text-blue-600 hover:text-blue-800 transition text-lg"
                    >
                      <FaSave />
                    </motion.button>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(user.id)}
                        className="text-yellow-500 hover:text-yellow-700 transition text-lg"
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 transition text-lg"
                      >
                        <FaTrash />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                Email:{" "}
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    className="border rounded-xl px-2 py-1 w-full"
                    value={editingFields[user.id]?.email || user.email}
                    onChange={(e) => handleChange(user.id, "email", e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </div>
              <div className="text-gray-600 text-sm">
                Vai trò:{" "}
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    className="border rounded-xl px-2 py-1 w-full"
                    value={editingFields[user.id]?.role || user.role}
                    onChange={(e) => handleChange(user.id, "role", e.target.value)}
                  />
                ) : (
                  user.role
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
