// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../Firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// export default function DashboardContent() {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [images, setImages] = useState([""]); // State for multiple image URLs
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState(""); // State for category
//   const [error, setError] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch products on page load
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch products from Firestore
//   const fetchProducts = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "products"));
//       const productList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setProducts(productList);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Error fetching products: " + err.message);
//       setLoading(false);
//     }
//   };

//   // Handle adding a new image URL input
//   const handleAddImageField = () => {
//     setImages([...images, ""]);
//   };

//   // Handle removing an image URL input
//   const handleRemoveImageField = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages);
//   };

//   // Handle image URL change
//   const handleImageChange = (index, value) => {
//     const newImages = [...images];
//     newImages[index] = value;
//     setImages(newImages);
//   };

//   // Handle product addition
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Basic validation
//     if (!title || !price || !image || !description) {
//       setError("All fields are required.");
//       return;
//     }

//     if (isNaN(price) || Number(price) <= 0) {
//       setError("Price must be a valid positive number.");
//       return;
//     }

//     // Validate that at least one image URL is provided in the images array
//     const validImages = images.filter((url) => url.trim() !== "");
//     if (validImages.length === 0) {
//       setError("At least one valid image URL is required.");
//       return;
//     }

//     try {
//       // Add product to Firestore
//       await addDoc(collection(db, "products"), {
//         title,
//         price: Number(price),
//         image,
//         images: validImages, // Save the array of image URLs
//         description,
//         category, // Save the category
//         createdAt: new Date().toISOString(),
//       });

//       // Clear form
//       setTitle("");
//       setPrice("");
//       setImage("");
//       setImages([""]); // Reset images array
//       setDescription("");
//       setCategory(""); // Reset category

//       // Refresh product list
//       fetchProducts();
//     } catch (err) {
//       setError("Error adding product: " + err.message);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Admin Dashboard
//       </h2>

//       {/* Add Product Form */}
//       <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           Add New Product
//         </h3>
//         <form onSubmit={handleAddProduct} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter product title"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter product price"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Category
//             </label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter product category (e.g., Electronics)"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Image URL
//             </label>
//             <input
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter image URL"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Additional Image URLs (Optional)
//             </label>
//             {images.map((img, index) => (
//               <div key={index} className="flex items-center space-x-2 mb-2">
//                 <input
//                   type="text"
//                   value={img}
//                   onChange={(e) => handleImageChange(index, e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder={`Enter additional image URL ${index + 1}`}
//                 />
//                 {images.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveImageField(index)}
//                     className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddImageField}
//               className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 mt-2"
//             >
//               Add Image URL
//             </button>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter product description"
//               rows="4"
//               required
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>

//       {/* Product List */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//           Product List
//         </h3>
//         {loading ? (
//           <p className="text-center text-gray-500">Loading products...</p>
//         ) : products.length === 0 ? (
//           <p className="text-center text-gray-500">No products added yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-3 text-left text-gray-700">Title</th>
//                   <th className="p-3 text-left text-gray-700">Price</th>
//                   <th className="p-3 text-left text-gray-700">Image</th>
//                   <th className="p-3 text-left text-gray-700">Description</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr
//                     key={product.id}
//                     className="border-b hover:bg-gray-100 cursor-pointer"
//                   >
//                     <td className="p-3">
//                       <Link to={`/admin/product/${product.id}`}>
//                         {product.title}
//                       </Link>
//                     </td>
//                     <td className="p-3">RS:{product.price.toFixed(2)}</td>
//                     <td className="p-3">
//                       <img
//                         src={product.image}
//                         alt={product.title}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                     </td>
//                     <td className="p-3 truncate max-w-xs" title={product.description}>
//                       {product.description}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function DashboardContent() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([""]); // State for multiple image URLs
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // State for category
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from Firestore
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
      console.error("Error fetching products:", err);
      setError("Error fetching products: " + err.message);
      setLoading(false);
    }
  };

  // Handle adding a new image URL input
  const handleAddImageField = () => {
    setImages([...images, ""]);
  };

  // Handle removing an image URL input
  const handleRemoveImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  // Handle image URL change
  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  // Handle product addition
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!title || !price || !image || !description) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a valid positive number.");
      return;
    }

    // Validate that at least one image URL is provided in the images array
    const validImages = images.filter((url) => url.trim() !== "");
    if (validImages.length === 0) {
      setError("At least one valid image URL is required.");
      return;
    }

    try {
      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        title,
        price: Number(price),
        image,
        images: validImages, // Save the array of image URLs
        description,
        category, // Save the category
        createdAt: new Date().toISOString(),
      });

      // Clear form
      setTitle("");
      setPrice("");
      setImage("");
      setImages([""]); // Reset images array
      setDescription("");
      setCategory(""); // Reset category

      // Refresh product list
      fetchProducts();
    } catch (err) {
      setError("Error adding product: " + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        Admin Dashboard
      </h2>

      {/* Add Product Form */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
          Add New Product
        </h3>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder="Enter product title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder="Enter product price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder="Enter product category (e.g., Electronics)"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Additional Image URLs (Optional)
            </label>
            {images.map((img, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                  placeholder={`Enter additional image URL ${index + 1}`}
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageField(index)}
                    className="bg-red-500 text-white py-1 px-2 sm:px-3 rounded-lg hover:bg-red-600 mt-2 sm:mt-0 text-sm sm:text-base"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="bg-blue-500 text-white py-1 px-2 sm:px-3 rounded-lg hover:bg-blue-600 mt-2 text-sm sm:text-base"
            >
              Add Image URL
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
          Product List
        </h3>
        {loading ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">No products added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 sm:p-3 text-left text-gray-700">Title</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden sm:table-cell">Price</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700">Image</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden md:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-100 cursor-pointer flex flex-col sm:table-row"
                  >
                    <td className="p-2 sm:p-3 block sm:table-cell">
                      <span className="sm:hidden font-semibold">Title: </span>
                      <Link to={`/admin/product/${product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">
                      <span className="sm:hidden font-semibold">Price: </span>
                      RS:{product.price.toFixed(2)}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell">
                      <span className="sm:hidden font-semibold">Image: </span>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 sm:p-3 hidden md:table-cell truncate max-w-[150px] sm:max-w-xs" title={product.description}>
                      {product.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}