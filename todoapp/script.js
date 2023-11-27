"use strict";
// References > variables
const inputField = document.getElementById("input");
const taskList = document.getElementById("task-list");
const addForm = document.getElementById("task-form");
const clearButton = document.getElementById("clear-btn");

// Add Button EventListener
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = inputField.value;
  // 1. State updaten
  tasks.push({
    description: input,
  });
  // 2. RedisplayTasks triggern
  savetasks();
  displayTasks();
  inputField.value = ""; // leeren des Feldes
});

// Clear Button EventListener
clearButton.addEventListener("click", () => {
  // 1. State update
  tasks = [];
  // 2. RedisplayTasks triggern
  savetasks();
  displayTasks();
});

// State, tasks Vorgabe
let tasks = [{ description: "This is my first todo ..." }];

// Save Tasks in localstorage
function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from localstorage
function loadtasks() {
  const savedString = localStorage.getItem("tasks");
  if (savedString == null) {
    return;
  }
  tasks = JSON.parse(savedString);
}

// Display Tasks
function displayTasks() {
  taskList.innerHTML = "";

  for (const word of tasks) {
    const listItem = document.createElement("li");
    listItem.textContent = word.description;
    listItem.classList.add("item");
    taskList.append(listItem);
  }
}

loadtasks();
displayTasks();
