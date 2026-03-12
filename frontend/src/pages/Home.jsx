import React from 'react';
import HeroSlider from '../components/HeroSlider';
import MovieCarousel from '../components/MovieCarousel';
import CategorySection from '../components/CategorySection';
import { movies, trendingMovies, recommendedMovies, popularMovies, categories } from '../data/mockData';

const Home = () => {
  return (
    <div className="min-h-screen bg-moviebox-dark">
      <HeroSlider movies={movies.slice(0, 3)} />
      
      <div className="container-padding py-8">
        <MovieCarousel title="Trending Now" movies={trendingMovies} />
        <MovieCarousel title="Recommended for You" movies={recommendedMovies} />
        <CategorySection categories={categories} />
        <MovieCarousel title="Popular on MovieBox" movies={popularMovies} />
      </div>
    </div>
  );
};

export default Home;