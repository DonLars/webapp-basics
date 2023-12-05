"use strict";

/* TODO: Demo Todo, Counter, css,  */

/*    SETTING UP REFERENCES
========================================================================== */
const taskForm = document.getElementById("task-form");
const input = document.getElementById("input");
const taskList = document.getElementById("task-list");
const clearButton = document.getElementById("clear-btn");
let currentFilter = "all"; // "all", "done", "open"

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from local storage OR set a new array

/*    EVENT LISTENER - SUBMIT BUTTON
========================================================================== */
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Check for duplicates
  const isDuplicate = tasks.some(
    (task) =>
      task.description.toLowerCase() === input.value.trim().toLowerCase() // check if inputValue is in tasks
  );

  if (isDuplicate) {
    alert("Sorry, you can't add a duplicate task!");
  } else {
    if (input.value.trim() !== "") {
      // 1. State updaten
      tasks.push({
        id: new Date().getTime(),
        description: input.value.trim(),
        isDone: false,
      });

      // 2. Redisplay triggern
      onStateChange();

      input.value = "";
      input.focus(); // Focus on input field for the next task
    } else {
      return;
    }
  }
});

/*    EVENT LISTENER - FILTER
========================================================================== */
const filterRadios = document.querySelectorAll('input[name="filter"]');
filterRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    currentFilter = this.value;
    display();
  });
});

/*    EVENT LISTENER - CLEAR ALL
========================================================================== */
clearButton.addEventListener("click", function () {
  if (confirm("Do you really want to delete the complete list?")) {
    tasks = [];
  }
  onStateChange();
});

/*    FUNCTION - DISPLAY
========================================================================== */
function display() {
  taskList.innerHTML = "";

  // Filter
  const filteredTodos = tasks.filter((task) => {
    if (currentFilter == "done") {
      return task.isDone;
    }
    if (currentFilter == "open") {
      return !task.isDone;
    }
    return true;
  });

  // Building list element with for each
  filteredTodos.forEach(function (task) {
    const listItem = document.createElement("li");
    listItem.setAttribute("id", task.id);
    listItem.classList.add("task-item");
    listItem.innerHTML = `
    <div class="checkbox-wrapper">
      <input type="checkbox" name="is-done" class="toggle-complete" id="${
        task.id
      }" ${task.isDone ? "checked" : ""}>
      <label for="${task.id}">${task.description}</label>
      </div>
      <button class="delete-task" id="${task.id}">X</button>
    `;
    taskList.append(listItem);
  });

  // EVENTLISTENER - CHECKBOXES
  const checkboxes = document.querySelectorAll(".toggle-complete");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = checkbox.id;
      const currentTask = tasks.find((task) => task.id === parseInt(taskId));

      // Änderungen für Checkboxen
      if (checkbox.checked) {
        checkbox.setAttribute("checked", "");
        checkbox.classList.add("check");
      } else {
        checkbox.removeAttribute("checked");
      }

      // Change State
      currentTask.isDone = checkbox.checked;

      // Speichern im Local Storage und aktualisieren der Anzeige
      onStateChange();
    });
  });

  /*    EVENT-LISTENER - REMOVE BUTTON
========================================================================== */
  const deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.id;
      tasks = tasks.filter((removeTask) => removeTask.id !== parseInt(taskId));
      localStorage.setItem("tasks", JSON.stringify(tasks)); // in storage speichern
      document.getElementById(taskId).remove(); // gewählte ID aus dem DOM löschen
    });
  });
}

/*    FUNCTION - ON STAGE (SAVE + DISPLAY WRAPPER)
========================================================================== */
function onStateChange() {
  //    Save to localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
  display();
}

onStateChange();
