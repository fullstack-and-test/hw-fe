"use strict";

//1. Вивести числа від 20 до 30 через пропуск, використовуючи крок 0,5 (20 20,5 21 21,5….).
let numbers = ``;
for (let i = 20; i <= 30; i += 0.5) {
  numbers += `${i} `;
}
console.log(numbers);

//2. Один долар коштує 27 гривень. Вивести дані з розрахунком вартості 10, 20, 30... 100 доларів.
for (let amount = 10; amount <= 100; amount += 10) {
  console.log(`${amount} USD = ${amount * 27} UAH`);
}

//3. Дане ціле число. Вивести всі цілі числа від 1 до 100, квадрат яких не перевищує числа N.
const N = 50;
for (let n = 1; n <= 100; n++) {
  if (n * n <= N) {
    console.log(n);
  }
}

//4. Дане ціле число. З'ясувати, чи є воно простим (простим називається число, більше 1, які не мають інших дільників крім 1 і себе).
const numberToCheck = 31;

let isPrime = numberToCheck > 1;

for (let n = 2; n < numberToCheck; n++) {
  if (numberToCheck % n === 0) {
    isPrime = false;
    break;
  }
}

console.log(numberToCheck, isPrime ? `Просте число` : `Не просте число`);

//5. Дане деяке число. Визначити, чи можна одержати це число шляхом зведення числа 3 у деякий ступінь. (Наприклад, числа 9, 81 можна отримати, а 13 - не можна).
const numToCheck = 81;
let base = 3;
let power = 1;
let isPowerThree = false;

while (power <= numToCheck) {
  if (power === numToCheck) {
    isPowerThree = true;
    break;
  }
  power *= base;
}

console.log(
  numToCheck,
  isPowerThree ? `Це степінь числа ${base}` : `Не степінь числа ${base}`,
);
