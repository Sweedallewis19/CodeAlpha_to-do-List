// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
});

// Create Task Element
function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.className = `task-item${completed ? " completed" : ""}`;
  
  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  // Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "✔";
  completeBtn.className = "edit-btn";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", () => {
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask !== null && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      updateLocalStorage();
    }
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateLocalStorage();
  });

  actions.append(completeBtn, editBtn, deleteBtn);
  li.append(span, actions);
  taskList.appendChild(li);
}

// Save Task to localStorage
function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage after edit/delete/complete
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(item => {
    const text = item.querySelector("span").textContent;
    const completed = item.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
