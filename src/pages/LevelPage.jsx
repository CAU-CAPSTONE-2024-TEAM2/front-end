import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import '../styles/LevelPage.css';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../hooks/Auth.jsx';
import Nav  from '../components/nav.jsx'
import Footer from '../components/footer.jsx'
ChartJS.register(ArcElement, Tooltip, Legend);


const LevelPage = () => {
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    console.log(accessToken);
    fetchLevels(accessToken);
  }, []);

  const fetchLevels = async(accessToken) => {
    try {
      console.log(`levels : ${accessToken}`);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/levels/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setLevels(data);
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching level detail:', err);
    } finally {
      setLoading(false);
    }
  }

  // const fetchLevelsTest = () => {
  //   const data = [
  //       { "id": 1, "name": "Beginner1", "accuracy": 75 },
  //       { "id": 2, "name": "Beginner2", "accuracy": 64 },
  //       { "id": 3, "name": "Beginner3", "accuracy": 37 },
  //       { "id": 4, "name": "Intermediate1", "accuracy": 11.7 },
  //       { "id": 5, "name": "Intermediate2", "accuracy": 0 },
  //       { "id": 6, "name": "Intermediate3", "accuracy": 75 },
  //       { "id": 7, "name": "Advanced1", "accuracy": 75 },
  //       { "id": 8, "name": "Advanced2", "accuracy": 75 },
  //       { "id": 9, "name": "Advanced3", "accuracy": 75 }
  //   ];
  //   setLevels(data);
  // };

  const goToLevelDetail = (id) => {
    navigate(`/level/${id}`, { state : id}); // 이동할 URL 설정
  };

  return (
    <div>
      <Nav></Nav>
      <div className="header">
          <h1>Levels</h1>
      </div>
      <div className="level-container">
      {levels.map((level) => (
          <div key={level.name} className="level-item">
          <h2>{level.name}단계</h2>
          <Doughnut
              data={{
              labels: ['progress', 'left'],
              datasets: [{
                  label: 'progress',
                  data: [level.progress, 100 - level.progress],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                  hoverBackgroundColor: ['#36A2EB', '#FF6384']
              }]
              }}
              options={{
              maintainAspectRatio: true,
              responsive: true
              }}
          />
          <button onClick={() => goToLevelDetail(level.id)}>문제 풀러 가기</button>
          </div>
      ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LevelPage;

