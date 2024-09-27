import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { task, priority, deadline, completed: false }]);
      setTask('');
      setDeadline('');
      setPriority('low');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <video autoPlay loop muted id="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
        Ayaw gumana ng vid sa browser mo, gomen.
      </video>

      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <div className="input-subsection">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span>{task.task}</span>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <span className="deadline">
              {task.deadline ? `Due: ${task.deadline}` : 'No deadline'}
            </span>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul> 
    </div>
  );
}

export default App;
