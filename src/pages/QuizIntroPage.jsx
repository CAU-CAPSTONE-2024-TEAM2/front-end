import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';
import '../styles/QuizIntroPage.css'; // 스타일을 위한 CSS 파일 임포트

const QuizIntroPage = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div>
      <Nav></Nav>
      <div className="quiz-intro-container">
        <h1>퀴즈 소개</h1>
        <p>테스트는 총 5문항으로 구성되어 있습니다.</p>
        <button onClick={startQuiz}>퀴즈 응시하기</button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default QuizIntroPage;
