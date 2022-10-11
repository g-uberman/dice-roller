// HOOKS

const D4input = document.getElementById("D4input");
const D4plus = document.getElementById("D4plus");
const D4minus = document.getElementById("D4minus");

const D6input = document.getElementById("D6input");
const D6plus = document.getElementById("D6plus");
const D6minus = document.getElementById("D6minus");

const D8input = document.getElementById("D8input");
const D8plus = document.getElementById("D8plus");
const D8minus = document.getElementById("D8minus");

const D10input = document.getElementById("D10input");
const D10plus = document.getElementById("D10plus");
const D10minus = document.getElementById("D10minus");

const D100input = document.getElementById("D100input");
const D100plus = document.getElementById("D100plus");
const D100minus = document.getElementById("D100minus");

const D12input = document.getElementById("D12input");
const D12plus = document.getElementById("D12plus");
const D12minus = document.getElementById("D12minus");

const D20input = document.getElementById("D20input");
const D20plus = document.getElementById("D20plus");
const D20minus = document.getElementById("D20minus");

const rollResult = document.getElementById("rollResult");
const individualResults = document.getElementById("individualResults");
const explodingCheckbox = document.getElementById("exploding");

// VARIABLES

let numOfD6 = 0;

// FUNCTIONS

plusDice = function (dice) {
  switch (dice) {
    case "D6":
      numOfD6++;
      D6input.value = numOfD6;
      break;
    default:
      console.log("Dice not added yet.");
  }
};

minusDice = function (dice) {
  switch (dice) {
    case "D6":
      if (numOfD6 > 0) {
        numOfD6--;
        D6input.value = numOfD6;
        break;
      } else {
        return null;
      }
    default:
      console.log("Dice not added yet.");
  }
};

// ROLL MECHANIC

const rollDie = function (sides) {
  let dieCurrent = Math.ceil(Math.random() * Number(sides));
  return dieCurrent;
};

const rollExploding = function (sides) {
  let dieTotal = 0;
  let dieCurrent = rollDie(sides);
  dieTotal = dieTotal + dieCurrent;
  for ( dieCurrent; dieCurrent == sides; ) {
      dieCurrent = rollDie(sides);
      dieTotal = dieTotal + dieCurrent;
    }
  return dieTotal;
};

// ROLL BUTTON EFFECT

const rollAll = function () {
  individualResults.innerText = "";
  let rollsTotal = 0;
  let currentRoll = 0;
  // ROLL ALL D6s:
  for (let i = 0; i < numOfD6; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(6);
    } else {
      currentRoll = rollDie(6);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D6: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D6: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
};

// BUTTONS

D6plus.addEventListener("click", (e) => {
  plusDice("D6");
  e.preventDefault();
});
D6minus.addEventListener("click", (e) => {
  minusDice("D6");
  e.preventDefault();
});
roll.addEventListener("click", () => {
  rollAll();
});
