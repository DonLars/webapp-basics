"use strict";

const form = document.querySelector("#form");
const firstInputPassword = document.querySelector(".first-input-password");
const secondInputPassword = document.querySelector(".second-input-password");
const button = document.querySelector("button");

const checkSpanEqual = document.querySelector(".check-equal");
const checkSpanLower = document.querySelector(".check-lower");
const checkSpanUpper = document.querySelector(".check-upper");
const checkSpanNumber = document.querySelector(".check-number");
const checkSpanLength = document.querySelector(".check-length");

/*    EVENT LISTENER - Show / Hide Passwords
========================================================================== */

button.addEventListener("click", function () {
  if (button.innerText === "Show Passwords") {
    firstInputPassword.type = "text";
    secondInputPassword.type = "text";
    button.innerText = "Hide Passwords";
  } else {
    firstInputPassword.type = "password";
    secondInputPassword.type = "password";
    button.innerText = "Show Passwords";
  }
});

/*    EVENT LISTENER - Change First Input Password
========================================================================== */
firstInputPassword.addEventListener("input", equalCheck);
secondInputPassword.addEventListener("input", equalCheck);

function equalCheck() {
  if (firstInputPassword.value !== secondInputPassword.value) {
    checkSpanEqual.innerText = "❌";
    checkSpanLower.innerText = "❌";
    checkSpanUpper.innerText = "❌";
    checkSpanNumber.innerText = "❌";
    checkSpanLength.innerText = "❌";
  } else {
    checkSpanEqual.innerText = "✅";

    if (checklowercase(firstInputPassword.value)) {
      checkSpanLower.innerText = "✅";
    }
    if (checkUppercase(firstInputPassword.value)) {
      checkSpanUpper.innerText = "✅";
    }
    if (checkNumber(firstInputPassword.value)) {
      checkSpanNumber.innerText = "✅";
    }
    if (checkLength(firstInputPassword.value)) {
      checkSpanLength.innerText = "✅";
    }
  }
}

/*    FUNCTIONS - for further tests
========================================================================== */

function checkUppercase(string) {
  return /[A-Z]/.test(string);
}

function checklowercase(string) {
  return /[a-z]/.test(string);
}

function checkNumber(string) {
  return /[0-9]/.test(string);
}

function checkLength(string) {
  if (string.length >= 10) {
    return true;
  }
}
