"use strict";

const removeElement = (array, item) => {
  if (!Array.isArray(array)) {
    return "Error: Must be an array.";
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      for (let j = i; j < array.length - 1; j++) {
        array[j] = array[j + 1];
      }
      array.length--;
      i--;
      break; // `break` removes only first occurrence of item value
    }
  }
};

const removeElements = (array, item) => {
  if (!Array.isArray(array)) {
    return "Error: Must be an array.";
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      for (let j = i; j < array.length - 1; j++) {
        array[j] = array[j + 1];
      }

      array.length--;
      i--;
    }
  }
};

const array = [1, 2, 3, 4, 5, 6, 7];
removeElement(array, 5);
console.log(array); // 1, 2, 3, 4, 6, 7]

const arrayDuplicates = [5, 1, 5, 2, 5, 5];
removeElement(arrayDuplicates, 5);
console.log(arrayDuplicates); // [ 1, 5, 2, 5, 5 ]
removeElements(arrayDuplicates, 5);
console.log(arrayDuplicates); // [ 1, 2 ]

const emptyArray = [];
console.log(removeElement(emptyArray, 5)); // function signature returns nothing (but modifies the array) -> undefined
console.log(emptyArray); // []

const notArray = { a: 1 };
console.log(removeElement(notArray, 5)); // "Error: Must be an array."
console.log(notArray); // not changed
