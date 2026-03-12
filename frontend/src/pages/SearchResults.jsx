import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilter, 
  FaSort, 
  FaTimes, 
  FaCalendar, 
  FaStar, 
  FaClock,
  FaFilm,
  FaThLarge,
  FaList,
  FaSearch
} from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/mockData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    rating: 'all',
    duration: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Available filter options
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Crime'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2010-2014', '2000-2009', '1990-1999'];
  const ratings = ['9+', '8-9', '7-8', '6-7', 'Below 6'];
  const durations = ['< 90 min', '90-120 min', '120-150 min', '> 150 min'];

  // Simulate search API call
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // Filter movies based on search query
      const searchResults = movies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
        movie.cast.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
        movie.director.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(searchResults);
      setFilteredResults(searchResults);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    // Apply genre filter
    if (filters.genre !== 'all') {
      filtered = filtered.filter(movie => 
        movie.genre.some(g => g.toLowerCase() === filters.genre.toLowerCase())
      );
    }

    // Apply year filter
    if (filters.year !== 'all') {
      if (filters.year.includes('-')) {
        const [start, end] = filters.year.split('-').map(Number);
        filtered = filtered.filter(movie => movie.year >= start && movie.year <= end);
      } else {
        filtered = filtered.filter(movie => movie.year.toString() === filters.year);
      }
    }

    // Apply rating filter
    if (filters.rating !== 'all') {
      // Using mock rating of 8.5 for demo
      const rating = 8.5;
      switch(filters.rating) {
        case '9+':
          filtered = filtered.filter(() => rating >= 9);
          break;
        case '8-9':
          filtered = filtered.filter(() => rating >= 8 && rating < 9);
          break;
        case '7-8':
          filtered = filtered.filter(() => rating >= 7 && rating < 8);
          break;
        case '6-7':
          filtered = filtered.filter(() => rating >= 6 && rating < 7);
          break;
        case 'Below 6':
          filtered = filtered.filter(() => rating < 6);
          break;
        default:
          break;
      }
    }

    // Apply duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(movie => {
        const durationMin = parseInt(movie.duration.split('h')[0]) * 60 + 
                          parseInt(movie.duration.split('h')[1]?.replace('min', '') || '0');
        
        switch(filters.duration) {
          case '< 90 min':
            return durationMin < 90;
          case '90-120 min':
            return durationMin >= 90 && durationMin <= 120;
          case '120-150 min':
            return durationMin > 120 && durationMin <= 150;
          case '> 150 min':
            return durationMin > 150;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch(sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'rating':
        filtered.sort((a, b) => 8.5 - 8.5); // Mock rating sort
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredResults(filtered);
  }, [results, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      genre: 'all',
      year: 'all',
      rating: 'all',
      duration: 'all'
    });
    setSortBy('relevance');
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'all') || sortBy !== 'relevance';

  return (
    <div className="min-h-screen bg-moviebox-dark pt-20">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-moviebox-gray to-moviebox-dark border-b border-gray-800">
        <div className="container-padding py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Search Results
              </h1>
              <p className="text-gray-400">
                {loading ? 'Searching...' : `Found ${filteredResults.length} results for "${query}"`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-moviebox-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-netflix-red text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-netflix-red text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <FaList />
                </button>
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-netflix-red text-white'
                    : 'bg-moviebox-light text-gray-400 hover:text-white'
                }`}
              >
                <FaFilter />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-white text-netflix-red rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {Object.values(filters).filter(v => v !== 'all').length + (sortBy !== 'relevance' ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-400">Active filters:</span>
              {Object.entries(filters).map(([key, value]) => (
                value !== 'all' && (
                  <button
                    key={key}
                    onClick={() => setFilters({ ...filters, [key]: 'all' })}
                    className="flex items-center space-x-1 bg-moviebox-light hover:bg-moviebox-gray text-white px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    <span>{key}: {value}</span>
                    <FaTimes size={12} />
                  </button>
                )
              ))}
              {sortBy !== 'relevance' && (
                <button
                  onClick={() => setSortBy('relevance')}
                  className="flex items-center space-x-1 bg-moviebox-light hover:bg-moviebox-gray text-white px-3 py-1 rounded-full text-sm transition-colors"
                >
                  <span>Sort: {sortBy}</span>
                  <FaTimes size={12} />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-netflix-red hover:text-red-600 text-sm font-semibold transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-moviebox-gray border-b border-gray-800 overflow-hidden"
          >
            <div className="container-padding py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <FaSort className="inline mr-1" /> Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-moviebox-dark text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <FaFilm className="inline mr-1" /> Genre
                  </label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                    className="w-full bg-moviebox-dark text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="all">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <FaCalendar className="inline mr-1" /> Year
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    className="w-full bg-moviebox-dark text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="all">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <FaStar className="inline mr-1" /> Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full bg-moviebox-dark text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="all">All Ratings</option>
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <FaClock className="inline mr-1" /> Duration
                  </label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                    className="w-full bg-moviebox-dark text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                  >
                    <option value="all">Any Duration</option>
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <div className="container-padding py-8">
        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-moviebox-gray rounded-lg h-[300px] mb-2"></div>
                <div className="bg-moviebox-gray h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-moviebox-gray h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Showing {filteredResults.length} of {results.length} results
              </p>
            </div>

            {/* Results Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredResults.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-moviebox-gray rounded-lg overflow-hidden hover:bg-moviebox-light transition-colors"
                  >
                    <Link to={`/movie/${movie.id}`} className="flex flex-col md:flex-row">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-full md:w-48 h-32 object-cover"
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                        <div className="flex items-center space-x-4 mb-2 text-sm text-gray-400">
                          <span>{movie.year}</span>
                          <span>{movie.rating}</span>
                          <span>{movie.duration}</span>
                        </div>
                        <p className="text-gray-300 line-clamp-2">{movie.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          {movie.genre.map((g, i) => (
                            <span key={i} className="text-xs bg-moviebox-dark text-gray-300 px-2 py-1 rounded">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          // No Results
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-4 text-gray-600">
              <FaSearch />
            </div>
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-400 mb-6">
              We couldn't find any movies matching "{query}"
            </p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-500 mb-4">Suggestions:</p>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Check your spelling for typos</li>
                <li>• Try using more general keywords</li>
                <li>• Try searching for a movie title, actor, or director</li>
                <li>• Browse categories to find similar movies</li>
              </ul>
              <Link
                to="/movies"
                className="inline-block mt-6 bg-netflix-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse All Movies
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;