function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Branding */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-teal-400 tracking-tight">TrendyCart</h3>
            <p className="text-sm text-gray-400">Your destination for trendy shopping!</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="/about" className="text-sm hover:text-teal-300 transition-all duration-300 transform hover:scale-105">About</a>
            <a href="/products" className="text-sm hover:text-teal-300 transition-all duration-300 transform hover:scale-105">Products</a>
            <a href="/cart" className="text-sm hover:text-teal-300 transition-all duration-300 transform hover:scale-105">Cart</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-all duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.228-.616v.06c0 2.385 1.693 4.374 3.946 4.827a4.923 4.923 0 01-2.224.084c.626 1.956 2.444 3.379 4.6 3.419-1.685 1.32-3.808 2.107-6.115 2.107-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.557 2.212 9.053 0 14.009-7.496 14.009-13.986 0-.21-.004-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-all duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.991 3.657 9.128 8.437 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.876h2.773l-.443 2.89h-2.33v6.988c4.78-.75 8.438-4.887 8.438-9.878 0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-300 transition-all duration-300 transform hover:scale-110">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.479C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © 2025 TrendyCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;