import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_EMAIL,
  USER_PASSWORD,
  USER_CONFIRM_PASSWORD,
  AUTH_TOKEN,
  AUTH_ERROR,
} from "../../Constants/AuthConstants";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import "./Auth.css";
import signupImg from "../../Assets/signupImg.svg"
import toast  from "react-hot-toast";

export const Signup = () => {
  const { authState, authDispatch } = useAuth();
  const { userInfo, error } = authState;
  const { firstName, lastName, email, password, confirmPassword } = userInfo;
  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      localStorage.setItem("token", response.data.encodedToken);
      authDispatch({
        type: AUTH_TOKEN,
        payload: response.data.encodedToken,
      });
      navigate("/login");
      toast.success("Signed up successfully")
    } catch (error) {
      authDispatch({
        type: AUTH_ERROR,
        payload: "Sign up failed",
      });
      toast.error("Sign up failed")
    }
  };
  return (
    <>
      <div className="auth-page flex-row">
        <form className="form-container" onSubmit={(e) => signUpHandler(e)}>
          <h2 className="form-title text-primary">Sign Up</h2>
          <div className="input-container">
            <label htmlFor="firstname">First Name*</label>
            <input
              required
              type="text"
              name="firstname"
              id="firstname"
              onChange={(e) =>
                authDispatch({ type: USER_FIRST_NAME, payload: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastname">Last Name*</label>
            <input
              required
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) =>
                authDispatch({ type: USER_LAST_NAME, payload: e.target.value })
              }
            />
          </div>
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
          <div className="input-container">
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
          <div className="input-container">
            <label htmlFor="password-confirm">Confirm Password*</label>
            <input
              required
              type="password"
              name="password-confirm"
              id="password-confirm"
              onChange={(e) =>
                authDispatch({
                  type: USER_CONFIRM_PASSWORD,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary btn-long">
            Create New Account
          </button>
          <p className="text-medium">
            Have an account?{" "}
            <span>
              <Link to="/login" className="text-medium text-primary">
                LogIn
              </Link>
            </span>
          </p>
          <h4 className="text-danger">{error}</h4>
        </form>
        <div className="flex-center display-none">
          <img  className="auth-img" src={signupImg} alt="signup" />
        </div>
      </div>
    </>
  );
};
