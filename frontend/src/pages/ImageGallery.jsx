import React from 'react';
import { movies } from '../data/mockData';

const ImageGallery = () => {
  return (
    <div className="min-h-screen bg-moviebox-dark pt-20">
      <div className="container-padding py-8">
        <h1 className="text-4xl font-bold mb-8 text-white">All Movie Posters</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map(movie => (
            <div key={movie.id} className="overflow-hidden rounded-lg bg-gray-900">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <p className="text-white text-center py-2 text-sm truncate">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;