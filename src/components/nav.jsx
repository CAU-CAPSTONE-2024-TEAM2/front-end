import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/nav.css';
import { useRecoilValue } from "recoil";
import logoImg from '../img/logo.png';
import { accessTokenState } from '../hooks/Auth';
import useLogout from '../hooks/useLogout';

const Nav = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accessToken = useRecoilValue(accessTokenState);
  const logout = useLogout();

  useEffect(() => {
    console.log('App component: Access token:', accessToken);
    if (accessToken) setIsLoggedIn(true);
    else setIsLoggedIn(false); // 로그아웃 후 상태를 업데이트
    console.log(isLoggedIn);
  }, [accessToken]);

  return (
    <div className="header">
      <div className="header-left">
        <div className="logo">
          <img onClick={() => navigate('/main')} src={logoImg} alt="ttobaki logo" />
        </div>
        <nav className="nav">
          <a onClick={() => navigate('/main')}>또박이</a>
          <a onClick={() => navigate('/levels')}>난이도별 문제</a>
          <a onClick={() => navigate('/levels_category')}>유형별 문제</a>
          <a onClick={() => navigate('/quiz-intro')}>테스트</a>
          <a onClick={() => navigate('/랭킹')}>랭킹</a>
        </nav>
      </div>
      <div className="header-right">
        </div>
        {!isLoggedIn && (
          <div>
            <a className="login-button" onClick={() => navigate('/login')}>로그인</a>
            <a className="login-button" onClick={() => navigate('/register')}>회원가입</a>
          </div>
        )}
        {isLoggedIn && (
          <a className="login-button" onClick={() => { logout(); navigate('/main'); }}>로그아웃</a>
        )}
    </div>
  );
};

export default Nav;
