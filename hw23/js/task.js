"use strict";

const list = document.querySelector(".socks > ul"); // безпечніше за document.body.children[0];

const items = [];
let totalLiElements = 0;

const getItems = (element) => {
  if (!element) return;

  for (const child of element.children) {
    if (child.tagName === "LI") {
      console.log(child);
      totalLiElements++;

      const text = [...child.childNodes]
        .filter(
          (node) =>
            node.nodeType === Node.TEXT_NODE || node.nodeName === "SPAN", // span - щоб дістати Білі шкарпетки як edge case
        )
        .map((node) => node.textContent.trim())
        .join(" ")
        .trim();

      if (text) {
        items.push(text);
      }
      getItems(child);
    } else {
      getItems(child);
    }
  }
};

getItems(list);
console.log("Кількість елементів списку:", totalLiElements);
console.log("Кількість непустих елементів списку:", items.length);

console.log(items);
