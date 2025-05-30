import { useGetProductsQuery } from '../Services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Features/cartSlice';

function TopProducts() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl">Error: {error.message}</div>;

  const topProducts = products.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Top Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain rounded mb-4"
            />
            <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description.slice(0, 100)}...</p>
            <p className="text-green-600 font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price }))}
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProducts;