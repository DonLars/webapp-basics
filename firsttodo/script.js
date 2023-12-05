"use strict";

/* TODO: Demo Todo, css,  */

/*    SETTING UP REFERENCES
========================================================================== */
const taskForm = document.getElementById("task-form");
const input = document.getElementById("input");
const taskList = document.getElementById("task-list");
const clearButton = document.getElementById("clear-btn");
const claim = document.querySelector(".claim"); // reference to claim
let currentFilter = "all"; // "all", "done", "open"
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // load tasks from local storage OR set a new array

// Add a default "testTodo" if there are no tasks in local storage
if (tasks.length === 0) {
  const testTodo = {
    id: new Date().getTime(),
    description: "Start your first task 😜",
    isDone: false,
  };
  tasks.push(testTodo); // added testTodo
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/*    EVENT LISTENER - SUBMIT BUTTON
========================================================================== */
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Check for duplicates
  const isDuplicate = tasks.some(
    (task) =>
      task.description.toLowerCase() === input.value.trim().toLowerCase()
  );

  if (isDuplicate) {
    alert("Sorry, you can't add a duplicate task!");
  } else {
    if (input.value.trim() !== "") {
      // Update state
      tasks.push({
        id: new Date().getTime(),
        description: input.value.trim(),
        isDone: false,
      });

      // Trigger redisplay
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
      <input type="checkbox" name="is-done" class="toggle-complete" id="checkbox-${
        task.id
      }" ${task.isDone ? "checked" : ""}>
      <label for="checkbox-${task.id}">${task.description}</label>
      </div>
      <button class="delete-task" id="${task.id}">X</button>
    `;

    taskList.append(listItem);
  });

  // EVENTLISTENER - CHECKBOXES
  const checkboxes = document.querySelectorAll(".toggle-complete");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = parseInt(checkbox.id.replace("checkbox-", "")); // entfernen der checkbox ID
      const currentTask = tasks.find((task) => task.id === taskId);

      // Änderungen für Checkboxen
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
  currentTaskCount();
}

/*    COUNT OPEN TASK - FUNCTION
========================================================================== */

function currentTaskCount() {
  const openTasks = tasks.filter((task) => !task.isDone);

  if (openTasks.length > 0) {
    claim.textContent = `Getting ${openTasks.length} things done…`;
  } else {
    claim.textContent = `Great, all tasks are completed!`;
  }
}

onStateChange(); // Initial call to set up the initial state
currentTaskCount(); // Initial call to set up the initial count
