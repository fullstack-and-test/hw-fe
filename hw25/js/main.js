"use strict";

const cardsContainer = document.querySelector("[data-cards-container]");

cardsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-read-more-btn]");

  if (!button) {
    return;
  }

  const card = button.closest(".card");
  const longText = card.querySelector(".long-text");

  const isExpanded = card.classList.toggle("expanded");

  longText.hidden = !isExpanded;
  button.textContent = isExpanded ? "Hide" : "Read More";
});
