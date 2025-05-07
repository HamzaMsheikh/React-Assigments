import { NavLink } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Adjust path as per your project structure

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`bg-gradient-to-r ${isDarkMode ? 'from-blue-900 to-blue-700' : 'from-purple-500 to-purple-700'} text-white py-6`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Info */}
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Hamza Sheikh. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <NavLink
              to="/"
              className="hover:text-yellow-300 transition-colors text-sm"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-yellow-300 transition-colors text-sm"
            >
              About
            </NavLink>
            <NavLink
              to="/skills"
              className="hover:text-yellow-300 transition-colors text-sm"
            >
              Skills
            </NavLink>
            <NavLink
              to="/projects"
              className="hover:text-yellow-300 transition-colors text-sm"
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-yellow-300 transition-colors text-sm"
            >
              Contact
            </NavLink>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/HamzaMsheikh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
              aria-label="GitHub"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzEkaAN0BJ2o3ri2IsQRKXVk6ejQQqz0GUg&s"
                alt="GitHub"
                className="w-7 h-7 rounded-2xl hover:opacity-80 transition-opacity"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/hamza-sheikh-176454325/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
              aria-label="LinkedIn"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
                alt="LinkedIn"
                className="w-7 h-7 rounded-2xl hover:opacity-80 transition-opacity"
              />
            </a>
            <a
              href="https://www.facebook.com/share/16ZcFkrVKq/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
              aria-label="Facebook"
            >
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-facebook-logo-icon-download-in-svg-png-gif-file-formats--fb-new-color-social-media-logos-icons-1350125.png?f=webp"
                alt="Facebook"
                className="w-7 h-7 rounded-2xl hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;