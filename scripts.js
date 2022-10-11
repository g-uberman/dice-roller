// HOOKS

const D6input = document.getElementById("D6input");
const D6plus = document.getElementById("D6plus");
const D6minus = document.getElementById("D6minus");
const rollResult = document.getElementById("rollResult");

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

let dieResult = 1;

const rollDie = function (sides) {
  dieResult = 1;
  for (let i = 0; i < sides - 1; i++) {
    if (Math.random() < 0.5) {
      dieResult++;
    }
  }
  rollResult.innerText = dieResult;
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
  rollDie(100);
});
