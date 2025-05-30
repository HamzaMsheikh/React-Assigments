function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-teal-500 text-white py-20 md:py-32 text-center overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-mosaic.png')" }}></div>
      <div className="relative max-w-7xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 animate-fade-in">
          Welcome to TrendyCart
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mb-8 animate-slide-up">
          Discover the best deals on the latest trends!
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-teal-400 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default HeroSection;