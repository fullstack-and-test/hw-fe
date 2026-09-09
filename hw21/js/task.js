"use strict";

const products = [
  { id: "З1", name: "Mouse", price: 25, inStock: true },
  { id: 2, name: "Keyboard", price: 70, inStock: false },
  { id: 3, name: "Monitor", price: 210, inStock: true },
];

// 1) map + умовна трансформація
const resultProducts = products.map((product) => {
  return `${product.name}: $${product.price}${product.inStock ? "" : " (out of stock)"}`;
});

console.log("Task 1:", resultProducts);

// 2) filter + декілька умов
const users = [
  { id: 1, age: 17, active: true, email: "a@mail.com" },
  { id: 2, age: 22, active: true, email: "b@spam.com" },
  { id: 3, age: 30, active: false, email: "c@mail.com" },
  { id: 4, age: 35, active: true, email: "d@mail.com" },
  { id: 5, age: 40, active: true, email: "e@mail.com" },
];

const usersFiltered = users.filter((user) => {
  return (
    user.active === true &&
    user.age >= 18 &&
    user.age <= 35 &&
    !user.email?.toLowerCase().endsWith("@spam.com")
  );
});

console.log("Task 2:", usersFiltered);

// 3) reduce → групування
const tx = [
  { id: "м1", category: "food", amount: 12 },
  { id: 2, category: "food", amount: 8 },
  { id: 3, category: "taxi", amount: 15 },
  { id: 4, category: "books", amount: 20 },
  { id: 5, category: "taxi", amount: 7 },
];

const resultTx = tx.reduce((acc, transaction) => {
  const category = transaction.category;
  acc[category] = (acc[category] || 0) + Number(transaction.amount);

  return acc;
}, {});

console.log("Task 3:", resultTx);

// 4) find + пошук по вкладених даних
// Знайдіть перший ордер, в якому є товар з sku === "B2". Поверніть весь ордер.

const orders = [
  {
    id: "с101",
    items: [
      { sku: "A1", qty: 1 },
      { sku: "C3", qty: 2 },
    ],
  },
  { id: 102, items: [{ sku: "B2", qty: 1 }] },
  {
    id: 103,
    items: [
      { sku: "B2", qty: 3 },
      { sku: "A1", qty: 1 },
    ],
  },
];

const firstOrderWithB2 = orders.find((order) =>
  order.items?.some((item) => item.sku === "B2"),
);

console.log("Task 4:", firstOrderWithB2);
