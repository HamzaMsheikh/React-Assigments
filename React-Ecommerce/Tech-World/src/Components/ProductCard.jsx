import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform md:hover:scale-105 md:hover:shadow-lg"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 sm:h-48 md:h-52 object-cover"
      />

      {/* Product Details */}
      <div className="p-3 sm:p-4">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>

        {/* Price */}
        <p className="text-lg sm:text-xl font-bold text-green-600 mb-2">
          Rs:{product.price}
        </p>

        {/* Description (truncated) */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}