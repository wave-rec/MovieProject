import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MovieList from './Pages/MovieList/MovieList';
import MovieDetail from './Pages/MovieDetail/MovieDetail';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import Search from './Pages/Search/Search';

const App = () => { //seachQuery에 검색창에 입력된 변수를 저장해줌
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* NavBar에 검색어 전달해주고 */}
      <NavBar onSearch={setSearchQuery} /> 
      <Routes>
        {/* 여기는 메인 페이지에 검색어 전달해주고 */}
        <Route path="/" element={<MovieList searchQuery={searchQuery} />} /> 
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Search에 검색어 전달해주고 */}
        <Route path="/search" element={<Search searchQuery={searchQuery} />} /> 
      </Routes>
    </div>
  );
};

export default App;
