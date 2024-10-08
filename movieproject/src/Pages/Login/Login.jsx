import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState(''); // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [error, setError] = useState(''); // 오류 메시지 상태
  const navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = () => {
    setError(''); // 오류 메시지가 떠있었다면 초기화 해줌

    //signInWithPassword 메서드 사용해서 로그인 할 수 있게 만들고
    supabase.auth.signInWithPassword({
      email,
      password,
    })
    .then(({ data , error }) => {
      if (error) {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.'); //로그인 실패하면 에러 메세지 띄우고
      } else {
        navigate('/'); // 로그인 성공하면 메인 페이지로 이동하게 함
      }
    })
    .catch((err) => { //오류 발생하면 콘솔에 오류 찍어줌
      console.error('로그인 중 오류 발생:', err);
      setError('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
    });
  };

  // 카카오톡 소셜로그인 함수
  const handleKakaoLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
    .then(({ error }) => {
      if (error) console.error('Kakao 로그인 중 오류 발생:', error.message);
    })
    .catch((err) => {
      console.error('Kakao 로그인 중 문제가 발생했습니다:', err);
    });
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="이메일"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력했을 때 상태 업데이트
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력했을 때 상태 업데이트
        />
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
        <button className="login-button kakao-login-button" onClick={handleKakaoLogin}>
          Kakao로 로그인
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
