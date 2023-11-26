// Script for todoApp

"use strict";

// Wähle Elemente
const h1 = document.querySelector("h1");
const p = document.querySelector("p");
const txt = document.createTextNode(" - TextNode: Hey!");

const ul = document.querySelector("ul");

const first = ul.children[0];
const last = ul.children[2];
ul.insertBefore(last, first);

// Wähle Zielstandorte
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

// Neues Element erstellen
const h2 = document.createElement("h2");

// Ändere Inhalte
h1.textContent = "1. Überschrift verschoben";
h2.textContent = "2. Überschrift dynamisch";
p.textContent = "Text verschoben";

// Hänge in Ziel ein
header.appendChild(h1);
main.appendChild(h2);
footer.appendChild(p);
h1.appendChild(txt);

/* Serialisieren */

const obj = [
  {
    name: "Lars",
    age: 44,
    hobbies: ["Memes", "Cats"],
  },
  {
    name: "Rebecca",
    age: 34,
    hobbies: ["stiching", "giraffes"],
  },
];

const str = JSON.stringify(obj);
console.log(str);

const prse = JSON.parse(str);
console.log(prse);

// Lokalstorage

const nameArr = ["Lars", "Jan", "Maik"];

// speichern in Storage
localStorage.setItem("name", JSON.stringify(nameArr));

// auslesen
localStorage.getItem("nameArr");

console.log(JSON.parse(localStorage.getItem("name")));
//localStorage.clear();

/* MINI TODO APP */

const btnNew = document.querySelector("#add");
btnNew.addEventListener("click", function () {
  const ul = document.querySelector("ul");
  const newLi = document.createElement("li");
  const liText = document.createTextNode("neu");
  newLi.appendChild(liText);
  ul.appendChild(newLi);
});

const btnDelete = document.querySelector("#clear");
btnDelete.addEventListener("click", function () {
  const ul = document.querySelector("ul");
  ul.innerText = "";
});
