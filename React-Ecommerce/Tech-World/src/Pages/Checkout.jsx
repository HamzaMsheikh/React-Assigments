import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "card", // New: Payment method field
    termsAccepted: false, // New: Terms & Conditions checkbox
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // New: Store order details after placement

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "expiryDate") {
      // Auto-format expiry date to MM/YY
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.fullName) return "Full Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return "Valid Email is required.";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) return "Valid Phone Number (10 digits) is required.";
    if (!formData.addressLine1) return "Address Line 1 is required.";
    if (!formData.city) return "City is required.";
    if (!formData.state) return "State is required.";
    if (!formData.zipCode) return "ZIP Code is required.";
    if (!formData.country) return "Country is required.";
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.length < 16) return "Valid Card Number is required.";
      if (!formData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
        return "Valid Expiry Date (MM/YY) is required.";
      if (!formData.cvv || formData.cvv.length < 3) return "Valid CVV is required.";
    }
    if (!formData.termsAccepted) return "You must accept the Terms & Conditions.";
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    // Prepare order data
    const orderData = {
      userDetails: formData,
      items: cartItems,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    try {
      // Save order to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      setOrderDetails({ id: docRef.id, ...orderData }); // Store order details with ID
      setOrderPlaced(true);
      clearCart(); // Clear the cart after successful order
      setTimeout(() => {
        navigate("/"); // Redirect to home page after 3 seconds
      }, 3000);
    } catch (err) {
      setError("Error placing order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // If order is placed, show confirmation with details
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-4">
          Thank you for your order. Your order ID is <span className="font-semibold">{orderDetails.id}</span>.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h3>
          <p className="text-gray-600">Total: Rs:{orderDetails.totalPrice}</p>
          <p className="text-gray-600">Shipping Address: {orderDetails.userDetails.addressLine1}, {orderDetails.userDetails.city}, {orderDetails.userDetails.state}, {orderDetails.userDetails.country}</p>
          <p className="text-gray-600">Payment Method: {orderDetails.userDetails.paymentMethod === "card" ? "Card" : "Cash on Delivery"}</p>
        </div>
        <p className="text-base sm:text-lg text-gray-600">
          You will be redirected to the home page shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Checkout</h2>
        <Link to="/cart" className="text-blue-600 hover:underline text-sm sm:text-lg">
          Back to Cart
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Form Section */}
        <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Shipping & Payment Details</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-3">Contact Information</h4>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    placeholder="Enter your phone number (10 digits)"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-3">Shipping Information</h4>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                      placeholder="Enter your ZIP code"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                      required
                    >
                      <option value="" disabled>Select your country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-3">Payment Method</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === "card"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="card" className="text-gray-700 font-semibold text-sm sm:text-base">Credit/Debit Card</label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="cod" className="text-gray-700 font-semibold text-sm sm:text-base">Cash on Delivery</label>
                </div>
              </div>
            </div>

            {/* Payment Information (Visible only if Card is selected) */}
            {formData.paymentMethod === "card" && (
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-600 mb-2 sm:mb-3">Payment Information</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Card Number *</label>
                    <input
                      type="number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                      placeholder="1234 5678 9012 3456"
                      maxLength="16"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Expiry Date (MM/YY) *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">CVV *</label>
                      <input
                        type="number"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500"
                required
              />
              <label className="text-gray-700 text-sm sm:text-base">
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms & Conditions</span>
              </label>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 text-sm sm:text-base"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Order Summary</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm sm:text-base">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-gray-700 font-semibold text-sm sm:text-base">{item.title}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          Rs:{item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">
                      Rs:{(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-300 mt-3 sm:mt-4 pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-base sm:text-lg font-semibold text-gray-700">Total:</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-700">Rs:{totalPrice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}