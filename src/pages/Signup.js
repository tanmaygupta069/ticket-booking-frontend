import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8081/signup', { email, password ,username}); // Replace with your backend signup endpoint
      console.log(response);
      setSuccess(response.data.message || 'Signup successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (err) {
        console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Backend error message
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth">
      <h2 className='auth-container-text'>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form className='auth-form' onSubmit={handleSignup}>
      <input
      className='auth-input'
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
        className='auth-input'
          type="email"
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
        <button className="auth-button" type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default Signup;
