import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./frontend/Context/AuthContext";
import { TaskProvider } from "./frontend/Context/TaskContext";
import { PromodoroProvider } from "./frontend/Context/PromodoroContext";

// Call make Server
makeServer();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <PromodoroProvider>
            <App />
          </PromodoroProvider>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
