"use strict";

/*    SETTING UP REFERENCES
========================================================================== */
const taskForm = document.getElementById("task-form"); // reference to form
const input = document.getElementById("input"); // reference to inputfield
const taskList = document.getElementById("task-list"); // reference to task list
const clearButton = document.getElementById("clear-btn"); // reference to clear button
const claim = document.querySelector(".claim"); // reference to claim
let currentFilter = "all"; // "all", "done", "open"
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from localStorage OR set a new array

// Add a default "testTodo" if there are no tasks in localStorage
if (tasks.length === 0) {
  const testTodo = {
    id: new Date().getTime(), // get time for create an id
    description: "Start your first task 😜",
    isDone: false,
  };
  tasks.push(testTodo); // push into tasks
  localStorage.setItem("tasks", JSON.stringify(tasks)); // save to localStorage
}

/*    EVENT LISTENER - SUBMIT BUTTON
========================================================================== */
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Check for duplicates, if there are some tasks which
  const isDuplicate = tasks.some(
    (task) =>
      task.description.toLowerCase() === input.value.trim().toLowerCase() // check if task in array === inputValue
  );

  if (isDuplicate) {
    alert("Sorry, you can't add a duplicate task!");
  } else {
    if (input.value.trim() !== "") {
      // if field is NOT clear update state
      tasks.push({
        id: new Date().getTime(), // get time for create an id
        description: input.value.trim(), // get input field, trim whitespaces before and after
        isDone: false, // set complete status to false
      });

      // Render state
      onStateChange();

      input.value = ""; // clear input field
      input.focus(); // focus on input field for the next task
    } else {
      return; // do nothing
    }
  }
});

/*    EVENT LISTENER - FILTERING
========================================================================== */
const filterRadios = document.querySelectorAll('input[name="filter"]'); // select radio inputs
filterRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    currentFilter = this.value; // set currentfilter to this value
    display();
  });
});

/*    EVENT LISTENER - CLEAR DONE TASKS
========================================================================== */
clearButton.addEventListener("click", function () {
  if (confirm("Do you really want to delete the complete list?")) {
    //tasks = []; // clear complete array after alert windows
    tasks = tasks.filter((task) => !task.isDone);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // save to localStorage
  }
  onStateChange();
});

/*    FUNCTION - DISPLAY
========================================================================== */
function display() {
  taskList.innerHTML = ""; // clear taskList

  // Filter
  const filteredTodos = tasks.filter((task) => {
    if (currentFilter == "done") {
      return task.isDone; // set task to isDone
    }
    if (currentFilter == "open") {
      return !task.isDone; // set task to NOT isDone
    }
    return true; // unfiltered tasks
  });

  // Building list element with for each
  filteredTodos.forEach(function (task) {
    const listItem = document.createElement("li"); // create list element
    listItem.setAttribute("id", task.id); // add id to list element
    listItem.classList.add("task-item"); // add task-item class to list element
    listItem.innerHTML = `
    <div class="checkbox-wrapper">
      <input type="checkbox" name="is-done" class="toggle-complete" id="checkbox-${
        task.id
      }" ${task.isDone ? "checked" : ""}>
      <label for="checkbox-${task.id}">${task.description}</label>
      </div>
      <button class="delete-task" id="${task.id}">X</button>
    `; // add HTML template with the complete list item, checkbox, label, delete Button

    taskList.append(listItem); // append to UL List
  });

  // EVENTLISTENER - CHECKBOXES
  const checkboxes = document.querySelectorAll(".toggle-complete"); // get all checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = parseInt(checkbox.id.replace("checkbox-", "")); // remove checkbox prefix
      const currentTask = tasks.find((task) => task.id === taskId); // find in tasks the current Task by compare the IDs

      // Änderungen für Checkboxen
      currentTask.isDone = checkbox.checked; // set current Task to the checked checkbox

      onStateChange(); // save in localStorage and update the display
    });
  });

  /*    EVENT-LISTENER - REMOVE BUTTON
========================================================================== */
  const deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.id; // Get id of the currently clicked "delete" button and save it to taskId
      tasks = tasks.filter((removeTask) => removeTask.id !== parseInt(taskId)); // filter tasks array, keeping only tasks whose id is not equal to the clicked buttons id

      localStorage.setItem("tasks", JSON.stringify(tasks)); // save tasks to localStorage
      document.getElementById(taskId).remove(); // delete choosen ID from DOM
    });
  });
}

/*    FUNCTION - ON STAGE (SAVE + DISPLAY WRAPPER)
========================================================================== */
function onStateChange() {
  //    Save to localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks)); // save to localStorage
  display();
  currentTaskCount();
}

/*    COUNT OPEN TASK - FUNCTION
========================================================================== */

function currentTaskCount() {
  const openTasks = tasks.filter((task) => !task.isDone); // filter all tasks, if not isDone

  if (openTasks.length > 0) {
    claim.textContent = `Getting ${openTasks.length} things done…`; // update frontend claim
  } else {
    claim.textContent = `Great, all tasks are completed!`;
  }
}

onStateChange(); // initial call to set up the initial state
currentTaskCount(); // initial call to set up the initial count
