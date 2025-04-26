import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Fetch order details from Firestore
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, "orders", id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const orderData = { id: orderSnap.id, ...orderSnap.data() };
          setOrder(orderData);
          setStatus(orderData.status);
        } else {
          setError("Order not found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order: " + err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!status) return;

    setStatusUpdating(true);
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status });
      setOrder((prev) => ({ ...prev, status }));
      setStatusUpdating(false);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status: " + err.message);
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Order Details - #{order.id}
        </h2>
        <Link
          to="/admin/orders"
          className="text-blue-600 hover:underline text-lg"
        >
          Back to Orders
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer and Order Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Customer & Order Information
          </h3>
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-600">Customer Name:</span>{" "}
              {order.userDetails.fullName}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Email:</span>{" "}
              {order.userDetails.email}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Phone Number:</span>{" "}
              {order.userDetails.phoneNumber}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Order Date:</span>{" "}
              {formatDate(order.createdAt)}
            </p>
            <div>
              <span className="font-semibold text-gray-600">Status:</span>{" "}
              <div className="flex items-center gap-3 mt-2">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  onClick={handleStatusUpdate}
                  disabled={statusUpdating}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {statusUpdating ? "Updating..." : "Update Status"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Shipping Address
          </h3>
          <div className="space-y-3">
            <p>
              <span className="font-semibold text-gray-600">Address Line 1:</span>{" "}
              {order.userDetails.addressLine1}
            </p>
            {order.userDetails.addressLine2 && (
              <p>
                <span className="font-semibold text-gray-600">Address Line 2:</span>{" "}
                {order.userDetails.addressLine2}
              </p>
            )}
            <p>
              <span className="font-semibold text-gray-600">City:</span>{" "}
              {order.userDetails.city}
            </p>
            <p>
              <span className="font-semibold text-gray-600">State:</span>{" "}
              {order.userDetails.state}
            </p>
            <p>
              <span className="font-semibold text-gray-600">ZIP Code:</span>{" "}
              {order.userDetails.zipCode}
            </p>
            <p>
              <span className="font-semibold text-gray-600">Country:</span>{" "}
              {order.userDetails.country}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Order Items
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-gray-700">Image</th>
                <th className="p-3 text-left text-gray-700">Product</th>
                <th className="p-3 text-left text-gray-700">Price</th>
                <th className="p-3 text-left text-gray-700">Quantity</th>
                <th className="p-3 text-left text-gray-700">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">Rs:{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">Rs:{(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Price */}
        <div className="mt-4 flex justify-end">
          <div className="text-lg font-semibold text-gray-700">
            Total: Rs:{order.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
}