import React from 'react';

const MovieCard = ({ title, posterPath, rating }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  
  return (
    <div className="movie-card">
      <img src={`${baseUrl}${posterPath}`} alt={title} />
      <h2>{title}</h2>
      <p>평점 {rating}</p>
    </div>
  );
};

export default MovieCard;
