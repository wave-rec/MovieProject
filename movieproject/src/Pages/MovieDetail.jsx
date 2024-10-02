import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieListData from '../assets/data/movieListData.json';
import movieDetailData from '../assets/data/movieDetailData.json';
import '../App.css';

const MovieDetail = () => {
  const { id } = useParams(); 
  // 영화 id를 useParams 훅을 사용해서 URL의 파라미터로부터 가져옴

  const [movie, setMovie] = useState(null); 
  // useState 훅을 사용해 영화 데이터를 관리하며, 초기값은 null

  // 장르 ID를 장르 이름으로 변환하기 위한 매핑 객체 생성 (여기가 지피티 도움)
  const genreMap = {};
  movieDetailData.genres.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  useEffect(() => {
    // URL의 id와 일치하는 영화 데이터를 movieListData에서 찾아서 상태를 업데이트
    const selectedMovie = movieListData.results.find((movie) => movie.id === parseInt(id));
    setMovie(selectedMovie);
  }, [id]); 
  // id가 변경될 때마다 useEffect가 실행되며, 영화 데이터를 갱신함

  if (!movie) return <div>Loading...</div>; 
  // movie가 null일 경우 로딩 중이라는 메시지를 표시

  return (
    <div className="movie-detail-layout">
      <div className="poster-container">
        {/* 영화 포스터 이미지 표시 */}
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-info-container">
        <div className="movie-title-rating">
          {/* 영화 제목과 평점 표시 */}
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-rating">평점: {movie.vote_average}</p>
        </div>
        <div className="movie-genres">
          {/* 영화 장르를 장르 이름으로 변환하여 표시 (여기 지피티 도움) */}
          <strong>장르: </strong>
          <span>{movie.genre_ids.map((id) => genreMap[id]).filter(Boolean).join(", ")}</span>
        </div>
        <div className="movie-overview">
          {/* 영화 줄거리 표시 */}
          <strong>줄거리: </strong>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
