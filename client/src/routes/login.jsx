import { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in!');
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaUser className="icon-user" />
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
            Don&apos;t have an account? <Link to="/register" className="white-link">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};


LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;