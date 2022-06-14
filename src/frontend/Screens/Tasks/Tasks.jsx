import { useState } from "react";
import { TaskEditorModal } from "../../Components/TaskEditorModal/TaskEditorModal";
import { useAuth } from "../../Context/AuthContext";
import { useTask } from "../../Context/TaskContext";
import { deleteTask, editTask } from "../../Services/tasksServices";
import "./Tasks.css";
const Tasks = () => {
  const [taskEditorModal, setTaskEditorModal] = useState(false);
  const { task, setTask } = useTask();
  const { authState } = useAuth();
  const { token, userInfo } = authState;
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    duration: "",
    isDone: false,
  });
  return (
    <>
      {taskEditorModal && (
        <TaskEditorModal
          setTaskEditorModal={setTaskEditorModal}
          taskData={taskData}
          setTaskData={setTaskData}
        />
      )}
      <div className="tasks-wrapper">
        <div className="tasks-description">
          <h2>
            Welcome, {userInfo.firstName ? userInfo.firstName : "Sanjay"}!
          </h2>
          <h2>You have {task.length} tasks today. All the best!!</h2>
        </div>
        <div className="tasks-box">
          <div className="tasks-title">
            <h3>To-Do List</h3>
            <button
              className="add-tasks-btn flex-center"
              title="Add Task"
              onClick={() => setTaskEditorModal(true)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
          {task.length !== 0 &&
            task.map((taskItem, index) => {
              return (
                <div key={index} className="tasks-list flex-row margin-t-md">
                  <div className="tasks-info flex-row">
                    <input
                      type="checkbox"
                      className="margin-r-xs"
                      checked={taskItem.isDone}
                      onChange={() => {
                        taskItem.isDone = !taskItem.isDone;
                        editTask(token, taskItem, setTask, setTaskData);
                      }}
                    />
                    <h3 className={taskItem.isDone ? "line-through" : ""}>{taskItem.title}</h3>
                  </div>

                  <div className="task-actions">
                    <i
                      className="fas fa-clock cursor-pointer"
                      title="Promodoro"
                    ></i>
                    <i
                      className="fas fa-edit cursor-pointer"
                      title="Edit task"
                      onClick={() => {
                        setTaskData(taskItem);
                        setTaskEditorModal(true);
                      }}
                    ></i>
                    <i
                      className="fas fa-trash-alt cursor-pointer"
                      title="Delete Task"
                      onClick={() =>
                        deleteTask(token, taskItem, setTask, setTaskData)
                      }
                    ></i>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export { Tasks };
