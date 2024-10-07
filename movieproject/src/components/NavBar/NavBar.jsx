import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce'; // useDebounce 훅을 가져와서 import 해줬음
import './NavBar.css';

const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // 검색어 상태 관리해주고
  const debouncedQuery = useDebounce(query, 500); // 500ms의 지연 시간을 갖는 디바운스된 검색어 상태
  const navigate = useNavigate();


  useEffect(() => {
    onSearch(debouncedQuery); // 지연된 검색어 값으로 검색을 함 검색어가 변경될 때마다 onSearch 함수를 실행하는 것!
  }, [debouncedQuery, onSearch]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value); // 검색어 상태를 새로 업데이트 해주고
  };

  const handleSearchSubmit = () => {
    if (debouncedQuery.trim() !== '') { //검색어가 비어있지 않을 때만 검색을 하겠다는 뜻임! trim은 문자열 좌우에서 공백을 제거해주는 기능~
      navigate(`/search?query=${debouncedQuery}`); // 지연된 검색어로 검색 페이지 이동
    }
  };

  //검색어가 입력되어 있을 때 로고를 클릭하면 다시 메인페이지로 돌아올 수 있게함.
  const handleLogoClick = () => {
    setQuery(''); // 검색어 초기화
    onSearch(''); // 검색어 초기화
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        🦊🎞️
      </div>
      <div className="navbar-search-container">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="영화 제목을 검색하세요"
          className="navbar-search-input"
        />
        <button onClick={handleSearchSubmit} className="navbar-search-button">
          검색
        </button>
      </div>
      <div className="auth-buttons">
        <button className="signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
        <button className="login-btn" onClick={() => navigate('/login')}>로그인</button>
      </div>
    </div>
  );
};

export default NavBar;
