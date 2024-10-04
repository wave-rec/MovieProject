import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import MovieList from './Pages/MovieList';
import MovieDetail from './Pages/MovieDetail';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

const App = () => {
  return (
    <Router>
      <div style={{ paddingTop: '80px' }}> 
        <NavBar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
