import { useState } from "react";
import "./App.css";

function App() {
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState("");
const [priority, setPriority] = useState("medium");

const addTask = () => {
if (input.trim() === "") return;

const newTask = {
  id: Date.now(),
  text: input,
  status: "todo",
  priority: priority,
};

setTasks([...tasks, newTask]);
setInput("");

};

const deleteTask = (id) => {
setTasks(tasks.filter((task) => task.id !== id));
};

const moveTask = (id, newStatus) => {
setTasks(
tasks.map((task) =>
task.id === id ? { ...task, status: newStatus } : task
)
);
};

return ( <div className="container"> <h1>Kanban Board</h1>

  <div className="input-section">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter task..."
    />

    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>

    <button onClick={addTask}>Add</button>
  </div>

  <div className="board">
    {["todo", "inprogress", "done"].map((status) => (
      <div key={status} className="column">
        <h2>{status}</h2>

        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <div
              key={task.id}
              className="card"
              style={{
                borderLeft:
                  task.priority === "high"
                    ? "5px solid red"
                    : task.priority === "medium"
                    ? "5px solid orange"
                    : "5px solid green",
              }}
            >
              <p>{task.text}</p>
              <button onClick={() => deleteTask(task.id)}>X</button>
              <button
                onClick={() =>
                  moveTask(
                    task.id,
                    status === "todo"
                      ? "inprogress"
                      : status === "inprogress"
                      ? "done"
                      : "todo"
                  )
                }
              >
                Move
              </button>
            </div>
          ))}
      </div>
    ))}
  </div>
</div>

);
}

export default App;
