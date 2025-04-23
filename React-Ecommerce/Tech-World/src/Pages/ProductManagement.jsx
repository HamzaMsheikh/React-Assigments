import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { db } from "../Firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

export default function ProductManagement() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for product details
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for editing product
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editError, setEditError] = useState("");

  // Fetch product details on page load (no admin check)
  useEffect(() => {
    fetchProduct();
  }, [id]); // Run when id changes

  // Fetch product details from Firestore
  const fetchProduct = async () => {
    try {
      const productDoc = await getDoc(doc(db, "products", id));
      if (productDoc.exists()) {
        const productData = { id: productDoc.id, ...productDoc.data() };
        setProduct(productData);
        setEditTitle(productData.title);
        setEditPrice(productData.price.toString());
        setEditImage(productData.image);
        setEditDescription(productData.description);
      } else {
        setError("Product not found.");
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching product: " + err.message);
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    try {
      await deleteDoc(doc(db, "products", id));
      navigate("/admin"); // Redirect to admin dashboard after deletion
    } catch (err) {
      setError("Error deleting product: " + err.message);
    }
  };

  // Handle product update
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setEditError("");

    // Basic validation
    if (!editTitle || !editPrice || !editImage || !editDescription) {
      setEditError("All fields are required.");
      return;
    }

    if (isNaN(editPrice) || Number(editPrice) <= 0) {
      setEditError("Price must be a valid positive number.");
      return;
    }

    try {
      // Update product in Firestore
      await updateDoc(doc(db, "products", id), {
        title: editTitle,
        price: Number(editPrice),
        image: editImage,
        description: editDescription,
        updatedAt: new Date().toISOString(),
      });

      // Update local state to reflect changes
      setProduct({
        ...product,
        title: editTitle,
        price: Number(editPrice),
        image: editImage,
        description: editDescription,
      });
      setIsEditing(false); // Close edit form
    } catch (err) {
      setEditError("Error updating product: " + err.message);
    }
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
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Management
      </h2>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Product Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <p className="p-3 bg-gray-100 rounded-lg">{product.title}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price
            </label>
            <p className="p-3 bg-gray-100 rounded-lg">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image
            </label>
            <img
              src={product.image}
              alt={product.title}
              className="w-64 h-64 object-cover rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <p className="p-3 bg-gray-100 rounded-lg">{product.description}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Update Product
          </button>
          <button
            onClick={handleDeleteProduct}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Delete Product
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>

      {/* Edit Product Form (shown when isEditing is true) */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Edit Product
          </h3>
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
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
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter product price"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter image URL"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Description
              </label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter product description"
                rows="4"
                required
              />
            </div>
            {editError && <p className="text-red-500 text-sm">{editError}</p>}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}