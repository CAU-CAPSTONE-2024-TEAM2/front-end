import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AudioRecorderPage.css';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../hooks/Auth.jsx';
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';
import Loading from '../components/loading.jsx'; // 로딩 컴포넌트 임포트
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AudioRecorderPage = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0); // 타이머 상태 추가
  const [progress, setProgress] = useState(100); // 진행 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const location = useLocation();
  const leveldata = location.state;
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const navigate = useNavigate(); // useNavigate 추가

  useEffect(() => {
    const fetchMessageTest = async () => {
      if (leveldata) {
        const pageId = leveldata.id;
        const word = leveldata.word;
        console.log(leveldata);
        setMessage(word);
      }
    };

    fetchMessageTest();
  }, [leveldata]);

  const startRecording = async () => {
    console.log(accessToken);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();

      const audioChunks = [];
      recorder.ondataavailable = e => audioChunks.push(e.data);

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioBlob(audioBlob);
        console.log(audioUrl);
        console.log(audioBlob);
      };

      setRecording(true);
      setTimer(5); // 타이머를 5초로 설정
      setProgress(100); // 진행 상태 초기화
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            recorder.stop();
            setRecording(false);
            return 0;
          }
          const newTime = prevTimer - 1;
          setProgress((newTime / 5) * 100);
          return newTime;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing the microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
      setTimer(0); // 타이머 초기화
      setProgress(0); // 진행 상태 초기화
    }
  };

  const sendAudioToServer = async (audioBlob) => {
    console.log(`leveldata : ${leveldata.id}`);
    const formData = new FormData();
    formData.append('question', leveldata.id);
    formData.append('file', audioBlob, 'audio.wav');

    try {
      setLoading(true); // 요청을 보내기 전 로딩 상태로 설정
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });
      const data = await response.json();
      setLoading(false); // 응답을 받은 후 로딩 상태 해제
      if (!response.ok) throw new Error(data.message || 'Failed to upload audio');
      console.log('Audio uploaded successfully:', data);
      navigate('/evaluation', { state: { responseData: data } }); // 로딩이 끝난 후 navigate 호출
    } catch (error) {
      setLoading(false); // 에러가 발생해도 로딩 상태 해제
      console.error('Error uploading audio:', error);
    }
  };

  if (loading) {
    return <Loading />; // 로딩 상태일 때 로딩 컴포넌트를 렌더링
  }

  return (
    <div>
      <Nav></Nav>
        <div className="center-flex">
          <div>
            {message && <h2>{message}</h2>}
            {recording ? (
              <>
                <div style={{ width: 100, height: 100, margin: '20px auto' }}>
                    <CircularProgressbar
                      value={progress}
                      text={`${timer}s`}
                      styles={buildStyles({
                        pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                        textColor: '#f88',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                    />
                  </div>
                <button onClick={stopRecording}>녹음 멈추기</button>
              </>
            ) : 
              audioUrl ? (
                <button onClick={startRecording}>다시 녹음하기</button>
              ) : (
                <button onClick={startRecording}>녹음 시작하기</button>
              )
            }
            {audioUrl && !recording && (
              <>
                <audio src={audioUrl} controls />
                <button onClick={() => sendAudioToServer(audioBlob)}>녹음 제출하기</button>
              </>
            )}
          </div>
        </div>
      <Footer></Footer>
    </div>
  );
};

export default AudioRecorderPage;
