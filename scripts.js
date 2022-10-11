// HOOKS

const D6input = document.getElementById("D6input");
const D6plus = document.getElementById("D6plus");
const D6minus = document.getElementById("D6minus");
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

const rollAll = function () {
  individualResults.innerText = "";
  let rollsTotal = 0;
  // ROLL ALL D6s:
  for (let i = 0; i < numOfD6; i++) {
    let currentRoll = rollDie(6);
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
