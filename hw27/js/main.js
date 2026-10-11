"use strict";

const form = document.getElementById("registerForm");

const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");

const fields = {
  email: form.elements.email,
  password: form.elements.password,
  confirmPassword: form.elements.confirmPassword,
  age: form.elements.age,
  city: form.elements.city,
  terms: form.elements.terms,
};

const STORAGE_KEY = "hw27-register-form";

function validateEmail(value) {
  const v = value.trim();
  if (!v) return "Email обов'язковий";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) return "Невірний формат email";
  return "";
}

function validatePassword(value) {
  if (!value) return "Пароль обов'язковий";
  if (value.length < 8) return "Пароль має містити щонайменше 8 символів";
  if (!/\d/.test(value)) return "Пароль має містити хоча б одну цифру";
  if (!/[a-zA-Zа-яА-ЯіІїЇєЄґҐ]/.test(value))
    return "Пароль має містити хоча б одну літеру";
  return "";
}

function validateConfirmPassword(value, password) {
  if (!value) return "Підтвердіть пароль";
  if (value !== password) return "Паролі не збігаються";
  return "";
}

function validateAge(value) {
  const v = value.trim();
  if (!v) return "Вік обов'язковий";
  const n = Number(v);
  if (Number.isNaN(n)) return "Вік має бути числом";
  if (n <= 0) return "Вік має бути більшим за 0";
  if (!/^\d+$/.test(v)) return "Вік має бути цілим числом";
  if (n < 16 || n > 120) return "Вік має бути від 16 до 120";
  return "";
}

function validateCity(value) {
  if (!value) return "Оберіть місто";
  return "";
}

function validateTerms(checked) {
  if (!checked) return "Потрібно погодитись з умовами";
  return "";
}

const validators = {
  email: () => validateEmail(fields.email.value),
  password: () => validatePassword(fields.password.value),
  confirmPassword: () =>
    validateConfirmPassword(
      fields.confirmPassword.value,
      fields.password.value,
    ),
  age: () => validateAge(fields.age.value),
  city: () => validateCity(fields.city.value),
  terms: () => validateTerms(fields.terms.checked),
};

function getErrorEl(name) {
  return form.querySelector(`[data-error-for="${name}"]`);
}

function showError(name, message) {
  getErrorEl(name).textContent = message;
  fields[name].classList.add("invalid");
  fields[name].setAttribute("aria-invalid", "true");
}

function clearError(name) {
  getErrorEl(name).textContent = "";
  fields[name].classList.remove("invalid");
  fields[name].removeAttribute("aria-invalid");
}

function validateField(name) {
  const message = validators[name]();
  if (message) {
    showError(name, message);
    return false;
  }
  clearError(name);
  return true;
}

const touched = new Set();

function validateLive(name) {
  validateField(name);
  if (name === "password" && touched.has("confirmPassword")) {
    validateField("confirmPassword");
  }
}

Object.entries(fields).forEach(([name, el]) => {
  el.addEventListener("focusout", () => {
    touched.add(name);
    validateLive(name);
  });

  const isDiscrete = el.type === "checkbox" || el.tagName === "SELECT";
  el.addEventListener(isDiscrete ? "change" : "input", () => {
    if (isDiscrete) touched.add(name);
    if (touched.has(name)) validateLive(name);
  });
});

function validateAll() {
  const invalid = [];
  Object.keys(fields).forEach((name) => {
    touched.add(name);
    if (!validateField(name)) invalid.push(name);
  });
  return invalid;
}

function collectData() {
  // Пароль у JSON лише для навчального проєкту; у реальному його не можна ні показувати, ні логувати.
  return {
    email: fields.email.value.trim(),
    password: fields.password.value,
    age: Number(fields.age.value),
    city: fields.city.value,
    terms: fields.terms.checked,
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalid = validateAll();

  if (invalid.length > 0) {
    fields[invalid[0]].focus();
    result.textContent = "";
    return;
  }

  result.textContent = JSON.stringify(collectData(), null, 2);
});

// Паролі теж зберігаємо, щоб усі поля відновлювались; у реальному проєкті так не можна: localStorage у відкритому вигляді читає будь-який скрипт на сторінці.
const PERSISTED_FIELDS = [
  "email",
  "password",
  "confirmPassword",
  "age",
  "city",
  "terms",
];

function saveForm() {
  const data = {
    email: fields.email.value,
    password: fields.password.value,
    confirmPassword: fields.confirmPassword.value,
    age: fields.age.value,
    city: fields.city.value,
    terms: fields.terms.checked,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Не вдалося зберегти форму в localStorage:", error);
  }
}

function restoreForm() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);
    if (typeof data !== "object" || data === null) throw new Error("bad data");

    PERSISTED_FIELDS.forEach((name) => {
      if (data[name] === undefined) return;
      if (name === "terms") fields.terms.checked = Boolean(data.terms);
      else fields[name].value = String(data[name]);
    });
  } catch (error) {
    console.error("Не вдалося відновити форму з localStorage:", error);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.error("Не вдалося видалити зіпсований ключ:", removeError);
    }
  }
}

form.addEventListener("input", saveForm);
form.addEventListener("change", saveForm);

restoreForm();

const toggleButtons = document.querySelectorAll("[data-toggle-password]");

function setPasswordVisible(btn, visible) {
  const input = fields[btn.dataset.togglePassword];
  input.type = visible ? "text" : "password";
  btn.textContent = visible ? "Сховати" : "Показати";
  btn.setAttribute("aria-pressed", String(visible));
}

function hideAllPasswords() {
  toggleButtons.forEach((btn) => setPasswordVisible(btn, false));
}

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = fields[btn.dataset.togglePassword];
    setPasswordVisible(btn, input.type === "password");
  });
});

const strengthEl = document.getElementById("passwordStrength");
const STRENGTH_LABELS = {
  weak: "Слабкий",
  medium: "Середній",
  strong: "Сильний",
};

function getPasswordStrength(value) {
  if (!value) return "";
  if (value.length < 8) return "weak";

  let score = 1; // базовий бал: довжина >= 8 уже гарантована перевіркою вище
  if (value.length >= 12) score++;
  if (/\d/.test(value)) score++;
  if (/\p{Ll}/u.test(value) && /\p{Lu}/u.test(value)) score++; // мала + велика літери
  if (/[^\p{L}\d\s]/u.test(value)) score++; // спецсимвол

  if (score <= 2) return "weak";
  if (score === 3) return "medium";
  return "strong";
}

function updatePasswordStrength() {
  const level = getPasswordStrength(fields.password.value);
  strengthEl.dataset.level = level;
  strengthEl.textContent = level ? STRENGTH_LABELS[level] : "";
}

fields.password.addEventListener("input", updatePasswordStrength);

// restoreForm не викликає input, тож індикатор для відновленого пароля оновлюємо вручну
updatePasswordStrength();

clearBtn.addEventListener("click", () => {
  form.reset();

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Не вдалося очистити localStorage:", error);
  }

  Object.keys(fields).forEach(clearError);

  result.textContent = "";

  touched.clear();

  hideAllPasswords();
  updatePasswordStrength();
});
