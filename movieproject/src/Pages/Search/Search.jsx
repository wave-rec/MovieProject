import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { useSearchParams } from 'react-router-dom';
import './Search.css';

//TMDB에서 영화 받아오기!
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

//영화 제목을 검색하면 화면에 보여주는 함수임. 
const Search = () => {
  const [searchParams] = useSearchParams();
  //URL에서 query값을 가져와서 검색창에 입력된 query값과 같으면 query를 반환하고 값이 없으면 빈 문자열로 초기화함!
  const query = searchParams.get('query') || '';
  //여기서 이제 영화 목록을 관리해줌
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = () => {
      //TMDB에다가 fetch로 요청을 보내서 아래 조건에 맞는 영화 불러옴
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=ko-KR`)
        .then((response) => response.json()) // 받아온 응답을 JSON 형식으로 파싱을 해주고
        .then((data) => {
          setMovies(data.results); // 파싱한 데이터에서 영화 목록을 가져와서 movies 상태를 업데이트해주고
        })
        .catch((error) => {
          console.error('영화 검색 중 오류 발생:', error); // 그 과정에서 오류가 발생했을 때 콘솔에 오류 메시지를 출력 해줌
        });
    };
    
    //query값이 있으면 fetchMovies 함수에 해당하는 값을 가져옴.
    if (query) {
      fetchMovies();
    }
    //query값이 변경될 때마다 다시 실행되게 만드는 것임
  }, [query]);

  return (
    <div className="search-container">
      {/* 해당하는 영화 배열의 길이가 0보다 클 때 그니까 해당하는 영화가 존재하면 그 무비 카드를 보여주고 아니면 해당하는 영화가 없다고 띄워줌 */}
      {movies.length > 0 ? (
        <div className="search-results">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="no-results">해당 영화가 없습니다.</p>
      )}
    </div>
  );
};

export default Search;
