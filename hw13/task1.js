"use strict";

const rawInput = prompt("Enter age:", "");

const isValidAge =
  rawInput !== null &&
  rawInput.trim() !== "" &&
  Number.isInteger(Number(rawInput));

if (!isValidAge) {
  alert("Некоректний ввід");
} else {
  const age = Number(rawInput);

  if (age < 0) {
    alert("Такого віку не існує");
  } else if (age > 120) {
    alert("Ви точно не бот?");
  } else {
    let message = "";

    if (age <= 6) {
      message = "Дошкільник";
    } else if (age <= 17) {
      message = "Неповнолітній";
    } else if (age <= 64) {
      message = "Дорослий";
    } else {
      message = "Пенсіонер";
    }

    const canDrive = age >= 18 ? "Може керувати авто" : "Не може керувати авто";

    const ticket =
      age <= 6
        ? "Квиток: 0 грн"
        : age <= 17 || age >= 65
          ? "Квиток: 50 грн"
          : "Квиток: 100 грн";

    alert(message);
    console.log(canDrive);
    console.log(ticket);
  }
}
