import React from 'react';
import { FaTimes, FaPlay, FaDownload, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MovieModal = ({ movie, onClose }) => {
  const handleWatchNow = () => {
    if (movie.trailer) {
      window.open(movie.trailer, '_blank', 'noopener,noreferrer');
    } else {
      window.alert('Trailer not available yet.');
    }
  };

  const handleDownload = () => {
    const fileContent = `Download placeholder for ${movie.title}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${movie.title.replace(/\s+/g, '_')}_download.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          className="relative bg-moviebox-gray rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors"
          >
            <FaTimes />
          </button>

          <div className="relative">
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-moviebox-gray to-transparent" />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> 8.5/10
              </span>
              <span>{movie.year}</span>
              <span>{movie.rating}</span>
              <span>{movie.duration}</span>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={handleWatchNow}
                className="btn-primary flex items-center space-x-2"
              >
                <FaPlay />
                <span>Watch Now</span>
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="btn-secondary flex items-center space-x-2"
              >
                <FaDownload />
                <span>Download</span>
              </button>
            </div>

            <p className="text-gray-300 mb-4">{movie.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p className="text-gray-400">{movie.director}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cast</h3>
                <p className="text-gray-400">{movie.cast.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Genres</h3>
                <p className="text-gray-400">{movie.genre.join(' • ')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;