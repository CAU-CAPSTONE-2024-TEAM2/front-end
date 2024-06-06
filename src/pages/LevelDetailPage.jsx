import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Nav  from '../components/nav.jsx'
import Footer from '../components/footer.jsx'
import emptystar from '../img/empty_star.png'
import coloredstar from '../img/colored_star.png'
import { accessTokenState } from '../hooks/Auth.jsx';
import { useRecoilValue } from 'recoil';

const LevelDetailPage = () => {
  const { id } = useParams();  // URL로부터 id 추출
  const [levelDetail, setLevelDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용
  const level = useLocation();
  const accessToken = useRecoilValue(accessTokenState);

  useEffect(() => {
    const fetchLevelDetail = async () => {
      try {
        console.log(level.state);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/questions/?level=${level.state}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setLevelDetail(data);
        } else {
          throw new Error(data.message || 'Something went wrong');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching level detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelDetail();
  }, [level, id]);  // 의존성 배열에 id를 포함하여 id가 변경될 때마다 데이터를 다시 불러옴

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const goToLevelDetail = (id, word) => {
    navigate(`/audiotest/${id}`, {state : { id: id, word: word }}); // 이동할 URL 설정
  };

  const renderStars = (accuracy) => {
    if (accuracy<25) {
      return (
        <div>
          <img className="star" alt="" src={emptystar}></img>
          <img className="star" alt="" src={emptystar}></img>
          <img className="star" alt="" src={emptystar}></img>
        </div>);
    } else if(accuracy<50){
      return (
        <div>
          <img className="star" alt="" src={emptystar}></img>
          <img className="star" alt="" src={emptystar}></img>
          <img className="star" alt="" src={coloredstar}></img>
        </div>);
    }else if(accuracy<75){
      return (
        <div>
          <img className="star" alt="" src={emptystar}></img>
          <img className="star" alt="" src={coloredstar}></img>
          <img className="star" alt="" src={coloredstar}></img>
        </div>);
    }else{
      return (
        <div>
          <img className="star" alt="" src={coloredstar}></img>
          <img className="star" alt="" src={coloredstar}></img>
          <img className="star" alt="" src={coloredstar}></img>
        </div>);}
  };
  return (
    <div>
      <Nav></Nav>
      <div className="level-name">
      <h1>Level Details</h1>
      </div>
      <div className="level-container">
        {levelDetail.map((level) => (
            <div key={level.id} className="level-item">
            <h2>Level {level.level}: {level.word}</h2>
            <button onClick={() => goToLevelDetail(level.id, level.word)}>문제 바로 풀러 가기!</button>
            {renderStars(level.accuracy)}
            </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LevelDetailPage;
