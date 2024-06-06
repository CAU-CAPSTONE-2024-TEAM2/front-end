import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import LevelPage from './pages/LevelPage';
import LevelPageCategory from './pages/LevelPageCategory';
import LevelDetailPage from './pages/LevelDetailPage';
import AudioTest from './pages/AudioRecorderPage';
import PrivateRoute from './PrivateRoute';
import EvaluationPage from './pages/EvaluationPage';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import QuizAudioRecorderPage from './pages/QuizAudioRecordingPage';
import QuizEvaluationPage from './pages/QuizEvaluationPage';
import QuizIntroPage from './pages/QuizIntroPage';
import LevelCategoryPage from './pages/LevelCategoryPage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/levels" element={<PrivateRoute><LevelPage /></PrivateRoute>} />
          <Route path="/level/:id" element={<PrivateRoute><LevelDetailPage /></PrivateRoute>} />
          <Route path="/audiotest/*" element={<PrivateRoute><AudioTest /></PrivateRoute>} />
          <Route path="/levels_category" element={<PrivateRoute><LevelPageCategory /></PrivateRoute>} />
          <Route path="/evaluation" element={<PrivateRoute><EvaluationPage /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><QuizPage/></PrivateRoute>} />
          <Route path="/quiz-audio-recorder" element={<PrivateRoute><QuizAudioRecorderPage /></PrivateRoute>} />
          <Route path="/quiz-evaluation" element={<PrivateRoute><QuizEvaluationPage /></PrivateRoute>} />
          <Route path="/quiz-intro" element={<PrivateRoute><QuizIntroPage /></PrivateRoute>} />
          <Route path="/grammer_class/:id" element={<PrivateRoute><LevelCategoryPage /></PrivateRoute>} />
          {/* 
          <Route path="/유형별" element={<유형별 />} />
          <Route path="/테스트" element={<테스트 />} />
          <Route path="/랭킹" element={<랭킹 />} /> </PrivateRoute>
</PrivateRoute>
</PrivateRoute>*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;