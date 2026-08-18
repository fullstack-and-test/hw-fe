"use strict";

const padString = (str, length, symbol, toRight = true) => {
  if (typeof str !== "string") {
    return "Error: first argument must be a string.";
  }

  if (!Number.isInteger(length) || length <= 0) {
    return "Error: second argument must be a positive integer.";
  }

  if (typeof symbol !== "string" || symbol.length !== 1) {
    return "Error: third argument must be a single character symbol.";
  }

  if (typeof toRight !== "boolean") {
    return "Error: fourth argument must be a boolean.";
  }

  if (str.length >= length) {
    return str.substring(0, length);
  }

  const paddingLength = length - str.length;
  const padding = symbol.repeat(paddingLength);

  return toRight ? str + padding : padding + str;
};

console.log(padString("hello", 8, "*")); // поверне рядок hello***
console.log(padString("hello", 6, "*", false)); // поверне рядок *hello
console.log(padString("hello", 8, "*", false)); // поверне рядок ***hello
console.log(padString("hello", 2, "*")); // поверне 'he'
console.log(padString("hello", 0, "*")); // поверне Error: second argument must be a positive integer.

console.log(padString("", 8, "*")); // поверне ********
console.log(padString("hello", 8, "**")); // поверне Error: third argument must be a single character symbol.
console.log(padString("hello", 8, "", true)); // поверне Error: third argument must be a single character symbol.
console.log(padString("hello", 8, "*", null)); // поверне Error: fourth argument must be a boolean.

console.log(padString("h", 2, "*")); // поверне 'h*'
console.log(padString("he", 2, "*")); // поверне 'he'
console.log(padString("hel", 2, "*")); // поверне 'he'
