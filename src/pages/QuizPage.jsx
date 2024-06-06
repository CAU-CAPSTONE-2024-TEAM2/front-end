import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from '../hooks/Utils.jsx'; // utils.js에서 함수 임포트
import Loading from '../components/loading.jsx';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedQuestions = getRandomQuestions(47, 5); // 총 47개의 문제 중 5개 선택
    console.log("selected questions", selectedQuestions);
    setQuestions(selectedQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const questionId = questions[0];
      fetchQuestion(questionId, 0);
    }
  }, [questions]);

  const fetchQuestion = async (questionId, questionIndex) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/questions/${questionId}`);
      const data = await response.json();
      navigate('/quiz-audio-recorder', { state: { question: data, currentQuestionIndex: questionIndex, questions, evaluations: [] } });
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Loading question...</h1>
    </div>
  );
};

export default QuizPage;
