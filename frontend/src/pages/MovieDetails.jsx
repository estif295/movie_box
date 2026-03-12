import React from 'react';
import { useParams } from 'react-router-dom';
import { FaPlay, FaDownload, FaStar, FaImdb } from 'react-icons/fa';
import { movies } from '../data/mockData';
import MovieCarousel from '../components/MovieCarousel';

const MovieDetails = () => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));
  
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-moviebox-dark">
      <div className="relative h-[60vh]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-moviebox-dark via-transparent to-transparent" />
      </div>
      
      <div className="container-padding -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-yellow-500 flex items-center">
                <FaStar className="mr-1" /> 8.5/10
              </span>
              <span className="flex items-center">
                <FaImdb className="mr-1 text-yellow-500" /> 8.6
              </span>
              <span>{movie.year}</span>
              <span>{movie.rating}</span>
              <span>{movie.duration}</span>
            </div>
            
            <p className="text-gray-300 text-lg mb-6">{movie.description}</p>
            
            <div className="flex space-x-4 mb-8">
              <button className="btn-primary flex items-center space-x-2">
                <FaPlay />
                <span>Watch Now</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <FaDownload />
                <span>Download</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
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
        </div>
        
        <div className="mt-12">
          <MovieCarousel title="More Like This" movies={movies.filter(m => m.id !== movie.id)} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;