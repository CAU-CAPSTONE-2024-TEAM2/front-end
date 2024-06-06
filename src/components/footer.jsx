// Footer.jsx
import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>정보</h3>
          <ul>
            <li>개발진</li>
            <li>업데이트</li>
            <li>이슈 트래커</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>컨텐츠</h3>
          <ul>
            <li>프로필 배지</li>
            <li>프로필 배경</li>
            <li>코드 교환</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>커뮤니티 · 도구</h3>
          <ul>
            <li>Slack · Discord</li>
            <li>게시판</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>도움말</h3>
          <ul>
            <li>규칙</li>
            <li>고급 검색</li>
            <li>신규 배지/배경 등록 신청</li>
            <li>컨텐츠 제안</li>
            <li>이용 약관</li>
            <li>개인정보 처리방침</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Ttobaki © 2024 - . </p>
        <p>
          또박이 · Team Cx2<br />
        </p>
        <div className="footer-icons">
          <span>Icons here</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;