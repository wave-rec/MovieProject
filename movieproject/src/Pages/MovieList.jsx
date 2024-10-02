import React from 'react';
import { useNavigate } from 'react-router-dom';
import movieListData from '../assets/data/movieListData.json';
import '../Pages/movielist.css';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-list bg-gray-100 p-6"> {/* Tailwind 클래스 추가 */}
      {movieListData.results.map((movie) => (
        <div key={movie.id} onClick={() => handleClick(movie.id)} className="hover:bg-gray-200">
          <MovieCard 
            title={movie.title} 
            posterPath={movie.poster_path} 
            rating={movie.vote_average} 
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
