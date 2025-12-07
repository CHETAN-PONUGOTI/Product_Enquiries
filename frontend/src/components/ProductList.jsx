import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

// Define the API Base URL using the VITE environment variable
// It will be empty locally (using Vite's proxy) or the Render URL in production.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6;

  // 1. NEW EFFECT: Fetch ALL unique categories once on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use the API_BASE_URL prefix
        const response = await axios.get(`${API_BASE_URL}/api/products/categories`);
        // Set categories state with 'All' prepended
        setCategories(['All', ...response.data]);
      } catch (err) {
        console.error('Error fetching unique categories:', err);
        setCategories(['All']); // Fallback
      }
    };
    fetchCategories();
  }, []); // Empty dependency array: runs only once

  // 2. UPDATED fetchProducts: Uses API_BASE_URL and REMOVES category generation
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Use the API_BASE_URL prefix
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          search,
          category: category === 'All' ? '' : category,
          page,
          limit,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      
      // ❌ REMOVE THIS BLOCK to fix the category persistence issue
      /*
      const allCats = response.data.products.map(p => p.category);
      setCategories(['All', ...new Set(allCats)].sort());
      */

    } catch (err) {
      console.error('Error fetching products:', err);
      // Optional: Log API Base URL to debug Vercel 404/400 errors
      console.log('API Request URL:', `${API_BASE_URL}/api/products`); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };
  
  if (loading) return <div className="text-center mt-10">Loading products...</div>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Featured Products</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
        >
          {/* Categories are now populated by the initial fetch in the useEffect hook */}
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {/* ... rest of the component (product display, pagination) remains the same ... */}
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-10">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;