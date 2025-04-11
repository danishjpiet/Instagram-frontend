import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b w-full border-gray-200 fixed left-0 top-0 z-50">
      <div className="px-4 md:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center outline-none">
            <img
              src="https://empathy-technologies.com/wp-content/uploads/2024/08/Empathy-Technology-Logo-1.svg"
              alt="Empathy Technologies Logo"
              className=""
            />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <div className="relative">
              <span className="absolute inset-y-0  left-0 pl-3 flex items-center">
                <FaSearch className="text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* <Link to="/" className="text-gray-700 hover:text-purple-500">
              <FaHome className="text-2xl" />
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-purple-500">
              <FaUser className="text-2xl" />
            </Link> */}
            <button
              onClick={logout}
              className="text-gray-700 hover:text-purple-500"
              title="Logout"
            >
              <FaSignOutAlt className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
