"use strict";
const main = document.getElementById("main");
const rgb = document.getElementById("rgb");

const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");

const colors = document.querySelectorAll('[name="mixer-range"]');

function updateBackgroundColor() {
  const redValue = redInput.value;
  const greenValue = greenInput.value;
  const blueValue = blueInput.value;

  const backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
  main.style.backgroundColor = backgroundColor;
  rgb.textContent = backgroundColor;
}
redInput.addEventListener("input", updateBackgroundColor);
greenInput.addEventListener("input", updateBackgroundColor);
blueInput.addEventListener("input", updateBackgroundColor);

main.style.backgroundColor = "hotpink";

updateBackgroundColor();
