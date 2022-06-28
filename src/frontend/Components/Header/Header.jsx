import "./Header.css";
import {Link, NavLink, useNavigate } from "react-router-dom";
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
        <div className="flex-center header-title">
          <Link to="/">
            <h2 className="text-primary"><span className="margin-r-xs">⏱</span>pro-samay</h2>
          </Link>
        </div>
        <div className="flex-center gap-xl margin-r-xxl">
          <NavLink to="/tasks">
            <h4 className="text-secondary">Tasks</h4>
          </NavLink>
          <NavLink to="/promodoro">
            <h4 className="text-secondary">Promodoro</h4>
          </NavLink>
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
