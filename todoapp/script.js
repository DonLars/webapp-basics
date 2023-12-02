/*   REFERENCE TO SELECTORS
========================================================================== */
const todoForm = document.querySelector(".todo-form"); // reference to complete form
const todoList = document.querySelector(".todo-list"); // reference to dynamic list
const clearBtn = document.querySelector(".clear-btn"); // reference to clear all button
const countTask = document.querySelector(".count-task"); // reference to counter
const claim = document.querySelector(".claim"); // reference to claim
const filterOptions = document.querySelector(".filter-options"); // reference to filter radiobuttons

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

// Setting stage - displaying existing tasks from local storage
if (localStorage.getItem("tasks")) {
  tasks.forEach(displayTask); // create a new task for every task
}

/*    SUBMIT FORM EVENTLISTENER
========================================================================== */
todoForm.addEventListener("submit", function (event) {
  event.preventDefault(); // no browser refresh after submit
  const input = todoForm.description;
  const inputValue = input.value.trim(); // trim the spaces before, after the string
  const inputDuplicateTest = inputValue.toLowerCase();

  // Check for duplicates
  const isDuplicate = tasks.some(
    (task) => task.description.toLowerCase() === inputDuplicateTest // check if inputValue is in tasks
  );

  if (isDuplicate) {
    alert("Sorry, you can't add a duplicate task!");
  } else {
    if (inputValue != "") {
      // Create a new task
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
  }
  input.focus(); // Focus on input field for next task
});

/*    REMOVE TASK EVENTLISTENER (remove one task)
========================================================================== */
todoList.addEventListener("click", (event) => {
  // Check if click on the remove button OR parent
  if (
    event.target.classList.contains("remove-task") ||
    event.target.parentElement.classList.contains("remove-task")
  ) {
    // Find the closest parent li and get its id
    const taskId = event.target.closest("li").id;
    countOpenTasks();

    removeTask(taskId);
  }
});

/*    CLEAR ALL TASKS EVENTLISTENER (delete all tasks)
========================================================================== */
clearBtn.addEventListener("click", () => {
  // Clear the tasklist, reset array, remove tasks from localstorage
  todoList.innerHTML = "";
  tasks = [];
  localStorage.removeItem("tasks");
  countOpenTasks();
});

/*    UPDATE TASK EVENTLISTENER (change status or name)
========================================================================== */

todoList.addEventListener("input", (event) => {
  const taskId = event.target.closest("li").id; // Find the id of the closest parent li in event
  updateTask(taskId, event.target);
  countOpenTasks();
});

/*    FILTER EVENTLISTENER (all, open, done)
========================================================================== */

filterOptions.addEventListener("change", function (event) {
  //console.log(event.target.value);
  const filterValue = event.target.value; //  extract the specific value from changing Element out of the eventobjekt
  filterTasks(filterValue);
});

/* =========================================================================
      ALL FUNCTIONS
========================================================================== */

/*    DISPLAY SINGLE TASK FUNCTION
========================================================================== */
function displayTask(task) {
  const newListItem = document.createElement("li");
  newListItem.setAttribute("id", task.id);
  newListItem.classList.add("task-item");

  const newListTemplate = `
    <div class="checkbox-wrapper">
      <input type="checkbox" title="toggle for complete / open" id="${
        task.description
      }" name="tasks" ${task.isDone ? "checked" : ""}>
      <label for="${task.description}" class="description ${
    task.isDone ? "done" : ""
  }">${task.description}</label>
    </div>
    <button class="remove-task" title="remove this task">X</button>
  `;
  newListItem.innerHTML = newListTemplate;
  todoList.appendChild(newListItem);
  countOpenTasks();
}

/*    REMOVE SINGLE TASK FUNCTION
========================================================================== */
function removeTask(taskId) {
  // all tasks remain there, if task.id is not die taskID
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));
  // Update localStorage the rest tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Delete taskId from DOM
  document.getElementById(taskId).remove();
  countOpenTasks();
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
  countOpenTasks();
}

/*    FILTER TASKS FUNCTION
========================================================================== */

function filterTasks(filter) {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let filteredTasks;

  switch (filter) {
    case "done":
      filteredTasks = storedTasks.filter((filterTodo) => filterTodo.isDone);
      break;
    case "open":
      filteredTasks = storedTasks.filter((filterOpen) => !filterOpen.isDone);
      break;
    default:
      filteredTasks = storedTasks; // Show all tasks, without filtering
  }

  // clear whole list
  todoList.innerHTML = "";

  // display filtered tasks
  //console.log(filteredTasks);
  filteredTasks.forEach(displayTask); // apply the function displayTask to each element of the filteredTasks array
}

/*    COUNT OPEN TASK FUNCTION
========================================================================== */

function countOpenTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const openTasks = storedTasks.filter((task) => !task.isDone);

  if (openTasks.length === 0) {
    claim.textContent = "Great, all tasks are completed!";
  }
  return (countTask.textContent = openTasks.length);
}
