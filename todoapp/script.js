/* 
Todo:
- Erstes Testelement einfügen
- Anzahl der offenen Todos
*/

/*   REFERENCE TO SELECTORS
========================================================================== */
const todoForm = document.querySelector(".todo-form"); // Form
const todoList = document.querySelector(".todo-list"); // dynamic List
const clearBtn = document.querySelector(".clear-btn"); // clear all
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

/*    SUBMIT FORM
========================================================================== */
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = todoForm.description;
  const inputValue = input.value.trim();

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(),
      description: inputValue,
      isDone: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    todoForm.reset();
  }
  input.focus();
});

/*    REMOVE TASK Eventlistener
========================================================================== */
todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task")
  ) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

/*    DELETE ALL TASKS
========================================================================== */
clearBtn.addEventListener("click", (e) => {
  todoList.innerHTML = "";
  tasks = [];
  localStorage.removeItem("tasks");
});

// update task - change status or name
todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;
  updateTask(taskId, e.target);
});

/*    CREATE TASK FUNCTION 
========================================================================== */
function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);
  taskEl.classList.add("task-item");

  const taskElMarkup = `
  <div class="checkbox-wrapper">
    <input type="checkbox" id="${task.description}" name="tasks" ${
    task.isDone ? "checked" : ""
  }>
    <label for="${task.description}"></label>
    <span class="description">${task.description}</span>
  </div>
  <button class="remove-task" title="Remove task">X</button>
  `;
  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);
}

/*    REMOVE TASK FUNCTION
========================================================================== */
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

/*    UPDATE TASK FUNCTION
========================================================================== */
function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));
  const span = el.nextElementSibling.nextElementSibling;
  task.isDone = !task.isDone;
  if (task.isDone) {
    el.setAttribute("checked", "");
  } else {
    el.removeAttribute("checked");
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
