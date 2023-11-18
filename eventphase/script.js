/*function logEvent(e) {
  console.log(e.target);
  console.log(e.currentTarget);
  console.log(e.eventPhase);
}

function cleanlog(e) {
  console.clear(e);
}

document.querySelector("body").addEventListener("click", logEvent);
document.querySelector(".log").addEventListener("click", logEvent);
document.querySelector(".clean").addEventListener("click", cleanlog);
*/

const btn1 = document.querySelector(".btn-click");
btn1.addEventListener("click", function (e) {
  btn2.classList.toggle("btn-large");
  console.log(" Button wurde geklickt!");
  //e.stopPropagation(); // Stoppt an der Stelle und gibt main nicht mehr aus
});

const btn2 = document.querySelector(".btn-toggle");
btn2.addEventListener("click", function () {
  btn1.classList.add("btn-large");
  console.log("Toogle wurde geklickt!");
});
