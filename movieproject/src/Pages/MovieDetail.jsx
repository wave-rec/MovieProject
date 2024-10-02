import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieListData from '../assets/data/movieListData.json';
import movieDetailData from '../assets/data/movieDetailData.json';
import '../App.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const genreMap = {};
  movieDetailData.genres.forEach((genre) => {
    genreMap[genre.id] = genre.name; 
  });

  useEffect(() => {
    const selectedMovie = movieListData.results.find((movie) => movie.id === parseInt(id));
    setMovie(selectedMovie);
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-layout">
      <div className="poster-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info-container">
        <div className="movie-title-rating">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-rating">평점: {movie.vote_average}</p>
        </div>
        <div className="movie-genres">
          <strong>장르: </strong>
          {movie.genre_ids
            .filter((id) => genreMap[id])
            .map((id, index) => (
              <span key={id} className="genre">
                {genreMap[id]}
                {index < movie.genre_ids.length - 1 ? " " : ""}
              </span>
            ))}
        </div>
        <div className="movie-overview">
          <strong>줄거리: </strong>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
