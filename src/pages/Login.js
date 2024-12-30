import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/login', { email, password }); // Replace with your backend login endpoint
      console.log(response.data);
      localStorage.setItem('authToken', response.data.token);
      navigate('/seat-booking'); // Redirect to seat booking page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Backend error message
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth">
      <h2 className='auth-container-text'>Login</h2>
      {error && <p className="error">{error}</p>}
      <form className="auth-form" onSubmit={handleLogin}>
        <input
        className='auth-input'
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
        className='auth-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button className="auth-button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
