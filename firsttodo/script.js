"use strict";

/* Demo Todo, Counter, css,  */

/* SETTING UP VARIABLES FOR REFERENCES */

const taskForm = document.getElementById("task-form");
const input = document.getElementById("input");
const taskList = document.getElementById("task-list");
const clearButton = document.getElementById("clear-btn");
let currentFilter = "all"; // "all", "done", "open"

let tasks = [];

/* SUBMIT FORM - EVENT LISTENER */
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

/* CLEAR ALL - EVENT LISTENER */
clearButton.addEventListener("click", function () {
  if (confirm("Do you really want to delete the complete list?")) {
    tasks = [];
  }
  onStateChange();
});

/* FUNCTIONS */

/* Funktion zum Überprüfen, ob eine Aufgabe bereits vorhanden ist */
function isDuplicateTask(tasks, newTaskText) {
  return tasks.some(
    (task) => task.description.toLowerCase() === newTaskText.toLowerCase()
  );
}

/* FUNCTION LOAD FROM LOCALSTORAGE */
function loadtasks() {
  const savedString = localStorage.getItem("tasks") || "[]";
  tasks = JSON.parse(savedString);
}

/* FUNCTION SAVE TO LOCALSTORAGE */
function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* FUNCTION SAVE + DISPLAY */
function onStateChange() {
  savetasks();
  display();
}

/* FUNCTION DISPLAY */
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

  // For each HTML Aufbauen
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

  // Checkbox-Event-Listener
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

      // State ändern
      currentTask.isDone = checkbox.checked;

      // Speichern im Local Storage und aktualisieren der Anzeige
      onStateChange();
    });
  });

  // Löschbutton-Event-Listener
  const deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.id;
      removeTask(taskId);
    });
  });
}

/* FUNCTION REMOVE */
function removeTask(taskId) {
  tasks = tasks.filter((removeTask) => removeTask.id !== parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // in storage speichern
  document.getElementById(taskId).remove(); // gewählte ID aus dem DOM löschen
}
/* FILTER - EVENT LISTENER */
const filterRadios = document.querySelectorAll('input[name="filter"]');
filterRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    currentFilter = this.value;
    display();
  });
});

loadtasks();
onStateChange();
