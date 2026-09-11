"use strict";

// General idea:
//
// Usually we have:
// greet() function, user object, and user.greet()
//
// What we want:
// greet.myCall(user, 18)
//
// How:
//
// 1. Add a custom myCall() method to Function.prototype
//    so every function can use greet.myCall(...)
//
// 2. `this` inside myCall refers to the original function
//
// 3. Temporarily add the function as a property of the object
//    passed as an argument (= user):
//    thisObj[fn] = this  →  user[fn] = greet
//    Symbol() as a property name helps avoid collisions
//
// 4. Call the function through `thisObj`:
//    thisObj[fn](...args)
//
// 5. Remove the temporary property
//
// 6. Return the result

// myBind is different:
// It does not call the function immediately.
// It returns a new function with `this` and bound arguments.

Function.prototype.myBind = function (thisObj, ...boundArgs) {
  const self = this; // the original function, e.g. greet

  if (typeof self !== "function") {
    throw new TypeError("myBind can only be called on functions");
  }

  return function (...args) {
    return self.myApply(thisObj, [...boundArgs, ...args]);
  };
};

Function.prototype.myCall = function (thisObj, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall can only be called on functions");
  }

  const context = thisObj != null ? Object(thisObj) : globalThis;

  const fn = Symbol();
  context[fn] = this; // temporarily: user[fn] = greet

  try {
    return context[fn](...args);
  } finally {
    delete context[fn];
  }
};

// `args` is an array of arguments
Function.prototype.myApply = function (thisObj, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply can only be called on functions");
  }
  const safeArgs = args === null || args === undefined ? [] : args;

  if (typeof safeArgs[Symbol.iterator] !== "function") {
    throw new TypeError("Invalid args");
  }

  return this.myCall(thisObj, ...safeArgs);
};

function greet(age = -1, location = "Italy") {
  return `I'm ${this.name}, ${age} years old, from ${location}`;
}

const user = {
  name: "Joe",
};

const bound = greet.myBind(user, 99, "Ukraine");
console.log("myBind:", bound);
console.log("myBind() called:", bound()); // I'm Joe, 99 years old, from Ukraine
console.log("myBind() called:", bound(18, "Poland")); // still I'm Joe, 99 years old, from Ukraine
console.log("myBind():", greet.myBind(user, 18, "Poland")()); // I'm Joe, 18 years old, from Poland
console.log("myBind() partial:", greet.myBind(user, 18)()); // I'm Joe, 18 years old, from Italy
console.log("myBind() called w/o args:", greet.myBind(user)()); // I'm Joe, -1 years old, from Italy
console.log("myCall:", greet.myCall(user, 98, "Germany")); // I'm Joe, 98 years old, from Germany
console.log("myApply:", greet.myApply(user, [97, "Germany"])); // I'm Joe, 97 years old, from Germany
console.log("myApply invalid", greet.myApply(user, null)); // I'm Joe, -1 years old, from Italy
