import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in!');
    }
};

return (
  <div className="wrapper">
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="input-box">
        <FaUser className="icon-user" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-box">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FaLock className="icon-lock" />
      </div>
      <button type="submit">Login</button>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register" className="white-link">Register</Link>
        </p>
      </div>
    </form>
  </div>
);
};

export default LoginForm;