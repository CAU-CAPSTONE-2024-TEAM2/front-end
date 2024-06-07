import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>정보</h3>
          <ul>
            <li><a href="https://github.com/CAU-CAPSTONE-2024-TEAM2">개발진</a></li>
            <li><a href="https://github.com/CAU-CAPSTONE-2024-TEAM2">업데이트</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>컨텐츠</h3>
          <ul>
            <li><a href="/levels">난이도별 문제</a></li>
            <li><a href="/levels_category">유형별 뮨제</a></li>
            <li><a href="/quiz-intro">테스트</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>커뮤니티 · 도구</h3>
          <ul>
            <li><a href="/workingpage">Slack · Discord</a></li>
            <li><a href="/workingpage">게시판</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>도움말</h3>
          <ul>
            <li><a href="https://docs.google.com/presentation/d/1WcYDpE8wwyuWD0KGvrmMXiEjzjhQUtpP/edit?usp=sharing&ouid=104138854922250448317&rtpof=true&sd=true">프로젝트에 관하여</a></li>
            <li><a href="/workingpage">컨텐츠 제안</a></li>
            <li><a href="/workingpage">이용 약관</a></li>
            <li><a href="/workingpage">개인정보 처리방침</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Ttobaki © 20240303-20240607 . </p>
        <p>
          또박이 · Team Cx2<br />
        </p>
        <div className="footer-icons">
          <span>CAU-Capstone</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
