import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/EvaluationPage.css'; // 스타일을 위한 CSS 파일 임포트
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';

const Evaluation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { responseData } = location.state;

  const {
    accuracy,
    correct_pronounciation_graph,
    chosen_pronounciation,
    answer,
    feedback,
    user_pronounciation,
  } = responseData;

  // 이미지 URL이 상대경로일 경우, 절대 경로로 변환합니다.
  const correctGraphUrl = `${process.env.REACT_APP_API_URL}/${correct_pronounciation_graph}`;
  const userGraphUrl = `${process.env.REACT_APP_API_URL}/${user_pronounciation}`;

  return (
    <div>
      <Nav></Nav>
      <div className="evaluation-container">
        <h1>발음 분석 결과</h1>
        <div className="graphs-container">
          <div className="graph">
            <h2>표준 발음 그래프 : {answer}</h2>
            <img src={correctGraphUrl} alt="Correct Pronunciation Graph" />
          </div>
          <div className="graph">
            <h2>사용자 발음 그래프 : {chosen_pronounciation}</h2>
            <img src={userGraphUrl} alt="User Pronunciation Graph" />
          </div>
        </div>
        <div className="accuracy-container">
          <h2>정확도</h2>
          <p>{accuracy.toFixed(2)}%</p>
          <h2>발음 TIP</h2>
          <h2>{feedback}</h2>
        </div>
        <button onClick={() => navigate(-1)} className="navigate-button">다시 도전하기</button>
        <button onClick={() => navigate(-2)} className="navigate-button">다른 문제 풀기</button>
        
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Evaluation;
