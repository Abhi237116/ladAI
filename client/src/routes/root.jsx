import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link-button">
              <img src="/logo.png" width='30px' />
            </Link>
          </li>
          <li>
            <Link to="/txt2img" className="nav-link-button">
              txt2img
            </Link>
          </li>
          <li>
            <Link to="/img2img" className="nav-link-button">
              img2img
            </Link>
          </li>
          <li>
            <Link to="/upscale" className="nav-link-button">
              Upscale
            </Link>
          </li>
          <li>
            <Link to="/grayscale" className="nav-link-button">
              Grayscale
            </Link>
          </li>
          <li>
            <Link to="/team" className="nav-link-button">
              Team
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link-button">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link-button">
              Sign-in
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav-link-button">
              Help
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link-button">
              Contact Us
            </Link>
          </li>
          
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default App;
