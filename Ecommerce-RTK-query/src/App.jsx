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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>Learn more about TrendyCart, your go-to store for the latest trends!</p>
    </div>
  );
}

function Cart() {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2">{item.title} - ${item.price}</li>
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
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl">Error: {error.message}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain rounded mb-4"
            />
            <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 100)}...</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price }))}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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
    <div className="flex flex-col min-h-screen">
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