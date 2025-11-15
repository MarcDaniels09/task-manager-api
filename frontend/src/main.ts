const API_URL = "http://localhost:5000";

const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;

window.addEventListener("DOMContentLoaded", loadTasks);

async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach((task: any) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} (ID: ${task.id})`;
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", async () => {
  const title = taskInput.value.trim();
  if (!title) return alert("Task cannot be empty");

  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  if (res.ok) {
    taskInput.value = "";
    loadTasks();
  } else {
    alert("Failed to add task");
  }
});
