import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/mockData';

const Movies = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popularity');

  // apply simple genre filtering (memoized)
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (filter === 'all') return true;
      return movie.genre.some(g => g.toLowerCase().includes(filter.toLowerCase()));
    });
  }, [filter]);

  // sort filtered list based on sort state (memoized)
  const sortedMovies = useMemo(() => {
    const arr = [...filteredMovies];
    switch (sort) {
      case 'year':
        return arr.sort((a, b) => b.year - a.year);
      case 'rating':
        // no actual rating field in mock data, assume 8.5 constant so keep order
        return arr;
      case 'popularity':
      default:
        return arr;
    }
  }, [filteredMovies, sort]);

  // infinite scroll logic
  const pageSize = 8;
  const [page, setPage] = useState(1);

  // reset page when filter or sort change
  useEffect(() => {
    setPage(1);
  }, [filter, sort]);

  // visible slice based on page
  const visibleMovies = sortedMovies.slice(0, page * pageSize);

  // scroll handler to load more
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        visibleMovies.length < sortedMovies.length
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleMovies.length, sortedMovies.length]);

  return (
    <div className="min-h-screen bg-moviebox-dark pt-20">
      <div className="container-padding py-8">
        <h1 className="text-4xl font-bold mb-8">All Movies</h1>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-moviebox-gray text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
            >
              <option value="all">All Genres</option>
              <option value="action">Action</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="drama">Drama</option>
              <option value="crime">Crime</option>
            </select>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-moviebox-gray text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
            >
              <option value="popularity">Popularity</option>
              <option value="year">Year</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <p className="text-gray-400">{visibleMovies.length} / {sortedMovies.length} movies</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;