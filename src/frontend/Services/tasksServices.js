import axios from "axios";
import  toast  from "react-hot-toast";

const getTasksData = async (token, setTask) => {
  try {
    const response = await axios.get("/api/habits", {
      headers: {
        authorization: token,
      },
    });
    setTask(response.data.habits);
  } catch (error) {
    console.error(error);
  }
};
const addTask = async (token, taskData, setTask, setTaskData) => {
  try {
    const response = await axios.post(
      "/api/habits",
      {
        habit: taskData,
      },

      {
        headers: {
          authorization: token,
        },
      }
    );
    setTask(response.data.habits);
    toast.success("Created new task")
  } catch (error) {
    toast.error("Unable to create new task")
  }
  setTaskData("");
};

const editTask = async (token, taskData, setTask, setTaskData) => {
  try {
    const response = await axios.post(
      `/api/habits/${taskData._id}`,
      {
        habit: taskData,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    setTask(response.data.habits);
    toast.success("Edited the given task")
  } catch (error) {
    toast.error("Failed to edit the task")
  }
  setTaskData("");
};
const deleteTask = async (token, taskItem, setTask) => {
  try {
    const response = await axios.delete(`/api/habits/${taskItem._id}`, {
      headers: {
        authorization: token,
      },
    });
    setTask(response.data.habits);
    toast.success("Task deleted")
  } catch (error) {
    toast.error("Failed to delete the task")
  }
};

export { getTasksData, addTask, editTask, deleteTask };
