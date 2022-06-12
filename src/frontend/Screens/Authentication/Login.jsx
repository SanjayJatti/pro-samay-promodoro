import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../../Context/AuthContext";
import {
  AUTH_TOKEN,
  USER_EMAIL,
  USER_PASSWORD,
  AUTH_ERROR,
} from "../../Constants/AuthConstants";
import axios from "axios";
import loginImg from "../../Assets/loginImg.svg";

const Login = () => {
  const { authState, authDispatch } = useAuth();
  const { error } = authState;
  const { email, password } = authState.userInfo;
  const navigate = useNavigate();

  const logInHandler = async (e, emailId, userPassword) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email: emailId,
        password: userPassword,
      });
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({
        type: AUTH_TOKEN,
        payload: response.data.encodedToken,
      });
      navigate("/");
    } catch (error) {
      authDispatch({
        type: AUTH_ERROR,
        payload: "Invalid email or password",
      });
    }
  };
  return (
    <>
      <div className="auth-page flex-row">
        <form
          className="form-container"
          onSubmit={(e) => logInHandler(e, email, password)}
        >
          <h2 className="form-title text-primary">Log In</h2>
          <div className="input-container">
            <label htmlFor="email">Email*</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@xyz.com"
              onChange={(e) =>
                authDispatch({ type: USER_EMAIL, payload: e.target.value })
              }
            />
          </div>
          <div className="input-container margin-b-lg">
            <label htmlFor="password">Password*</label>
            <input
              required
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                authDispatch({ type: USER_PASSWORD, payload: e.target.value })
              }
            />
          </div>
          <div className="flex-column gap-md">
            <button type="submit" className="btn btn-primary btn-long">
              Log In
            </button>
            <button
              className="btn btn-secondary btn-long"
              onClick={(e) =>
                logInHandler(e, "sanjayjatti@gmail.com", "sanjay123")
              }
            >
              Guest Log In
            </button>
          </div>
          <p className="text-medium">Don't have an account?</p>
          <Link to="/signup" className="text-primary text-medium">
            <p className="text-medium">Create an account</p>
          </Link>
          <h4 className="text-danger">{error}</h4>
        </form>
        <div className="flex-center">
          <img className="auth-img" src={loginImg} alt="login image" />
        </div>
      </div>
    </>
  );
};

export { Login };
