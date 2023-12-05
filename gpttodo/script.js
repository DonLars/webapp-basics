const taskForm = document.getElementById("taskForm");
const filter = document.querySelectorAll('input[name="filter"]');
const deleteBtn = document.getElementById("deleteAllButton");

// Initialisiere die Anzeige beim Laden der Seite
displayTasks();

/* Add Event Listener */
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Verhindere das Standardverhalten des Formulars
  addTask();
  displayTasks();
});

filter.forEach(function (filterInput) {
  filterInput.addEventListener("change", function () {
    displayTasks(filterInput.value);
  });
});

deleteBtn.addEventListener("click", function () {
  if (confirm("Möchtest du wirklich alle Aufgaben löschen?")) {
    localStorage.removeItem("tasks");
    displayTasks();
  }
});

/*    Funktion zum Anzeigen der Aufgaben mit Filter
========================================================================== */
function displayTasks(filter) {
  var taskList = document.getElementById("taskList"); // Tisch abräumenå
  taskList.innerHTML = ""; // Leere die Liste

  // Hole die Aufgaben aus dem LocalStorage
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Filtere die Aufgaben basierend auf dem ausgewählten Filter
  switch (filter) {
    case "open":
      tasks = tasks.filter((task) => !task.completed);
      break;
    case "done":
      tasks = tasks.filter((task) => task.completed);
      break;
    // 'all' ist der Standardfilter, es werden alle Aufgaben angezeigt
  }

  // Zähler für offene Aufgaben
  var openTasksCount = 0;

  // Durchlaufe die gefilterten Aufgaben und füge sie der Liste hinzu
  tasks.forEach(function (task, index) {
    var listItem = document.createElement("li");
    listItem.innerHTML = `
    <input type="checkbox" class="toggle-complete" data-index="${index}" ${
      task.completed ? "checked" : ""
    }>
    <span>${task.text}</span>
    <button class="delete-task" data-id="${task.id}">Löschen</button>
  `;
    taskList.appendChild(listItem);

    // Zähle offene Aufgaben
    if (!task.completed) {
      openTasksCount++;
    }
  });

  // Aktualisiere den Zähler für offene Aufgaben
  updateOpenTasksCounter(openTasksCount);

  // Füge Event-Listener für die dynamisch generierten Elemente hinzu
  document.querySelectorAll(".toggle-complete").forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      toggleComplete(checkbox.dataset.index);
    });
  });

  document.querySelectorAll(".delete-task").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteTask(button.dataset.id);
    });
  });
}

// Füge einen Standard-Eintrag (Staging) hinzu, wenn die Liste leer ist
if (
  localStorage.getItem("tasks") === null ||
  JSON.parse(localStorage.getItem("tasks")).length === 0
) {
  const stagingTaskText = "Staging-Aufgabe";

  // Hole die vorhandenen Aufgaben aus dem LocalStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Überprüfe, ob die Staging-Aufgabe bereits vorhanden ist
  if (!isDuplicateTask(tasks, stagingTaskText)) {
    // Erstelle einen eindeutigen Zeitstempel als ID für die Staging-Aufgabe
    const timestamp = new Date().getTime();

    // Füge die Staging-Aufgabe hinzu
    tasks.push({
      id: timestamp,
      text: stagingTaskText,
      completed: false,
    });

    // Speichere die aktualisierten Aufgaben im LocalStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Aktualisiere die Anzeige der Aufgaben
    displayTasks();
  }
}

/*    Funktion zum Hinzufügen einer Aufgabe
========================================================================== */
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim(); // Trimme den Text, um leere Zeichen am Anfang/Ende zu entfernen

  if (taskText !== "") {
    // Hole die vorhandenen Aufgaben aus dem LocalStorage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Überprüfe, ob die Aufgabe bereits vorhanden ist (Duplikat vermeiden)
    if (!isDuplicateTask(tasks, taskText)) {
      // Erstelle einen eindeutigen Zeitstempel als ID für die Aufgabe
      var timestamp = new Date().getTime();

      // Füge die neue Aufgabe hinzu
      tasks.push({ id: timestamp, text: taskText, completed: false });

      // Speichere die aktualisierten Aufgaben im LocalStorage
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Leere das Eingabefeld
      taskInput.value = "";

      // Aktualisiere die Anzeige der Aufgaben
    } else {
      alert("Diese Aufgabe existiert bereits.");
    }
  }
}

/*    Funktion zum Überprüfen, ob eine Aufgabe bereits vorhanden ist
========================================================================== */
function isDuplicateTask(tasks, newTaskText) {
  return tasks.some(
    (task) => task.text.toLowerCase() === newTaskText.toLowerCase()
  );
}

/*    FUNKTION zum Löschen einer Aufgabe basierend auf der ID
========================================================================== */
function deleteTask(id) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id != id); // Entferne die Aufgabe mit der gegebenen ID
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(); // Aktualisiere die Anzeige
}

/*    FUNKTION zum Umschalten des Status "abgeschlossen"
========================================================================== */
function toggleComplete(index) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed; // Umschalten des Status
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(); // Aktualisiere die Anzeige
}

/*    FUNKTION zum Aktualisieren des Zählers für offene Aufgaben
========================================================================== */
function updateOpenTasksCounter(count) {
  var openTasksCountElement = document.getElementById("openTasksCount");
  if (openTasksCountElement) {
    openTasksCountElement.textContent = count;
  }
}
