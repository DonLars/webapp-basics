// getElementById
const todoList = document.getElementById("todo-list");

// State
const todos = [
  {
    id: 0,
    description: "Learn CSS",
    isDone: false,
  },
  {
    id: 1,
    description: "Learn HTML",
    isDone: true,
  },
  {
    id: 1,
    description: "Learn JS",
    isDone: false,
  },
];
let currentFilter = "open"; // "all", "done", "open"

// Render
function render() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter == "done") {
      return todo.isDone;
    }

    if (currentFilter == "open") {
      return !todo.isDone;
    }

    return true;
  });

  for (const todo of filteredTodos) {
    // li
    const li = document.createElement("li");

    // input
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "is-done");
    input.setAttribute("id", `checkbox-${todo.id}`);

    if (todo.isDone) {
      input.setAttribute("checked", "");
    }

    input.addEventListener("change", () => {
      console.log("change event triggered", todo.id);
      // State ändern
      todo.isDone = input.checked;

      console.log(todos);

      // Rerendern
      //   saveTodoItems();
      render();
    });

    // label
    const label = document.createElement("label");
    label.setAttribute("for", `checkbox-${todo.id}`);
    label.textContent = todo.description;

    if (todo.isDone) {
      label.style.textDecoration = "line-through";
    }

    // input und label -> li
    li.append(input, label);

    // li -> todoList
    todoList.append(li);
  }
}

// Global Event Listener

// addButton.addEventListener(() => {
//   // State updaten
//   render();
// });

// On Load
// loadTodos();
render();
