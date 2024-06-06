import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/EvaluationPage.css'; // 스타일을 위한 CSS 파일 임포트
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';

const QuizEvaluationPage = () => {
  const location = useLocation();
  const { evaluations } = location.state;
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [totalAccuracy, setTotalAccuracy] = useState(0);

  useEffect(() => {
    const total = evaluations.reduce((sum, evaluation) => sum + evaluation.accuracy, 0);
    setTotalAccuracy(total / evaluations.length);
  }, [evaluations]);

  const toggleVisibility = (index) => {
    if (visibleIndexes.includes(index)) {
      setVisibleIndexes(visibleIndexes.filter((i) => i !== index));
    } else {
      setVisibleIndexes([...visibleIndexes, index]);
    }
  };

  return (
    <div>
      <Nav></Nav>
      <div className="evaluation-container">
        <h1>Quiz Evaluation Results</h1>
        <div>
          <h2>총 정확도: {totalAccuracy.toFixed(2)}%</h2>
          {evaluations.map((evaluation, index) => (
            <p key={index}>
              Question {index + 1}: {evaluation.chosen_pronounciation === 'A' ? '맞았음' : '틀렸음'}
            </p>
          ))}
        </div>
        {evaluations.map((evaluation, index) => {
          const {
            accuracy,
    correct_pronounciation_graph,
    chosen_pronounciation,
    answer,
    feedback,
    user_pronounciation
          } = evaluation;

          const correctGraphUrl = `${process.env.REACT_APP_API_URL}/${correct_pronounciation_graph}`;
          const userGraphUrl = `${process.env.REACT_APP_API_URL}/${user_pronounciation}`;

          const isVisible = visibleIndexes.includes(index);

          return (
            <div key={index} className="evaluation-result">
              <h2>Question {index + 1}</h2>
              <button onClick={() => toggleVisibility(index)}>
                {isVisible ? '결과 숨기기' : '결과 상세 보기'}
              </button>
              {isVisible && (
                <div className="evaluation-details">
                  <div className="graphs-container">
                    <div className="graph">
                    <h3>표준 발음 그래프 : {answer}</h3>
                      <img src={correctGraphUrl} alt="Correct Pronunciation Graph" />
                    </div>
                    <div className="graph">
                    <h3>사용자 발음 그래프 : {chosen_pronounciation}</h3>
                      <img src={userGraphUrl} alt="User Pronunciation Graph" />
                    </div>
                  </div>
                  <div className="accuracy-container">
        <h2>정확도</h2>
        <p>{accuracy.toFixed(2)}%</p>
        <h2>발음 TIP</h2>
        <h2>{feedback}</h2>
      </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default QuizEvaluationPage;
