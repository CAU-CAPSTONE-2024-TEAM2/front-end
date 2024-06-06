// ProfileCard.jsx
import React from 'react';
import '../styles/profileCard.css';
import profileImg from '../img/avatar.png'
import levelImg from '../img/rank5.jpeg'
import { usernameState } from '../hooks/Auth';
import { useRecoilValue } from 'recoil';

const ProfileCard = () => {
  const username = useRecoilValue(usernameState);
  const user_id = "sehwan"
  const user_rank = "가"
  const user_rating = "0"
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
              <span>진척도</span><span className="badge">{user_rank}</span> <span>{user_rating}</span>
            </div>
            <div>
              <span>평가</span><span className="badge">C</span> <span>101</span>
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
            <p>달성 시 RATING +10</p>
          </div>
          <div className="stat comunity">
            <h3>커뮤니티</h3>
            <p>커뮤니티 바로가기</p>
          </div>
        </div>
      </div>
      <div className="profile-message">
        <p>오늘은 아직 문제를 풀지 않았어요</p>
        <a href="#!">문제 풀러 가기! &rarr;</a>
      </div>
    </div>
  );
};

export default ProfileCard;