import React, { useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleAddTask = () => {
    if (task) {
      setTaskList([...taskList, { id: Date.now(), name: task, completed: false }]);
      setTask("");
    }
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = taskList.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTaskList(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = taskList.filter(t => t.id !== id);
    setTaskList(updatedTasks);
  };

  const filteredTasks = taskList.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; 
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(task.id)}
            />
            <span>{task.name}</span>
            <div className="task-buttons">
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
