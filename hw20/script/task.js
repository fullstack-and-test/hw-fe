"use strict";

const isValid = (array) => Array.isArray(array) && array.length > 0;
const isNegative = (num) => num < 0;
const isPositive = (num) => num > 0;
const isOdd = (num) => num % 2 !== 0;
const isEven = (num) => num % 2 === 0;

//Знайти мінімальний елемент масиву та його порядковий номер.
const findMin = (array) => {
  if (!isValid(array)) {
    return [null, -1];
  }

  let minElement = array[0];
  let minIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minElement) {
      minElement = array[i];
      minIndex = i;
    }
  }
  return [minElement, minIndex];
};

//Знайти максимальний елемент масиву та його порядковий номер.
const findMax = (array) => {
  if (!isValid(array)) {
    return [null, -1];
  }

  let maxElement = array[0];
  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
      maxIndex = i;
    }
  }
  return [maxElement, maxIndex];
};

//Визначити кількість негативних елементів.
const countNegative = (array) => {
  if (!isValid(array)) {
    return 0;
  }

  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (isNegative(array[i])) {
      count += 1;
    }
  }
  return count;
};

//Знайти кількість непарних позитивних елементів.
const countOddPositive = (array) => {
  if (!isValid(array)) {
    return 0;
  }

  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (isOdd(array[i]) && isPositive(array[i])) {
      count += 1;
    }
  }
  return count;
};

//Знайти кількість парних позитивних елементів.
const countEvenPositive = (array) => {
  if (!isValid(array)) {
    return 0;
  }
  let count = 0;

  for (let i = 0; i < array.length; i++) {
    if (isEven(array[i]) && isPositive(array[i])) {
      count += 1;
    }
  }
  return count;
};

//Знайти суму парних позитивних елементів.
const mySum = (...numbers) => {
  let total = 0;
  for (let num of numbers) {
    total += Number(num);
  }
  return total;
};

const filterEvenPositive = (array) => {
  if (!isValid(array)) {
    return [];
  }

  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (isEven(array[i]) && isPositive(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

//Знайти суму непарних позитивних елементів.
const filterOddPositive = (array) => {
  if (!isValid(array)) {
    return [];
  }

  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (isOdd(array[i]) && isPositive(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

//Знайти добуток позитивних елементів.
const myProduct = (...numbers) => {
  if (numbers.length === 0) {
    return "Error: At least one argument is required.";
  }
  let result = 1n; // use BigInt for accuracy

  for (let num of numbers) {
    result *= BigInt(num);
  }

  return result;
};

const filterPositive = (array) => {
  if (!isValid(array)) {
    return [];
  }

  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (isPositive(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

//Знайти найбільший серед елементів масиву, ост альні обнулити.
const zeroExceptMax = (array) => {
  if (!isValid(array)) {
    return [];
  }

  const result = [];

  const [maxElement, maxIndex] = findMax(array);

  for (let i = 0; i < array.length; i++) {
    if (i === maxIndex) {
      result[i] = maxElement;
    } else {
      result[i] = 0;
    }
  }
  return result;
};

const array = [
  16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54,
  76, -4, 12, -35, 4, 47,
];

console.log(findMin(array)); // [ -63, 15 ]
console.log(findMax(array)); // [ 76, 18 ]

console.log(countNegative(array)); // 10

console.log(countOddPositive(array)); // 4
console.log(countEvenPositive(array)); // 10

console.log(filterEvenPositive(array)); // [16, 54, 72,  4, 46, 4,  4, 76, 12,  4]
console.log(filterOddPositive(array)); // [ 47, 25, 27, 47 ]

console.log(mySum(...filterEvenPositive(array))); // 292
console.log(mySum(...filterOddPositive(array))); // 146

console.log(myProduct(...filterPositive(array))); // 996181249307443200n

console.log(zeroExceptMax(array));

/* => 
[
  0, 0,  0, 0, 0, 0, 0, 0,
  0, 0,  0, 0, 0, 0, 0, 0,
  0, 0, 76, 0, 0, 0, 0, 0
]
*/
