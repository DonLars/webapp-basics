"use strict";
const main = document.getElementById("main");
const hex = document.getElementById("hex");

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");

//const colors = document.querySelectorAll(".mixer-range");

main.textContent = "Main";
hex.textContent = "Hex";

red.addEventListener("change", (event) => {
  red = red.value;
  return;
});

green.addEventListener("change", (event) => {
  green = green.value;
});

blue.addEventListener("change", (event) => {
  blue = blue.value;
});

function updateTextInput(val) {
  document.getElementById("red").value = val;
}

main.style.backgroundColor = "rgb('red + green + blue)";

/* for (let color of colors) {
 */

/* input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});
 */
