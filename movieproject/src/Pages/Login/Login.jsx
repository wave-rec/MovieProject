import React from 'react';
import '../Login/Login.css'

const Login = () => {
  //로그인 버튼 클릭시에 로그인 기능 구현하려면 필요 현재는 껍데기만 있음
  const handleLogin = () => { 
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <div className="login-form">
        <input type="text" placeholder="이메일 또는 아이디" className="login-input" />
        <input type="password" placeholder="비밀번호" className="login-input" />
        <button className="login-button" onClick={handleLogin}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
