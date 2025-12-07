import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
      <Link to={`/products/${product.id}`}>
        <img 
          className="w-full h-48 object-cover" 
          src={product.image_url || '/images/default-product.jpg'} 
          alt={product.name} 
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-sm text-indigo-600 mt-1">{product.category}</p>
          <p className="text-gray-600 mt-2">{product.short_desc}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <button className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-600 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;