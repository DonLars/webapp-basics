"use strict";

const inputDE = document.getElementById("input-de");
const inputEN = document.getElementById("input-en");
const output = document.getElementById("output");
const addForm = document.getElementById("addForm");
const clearButton = document.getElementById("clear-btn");

// State

let vocabulary = [
  {
    german: "hallo",
    english: "goodbye",
  },
  {
    german: "tschüß",
    english: "good bye",
  },
];

function saveVocabulary() {
  localStorage.setItem("vocabulary", JSON.stringify(vocabulary));
}

function loadVocabulary() {
  const savedItem = localStorage.getItem("vocabulary");

  if (savedItem == null) {
    return;
  }

  //console.log("savedItem", savedItem);
  vocabulary = JSON.parse(savedItem);
}

// render
function onStateChange() {
  saveVocabulary();
  render();
}

function render() {
  // Tisch abräumen
  output.innerHTML = "";

  for (const word of vocabulary) {
    const listItem = document.createElement("li");
    listItem.textContent = `${word.german} : ${word.english}`;

    output.append(listItem);
  }
}

// Event Listener

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const german = inputDE.value;
  const english = inputEN.value;
  console.log("Submit", german, english);

  // 1. State updaten
  vocabulary.push({
    german: german,
    english: english,
  });

  console.log(vocabulary);

  //2. Rerender triggern
  onStateChange();
});

clearButton.addEventListener("click", () => {
  // 1. State update

  vocabulary = [];

  // 2. Rerender triggern
  onStateChange();
});

loadVocabulary();
render();

// wenn leer, nicht absenden
// Einzelne Einträge entfernen
