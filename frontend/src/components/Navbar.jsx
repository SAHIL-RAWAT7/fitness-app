import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MdLogout } from 'react-icons/md';
import { FiActivity, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/signin');
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Workouts', path: '/all-workouts' },
    { name: 'Add Workout', path: '/workout-plans' },
    { name: 'BMI Calculator', path: '/bmi-calculator' },
    { name: 'Progress', path: '/progress' },
    { name: 'Nutrition', path: '/diet-plans' },
  ];

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none hover:opacity-80 transition-opacity duration-200"
          >
            <FiActivity className="mr-2 text-blue-600" size={24} />
            <span className="text-2xl font-bold tracking-tight text-gray-800">
              <span className="text-blue-600">Fit</span>
              <span className="text-gray-800">Track</span>
              <span className="text-blue-500">.</span>
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-700">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* User Info & Menu Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <span>{user?.email || 'user@example.com'}</span>
            <button
              onClick={logout}
              className="p-1 rounded-full hover:bg-red-100 transition-colors duration-300"
              title="Logout"
            >
              <MdLogout className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 space-y-2 px-4 bg-white rounded-b-lg shadow-inner"
          >
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-3 mt-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold uppercase">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="text-sm text-gray-700">
                {user?.email || 'user@example.com'}
              </div>
              <button
                onClick={logout}
                className="p-1 rounded-full hover:bg-red-100 transition-colors duration-300"
                title="Logout"
              >
                <MdLogout className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
