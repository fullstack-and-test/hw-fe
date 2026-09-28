const list = document.querySelector(".list");
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("itemInput");

const addItem = () => {
  const text = input.value.trim();

  if (!text) {
    return;
  }

  const liElement = document.createElement("li");
  const spanElement = document.createElement("span");
  spanElement.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "✖";
  removeBtn.classList.add("remove");

  liElement.append(spanElement, removeBtn);
  const listElement = document.querySelector(".list"); // пошук наново для уникнеття side-effects типу stale reference
  listElement.append(liElement);

  input.value = "";
  input.focus();
};

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});

list.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("remove")) {
    target.closest("li")?.remove();
    return;
  }

  const liElement = target.closest("li");
  if (liElement) {
    liElement.classList.toggle("selected");
  }
});
