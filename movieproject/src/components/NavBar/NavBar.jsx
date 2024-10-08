import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { supabase } from '../../supabaseClient';
import './NavBar.css';

const NavBar = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // 검색어 상태 관리
  const debouncedQuery = useDebounce(query, 500); // 지연된 검색어
  const [user, setUser] = useState(null); // 로그인된 사용자 정보 상태
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 메뉴 표시 여부
  const navigate = useNavigate();


  const fetchUser = () => {
    //supabase에서 auth.getUser를 사용해서 로그인 한 사용자의 정보를 받아옴
    supabase.auth.getUser()
      .then(({ data, error }) => {
        //입력된 data가 있으면 user data로 상태를 업데이트하고
        if (data) setUser(data.user);
        //error가 발생하면 콘솔에 에러 메세지를 띄움
        if (error) console.error('사용자 정보를 가져오는 중 오류 발생:', error);
      });
  };

  //컴포넌트 마운트 할 때 처음만 작동하는 useEffect 함수고,
  useEffect(() => {
    fetchUser(); // 처음 렌더링될 때 fetchUser 함수로 로그인 상태인지 확인함 

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      //onAuthStateChange 로 로그인/로그아웃 상태 변화 감지함 변경이 있으면 setUser에 상태를 업데이트 해주고 변경 없으면 null로 설정해줌 , session의 변화를 반영해주는 것
      setUser(session?.user || null); 
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // 검색어가 변경될 때마다 onSearch 함수를 호출하고
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  //요기서 변경된 검색어를 업데이트 해주고
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };
  
  //입력된 검색어가 있으면 검색된 영화 페이지로 이동할 수 있게
  const handleSearchSubmit = () => {
    if (debouncedQuery.trim() !== '') {
      navigate(`/search?query=${debouncedQuery}`);
    }
  };
  
  //검색창에 입력어가 있어도 로고를 누르면 다시 메인화면으로 돌아갈 수 있게 함
  const handleLogoClick = () => {
    setQuery('');
    onSearch('');
    navigate('/');
  };

  // signOut 사용해서 로그아웃 하게 하고 오류 뜨면 에러 메세지 출력하고 
  const handleLogout = () => {
    supabase.auth.signOut()
      .then(({ error }) => {
        if (error) {
          console.error('로그아웃 중 오류 발생:', error);
        } else {
          //로그아웃 했으니까 사용자 정보는 null로, 드롭다운 메뉴는 안 보이게, 메인 페이지로 이동되게
          setUser(null);
          setShowDropdown(false);
          navigate('/');
        }
      });
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
        {user ? (
          <div className="user-profile" onMouseLeave={() => setShowDropdown(false)}>
            <img
              src={user.user_metadata?.avatar_url || '/default-avatar.png'} // 프로필 이미지가 없는 경우에는 퍼블릭에 저장해놓은 이미지를 사용하게 하고
              alt="User Avatar"
              className="profile-thumbnail"
              onClick={() => setShowDropdown((prev) => !prev)}
              onError={(e) => (e.target.src = '/default-avatar.png')} // 이미지 로딩에 실패하면 이 때도 기본 프로필 이미지로 대체
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="signup-btn" onClick={() => navigate('/signup')}>
              회원가입
            </button>
            <button className="login-btn" onClick={() => navigate('/login')}>
              로그인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
