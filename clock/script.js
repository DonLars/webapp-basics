"use strict";

function updateClock() {
  let selectDatetime = document.querySelector("time");

  // digital vars
  let selectDigitalHours = document.querySelector(".digital-hours");
  let selectDigitalMinutes = document.querySelector(".digital-minutes");
  let selectDigitalSeconds = document.querySelector(".digital-seconds");
  let selectDigitalSpacer = document.querySelectorAll(".digital-spacer");

  // analog vars
  let selectAnalogHours = document.querySelector(".analog-hours");
  let selectAnalogMinutes = document.querySelector(".analog-minutes");
  let selectAnalogSeconds = document.querySelector(".analog-seconds");

  // Get date / time
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // set currentTime to HTML
  selectDigitalHours.textContent = leadingZero(hours);
  selectDigitalMinutes.textContent = leadingZero(minutes);
  selectDigitalSeconds.textContent = leadingZero(seconds);
  for (const space of selectDigitalSpacer) {
    space.textContent = ":";
    space.classList.toggle("hidden");
  }

  //selectSpacer.toggle("remove");
  selectDatetime.setAttribute(
    "datetime",
    leadingZero(year) + "-" + leadingZero(month) + "-" + leadingZero(day)
  );

  // analog clock set degree
  selectAnalogHours.style.setProperty("--hours", hours * 30 + "deg"); // 360° / 30 = 12 hours
  selectAnalogMinutes.style.setProperty("--minutes", minutes * 6 + "deg"); // 360° / 6  = 60 minutes
  selectAnalogSeconds.style.setProperty("--seconds", seconds * 6 + "deg"); // 360° / 6  = 60 seconds
}

function leadingZero(num) {
  if (String(num).length === 1) {
    return "0" + num;
  } else {
    return num;
  }
}

// Render
updateClock();

// Time update after one second
setInterval(updateClock, 1000);
