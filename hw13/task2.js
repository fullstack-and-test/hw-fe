"use strict";

const scaleNames = {
  f: "Фаренгейт",
  k: "Кельвін",
  r: "Ранкін",
};

// // 2.1

const celsius = Number.parseFloat(
  prompt("Значення температури в Цельсіях: ", ""),
);
const scale = String(prompt("Цільова шкала (F, K, R): ", ""))
  .toLowerCase()
  .trim();

if (Number.isNaN(celsius)) {
  console.log("Некоректне значення! Будь ласка, введіть число.");
} else if (celsius < -273.15) {
  console.log("Нижче абсолютного нуля");
} else {
  let convertedTemp;
  let scaleName;

  // // 2.1-2.2 use switch

  //  switch (scale) {
  //    case "f":
  //      convertedTemp = celsius * 1.8 + 32;
  //      scaleName = "Фаренгейт";
  //      break;

  //    case "k":
  //      convertedTemp = celsius + 273.15;
  //      scaleName = "Кельвін";
  //      break;

  //    case "r":
  //      convertedTemp = (celsius + 273.15) * 1.8;
  //      scaleName = "Ранкін";
  //      break;

  //    default:
  //      scaleName = null;
  //  }

  // // 2.3 no switch

  const scaleConverters = {
    f: (c) => c * 1.8 + 32,
    k: (c) => c + 273.15,
    r: (c) => (c + 273.15) * 1.8,
  };

  const isKnownScale = Object.hasOwn(scaleNames, scale);

  if (isKnownScale) {
    scaleName = scaleNames[scale];
    convertedTemp = convertedTemp ?? scaleConverters[scale](celsius); // ?? to keep compatible with switch version of the task

    const roundedResult = Math.round(convertedTemp * 100) / 100;

    const tempStatus =
      celsius < -10
        ? "мороз"
        : celsius <= 0
          ? "холодно"
          : celsius <= 15
            ? "прохолодно"
            : celsius <= 25
              ? "комфортно"
              : "спека";

    console.log(
      `${celsius} °C = ${roundedResult} (${scaleName}) — ${tempStatus}`,
    );
  } else {
    console.log("Невідома шкала! Оберіть: F, K або R");
  }
}
