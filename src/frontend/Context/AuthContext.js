import { createContext, useContext, useReducer } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";

const authContext = createContext();

const authToken = localStorage.getItem("token");

const AuthProvider = ({ children }) => {
  const initialAuthState = {
    userInfo: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    error: "",
    token: authToken,
  };

  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);

  return (
    <authContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
