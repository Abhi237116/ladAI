import React from 'react';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: '10px', // Rounded corners for a more attractive look
  },
  mainHeading: {
    fontSize: '2.5em',
    color: '#333', // Darker color for better contrast
    marginBottom: '20px',
    textDecoration: 'underline', 
  },
  list: {
    listStyleType: 'none', // Remove default list styling
    padding: '0',
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none', // Remove underline from links
    color: '#007bff', // Attractive blue color for links
    fontWeight: 'bold',
    transition: 'color 0.3s', // Smooth color transition
  },
  linkHover: {
    color: '#0056b3', // Darker blue on hover
  },
  section: {
    marginTop: '20px',
  },
  subHeading: {
    fontSize: '2em',
    color: '#444', // Slightly lighter color than the main heading
    marginBottom: '10px',
    textDecoration: 'underline', 
  },
  paragraph: {
    fontSize: '1.2em',
    color: '#555', // Medium gray color for the text
    lineHeight: '1.5',
  },
};

const HelpPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainHeading}>Help Page</h1>
      <p>Welcome to the help page! Click on the links below to learn more about each tool:</p>
      <ul style={styles.list}>
        <li style={styles.listItem}><a href="#txt2img" style={styles.link}>Text to Image</a></li>
        <li style={styles.listItem}><a href="#img2img" style={styles.link}>Image to Image</a></li>
        <li style={styles.listItem}><a href="#inpainting" style={styles.link}>Inpainting</a></li>
        <li style={styles.listItem}><a href="#imageEnhancer" style={styles.link}>Image Enhancer</a></li>
        <li style={styles.listItem}><a href="#grayscaleImage" style={styles.link}>Grayscale Image</a></li>
      </ul>

      <section id="txt2img" style={styles.section}>
        <h2 style={styles.subHeading}>Text to Image</h2>
        <p style={styles.paragraph}>
          The Text to Image tool allows you to generate images based on text descriptions. This tool is great for
          creating visual representations of your ideas.
        </p>
      </section>

      <section id="img2img" style={styles.section}>
        <h2 style={styles.subHeading}>Image to Image</h2>
        <p style={styles.paragraph}>
          The Image to Image tool enables you to transform one image into another. This is useful for style transfer,
          image enhancement, and more.
        </p>
      </section>

      <section id="inpainting" style={styles.section}>
        <h2 style={styles.subHeading}>Inpainting</h2>
        <p style={styles.paragraph}>
          The Inpainting tool allows you to fill in missing parts of an image or remove unwanted objects. It is perfect
          for photo restoration and editing.
        </p>
      </section>

      <section id="imageEnhancer" style={styles.section}>
        <h2 style={styles.subHeading}>Image Enhancer</h2>
        <p style={styles.paragraph}>
          The Image Enhancer tool helps improve the quality of your images by adjusting brightness, contrast, and other
          parameters.
        </p>
      </section>

      <section id="grayscaleImage" style={styles.section}>
        <h2 style={styles.subHeading}>Grayscale Image</h2>
        <p style={styles.paragraph}>
          The Grayscale Image tool converts your color images into grayscale, which can be useful for various artistic
          and technical purposes.
        </p>
      </section>
    </div>
  );
};

export default HelpPage;
