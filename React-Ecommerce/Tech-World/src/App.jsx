import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import CartPage from "./Pages/CartPage";
import Login from "./Pages/Login";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import ProductManagement from "./Pages/ProductManagement";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import About from "./Pages/About";
import Checkout from "./Pages/Checkout";
import Contact from "./Pages/Contact";
import Orders from "./AdminDashboard/Orders";
import Products from "./AdminDashboard/Products";
import DashboardContent from "./AdminDashboard/DashboardContent";
import OrderDetails from "./AdminDashboard/OrderDetails";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAdminRoute && <Navbar />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DashboardContent />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/admin/product/:id" element={<ProductManagement />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<div className="text-center text-2xl mt-10">404 - Page Not Found</div>} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

