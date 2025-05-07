import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Adjust path as per your project structure

function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-gradient-to-r ${isDarkMode ? 'from-blue-900 to-blue-700' : 'from-purple-500 to-purple-700'} text-${isDarkMode ? 'gray-200' : 'white'} shadow-lg`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <NavLink to="/" className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : ''}`}>
          Hamza Sheikh
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button & Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
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
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} text-${isDarkMode ? 'gray-200' : 'gray-800'} focus:outline-none`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-blue-800' : 'bg-purple-600'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
              }
              onClick={toggleMenu}
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
              }
              onClick={toggleMenu}
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300 transition-colors'} ${isDarkMode ? 'text-gray-200' : ''}`
              }
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;