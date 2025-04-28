import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, getCartTotal, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // If user is not logged in, don't render the cart page (optional, since redirect happens)
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            to="/products"
            className="text-blue-600 hover:underline text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Cart Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left text-gray-700">Image</th>
                  <th className="p-3 text-left text-gray-700">Product</th>
                  <th className="p-3 text-left text-gray-700">Price</th>
                  <th className="p-3 text-left text-gray-700">Quantity</th>
                  <th className="p-3 text-left text-gray-700">Subtotal</th>
                  <th className="p-3 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">Rs:{item.price}</td>
                    <td className="p-3">
                      <div className="flex items-center border rounded-lg w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3">Rs:{(item.price * item.quantity)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors mb-4 sm:mb-0"
            >
              Clear Cart
            </button>
            <div className="text-lg font-semibold text-gray-700">
              Total: Rs:{getCartTotal()}
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 flex justify-end">
            <Link
              to="/checkout"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}