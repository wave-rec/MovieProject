import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'; 
import MovieList from '../src/Pages/MovieList/MovieList'
import MovieDetail from '../src/Pages/MovieDetail/MovieDetail'
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';

const App = () => {
  return (
      <div style={{ paddingTop: '80px' }}> 
        <NavBar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
};

export default App;
