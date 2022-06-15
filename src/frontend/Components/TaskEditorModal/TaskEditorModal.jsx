import { useAuth } from "../../Context/AuthContext";
import { useTask } from "../../Context/TaskContext";
import { addTask, editTask } from "../../Services/tasksServices";
import "./TaskEditorModal.css";

const TaskEditorModal = ({ setTaskEditorModal, taskData, setTaskData }) => {
  const { setTask } = useTask();
  const {
    authState: { token },
  } = useAuth();

  return (
    <div className="task-editor-container">
      <div className="task-editor">
        <h3>Add Task</h3>
        <form
          className="flex-column gap-md"
          onSubmit={(e) => {
            e.preventDefault();
            taskData._id
              ? editTask(token, taskData, setTask, setTaskData)
              : addTask(token, taskData, setTask, setTaskData);
            setTaskEditorModal(false);
          }}
        >
          <input
            type="text"
            placeholder="Title"
            className="input-container"
            value={taskData.title || ""}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />
          <textarea
            type="text"
            placeholder="Description"
            className="input-container"
            value={taskData.description || ""}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Work Duration in mins"
            className="input-container"
            value={taskData.workDuration || ""}
            onChange={(e) =>
              setTaskData({ ...taskData, workDuration: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Break Duration in mins"
            className="input-container"
            value={taskData.breakDuration || ""}
            onChange={(e) =>
              setTaskData({ ...taskData, breakDuration: e.target.value })
            }
          />
          <div className="task-editor-footer flex-row">
            <button
              className="btn btn-secondary"
              onClick={() => setTaskEditorModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              {taskData._id ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export { TaskEditorModal };
