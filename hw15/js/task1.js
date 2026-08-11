"use strict";

// Завдання 1. «Вгадай число» (версія, яка не зависає)
// 1.1. Спочатку  розвідка (обов'язково)
console.log(parseInt(null, 10)); // NaN
parseInt(null, 36); // 11127456

console.log(parseInt(undefined, 10)); // NaN
console.log(parseInt("", 10)); // NaN
console.log(parseInt("   ", 10)); // NaN
console.log(parseInt("42", 10)); // 42
console.log(parseInt("  42  ", 10)); // 42
console.log(parseInt("42abc", 10)); // 42
console.log(parseInt("abc42", 10)); // NaN
console.log(parseInt("3.9", 10)); // 3
console.log(parseInt("-5", 10)); // -5

console.log(Number(null)); // 0
console.log(Number("")); // 0
console.log(Number("42abc")); // NaN
console.log(+null); // 0

// 1.2 Виправляємо все
let guessedCorrectly = false;
let attempts = 0;
const MAX_ATTEMPTS = 5;

const randomNumber = Math.floor(Math.random() * 10) + 1;

do {
  const userGuess = prompt("Вгадай число від 1 до 10:");

  // Cancel
  if (userGuess === null) {
    alert("Гру завершено");
    break;
  }

  // Empty
  if (userGuess.trim() === "") {
    alert("Ви нічого не ввели");
    continue;
  }

  // Not Number
  if (Number.isNaN(Number(userGuess))) {
    alert("Це не число");
    continue;
  }

  // Not integer
  if (!Number.isInteger(Number(userGuess))) {
    alert("Введіть ціле число");
    continue;
  }

  const number = parseInt(userGuess, 10);

  attempts++;

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  guessedCorrectly = number === randomNumber;

  // STOP
  if (attempts === MAX_ATTEMPTS && !guessedCorrectly) {
    alert(`На жаль, це було число ${randomNumber}`);
    break;
  }

  if (number < 1 || number > 10) {
    alert(`Число має бути від 1 до 10. Залишилось спроб: ${attemptsLeft}`); // спроба зараховна
    continue;
  } else if (number === randomNumber) {
    alert(`Вітаю! Ви вгадали число за ${attempts} спроб(и)`);
    break;
  } else if (number < randomNumber) {
    alert(`Замало. Залишилось спроб: ${attemptsLeft}`);
  } else {
    alert(`Забагато. Залишилось спроб: ${attemptsLeft}`);
  }
} while (!guessedCorrectly && attempts < MAX_ATTEMPTS);

//  Наприкінці файлу, у коментарі, напишіть свій варіант перевірки вводу - але через Number() замість parseInt()

//   const number = Number(userGuess);

// додатково перевіряти на ціле число, бо parseInt прийме `parseInt("4.2") // 4`,
// тоді як Number `Number("4.2") // 4.2

//  if (!Number.isInteger(number)) {
//    alert("Введіть ціле число");
//    continue;
//  }

// кращий вибір тут - Number()
