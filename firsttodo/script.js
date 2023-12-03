"use strict";
/*
        Eigene Funktionen Set Items / Update Item
        Delete Items
        Filter
        Bonus: Count Items
        */

/* SETTING UP VARIABLES FOR REFERENCES */

const inputField = document.getElementById("input");
const taskList = document.getElementById("task-list");
const addForm = document.getElementById("task-form");
const clearButton = document.getElementById("clear-btn");
let taskCount = 0;

// State
let tasks = [];
/*const testTodo = {
  id: new Date().getTime(),
  description: "Start your first task 😜",
  isDone: false,
};
tasks.push(testTodo); // added testTodo
*/

/*    FUNCTION LOAD FROM LOCALSTORAGE
========================================================================== */
function loadtasks() {
  const savedString = localStorage.getItem("tasks") || [];
  tasks = JSON.parse(savedString);
}

/*    FUNCTION SAVE TO LOCALSTORAGE
========================================================================== */
function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// display function
function onStateChange() {
  savetasks();
  display();
}

/*    SUBMIT ADD  - EVENT LISTENER
========================================================================== */

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 1. State updaten
  tasks.push({
    id: new Date().getTime(),
    description: inputField.value.trim(),
    isDone: false,
  });
  console.log(input);

  // 2. Redisplay triggern
  onStateChange();
  inputField.value = "";
});

/*    CLEAR ALL - EVENT LISTENER 
========================================================================== */
clearButton.addEventListener("click", function () {
  if (confirm("Möchtest du wirklich alle Aufgaben löschen?")) {
    tasks = [];

    //    deleteAllTasks();
    //  displayTasks();
  }
  onStateChange();
});

/*    FUNCTION zur Anzeige
========================================================================== */

function display() {
  taskList.innerHTML = "";

  for (const word of tasks) {
    const listItem = document.createElement("li");
    listItem.textContent = word.description;
    listItem.classList.add("item");
    taskList.append(listItem);
  }
}

/*    FUNCTION zum Überprüfen, ob eine Aufgabe bereits vorhanden ist
========================================================================== */
function isDuplicateTask(tasks, newTaskText) {
  return tasks.some(
    (task) => task.text.toLowerCase() === newTaskText.toLowerCase()
  );
}

loadtasks();
onStateChange();
