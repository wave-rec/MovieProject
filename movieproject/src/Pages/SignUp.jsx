// Signup.jsx
import React from 'react';
import '../Pages/SignUp.css'

const Signup = () => {
  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form">
        <input type="text" placeholder="이름" className="signup-input" />
        <input type="email" placeholder="이메일" className="signup-input" />
        <input type="password" placeholder="비밀번호" className="signup-input" />
        <input type="password" placeholder="비밀번호 확인" className="signup-input" />
        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
