import React from 'react';
import './aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <header className="nav-header">
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#txt2img">txt2img</a></li>
            <li><a href="#img2img">img2img</a></li>
            <li><a href="#inpainting">Inpainting</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </nav>
      </header>
      
      <main>
        <h1 className="main-heading">LAD AI</h1>
        <div className="team-section">
          <div className="team-member">
            <div className="profile-circle"></div>
            <div className="info-box">
              <h2>About Us</h2>
              <p> At LAD AI, we transform ordinary images into stunning
visuals using advanced AI technology. Simply upload your
photo, and our AI enhances it into a beautiful, high-quality
masterpiece. Our goal is to make image enhancement easy
and accessible for everyone. Whether you're a designer or
just looking to improve your photos, we've got you covered.
Experience the magic of AI-powered creativity today.</p>
            </div>
          </div>
          <div className="connector"></div>
          
          
        </div>
      </main>
    </div>
  );
};

export default AboutUs;