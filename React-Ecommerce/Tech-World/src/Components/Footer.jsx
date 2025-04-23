import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <NavLink to="/" className="hover:text-green-400 transition-colors">
                Tech-World
              </NavLink>
            </h3>
            <p className="text-gray-400">
              Your one-stop shop for the latest tech gadgets and accessories. Shop with us for quality and affordability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/faq"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/returns"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Returns & Refunds
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shipping"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Shipping Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/support"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Contact Support
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: hamzasheikh7745@gmail.com</li>
              <li>Phone: +92 309-2075995</li>
              <li>Address: Abdullah Shah Ghazi Goth, Scheme 33, Block C, Near Memon Medical Institute Hospital, Karachi, Pakistan.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Tech-World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}