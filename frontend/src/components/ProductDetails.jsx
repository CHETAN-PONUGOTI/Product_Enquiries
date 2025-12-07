import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EnquiryFormModal from './EnquiryFormModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Product not found.');
        } else {
          setError('Failed to fetch product details.');
        }
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading product details...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-8">
      <div className="md:flex md:space-x-8">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <img 
            src={product.image_url || '/images/default-product.jpg'} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-indigo-600 text-xl font-semibold mb-4">{product.category}</p>
          <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-700 mb-6 border-b pb-4">{product.long_desc}</p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-150 transform hover:scale-105"
          >
            Enquire About This Product
          </button>
        </div>
      </div>

      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductDetails;