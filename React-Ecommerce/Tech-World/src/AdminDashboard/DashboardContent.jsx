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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h2>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Product
        </h3>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product price"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product category (e.g., Electronics)"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter image URL"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Additional Image URLs (Optional)
            </label>
            {images.map((img, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={`Enter additional image URL ${index + 1}`}
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageField(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 mt-2"
            >
              Add Image URL
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Product List
        </h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left text-gray-700">Title</th>
                  <th className="p-3 text-left text-gray-700">Price</th>
                  <th className="p-3 text-left text-gray-700">Image</th>
                  <th className="p-3 text-left text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-3">
                      <Link to={`/admin/product/${product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className="p-3">RS:{product.price.toFixed(2)}</td>
                    <td className="p-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 truncate max-w-xs" title={product.description}>
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