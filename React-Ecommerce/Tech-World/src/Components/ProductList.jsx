import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loader

  const categories = ["All", "Monitors", "Keyboards", "Airbuds", "CPU", "Mouse", "Charging", "Electronics", ""];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const startTime = Date.now();
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);

        // Ensure skeleton loader shows for at least 0.5 seconds
        const elapsedTime = Date.now() - startTime;
        const remainingTime = 500 - elapsedTime; // 500ms = 0.5 seconds
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
      } catch (err) {
        setError("Error fetching products: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (category && category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [category, products, searchQuery, sortOption]);

  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "All") {
      navigate("/products/all");
    } else {
      navigate(`/products/${selectedCategory.toLowerCase()}`);
    }
  };

  if (error) {
    return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;
  }

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
      <div className="w-full h-40 bg-gray-300 rounded-md mb-3"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Products
      </h2>
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center">
          <label htmlFor="category" className="mr-2 text-lg font-semibold text-gray-700">
            Filter by Category:
          </label>
          <select
            id="category"
            value={category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="search" className="mr-2 text-lg font-semibold text-gray-700">
            Search:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search by product title..."
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredProducts.length === 0 && products.length > 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}