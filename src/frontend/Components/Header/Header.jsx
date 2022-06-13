import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { AUTH_TOKEN } from "../../Constants/AuthConstants";

const Header = () => {
  const { authState, authDispatch } = useAuth();
  const { token } = authState;

  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("token");
    authDispatch({
      type: AUTH_TOKEN,
      payload: null,
    });
    navigate("/");
  };
  return (
    <div>
      <header className="header-wrapper">
        <div className="margin-l-xxl">
          <Link to="/">
            <h2 className="text-primary">⏱pro-samay</h2>
          </Link>
        </div>
        <div className="header-items margin-r-xxl">
          {token ? (
            <button className="btn btn-primary" onClick={logOutHandler}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary">LogIn</button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};
export { Header };
