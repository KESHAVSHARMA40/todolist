// Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const toggleDark = document.getElementById("toggle-dark");
const body = document.body;

// Load theme and tasks on start
window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  loadTasks();
});

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToList(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
});

// Add task to DOM
function addTaskToList(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTask(text);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

// Remove task from localStorage
function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dark mode toggle
toggleDark.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const mode = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
  toggleDark.textContent = mode === "dark" ? "☀️" : "🌙";
});

// Load theme
function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggleDark.textContent = "☀️";
  } else {
    toggleDark.textContent = "🌙";
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const prioritySelect = document.getElementById("priority-select");
  
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const taskText = taskInput.value.trim();
      const priority = prioritySelect.value;
  
      if (taskText === "") return;
  
      const li = document.createElement("li");
      li.innerHTML = `
        ${taskText}
        <span class="priority ${priority}">${priority}</span>
        <button class="delete">✖</button>
      `;
  
      taskList.appendChild(li);
      taskInput.value = "";
      prioritySelect.value = "medium";
  
      saveTasks();
    });
  
    taskList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveTasks();
      }
    });
  
    function saveTasks() {
      localStorage.setItem("tasks", taskList.innerHTML);
    }
  
    function loadTasks() {
      taskList.innerHTML = localStorage.getItem("tasks") || "";
    }
  
    loadTasks();
  });
  
