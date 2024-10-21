import React from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.css'; // Custom styles

const Home = () => {
  const navigate = useNavigate();
  const openContactPage =() => {
    navigate('/contact');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-links">
          <li><button onClick={() => window.location.href = "#home"} className="nav-link-button">Home</button></li>
          <li><button onClick={() => window.location.href = "#txt2img"} className="nav-link-button">txt2img</button></li>
          <li><button onClick={() => window.location.href = "#img2img"} className="nav-link-button">img2img</button></li>
          <li><button onClick={() => window.location.href = "#inpainting"} className="nav-link-button">Inpainting</button></li>
          <li><button onClick={() => window.location.href = "#team"} className="nav-link-button">Team</button></li>
          <li><button onClick={() => window.location.href = "#about"} className="nav-link-button">About Us</button></li>
          <li><button onClick={() => window.location.href = "#login"} className="nav-link-button">Sign-in</button></li>
          <li><button onClick={() => window.location.href = "#help"} className="nav-link-button">Help</button></li>
          <li><button onClick={openContactPage} className="nav-link-button">Contact Us</button></li>
        </ul>
      </nav>
      <main className="main-content">
        <h1 className="main-title">LAD AI</h1>
      </main>
    </div>
  );
};

export default Home;
