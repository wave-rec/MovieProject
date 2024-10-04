import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../MovieDetail/MovieDetail.css'


const MovieDetail = () => {
  const { id } = useParams();
  // 영화 id를 useParams 훅을 사용해서 URL의 파라미터로부터 가져옴
  const [movie, setMovie] = useState(null);
  // useState 훅을 사용해 영화 데이터를 관리하며, 초기값은 null

  useEffect(() => {
    // TMDb API로부터 특정 영화의 상세 데이터를 가져옴
    fetch( //네트워크에 요청을 보내고 응답을 받아다주는거니까 아래에 적힌 파라미터대로 디테일탭 정보를 받아다 주는 것!
      `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`
    )
      .then((res) => res.json()) //서버에서 받아온 응답을 json 형식으로 파싱해주고
      .then((data) => setMovie(data)) // 받아온 데이터를 movie 상태로 설정해줌
  }, [id]); //id값이 변할 때마다 useEffect 함수를 다시 실행하는 것임

  if (!movie) return <div>Loading...</div>;
  // movie가 null일 경우 로딩 중이라는 메시지를 표시

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
          <strong>장르 : </strong>
          {/* movie.genres가 배열이므로 map을 사용하여 name을 추출하고 join으로 문자열 조합 */}
          <span className='movie-genres-span'>{movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : ''}</span>
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
