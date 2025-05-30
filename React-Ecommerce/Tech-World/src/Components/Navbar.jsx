import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart(); // Use Cart Context to get cart items
  const navigate = useNavigate();

  // Calculate total quantity of items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login page after logout
  };

  // Common styles for NavLink
  const navLinkStyles = ({ isActive }) =>
    `py-2 md:py-0 transition-colors ${
      isActive ? "text-blue-200 font-bold border-b-2 border-blue-200" : "hover:text-blue-200"
    }`;

  return (
    <nav className="bg-green-500 text-white shadow-lg fixed top-0 left-0 w-full z-50"> {/* Increased z-index to z-50 */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Text and Image */}
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Tech-World</span>
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-green-600 md:bg-transparent z-50`} 
        >
          <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <NavLink
              to="/"
              className={navLinkStyles}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={navLinkStyles}
              onClick={() => setIsOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkStyles}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkStyles}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `py-2 md:py-0 transition-colors relative ${
                  isActive ? "text-blue-200 font-bold border-b-2 border-blue-200" : "hover:text-blue-200"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Cart
              {user && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="py-2 md:py-1 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-left"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="py-2 md:py-1 px-4 bg-green-700 hover:bg-green-800 text-white rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


