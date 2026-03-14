import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFire, 
  FaLaugh, 
  FaTheaterMasks, 
  FaRocket, 
  FaGhost, 
  FaHeart, 
  FaFilm, 
  FaSkull,
  FaBaby,
  FaMusic,
  FaHistory,
  FaStar,
  FaTv,
  FaVideo
} from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/mockData';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Extended categories with available icons
  const allCategories = [
    { id: 1, name: 'Action Film', icon: FaFire, color: 'from-orange-500 to-red-600', count: 45, description: 'High-octane thrills and excitement' },
    { id: 2, name: 'Comedy Film', icon: FaLaugh, color: 'from-yellow-400 to-yellow-600', count: 62, description: 'Laugh-out-loud moments' },
    { id: 3, name: 'Drama Film', icon: FaTheaterMasks, color: 'from-purple-500 to-purple-700', count: 78, description: 'Compelling stories and emotions' },
    { id: 4, name: 'Sci-Fi Film', icon: FaRocket, color: 'from-blue-400 to-indigo-600', count: 34, description: 'Explore futuristic worlds' },
    { id: 5, name: 'Horror Film', icon: FaGhost, color: 'from-gray-700 to-gray-900', count: 28, description: 'Heart-pounding terror' },
    { id: 6, name: 'Romance Film', icon: FaHeart, color: 'from-pink-400 to-pink-600', count: 41, description: 'Love stories that touch the heart' },
    { id: 7, name: 'Documentary Film', icon: FaFilm, color: 'from-green-500 to-green-700', count: 23, description: 'Real stories, real impact' },
    { id: 8, name: 'Thriller Film', icon: FaSkull, color: 'from-red-700 to-red-900', count: 37, description: 'Edge-of-your-seat suspense' },
    { id: 9, name: 'Family Film', icon: FaBaby, color: 'from-teal-400 to-teal-600', count: 52, description: 'Fun for all ages' },
    { id: 10, name: 'Music Film', icon: FaMusic, color: 'from-indigo-400 to-indigo-600', count: 19, description: 'Movies that move you' },
    { id: 11, name: 'History Film', icon: FaHistory, color: 'from-amber-600 to-amber-800', count: 16, description: 'Epic tales from the past' },
    { id: 12, name: 'Award Winners Film', icon: FaStar, color: 'from-yellow-500 to-yellow-700', count: 31, description: 'Critically acclaimed masterpieces' },
    { id: 13, name: 'TV Series', icon: FaTv, color: 'from-blue-600 to-blue-800', count: 44, description: 'Binge-worthy shows' },
    { id: 14, name: 'Classic Film', icon: FaVideo, color: 'from-gray-600 to-gray-800', count: 27, description: 'Timeless cinema' },
  ];

  // Filter movies based on selected category
  const getMoviesByCategory = () => {
    if (selectedCategory === 'all') {
      return movies;
    }
    // Remove "Film" from category name for genre matching
    const genreToMatch = selectedCategory.replace(' Film', '').toLowerCase();
    return movies.filter(movie => 
      movie.genre.some(g => g.toLowerCase() === genreToMatch)
    );
  };

  const filteredMovies = getMoviesByCategory();
  
  // Filter categories based on search
  const filteredCategories = allCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-moviebox-dark pt-20">
      {/* Hero Section */}
      <div className="relative h-[300px] mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-red to-purple-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200')] bg-cover bg-center mix-blend-overlay" />
        
        <div className="relative container-padding h-full flex flex-col justify-center">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Explore Categories
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl"
          >
            Discover movies from every genre. Find your next favorite film.
          </motion.p>
        </div>
      </div>

      <div className="container-padding pb-16">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-moviebox-gray text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
            <svg 
              className="absolute left-4 top-3.5 text-gray-400" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400">{filteredCategories.length} Categories</span>
            <div className="flex bg-moviebox-gray rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-netflix-red text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-netflix-red text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-6 mb-12 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: viewMode === 'grid' ? 1.05 : 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? 'all' : category.name
                )}
              >
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${category.color} p-6 ${
                  viewMode === 'list' ? 'flex items-center' : ''
                } ${
                  selectedCategory === category.name ? 'ring-4 ring-white ring-opacity-50' : ''
                }`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full transform -translate-x-12 translate-y-12" />
                  
                  {/* Content */}
                  <div className={`relative z-10 ${viewMode === 'list' ? 'flex items-center w-full' : ''}`}>
                    <div className={`${
                      viewMode === 'grid' 
                        ? 'mb-4' 
                        : 'mr-6'
                    }`}>
                      <category.icon className={`${
                        viewMode === 'grid' ? 'text-5xl' : 'text-4xl'
                      } text-white`} />
                    </div>
                    
                    <div className={`flex-1 ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-white text-opacity-90 text-sm">
                          {category.description}
                        </p>
                      </div>
                      
                      <div className={`flex items-center mt-2 ${viewMode === 'list' ? 'md:mt-0' : ''}`}>
                        <span className="bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {category.count} Movies
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedCategory === category.name && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-white rounded-full p-1"
                    >
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Selected Category Movies */}
        {selectedCategory !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">
                {selectedCategory} Movies
                <span className="text-lg font-normal text-gray-400 ml-3">
                  ({filteredMovies.length} titles)
                </span>
              </h2>
              <Link 
                to={`/categories/${selectedCategory.toLowerCase()}`}
                className="text-netflix-red hover:text-red-600 transition-colors font-semibold"
              >
                View All →
              </Link>
            </div>

            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-moviebox-gray rounded-lg">
                <p className="text-gray-400 text-lg">
                  No movies found in this category yet.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Popular Categories Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-moviebox-gray p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-netflix-red mb-2">500+</div>
            <div className="text-gray-400">Total Movies</div>
          </div>
          <div className="bg-moviebox-gray p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-netflix-red mb-2">14</div>
            <div className="text-gray-400">Categories</div>
          </div>
          <div className="bg-moviebox-gray p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-netflix-red mb-2">100+</div>
            <div className="text-gray-400">New Releases</div>
          </div>
          <div className="bg-moviebox-gray p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-netflix-red mb-2">4K</div>
            <div className="text-gray-400">Ultra HD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;