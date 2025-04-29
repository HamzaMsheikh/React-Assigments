import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart(); // Use Cart Context
  const { user } = useAuth(); // Use Auth Context to check login status
  const [showPopup, setShowPopup] = useState(false); // State for popup message

  // State for product details
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image carousel
  const [quantity, setQuantity] = useState(() => {
    // Check if product is already in cart and set initial quantity
    const existingItem = cartItems.find((item) => item.id === id);
    return existingItem ? existingItem.quantity : 1;
  });

  // Fetch product details and similar products from Firestore on page load
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch the specific product
        const productDoc = await getDoc(doc(db, "products", id));
        if (productDoc.exists()) {
          const productData = { id: productDoc.id, ...productDoc.data() };
          setProduct(productData);

          // Fetch similar products
          const querySnapshot = await getDocs(collection(db, "products"));
          const allProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Filter similar products based on price range (±10%)
          const priceRange = 0.1; // 10% range
          const minPrice = productData.price * (1 - priceRange);
          const maxPrice = productData.price * (1 + priceRange);

          const similar = allProducts.filter(
            (p) =>
              p.id !== productData.id && // Exclude the current product
              p.price >= minPrice && // Within price range
              p.price <= maxPrice
          );

          setSimilarProducts(similar);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching product: " + err.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Run when id changes

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // If user is logged in, add to cart with quantity and show popup
      addToCart(product, quantity);
      setShowPopup(true);
      // Hide popup after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  // Image carousel handlers
  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="text-center text-2xl mt-10 text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-red-400 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in">
          Product added to cart!
        </div>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Details
      </h2>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row-reverse gap-6 mb-8">
        {/* Product Image Carousel */}
        <div className="md:w-1/2 relative">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg"
          />
          {/* Previous/Next Buttons */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            →
          </button>
          {/* Thumbnails */}
          <div className="flex justify-center mt-4 space-x-2">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                className={`w-16 h-16 object-contain rounded-lg cursor-pointer border-2 ${
                  currentImageIndex === index ? "border-green-500" : "border-gray-300"
                }`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 space-y-4 flex flex-col">
          <h3 className="text-2xl font-semibold text-gray-800">
            {product.title}
          </h3>
          <p className="text-3xl font-bold text-green-600">
            Rs:{product.price}
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-500 transition-colors"
            >
              Add to Cart
            </button>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors w-fit"
          >
            Back to Products
          </button>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h4>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Similar Products
        </h3>
        {similarProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No similar products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <ProductCard
                key={similarProduct.id}
                product={similarProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



