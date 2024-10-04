import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

// 영화 목록을 표시하고 각 MovieCard 컴포넌트를 클릭했을 때 MovieDetail로 넘어갈 수 있게 해주는 페이지
const MovieList = () => {
  const [movies, setMovies] = useState([]); // 빈 배열을 인자로 넣어서 영화 목록 상태 초기화
  const navigate = useNavigate();

  // API를 사용해 인기 영화 목록 데이터를 가져오는 함수임
  const fetchPopularMovies = () => {
    fetch(`${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`)
      .then((response) => response.json()) //json 형식으로 파싱을 하고,
      .then((data) => setMovies(data.results)) //파싱된 data를 data에 담은 후에 result를 써서 setMovies를 통해서 movies에 담는 것임
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []); //빈 배열을 넣어서 렌더링 될 때 처음 한 번만 실행될 수 있게!

  // navigate 함수를 사용해서 클릭을 했을 때 뒤에 id값이 일치하는 영화 페이지로 이동할 수 있게 해줌
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  // MovieCard 컴포넌트를 map을 통해 생성하고 클릭을 했을 때 디테일 페이지로 넘어가게 만들어줌 
  return (
    <div className="movie-list bg-gray-100 p-6">
      {movies.map((movie) => (
        // 식별자로 key를 줌
        <div key={movie.id} onClick={() => handleClick(movie.id)} className="hover:bg-gray-200">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
