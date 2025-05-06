import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <NavLink to="/" className="text-2xl font-bold tracking-tight">
          Hamza Sheikh
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300 transition-colors'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300 transition-colors'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300 transition-colors'
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300 transition-colors'
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-yellow-300 font-semibold'
                : 'hover:text-yellow-300 transition-colors'
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
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
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-600">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 font-semibold'
                  : 'hover:text-yellow-300 transition-colors'
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 font-semibold'
                  : 'hover:text-yellow-300 transition-colors'
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/skills"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 font-semibold'
                  : 'hover:text-yellow-300 transition-colors'
              }
              onClick={toggleMenu}
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 font-semibold'
                  : 'hover:text-yellow-300 transition-colors'
              }
              onClick={toggleMenu}
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-300 font-semibold'
                  : 'hover:text-yellow-300 transition-colors'
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