"use strict";

const removeElementSplice = (array, item) => {
  if (!Array.isArray(array)) {
    return "Error: Must be an array.";
  }

  let index = array.indexOf(item);

  if (index !== -1) {
    array.splice(index, 1);
  }

  return array;
};

const removeElementsSplice = (array, item) => {
  if (!Array.isArray(array)) {
    return "Error: Must be an array.";
  }

  let index = array.indexOf(item);

  while (index !== -1) {
    array.splice(index, 1);
    index = array.indexOf(item);
  }

  return array;
};

const array2 = [1, 2, 3, 4, 5, 6, 7];
removeElementSplice(array2, 5);
console.log(array2); // [1, 2, 3, 4, 6, 7]

const arrayDuplicates2 = [5, 1, 5, 5, 5];
removeElementSplice(arrayDuplicates2, 5);
console.log(arrayDuplicates2); // [ 1, 5, 5, 5 ]
removeElementsSplice(arrayDuplicates2, 5);
console.log(arrayDuplicates2); // [ 1 ]

const emptyArray2 = [];
console.log(removeElementSplice(emptyArray2, 5)); // function signature returns array (and modifies the array with splice) -> []
console.log(emptyArray2); // []

const notArray2 = { a: 1 };
console.log(removeElementSplice(notArray2, 5)); // "Error: Must be an array."
console.log(notArray2); // not changed { a: 1 }
