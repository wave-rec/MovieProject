import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Router import 제거
import MovieList from './Pages/MovieList';
import MovieDetail from './Pages/MovieDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default App;
