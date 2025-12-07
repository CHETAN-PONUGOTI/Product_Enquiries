import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          Product Showcase
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/enquiries" 
                className="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
              >
                Admin (Enquiries)
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;