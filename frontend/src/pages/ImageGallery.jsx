import React from 'react';
import { movies } from '../data/mockData';

const ImageGallery = () => {
  const pageSize = 12;
  const [page, setPage] = React.useState(1);

  const visibleMovies = movies.slice(0, page * pageSize);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        visibleMovies.length < movies.length
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleMovies.length]);

  return (
    <div className="min-h-screen bg-moviebox-dark pt-20">
      <div className="container-padding py-8">
        <h1 className="text-4xl font-bold mb-2 text-white">All Movie Posters</h1>
        <p className="text-gray-400 mb-8">Showing {visibleMovies.length} of {movies.length}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleMovies.map(movie => (
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