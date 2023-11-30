/* 
Todo:
- Anzahl der offenen Todos in Subline
- Duplicate Check: Do not allow duplicate todo descriptions (i.e. two todos with the description "Learn JavaScript"


*/

/*   REFERENCE TO SELECTORS
========================================================================== */
const todoForm = document.querySelector(".todo-form"); // complete form
const todoList = document.querySelector(".todo-list"); // dynamic list
const clearBtn = document.querySelector(".clear-btn"); // clear all button
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from local storage OR set a new array

// setting stage
if (localStorage.getItem("tasks")) {
  tasks.forEach(createTask); // create a new task for every task
}

/*    SUBMIT FORM EVENTLISTENER
========================================================================== */
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // no browser refresh after submit
  const input = todoForm.description;
  const inputValue = input.value.trim();

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(), // adding timestamp for create an id
      description: inputValue,
      isDone: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(task);
    input.value = ""; // clear input field
  }
  input.focus(); // Focus on input field
});

/*    REMOVE TASK EVENTLISTENER
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

/*    CLEAR ALL TASKS EVENTLISTENER
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

/*    CREATE SINGLE TASK FUNCTION
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
      <span class="description ${task.isDone ? "done" : ""}">${
    task.description
  }</span>
    </div>
    <button class="remove-task" title="Remove task">X</button>
  `;
  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);
}

/*    REMOVE SINGLE TASK FUNCTION
========================================================================== */
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

/*    UPDATE SINGLE TASK FUNCTION
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
