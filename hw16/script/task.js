"use strict";

const generateKey = (length, characters) => {
  if (!Number.isInteger(length) || length < 1) {
    return "Length must be a positive integer.";
  }

  if (typeof characters !== "string" || characters.length === 0) {
    return "Characters must be a non-empty string.";
  }

  let key = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    key += characters[randomIndex];
  }

  return key;
};

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

const key = generateKey(16, characters);
console.log("Valid key, length = 16: ", key);

const keyShort = generateKey(1, characters);
console.log("Valid key, length = 1: ", keyShort);

const keyEmpty = generateKey(0, characters);
console.log("Empty key, length = 0: ", keyEmpty);

const keyLengthInvalid1 = generateKey(-1, characters);
console.log("Length = -1: ", keyLengthInvalid1);

const keyLengthInvalid2 = generateKey(0.5, characters);
console.log("Length = 0.5: ", keyLengthInvalid2);

const keyLengthInvalid3 = generateKey(null, characters);
console.log("Length = null: ", keyLengthInvalid3);

const keyEmptyCharacters = generateKey(8, "");
console.log("Empty chars: ", keyEmptyCharacters);

const keyCharsInvalid = generateKey(8, 12345);
console.log("Non-string chars: ", keyCharsInvalid);
