import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const NavBar = () => {
  const navigate = useNavigate();
  const navBarHeight = '60px'; //NavBar 높이 설정해서 화면 가리지 않게

  const handleLogoClick = () => { //로고 클릭하면 메인화면 (MovieList로 이동)
    navigate('/');
  };

  const handleSignUpClick = () => { //회원가입 클릭하면 회원가입으로 이동
    navigate('/signup');
  };

  const handleLoginClick = () => { //로그인 클릭하면 로그인으로 이동
    navigate('/login'); 
  };

  return ( // 여기도 NavBar 크기 설정해줘서 겹치지 않게 해주기
    <div className="navbar" style={{ height: navBarHeight }}> 
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer', fontSize: '2em' }}>
        🦊🎞️
      </div>
      <div className="auth-buttons">
        <button className="signup-btn" onClick={handleSignUpClick}>회원가입</button>
        <button className="login-btn" onClick={handleLoginClick}>로그인</button>
      </div>
    </div>
  );
};

export default NavBar;
