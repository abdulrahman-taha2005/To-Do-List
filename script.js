const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");

// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  createTask(taskText);

  saveTasks();

  taskInput.value = "";
});

// Create Task Function
function createTask(taskText){

  const li = document.createElement("li");

  li.innerHTML = `
    <span>${taskText}</span>

    <div class="actions">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Complete Task
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete Task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Dark Mode
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Save Tasks
function saveTasks(){
  localStorage.setItem("tasks", taskList.innerHTML);
}

// Load Tasks
function loadTasks(){
  taskList.innerHTML = localStorage.getItem("tasks") || "";

  document.querySelectorAll(".complete-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      e.target.closest("li").classList.toggle("completed");
      saveTasks();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      e.target.closest("li").remove();
      saveTasks();
    });
  });
}

loadTasks();