// MovieList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import '../MovieList/MovieList.css';

const MovieList = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]); // 영화 목록 상태 관리
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [totalPages, setTotalPages] = useState(1); // API로부터 가져올 페이지 관리
  const navigate = useNavigate();


  const fetchMovies = () => {
    //discover/movie 엔드포인트 쓰고 ${page} 마지막에 붙여서 다른 페이지 영화 받아올 수 있게 설정해 줌
    let url = `${import.meta.env.VITE_TMDB_API_BASE_URL}/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR&page=${page}`;
    //searchQuery를 지금 props로 받고 있으니까 이게 있으면 엔드포인트를 search/movie로 바꿔서 가져오게 만드는거임
    if (searchQuery) {
      url = `${import.meta.env.VITE_TMDB_API_BASE_URL}/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}&language=ko-KR&page=${page}`;
    }

    setLoading(true); // 로딩 시작하게 하고
    fetch(url) //api에 url 위에 설정해둔거 보내서 응답 파싱하는 과정이고
      .then((response) => response.json())
      .then((data) => {
        if (page === 1) { //스크롤 안 내리고 그냥 첫 페이지일 때는 초기 영화 목록으로 보이게 해주고
          setMovies(data.results); 
        } else { // 스크롤 내려가지고 페이지 늘어나면 기존 영화에다가 추가로 영화 받아와서 더해서 밑에 보여줌
          setMovies((prevMovies) => [...prevMovies, ...data.results]); 
        }
        setTotalPages(data.total_pages); // 요걸로 이제 불러온 영화 목록까지 더해진 총 페이지 수 설정해주고
        setLoading(false); // 로딩 종료시키기
      })
      .catch((error) => {
        console.error('영화 목록을 불러오는 중 오류 발생:', error);
        setLoading(false); // 오류 발생하면 이거 띄워주고
      });
  };

  // 페이지 번호가 변경될 때마다 API 호출
  useEffect(() => {
    if (page <= totalPages) { // 페이지가 총 페이지 수를 초과하지 않을 때만 API 호출
      fetchMovies();
    }
  }, [page]);


  useEffect(() => {
    setPage(1); // 검색어가 변경될 때 페이지를 1로 초기화 해주고
    setMovies([]); // 영화 목록도 초기화 시키고
    fetchMovies(); // 새로운 검색어로 영화 목록 다시 불러와주기
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 하단에 도달하고, 로딩 중이 아니며, 현재 페이지가 총 페이지 수를 초과하지 않을 때만 다음 페이지 불러오기
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10 && !loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, totalPages]);


  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => handleClick(movie.id)} className="movie-item">
          <MovieCard movie={movie} />
        </div>
      ))}
      {loading && <p>로딩 중...</p>}
    </div>
  );
};

export default MovieList;
