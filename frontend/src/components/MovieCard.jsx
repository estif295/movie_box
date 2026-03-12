import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaDownload, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
// no modal – navigate to detail page instead

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/movie/${movie.id}`}> 
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-2 right-2 bg-netflix-red text-white px-2 py-1 rounded text-sm">
            {movie.rating}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
          >
            <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
            <div className="flex items-center space-x-2 text-sm mb-2">
              <span className="text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> 8.5
              </span>
              <span>{movie.year}</span>
            </div>
            
            <div className="flex space-x-2">
              <button className="bg-netflix-red hover:bg-red-700 text-white p-2 rounded-full transition-colors">
                <FaPlay size={12} />
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full transition-colors">
                <FaDownload size={12} />
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-2">
          <h3 className="font-semibold truncate">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.genre.join(' • ')}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;