import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <header className="header-wrapper">
        <div className="margin-l-xxl">
          <Link to="/">
            <h2 className="text-primary">⏱pro-samay</h2>
          </Link>
        </div>
        <div className="header-items margin-r-xxl">
          <button className="btn btn-primary">LogIn</button>
        </div>
      </header>
    </div>
  );
};
export { Header };
