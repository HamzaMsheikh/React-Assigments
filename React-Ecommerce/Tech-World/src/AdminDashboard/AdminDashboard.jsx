import { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if user is admin, if not redirect to home
  useEffect(() => {
    if (!user || user.email !== "admin@techworld.com") {
      navigate("/");
    }
  }, [user, navigate]);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setSidebarOpen(false); // Close sidebar on logout (mobile view)
    } catch (err) {
      console.error("Error logging out:", err);
      setError("Error logging out: " + err.message);
    }
  };

  // Common styles for NavLink in sidebar with exact match logic
  const navLinkStyles = (path) => {
    const isActive = location.pathname === path;
    return `block py-2 px-4 transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-blue-500 hover:text-white"
    }`;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-600 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30 min-h-screen flex flex-col`}
      >
        <div className="p-4 border-b border-green-800">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 flex flex-col">
          <div className="mt-4">
            <NavLink
              to="/admin"
              className={navLinkStyles("/admin")}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/products"
              className={navLinkStyles("/admin/products")}
              onClick={() => setSidebarOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={navLinkStyles("/admin/orders")}
              onClick={() => setSidebarOpen(false)}
            >
              Orders
            </NavLink>
          </div>
          {/* Logout Button */}
          <div className="mt-auto p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-green-600 text-white rounded-lg focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
}