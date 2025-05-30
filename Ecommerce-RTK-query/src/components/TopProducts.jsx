import { useGetProductsQuery } from '../Services/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Features/cartSlice';

function TopProducts() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();

  if (isLoading) return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-400"></div>
    </div>
  );
  if (error) return <div className="text-center text-red-400 text-xl">Error: {error.message}</div>;

  const topProducts = products.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-400">Top Picks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="relative group bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-lg font-semibold text-white truncate">{product.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{product.description.slice(0, 80)}...</p>
            <p className="text-teal-400 font-bold">${product.price}</p>
            <button
              onClick={() => dispatch(addToCart({ id: product.id, title: product.title, price: product.price }))}
              className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-teal-400 transition-all duration-300"
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