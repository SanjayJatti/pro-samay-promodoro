import banner from "../../Assets/banner.svg";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="hero-wrapper">
        <div className="hero-description">
          <h1>Work Efficiently</h1>
          <h1>Do Full Focused Work</h1>
          <h1>With Periodic Breaks</h1>
          <Link to="/tasks">
            <button className="btn-action margin-t-md">
              <h2>Get Started</h2>
            </button>
          </Link>
        </div>
        <img className="banner-img" src={banner} alt="banner_img" />
      </div>
    </>
  );
};
export { Home };
