import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaBell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-moviebox-dark' : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="container-padding py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-3xl font-bold text-netflix-red hover:text-red-600 transition-colors">
              MovieBox
            </Link>
            
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/movies" className="hover:text-gray-300 transition-colors">Movies</Link>
              <Link to="/categories" className="hover:text-gray-300 transition-colors">Categories</Link>
              <Link to="/gallery" className="hover:text-gray-300 transition-colors">Gallery</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-moviebox-gray text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
            
            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="relative"
              aria-label="View notifications"
            >
              <FaBell className="text-2xl hover:text-gray-300 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-netflix-red text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
              aria-label="View profile"
            >
              <FaUser className="text-2xl" />
              <span className="hidden md:inline">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;