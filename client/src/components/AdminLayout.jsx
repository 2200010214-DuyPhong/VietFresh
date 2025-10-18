// client/src/components/ui/AdminLayout.jsx
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-green-500 cursor-pointer" onClick={() => navigate('/admin')}>
          VietFresh Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/products"
            className={`block p-2 rounded ${
              location.pathname.includes("products") ? "bg-green-600" : "hover:bg-green-500"
            }`}
          >
            Quản lý sản phẩm
          </Link>
          <Link
            to="/admin/users"
            className={`block p-2 rounded ${
              location.pathname.includes("users") ? "bg-green-600" : "hover:bg-green-500"
            }`}
          >
            Quản lý người dùng
          </Link>
        </nav>
        <div className="p-4 border-t border-green-500 text-sm text-center">© 2025 VietFresh. Bản quyền thuộc về chúng tôi</div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
