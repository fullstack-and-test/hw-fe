"use strict";

// 2.1. Секундомір
function showTime() {
  const userInput = prompt("Введіть кількість секунд:");

  if (
    userInput === null ||
    userInput.trim() === "" ||
    Number.isNaN(Number(userInput)) ||
    Number(userInput) < 0 ||
    !Number.isInteger(Number(userInput))
  ) {
    alert("Некоректний ввід");
    return;
  }

  const totalSeconds = Number(userInput);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const result =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");

  alert(result);
}

showTime();

// 2.2. Сума цифр і цифровий корінь
function calculateDigitalRoot() {
  const userInput = prompt("Введіть ціле додатне число:");

  if (
    userInput === null ||
    userInput.trim() === "" ||
    !Number.isInteger(Number(userInput)) ||
    Number(userInput) <= 0
  ) {
    alert("Некоректний ввід");
    return;
  }

  let number = Number(userInput);
  const originalNumber = number;
  let sum = 0;
  const steps = [];

  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }

  steps.push(sum);

  let current = sum;

  while (current >= 10) {
    let nextSum = 0;

    while (current > 0) {
      nextSum += current % 10;
      current = Math.floor(current / 10);
    }

    current = nextSum;
    steps.push(current);
  }

  console.log(`Сума цифр: ${sum}`);
  console.log(`Цифровий корінь: ${current}`);
  console.log(steps.join(" → "));

  alert(
    `Сума цифр: ${sum}, цифровий корінь: ${current}, (${originalNumber} → ${steps.join(" → ")})`,
  );
}

calculateDigitalRoot();

// 2.3. Розмін суми
function exchangeMoney() {
  const nominals = [500, 200, 100, 50, 20, 10, 5, 2, 1];

  const userInput = prompt("Введіть суму в гривнях:");

  if (
    userInput === null ||
    userInput.trim() === "" ||
    !Number.isInteger(Number(userInput)) ||
    Number(userInput) <= 0
  ) {
    alert("Некоректний ввід");
    return;
  }

  let amount = Number(userInput);
  let totalCount = 0;
  const result = [];

  for (const nominal of nominals) {
    const count = Math.floor(amount / nominal);
    amount = amount % nominal;

    if (count === 0) {
      continue;
    }

    console.log(`${nominal} x ${count}`);
    result.push(`${nominal} x ${count}`);

    totalCount += count;

    if (amount === 0) {
      break;
    }
  }

  const message = `${userInput} → ${result.join(", ")}`;
  console.log(message);
  alert(message);
}

exchangeMoney();
