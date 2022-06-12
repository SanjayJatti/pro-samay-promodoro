import { Route, Routes } from "react-router-dom";
import { Tasks } from "../Screens/Tasks/Tasks";
import { Login } from "../Screens/Authentication/Login";
import { Signup } from "../Screens/Authentication/Signup";
import { Home } from "../Screens/Home/Home";
import { PrivateRoute } from "../Components/PrivateRoute/PrivateRoute";

const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};
export { PageRoutes };
