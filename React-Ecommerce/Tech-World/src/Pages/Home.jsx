// import { useState, useEffect } from "react";
// import { db } from "../Firebase";
// import { collection, getDocs } from "firebase/firestore";
// import ProductCard from "../Components/ProductCard";
// import Hero from "../Components/Hero";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const [sortOption, setSortOption] = useState(""); // State for sorting option

//   // Fetch products from Firestore
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         const productsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productsList);
//         setLoading(false);
//       } catch (err) {
//         setError("Error fetching products: " + err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       product.title.toLowerCase().includes(query) ||
//       product.description.toLowerCase().includes(query)
//     );
//   });

//   // Sort products based on selected option
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOption === "price-asc") {
//       return a.price - b.price; // Low to High
//     } else if (sortOption === "price-desc") {
//       return b.price - a.price; // High to Low
//     }
//     return 0; // No sorting
//   });

//   if (loading) {
//     return <div className="text-center text-2xl mt-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="pt-16 md:pt-0"> {/* Added padding-top for mobile navbar */}
//       {/* Hero Section */}
//       <Hero />

//       {/* Product List Section */}
//       <section id="products" className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Latest Products
//         </h2>

//         {/* Search and Sort Controls */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           {/* Search Bar */}
//           <div className="w-full sm:w-1/2">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Sort Dropdown */}
//           <div className="w-full sm:w-1/4">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               <option value="">Sort By</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//             </select>
//           </div>
//         </div>

//         {/* Product List */}
//         {sortedProducts.length === 0 ? (
//           <p className="text-center text-gray-500">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {sortedProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../Components/ProductCard";
import Hero from "../Components/Hero";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loader

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const startTime = Date.now();
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);

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

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.title?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

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
    <div className="pt-16 md:pt-0">
      <Hero />
      <section id="products" className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Latest Products
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : sortedProducts.length === 0 && products.length > 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}