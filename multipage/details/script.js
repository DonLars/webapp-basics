const state = {
  currentUserId: null,
  users: [],
};

function getUsersFromLocalStorage() {
  if (localStorage.getItem("users")) {
    state.users = JSON.parse(localStorage.getItem("users"));
  }
}

function getUserId() {
  let params = new URLSearchParams(document.location.search);
  state.currentUserId = params.get("id");
}

function generateTemplate(currentUserData) {
  const div = document.createElement("div");

  const h1 = document.createElement("h1");
  h1.innerText = "Detail Page user: " + currentUserData.name;

  div.append(h1);

  return div;
}

function render() {
  const currentUserData = state.users.find(
    (item) => item.id == state.currentUserId
  );

  document
    .querySelector("#user-details")
    .appendChild(generateTemplate(currentUserData));
}

function init() {
  getUsersFromLocalStorage();
  getUserId();
  render();
}

init();
