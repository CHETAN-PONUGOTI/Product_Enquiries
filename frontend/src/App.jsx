import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AdminEnquiries from './components/AdminEnquiries';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="admin/enquiries" element={<AdminEnquiries />} />
        <Route path="*" element={<h1 className="text-2xl p-4 text-center">404 - Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;