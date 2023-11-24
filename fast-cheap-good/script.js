"use strict";

const fastCheckbox = document.querySelector("#fast");
const cheapCheckbox = document.querySelector("#cheap");
const goodCheckbox = document.querySelector("#good");

let lastClickedCheckbox;

fastCheckbox.addEventListener("click", function () {
  if (countCheck() > 2) {
    lastClickedCheckbox.checked = false;
  }
  lastClickedCheckbox = fastCheckbox;
});

cheapCheckbox.addEventListener("click", function () {
  if (countCheck() > 2) {
    lastClickedCheckbox.checked = false;
  }
  lastClickedCheckbox = cheapCheckbox;
});

goodCheckbox.addEventListener("click", function () {
  if (countCheck() > 2) {
    lastClickedCheckbox.checked = false;
  }
  lastClickedCheckbox = goodCheckbox;
});

function countCheck() {
  let result = 0;
  if (fastCheckbox.checked) {
    result += 1;
  }
  if (cheapCheckbox.checked) {
    result += 1;
  }
  if (goodCheckbox.checked) {
    result += 1;
  }
  return result;
}

/*
// Selektiere die Checkboxen mit den entsprechenden IDs
const fastCheckbox = document.querySelector("#fast");
const cheapCheckbox = document.querySelector("#cheap");
const goodCheckbox = document.querySelector("#good");

// Variable, um das zuletzt ausgewählte Kontrollkästchen zu verfolgen
let lastCheckedCheckbox = null;

// Funktion zum Umschalten des ausgewählten Kontrollkästchens
function toggle(clickedCheckbox) {
  // Deklariere Variablen für die beiden anderen Checkboxen in der Gruppe
  let firstOtherCheckbox, secondOtherCheckbox;

  // Überprüfe, welches Kontrollkästchen angeklickt wurde, um die anderen zu bestimmen
  if (fastCheckbox !== clickedCheckbox) {
    firstOtherCheckbox = fastCheckbox;
    if (cheapCheckbox !== clickedCheckbox) {
      secondOtherCheckbox = cheapCheckbox;
    } else {
      secondOtherCheckbox = goodCheckbox;
    }
  } else {
    firstOtherCheckbox = cheapCheckbox;
    secondOtherCheckbox = goodCheckbox;
  }

  // Überprüfe, ob alle drei Checkboxen ausgewählt sind
  if (
    clickedCheckbox.checked &&
    firstOtherCheckbox.checked &&
    secondOtherCheckbox.checked
  ) {
    // Deaktiviere das zuletzt ausgewählte Kontrollkästchen
    lastCheckedCheckbox.checked = false;
  }

  // Aktualisiere die Variable für das zuletzt ausgewählte Kontrollkästchen
  lastCheckedCheckbox = clickedCheckbox;
}

// Füge Event-Listener für Klick-Ereignisse zu den Checkboxen hinzu
fastCheckbox.addEventListener("click", function () {
  toggle(fastCheckbox);
});

cheapCheckbox.addEventListener("click", function () {
  toggle(cheapCheckbox);
});

goodCheckbox.addEventListener("click", function () {
  toggle(goodCheckbox);
});
*/
