import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api/axios";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const response = await api.get("/api/todo");
      if (response.status === 200) {
        setTasks(response.data.tasks || []);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to load tasks");
      alert("Error loading tasks.");
    }
  }

  async function addTask() {
    if (taskInput.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    try {
      // const response = await api.post("/api/todo", { task: taskInput });
      // if (response.status === 201) {
        setTasks([...tasks, taskInput]); // Update UI
        setTaskInput("");
      // }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  }

  async function removeTask(index) {
    try {
     // await api.delete(`/api/todo/${index}`); // Assuming tasks have IDs
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">To-Do List</h2>

      {/* Input Field */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item text-center text-muted">No tasks available.</li>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {task}
              <button className="btn btn-danger btn-sm" onClick={() => removeTask(index)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
