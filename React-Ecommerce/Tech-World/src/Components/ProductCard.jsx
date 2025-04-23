import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-xl font-bold text-green-600 mb-2">
          ${product.price.toFixed(2)}
        </p>

        {/* Description (truncated) */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}