import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminToken, setAdminToken] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchEnquiries = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/enquiries', {
        headers: {
          'x-admin-token': token,
        },
      });
      setEnquiries(response.data);
      setIsAuthorized(true);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized: Invalid or missing admin token.');
        setIsAuthorized(false);
      } else {
        setError('Error fetching enquiries.');
        console.error('Fetch error:', err);
      }
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchEnquiries(adminToken);
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the `ADMIN_SECRET_TOKEN` from your .env file to view enquiries.</p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Enter Admin Token"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-150"
          >
            Authenticate & View
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    );
  }

  if (loading) return <div className="text-center mt-10">Loading Enquiries...</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Product Enquiries (Admin View)</h2>
      
      {enquiries.length === 0 ? (
        <p className="text-gray-600">No enquiries submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white shadow-md rounded-lg p-5 border border-gray-100">
              <p className="text-lg font-semibold text-indigo-700">{enquiry.productName || 'Product Deleted'}</p>
              <p className="text-sm text-gray-500 mb-3">Enquiry ID: {enquiry.id} | Product ID: {enquiry.product_id}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 mt-2 text-sm">
                <p><strong>Name:</strong> {enquiry.name}</p>
                <p><strong>Email:</strong> {enquiry.email}</p>
                <p><strong>Phone:</strong> {enquiry.phone || 'N/A'}</p>
                <p><strong>Date:</strong> {new Date(enquiry.created_at).toLocaleDateString()}</p>
              </div>
              <p className="mt-3 p-3 bg-gray-50 border-l-4 border-gray-200 italic">
                "{enquiry.message}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;