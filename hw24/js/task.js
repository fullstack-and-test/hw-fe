"use strict";

// без використання querySelector

const input = document.getElementsByTagName("input")[0]; // надійніше document.querySelector("input");
const divGhost = document.getElementsByTagName("div")[1]; // надійніше document.querySelector(".ghost");

const before = ["𓆩", "☾⋆", "༺", "꧁", "✧"];
const after = ["𓆪", "⋆☽", "༻", "꧂", "✧"];
const ghostEmodji = "👻";

const random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

divGhost.style.display = "none";

input.addEventListener("focus", function () {
  divGhost.textContent = `${random(before)} ${ghostEmodji}  ${random(after)}`;
  divGhost.style.display = "inline-block"; // щоб div появлявся збоку від input по умові завдання
});

input.addEventListener("blur", function () {
  divGhost.style.display = "none";
});
