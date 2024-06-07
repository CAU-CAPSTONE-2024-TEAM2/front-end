import React, { useEffect, useState } from 'react';
import '../styles/profileCard.css';
import profileImg from '../img/avatar.png';
import levelImg from '../img/rank5.jpeg';
import { useRecoilValue } from 'recoil';
import { usernameState, accessTokenState } from '../hooks/Auth';
import { useNavigate } from 'react-router-dom';
const ProfileCard = () => {
  const username = useRecoilValue(usernameState);
  const accessToken = useRecoilValue(accessTokenState);
  const [userSolved, setUserSolved] = useState(0);
  const [badgeLevel, setBadgeLevel] = useState('가'); // 배지 레벨 상태 추가
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // getLevel 함수 정의
  const getLevel = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/solved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const solvedData = await response.json();
      console.log(solvedData);
      if (response.ok) {
        console.log('Data fetch successful:', solvedData);
        setUserSolved(solvedData.solved);
        determineBadgeLevel(solvedData.solved);
      } else {
        throw new Error(solvedData.message || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'An unexpected error occurred.');
    }
  }

  // 문제 해결 수에 따라 배지 레벨을 결정하는 함수
  const determineBadgeLevel = (solvedCount) => {
    if (solvedCount < 5) {
      setBadgeLevel('가');
    } else if (solvedCount < 10) {
      setBadgeLevel('나');
    } else if (solvedCount < 15) {
      setBadgeLevel('다');
    } else {
      setBadgeLevel('라');
    }
  }

  useEffect(() => {
    getLevel(); // 컴포넌트가 마운트될 때 getLevel 호출
  }, []);

  const newProb = () => {
    navigate('/quiz-intro'); // 퀴즈 소개 페이지로 이동
  }

  return (
    <div className="profile-card">
      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={profileImg} alt="User Avatar" />
          </div>
          <div className="profile-details">
            <h2>{username}</h2>
            <div>
              <span>진척도</span>
              <span className="badge">{badgeLevel}</span> {userSolved * 100}
            </div>
            <div>
              <span>랭킹</span><span className="badge">C</span> <span>0</span>
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat streak">
            <h3>나의 레벨</h3>
            <img className="levelImg" src={levelImg} alt="level_img"></img>
          </div>
          <div className="stat class">
            <h3>오늘의 문제</h3>
            <button className="quiz-button" onClick={newProb}>퀴즈 응시하기</button>
            <p>달성 시 RATING +10</p>
          </div>
          <div className="stat comunity">
            <h3>커뮤니티</h3>
            <p>커뮤니티 바로가기</p>
          </div>
        </div>
      </div>
      <div className="profile-message">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p>해결한 문제 수: {userSolved}</p>
        )}
        <a href="/levels">문제 풀러 가기! &rarr;</a>
      </div>
    </div>
  );
};

export default ProfileCard;
