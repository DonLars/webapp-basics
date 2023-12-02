"use strict";
/*
        Add Item (ID hochzählen)
        Remove Item (ID herunterzählen)
        Eigene Funktionen Set Items / Update Item
        Save List
        Refresh List
        */

/* SETTING UP VARIABLES FOR REFERENCES */

let taskCount = 0;

const inputField = document.getElementById("input").trim();
const taskList = document.getElementById("task-list");
const addForm = document.getElementById("task-form");
const clearButton = document.getElementById("clear-btn");

// State
let tasks = [];
function savetasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadtasks() {
  const savedString = localStorage.getItem("tasks");
  if (savedString == null) {
    return;
  }
  tasks = JSON.parse(savedString);
}

// render
function onStateChange() {
  savetasks();
  render();
}

function render() {
  // Tisch abräumen
  taskList.innerHTML = "";

  for (const word of tasks) {
    const listItem = document.createElement("li");
    listItem.textContent = word.description;
    listItem.classList.add("item");
    taskList.append(listItem);
  }
}

// Event Listener
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = inputField.value;
  //console.log("Submit", deutsch);

  // 1. State updaten
  tasks.push({
    description: input,
  });

  console.log(tasks);

  // 2. Rerender triggern
  onStateChange();
});

clearButton.addEventListener("click", () => {
  // 1. State update

  tasks = [];

  // 2. Rerender triggern
  onStateChange();
});

loadtasks();
render();

/*
        todos.push("Keller aufräumen");
        todos.push("Fenster putzen");
        todos.push("Wäsche waschen");
        */

/*
        function displayTodos() {
          let todoListElement = document.getElementById("todoList");
        
          todoListElement.innerHTML = "";
          for (let todo of todos) {
            let listItem = document.createElement("li");
            listItem.textContent = todo;
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "x";
            removeBtn.onclick = () => {
              removeTodo(todo);
            };
            listItem.appendChild(removeBtn);
            todoListElement.appendChild(listItem);
          }
        }
        function addTodo() {
          let newTodo = document.getElementById("todoInput").value;
          todos.push(newTodo);
        
          displayTodos();
        }
        
        function removeTodo(todoToRemove) {
          let index = todos.indexOf(todoToRemove);
          todos.splice(index, 1);
          displayTodos();
        }
        
        displayTodos();
        //addTodo();*/

// State enities
/*
        let filter = ["all", "open", "done"];
        
        let todosAppState = {
          filter: "all",
          todos: [
            {
              id: 0,
              decription: "Keller aufräumen",
              done: false,
            },
            {
              id: 1,
              decription: "Fenster putzen",
              done: false,
            },
          ],
        };
        */
