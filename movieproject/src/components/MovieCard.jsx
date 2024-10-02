import React from 'react';

//MovieCard 에 제목, 포스터, 평점 props를 설정해주고 기본 베이스 이미지 url을 선언해준 뒤
const MovieCard = ({ title, posterPath, rating }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  
  return (
    //이를 베이스 이미지 url 뒤에 포스터별 경로를 붙여 각 종류별로 표시해주었음.
    <div className="movie-card">
      <img src={`${baseUrl}${posterPath}`} alt={title} />
      <h2>{title}</h2>
      <p>평점 {rating}</p>
    </div>
  );
};

//내보내기로 다른 파일에서도 import 될 수 있게 설정
export default MovieCard;
