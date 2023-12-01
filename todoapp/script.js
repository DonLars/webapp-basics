/* 
TODOS:

- First Todo in start view // { id: 1701371729310, description: "My first task 😜", isDone: false },
- Add Filtering
- Duplicate Check: Do not allow duplicate todo descriptions (i.e. two todos with the description "Learn JavaScript"
- My Bonus: Count open Todos
*/

/*   REFERENCE TO SELECTORS
========================================================================== */
const todoForm = document.querySelector(".todo-form"); // reference to complete form
const todoList = document.querySelector(".todo-list"); // reference to dynamic list
const clearBtn = document.querySelector(".clear-btn"); // reference to clear all button
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from local storage OR set a new array

// Setting stage - displaying existing tasks from local storage
if (localStorage.getItem("tasks")) {
  tasks.forEach(displayTask); // create a new task for every task
}

/*    SUBMIT FORM EVENTLISTENER
========================================================================== */
todoForm.addEventListener("submit", function (e) {
  e.preventDefault(); // no browser refresh after submit
  const input = todoForm.description;
  const inputValue = input.value.trim(); // trim the spaces before, after the string

  if (inputValue != "") {
    // Create a new task object -
    const task = {
      id: new Date().getTime(), // adding timestamp for create an id
      description: inputValue,
      isDone: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(task);
    input.value = ""; // clear input field
  }
  input.focus(); // Focus on input field for next task
});

/*    REMOVE TASK EVENTLISTENER
========================================================================== */
todoList.addEventListener("click", (e) => {
  // Check if click on the remove button OR parent
  if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task")
  ) {
    // Find the closest parent li and get its id
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

/*    CLEAR ALL TASKS EVENTLISTENER
========================================================================== */
clearBtn.addEventListener("click", (e) => {
  // Clear the tasklist, reset array, remove tasks from localstorage
  todoList.innerHTML = "";
  tasks = [];
  localStorage.removeItem("tasks");
});

/*    UPDATE TASK EVENTLISTENER (change status or name)
========================================================================== */

todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id; // Find the id of the closest parent li
  updateTask(taskId, e.target);
});

/*    DISPLAY SINGLE TASK FUNCTION
========================================================================== */
function displayTask(task) {
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
  // update local storage, and remove the task element
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
}

/*    UPDATE SINGLE TASK FUNCTION
========================================================================== */
function updateTask(taskId, checkbox) {
  const task = tasks.find((task) => task.id === parseInt(taskId)); // search for the specific ID
  task.isDone = !task.isDone; // toggle the isDone flag
  if (task.isDone) {
    checkbox.setAttribute("checked", "");
  } else {
    checkbox.removeAttribute("checked");
  }
  localStorage.setItem("tasks", JSON.stringify(tasks)); // safe to localStorage
}
