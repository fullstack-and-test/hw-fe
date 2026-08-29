"use strict";

// array.shift()
const myShift = (array) => {
  if (!Array.isArray(array)) {
    return "Error: Argument must be an array.";
  }

  if (array.length === 0) {
    return undefined;
  }

  const firstElement = array[0];

  for (let i = 0; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }

  array.length = array.length - 1;

  return firstElement;
};

const arrShift = [1, 2, 3, 4, 5];
console.log(myShift(arrShift)); // 1
console.log(arrShift); // [2, 3, 4, 5]

const arrShiftSingle = [42];
console.log(myShift(arrShiftSingle)); // 42
console.log(arrShiftSingle); // []

const arrShiftEmpty = [];
console.log(myShift(arrShiftEmpty)); // undefined
console.log(arrShiftEmpty); // []

// array.reverse()
const myReverse = (array) => {
  if (!Array.isArray(array)) {
    return "Error: Argument must be an array.";
  }

  const middle = Math.floor(array.length / 2);

  for (let i = 0; i < middle; i++) {
    const temp = array[i];
    const oppositeIndex = array.length - 1 - i;

    array[i] = array[oppositeIndex];
    array[oppositeIndex] = temp;
  }

  return array;
};

const arrReverseOdd = [1, 2, 3, 4, 5];
console.log(myReverse(arrReverseOdd)); // [ 5, 4, 3, 2, 1 ]
console.log(arrReverseOdd); // [ 5, 4, 3, 2, 1 ]

const arrReverseEven = [1, 2, 3, 4, 5, 6];
console.log(myReverse(arrReverseEven)); // [ 6, 5, 4, 3, 2, 1 ]
console.log(arrReverseEven); // [ 6, 5, 4, 3, 2, 1 ]

const arrReverseEmpty = [];
console.log(myReverse(arrReverseEmpty)); // [ ]
console.log(arrReverseEmpty); // [ ]

const arrReverseNested = [[], [1], [3, [2]]];
console.log(myReverse(arrReverseNested)); // [ [ 3, [ 2 ] ], [ 1 ], [] ]
console.log(arrReverseNested); // [ [ 3, [ 2 ] ], [ 1 ], [] ]
