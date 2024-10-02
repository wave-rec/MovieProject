import React from 'react';
import { useNavigate } from 'react-router-dom';
import movieListData from '../assets/data/movieListData.json';
import '../Pages/movielist.css';
import MovieCard from '../components/MovieCard';

//영화 목록을 표시하고 각 MovieCard 컴포넌트를 클릭했을 때 MovieDetail로 넘어갈 수 있게 해주는 페이지
const MovieList = () => {
  const navigate = useNavigate();

  //navigate 함수를 사용해서 클릭을 했을 때 뒤에 id값이 일치하는 영화 페이지로 이동할 수 있게 해줌
  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };
  
  //MovieCard 컴포넌트를 map을 통해 생성하고 클릭을 했을 때 디테일 페이지로 넘어가게 만들어줌 
  return (
    <div className="movie-list bg-gray-100 p-6">
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
