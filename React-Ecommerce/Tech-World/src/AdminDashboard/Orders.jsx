// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../Firebase";
// import { collection, getDocs } from "firebase/firestore";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch orders from Firestore on page load
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "orders"));
//         const ordersList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrders(ordersList);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError("Failed to fetch orders: " + err.message);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Format date for display
//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders</h2>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Orders Table */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p className="text-center text-gray-500">No orders found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-3 text-left text-gray-700">Order ID</th>
//                   <th className="p-3 text-left text-gray-700">Customer Name</th>
//                   <th className="p-3 text-left text-gray-700">Email</th>
//                   <th className="p-3 text-left text-gray-700">Total Price</th>
//                   <th className="p-3 text-left text-gray-700">Order Date</th>
//                   <th className="p-3 text-left text-gray-700">Status</th>
//                   <th className="p-3 text-left text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr
//                     key={order.id}
//                     className="border-b hover:bg-gray-100"
//                   >
//                     <td className="p-3">{order.id}</td>
//                     <td className="p-3">{order.userDetails.fullName}</td>
//                     <td className="p-3">{order.userDetails.email}</td>
//                     <td className="p-3">${order.totalPrice.toFixed(2)}</td>
//                     <td className="p-3">{formatDate(order.createdAt)}</td>
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded-full text-sm ${
//                           order.status === "Pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : order.status === "Shipped"
//                             ? "bg-blue-100 text-blue-800"
//                             : order.status === "Delivered"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="p-3">
//                       <Link
//                         to={`/admin/order/${order.id}`}
//                         className="text-blue-600 hover:underline"
//                       >
//                         View Details
//                       </Link>
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
import { collection, getDocs } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from Firestore on page load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders: " + err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
        Orders
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 text-red-700 rounded-lg text-sm sm:text-base">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 sm:p-3 text-left text-gray-700">Order ID</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700">Customer Name</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden sm:table-cell">Email</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden md:table-cell">Total Price</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden lg:table-cell">Order Date</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700 hidden md:table-cell">Status</th>
                  <th className="p-2 sm:p-3 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-100 flex flex-col sm:table-row"
                  >
                    <td className="p-2 sm:p-3 block sm:table-cell">
                      <span className="sm:hidden font-semibold">Order ID: </span>
                      {order.id}
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell">
                      <span className="sm:hidden font-semibold">Customer Name: </span>
                      {order.userDetails.fullName}
                    </td>
                    <td className="p-2 block sm:p-3 sm:table-cell">
                      <span className="sm:hidden font-semibold">Email: </span>
                      {order.userDetails.email}
                    </td>
                    <td className="p-2 block sm:p-3 md:table-cell">
                      <span className="md:hidden font-semibold">Total Price: </span>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="p-2 block sm:p-3 lg:table-cell">
                      <span className="lg:hidden font-semibold">Order Date: </span>
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="p-2 block sm:p-3 md:table-cell">
                      <span className="md:hidden font-semibold">Status: </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3 block sm:table-cell">
                      <span className="sm:hidden font-semibold">Actions: </span>
                      <Link
                        to={`/admin/order/${order.id}`}
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                      >
                        View Details
                      </Link>
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