function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-xl font-bold">TrendyCart</h3>
          <p className="text-sm">Your one-stop shop for all things trendy!</p>
        </div>
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-gray-300">About</a>
          <a href="/products" className="hover:text-gray-300">Products</a>
          <a href="/cart" className="hover:text-gray-300">Cart</a>
        </div>
      </div>
      <div className="text-center text-sm mt-4">
        © 2025 TrendyCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;