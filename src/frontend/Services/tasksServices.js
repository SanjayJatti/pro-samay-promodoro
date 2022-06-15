import axios from "axios";

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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export { getTasksData, addTask, editTask, deleteTask };
