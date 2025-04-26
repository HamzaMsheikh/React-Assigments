// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../Firebase";
// import { collection, getDocs } from "firebase/firestore";
// import ProductCard from "../Components/ProductCard";

// export default function ProductList() {
//   // State for products
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { category } = useParams(); // Get category from URL
//   const navigate = useNavigate();

//   // Available categories (hardcoded for now)
//   const categories = ["All", "Monitors", "Keyboards", "Airbuds", "CPU", "Mouse", "Charging", "Electronics", ""];

//   // Fetch products from Firestore on page load
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const productList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productList);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching products: " + err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array to run only once on mount

//   // Filter products based on category
//   useEffect(() => {
//     if (category) {
//       if (category === "all") {
//         setFilteredProducts(products);
//       } else {
//         const filtered = products.filter(
//           (product) => product.category?.toLowerCase() === category.toLowerCase()
//         );
//         setFilteredProducts(filtered);
//       }
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [category, products]);

//   // Handle category change from dropdown
//   const handleCategoryChange = (selectedCategory) => {
//     if (selectedCategory === "All") {
//       navigate("/products/all");
//     } else {
//       navigate(`/products/${selectedCategory.toLowerCase()}`);
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-2xl mt-10">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center text-2xl mt-10 text-red-500">{error}</div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Products
//       </h2>

//       {/* Category Filter Dropdown */}
//       <div className="mb-6 flex justify-center">
//         <label htmlFor="category" className="mr-2 text-lg font-semibold text-gray-700">
//           Filter by Category:
//         </label>
//         <select
//           id="category"
//           value={category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"}
//           onChange={(e) => handleCategoryChange(e.target.value)}
//           className="border rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p className="text-center text-gray-500">No products available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";

export default function ProductList() {
  // State for products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortOption, setSortOption] = useState("default"); // State for sort option

  // Available categories (hardcoded for now)
  const categories = ["All", "Monitors", "Keyboards", "Airbuds", "CPU", "Mouse", "Charging", "Electronics", ""];

  // Fetch products from Firestore on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products: " + err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  // Filter and sort products
  useEffect(() => {
    let updatedProducts = [...products];

    // Apply category filter
    if (category && category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sort
    if (sortOption === "price-low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [category, products, searchQuery, sortOption]);

  // Handle category change from dropdown
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory === "All") {
      navigate("/products/all");
    } else {
      navigate(`/products/${selectedCategory.toLowerCase()}`);
    }
  };

  if (loading) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl mt-10 text-red-500">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Products
      </h2>

      {/* Filters Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Category Filter Dropdown */}
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

        {/* Search Input */}
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

        {/* Sort Dropdown */}
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

      {filteredProducts.length === 0 ? (
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