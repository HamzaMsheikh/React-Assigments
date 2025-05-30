import { Routes, Route } from 'react-router-dom';
import { useGetProductsQuery } from './Services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './Features/cartSlice';
import Navbar from './components/Navbar';
import HeroSection from './components/Hero';
import TopProducts from './components/TopProducts';
import Footer from './components/Footer';

function Home() {
  return (
    <div>
      <HeroSection />
      <TopProducts />
    </div>
  );
}

function About() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">About Us</h2>
      <p>Discover TrendyCart, your ultimate destination for trendy products!</p>
    </div>
  );
}

function Cart() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-teal-400">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2 text-gray-300">{item.title} - ${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Products() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  
  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-400"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-400 text-xl bg-gray-900">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-400">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative group bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-lg font-semibold text-white truncate">{product.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{product.description.slice(0, 80)}...</p>
            <p className="text-teal-400 font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price }))}
              className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-teal-400 transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
  