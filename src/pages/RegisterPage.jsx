import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css'; // 스타일을 위한 CSS 파일
import Nav from '../components/nav.jsx';
import Footer from '../components/footer.jsx';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (password1 !== password2) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/auth/registration/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password1,
          password2,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        throw new Error(data.detail || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An unexpected error occurred.');
    }

    setLoading(false);
  };

  return (
    <div>
        <Nav></Nav>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default RegisterPage;
