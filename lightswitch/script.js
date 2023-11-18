const background = document.querySelector("body");
const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  if (!background.classList.contains("body-dark")) {
    background.classList.toggle("body-dark");
    btn.classList.add("dark");
    btn.innerText = "Turn the lights on!";

    document.title = "Good Night";
  } else {
    background.classList.toggle("body-dark");
    btn.classList.remove("dark");
    btn.innerText = "Turn the lights off!";

    document.title = "Good Morning";
  }
});
