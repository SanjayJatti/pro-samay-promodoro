import "./Tasks.css";
const Tasks = () => {
  return (
    <div className="tasks-wrapper">
      <div className="tasks-description">
        <h2>Welcome, Sanjay!</h2>
        <h2>You have 0 tasks today. All the best!!</h2>
      </div>
      <div className="tasks-box">
        <div className="tasks-title">
          <h3>To-Do List</h3>
          <button className="add-tasks-btn flex-center" title="Add Task">
          <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export { Tasks };
