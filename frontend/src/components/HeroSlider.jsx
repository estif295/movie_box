import React, { useState, useEffect } from 'react';
import { FaPlay, FaDownload, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-moviebox-dark via-transparent to-transparent z-10" />
          
          <img
            src={currentMovie.backdrop}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-20 left-8 md:left-16 z-20 max-w-2xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {currentMovie.title}
            </motion.h1>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-4 mb-4"
            >
              <span className="text-green-500 font-semibold">{currentMovie.rating}</span>
              <span>{currentMovie.year}</span>
              <span>{currentMovie.duration}</span>
            </motion.div>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg mb-6 line-clamp-3"
            >
              {currentMovie.description}
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex space-x-4"
            >
              <button className="btn-primary flex items-center space-x-2">
                <FaPlay />
                <span>Watch Now</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <FaDownload />
                <span>Download</span>
              </button>
              <button className="bg-gray-800/50 hover:bg-gray-800 text-white p-3 rounded-md transition-colors">
                <FaInfoCircle />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-8 right-8 z-20 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-netflix-red w-8' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;