const state = {
  pokemonData: [],
  nextItems: null,
  limit: 10,
};

console.log(1);

function getPokemonData(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((jsonData) => {
      console.log(jsonData.results);
      state.pokemonData = jsonData.results;
      state.nextItems = jsonData.next;
      render();
      console.log(2);
    })
    .catch((error) => {
      alert("Sorry es gab einen Fehler. Versuche es später nochmal");
    });
}

function render() {
  for (const pokemonItem of state.pokemonData) {
    const li = document.createElement("li");
    li.innerText = pokemonItem.name;

    document.querySelector(".list").appendChild(li);
  }
}

document.querySelector("#next-btn").addEventListener("click", () => {
  if (state.nextItems) {
    getPokemonData(state.nextItems);
  }
});

document.querySelector("#limit").addEventListener("change", init);

console.log(3);
function init() {
  document.querySelector(".list").innerHTML = "";
  state.limit = document.querySelector("#limit").value;
  getPokemonData("https://pokeapi.co/api/v2/pokemon/?limit=" + state.limit);
}

init();

// CRUD
// Create
// Read
// Update
// Delete
