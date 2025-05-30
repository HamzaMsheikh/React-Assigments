import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { setSearch } from '../Features/searchSlice';
import { useState } from 'react';

function Navbar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const search = useSelector((state) => state.search);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="text-3xl font-bold text-teal-400 tracking-wide">
              TrendyCart
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold text-white hover:text-teal-300 transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold text-white hover:text-teal-300 transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold text-white hover:text-teal-300 transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold text-white hover:text-teal-300 transition-all duration-300 transform hover:scale-105 flex items-center ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
            >
              Cart ({cart.length})
            </NavLink>
            <input
              type="text"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search products..."
              className="p-2 rounded-full bg-gray-800 text-white border border-gray-700 w-48 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-gray-800 text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 bg-opacity-90 px-2 pt-2 pb-3 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-full text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-full text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-full text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-full text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 ${
                  isActive ? 'bg-purple-600' : ''
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart ({cart.length})
            </NavLink>
            <input
              type="text"
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              placeholder="Search products..."
              className="block w-full p-2 rounded-full bg-gray-800 text-white border border-gray-700 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;