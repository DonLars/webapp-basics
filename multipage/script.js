const state = {
  users: [],
};

function getUsersFromLocalStorage() {
  if (localStorage.getItem("users")) {
    state.users = JSON.parse(localStorage.getItem("users"));
  }
}

// Baut eine tr zusammen
function generateTemplate(userData) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.innerText = userData.name;

  const tdUsername = document.createElement("td");
  tdUsername.innerText = userData.username;

  const tdEmail = document.createElement("td");
  tdEmail.innerText = userData.email;

  const tdActions = document.createElement("td");

  const detailLink = document.createElement("a");
  detailLink.href = "details/index.html?id=" + userData.id;
  detailLink.innerText = "Details";

  tdActions.appendChild(detailLink);

  tr.append(tdName, tdUsername, tdEmail, tdActions);

  return tr;
}

/*
  document.querySelector("tbody").appendChild(
    generateTemplate({
      name: "Maria",
      username: "maria123",
      email: "me@maria123.com",
    })
  );
  
  document.querySelector("tbody").appendChild(
    
  );*/

function render() {
  for (const userData of state.users) {
    const newTr = generateTemplate(userData);
    document.querySelector("tbody").appendChild(newTr);
  }
}

// startet das Programm
function init() {
  getUsersFromLocalStorage();
  render();
}

init();
