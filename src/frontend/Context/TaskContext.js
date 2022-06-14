
import { createContext, useContext, useEffect, useState } from "react";
import { getTasksData } from "../Services/tasksServices";
import { useAuth } from "./AuthContext";

const taskContext = createContext();

const TaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);
  const { authState } = useAuth();
  const { token } = authState;

  useEffect(()=>{
    if(token){
       getTasksData(token,setTask)
    }
  }, [token])

  return (
    <taskContext.Provider value={{ task, setTask }}>
      {children}
    </taskContext.Provider>
  );
};
const useTask = () => useContext(taskContext);
export { TaskProvider, useTask };