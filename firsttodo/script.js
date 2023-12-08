"use strict";

/*    SETTING UP REFERENCES
========================================================================== */
const taskForm = document.getElementById("task-form"); // reference to form
const input = document.getElementById("input"); // reference to inputfield
const taskList = document.getElementById("task-list"); // reference to task list
const clearButton = document.getElementById("clear-btn"); // reference to clear button
const claim = document.querySelector(".claim"); // reference to claim

/*    SETTING UP STATE
========================================================================== */
const state = {
  currentFilter: "all", // "all", "done", "open"
  tasks: [],
};

// Add a default "testTodo" if there are no tasks in localStorage
if (state.tasks.length === 0) {
  const testTodo = {
    id: new Date().getTime(), // get time for create an id
    description: "Start your first task 😜",
    isDone: false,
  };
  state.tasks.push(testTodo); // push into tasks
  saveTodosToLocalStorage();
}

/*    FUNCTION - LOAD TODOS FROM LOCAL STORAGE
========================================================================== */
function getTodosFromLocalStorage() {
  if (localStorage.getItem("tasks")) {
    state.tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //state.tasks = JSON.parse(localStorage.getItem("tasks")) ?? []; // load tasks from localStorage OR set a new array
}

/*    FUNCTION - SAVE TODOS TO LOCAL STORAGE
========================================================================== */
function saveTodosToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks)); // save to localStorage
}

/*    FUNCTION - GENERATE HTML TEMPLATE
========================================================================== */
function generateTodoItemTemplate(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const div = document.createElement("div");
  div.classList.add("checkbox-wrapper");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox-" + task.id;
  checkbox.classList.add("toggle-complete");

  // Event-Listener für das Ändern des Checkbox-Status hinzufügen
  checkbox.addEventListener("change", function () {
    task.isDone = checkbox.checked;
    if (checkbox.checked) {
      checkbox.setAttribute("checked", "");
    } else {
      checkbox.removeAttribute("checked");
    }
  });

  const label = document.createElement("label");
  label.innerText = task.description;
  label.htmlFor = "checkbox-" + task.id;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "X";
  button.classList.add("delete-task");
  button.id = task.id;

  div.append(checkbox, label);
  li.append(div, button);
  return li;
}

/*    EVENT LISTENER - SUBMIT BUTTON
// ========================================================================== */
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Check for duplicates, if there are some tasks which
  const isDuplicate = state.tasks.some(
    (task) =>
      task.description.toLowerCase() === input.value.trim().toLowerCase() // check if task in array === inputValue
  );

  if (isDuplicate) {
    alert("Sorry, you can't add a duplicate task!");
  } else {
    if (input.value.trim() !== "") {
      // if field is NOT clear update state
      state.tasks.push({
        id: new Date().getTime(), // get time for create an id
        description: input.value.trim(), // get input field, trim whitespaces before and after
        isDone: false, // set complete status to false
      });

      // Render state
      render();
      saveTodosToLocalStorage();

      input.value = ""; // clear input field
      input.focus(); // focus on input field for the next task
    } else {
      return; // do nothing
    }
  }
});

/*    EVENT-LISTENER - REMOVE BUTTON
========================================================================== */
const deleteButtons = document.querySelectorAll(".delete-task");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const taskId = button.id;
    state.tasks = state.tasks.filter(
      (removeTask) => removeTask.id !== parseInt(taskId)
    );
    localStorage.setItem("tasks", JSON.stringify(state.tasks)); // save to localStorage
    document.getElementById(taskId).remove(); // delete choosen ID from DOM
  });
});

/*    FUNCTION - RENDER DATA FROM STAGE
========================================================================== */
function render() {
  taskList.innerHTML = "";

  for (const task of state.tasks) {
    const newTodoItem = generateTodoItemTemplate(task);
    taskList.appendChild(newTodoItem);
  }
  saveTodosToLocalStorage();
}

/*    FUNCTION - GET TODOS AND RENDER
========================================================================== */
function initialize() {
  getTodosFromLocalStorage();
  render();
}

initialize();
