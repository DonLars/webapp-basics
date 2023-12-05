"use strict";

/*    STAGING & GET ELEMENTS
========================================================================== */
const taskForm = document.getElementById("task-form"); // reference to form
const input = document.getElementById("input"); // reference to inputfield
const taskList = document.getElementById("task-list"); // reference to task list
const clearButton = document.getElementById("clear-btn"); // reference to clear button
const countTask = document.querySelector("count-task"); // reference to counter
const claim = document.querySelector(".claim"); // reference to claim
let currentFilter = "all"; // "all", "done", "open"
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from local storage OR set a new array

// Add a default "testTodo" if there are no tasks in local storage
if (tasks.length === 0) {
  const testTodo = {
    id: new Date().getTime(), // Get time for create an id
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
      // if field is NOT clear update State
      tasks.push({
        id: new Date().getTime(), // Get time for create an id
        description: input.value.trim(), // Get input field, trim whitespaces before and after
        isDone: false,
      });

      // Render state
      render();

      input.value = ""; // Clear input field
      input.focus(); // Focus input field for the next task
    } else {
      return; // do nothing
    }
  }
});

/*    EVENT LISTENER - FILTER
========================================================================== */
const filterRadios = document.querySelectorAll('input[name="filter"]'); // select radio inputs
filterRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    currentFilter = radio.value; // set currentfilter to this value
    onStateChange();
  });
});

/*    EVENT LISTENER - CLEAR ALL
========================================================================== */
clearButton.addEventListener("click", function () {
  if (confirm("Do you really want to delete the complete list?")) {
    tasks = []; // clear complete array after alert windows
  }
  onStateChange();
});

/*    FUNCTION - render
========================================================================== */
function render() {
  taskList.innerHTML = ""; // Clear taskList

  // Filter
  const filteredTodos = tasks.filter((task) => {
    if (currentFilter == "done") {
      return task.isDone; // set task to isDone
    }
    if (currentFilter == "open") {
      return !task.isDone; // set task to NOT isDone
    }
    return true; // all
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
      const taskId = parseInt(checkbox.id.replace("checkbox-", "")); // entfernen der checkbox ID
      const currentTask = tasks.find((task) => task.id === taskId); // find in tasks the current Task by compare the IDs

      // Änderungen für Checkboxen
      currentTask.isDone = checkbox.checked; // set current Task to the checked checkbox

      onStateChange(); // Save in localStorage and update the display
    });
  });

  /*    EVENT-LISTENER - REMOVE BUTTON
========================================================================== */
  const deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.id;
      tasks = tasks.filter((removeTask) => removeTask.id !== parseInt(taskId));
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
      document.getElementById(taskId).remove(); // delete choosen ID from DOM
    });
  });
}

/*    FUNCTION - ON STAGE (SAVE + Render WRAPPER)
========================================================================== */
function onStateChange() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
  render();
  currentTaskCount();
}

/*    COUNT OPEN TASK - FUNCTION
========================================================================== */

function currentTaskCount() {
  const openTasks = tasks.filter((task) => !task.isDone); // Filter all tasks, if not isDone

  if (openTasks.length > 0) {
    claim.textContent = `Getting ${openTasks.length} things done…`;
  } else {
    claim.textContent = `Great, all tasks are completed!`;
  }
  countTask.textContent = openTasks.length; // Update the countTask element
}

onStateChange(); // Initial call to set up the initial state
currentTaskCount(); // Initial call to set up the initial count
