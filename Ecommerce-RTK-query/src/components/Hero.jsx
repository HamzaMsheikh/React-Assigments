function Hero() {
  return (
    <div className="bg-gray-100 py-16 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Discover TrendyCart
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Shop the latest trends with unbeatable prices!
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default Hero;