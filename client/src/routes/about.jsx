import './about.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
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
                and accessible for everyone. Whether you&apos;re a designer or
                just looking to improve your photos, we&apos;ve got you covered.
                Experience the magic of AI-powered creativity today.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;