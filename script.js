const range = document.getElementById("range");
const rangeValue = document.getElementById("rangeValue");
const checkBoxes = document.querySelectorAll(".settings__option-checkbox");
const settingsStrength = document.querySelector(".settings__strength-value");
const settingsStrengthEls = [
  document.querySelector("#settingsStrengthEl1"),
  document.querySelector("#settingsStrengthEl2"),
  document.querySelector("#settingsStrengthEl3"),
  document.querySelector("#settingsStrengthEl4"),
];
const generateBtn = document.querySelector("#generateBtn");
const passwordInput = document.querySelector("#passwordInput");
const copySign = document.querySelector(".password-generator__copy-sign");
const modalCopied = document.querySelector(".modal");
const themeSwitcher = document.querySelector("#themeSwitcher");

function updateStrengthTextAndClasses() {
  const trueCheckBoxes = Array.from(checkBoxes).filter((cb) => cb.checked);

  settingsStrengthEls.forEach((el) => (el.className = ""));
  settingsStrength.innerHTML = "";

  let strengthText = "";
  let strengthClass = "";

  if (trueCheckBoxes.length === 1) {
    if (range.value < 10) {
      strengthText = "VERY EASY";
      strengthClass = "settings__strength-easy";
      settingsStrengthEls[0].classList.add(strengthClass);
    } else {
      strengthText = "EASY";
      strengthClass = "settings__strength-easy";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
    }
  } else if (trueCheckBoxes.length === 2) {
    if (range.value < 10) {
      strengthText = "EASY";
      strengthClass = "settings__strength-easy";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
    } else {
      strengthText = "MEDIUM";
      strengthClass = "settings__strength-medium";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
      settingsStrengthEls[2].classList.add(strengthClass);
    }
  } else if (trueCheckBoxes.length === 3) {
    if (range.value < 10) {
      strengthText = "MEDIUM";
      strengthClass = "settings__strength-medium";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
      settingsStrengthEls[2].classList.add(strengthClass);
    } else {
      strengthText = "HARD";
      strengthClass = "settings__strength-hard";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
      settingsStrengthEls[2].classList.add(strengthClass);
      settingsStrengthEls[3].classList.add(strengthClass);
    }
  } else if (trueCheckBoxes.length === 4) {
    if (range.value < 10) {
      strengthText = "MEDIUM";
      strengthClass = "settings__strength-medium";
      settingsStrengthEls[0].classList.add(strengthClass);
      settingsStrengthEls[1].classList.add(strengthClass);
      settingsStrengthEls[2].classList.add(strengthClass);
    } else {
      strengthText = "HARD";
      strengthClass = "settings__strength-hard";
      settingsStrengthEls.forEach((el) => el.classList.add(strengthClass));
    }
  }

  settingsStrength.innerHTML = strengthText;
}

function randomPass(length) {
  let res = "";
  let characters = "";
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) {
      characters += checkBox.dataset.chars;
    }
  });

  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    res += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return res;
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("change", (event) => {
    const trueCheckBoxes = Array.from(checkBoxes).filter((cb) => cb.checked);

    if (trueCheckBoxes.length === 0) {
      event.preventDefault();
      checkBox.checked = true;
      return;
    }

    updateStrengthTextAndClasses();
  });
});

range.addEventListener("input", () => {
  rangeValue.innerHTML = range.value;
  updateStrengthTextAndClasses();
});

themeSwitcher.addEventListener("change", function () {
  document.body.classList.toggle("dark-theme");
});

document.addEventListener("DOMContentLoaded", () => {
  const trueCheckBoxes = Array.from(checkBoxes).filter((cb) => cb.checked);

  if (trueCheckBoxes.length === 0) {
    checkBoxes[0].checked = true;
  }

  updateStrengthTextAndClasses();
});

generateBtn.addEventListener("click", () => {
  passwordInput.value = randomPass(range.value);
});

copySign.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        modalCopied.classList.add("display-block");
        setTimeout(() => {
          modalCopied.classList.remove("display-block");
        }, 3000);
        console.log("CCCOOOOOPPPIIIEEEDDD!!!");
      })
      .catch((err) => {
        console.error("FAILED:((((", err);
      });
  }
});
