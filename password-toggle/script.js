"use strict";

const input = document.querySelector("input");
const btn = document.querySelector("button");
let showHidePassword = false;

btn.addEventListener("click", function () {
  showHidePassword = !showHidePassword;

  const type = input.getAttribute("type");
  if (showHidePassword) {
    input.setAttribute("type", "text");
    btn.innerText = "Show Password";
  } else {
    input.setAttribute("type", "password");
    btn.innerText = "Hide Password";
  }
});

function preventFormSubmission() {
  return false;
}
