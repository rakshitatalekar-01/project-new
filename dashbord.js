import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/tasks",
      { title },
      { headers: { Authorization: token } }
    );
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      {tasks.map(t => (
        <p key={t._id}>{t.title}</p>
      ))}
    </div>
  );
}