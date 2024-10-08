import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; 
import './Signup.css';
const Signup = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  // 회원가입 함수임
  const handleSignup = () => {
    //다 입력 했는지 확인
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    //비번 일치하는지 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    //유효한 이메일 주소인지 확인
    if (!email.includes('@')) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // Supabase에 회원가입 요청
    supabase.auth.signUp({ email, password })
      .then(({ error }) => {
        if (error) {
          setError(`회원가입 중 오류 발생: ${error.message}`);
        } else {
          setError('');
          setSuccess('회원가입이 성공적으로 완료되었습니다. 이메일을 확인해주세요.');
        }
      })
      .catch((error) => {
        setError(`회원가입 중 오류 발생: ${error.message}`);
      });
  };

  // 카카오톡 회원가입 처리 함수 (소셜 로그인 탭으로 이동하게)
  const handleKakaoSignup = () => {
    supabase.auth.signInWithOAuth({
      provider: 'kakao',
    }).catch((error) => {
      setError(`카카오톡 회원가입 중 오류 발생: ${error.message}`);
    });
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {error && <p className="error-message">{error}</p>} 
      {success && <p className="success-message">{success}</p>} 
      <form className="signup-form">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
        />
        <button type="button" className="signup-button" onClick={handleSignup}>
          회원가입
        </button>
        <button type="button" className="signup-button kakao-signup-button" onClick={handleKakaoSignup}>
          카카오톡으로 회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
