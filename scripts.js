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

const rollanddisplay = function (sides) {
    rollDie(sides);
    displayResult();
}

const rollDie = function (sides) {
  dieResult = 1;

  function singleTest() {
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.5) {
        resolve();
        dieResult++;
      } else {
        reject();
      }
    });
  }

  for (let i = 0; i < sides - 1; i++) {
    singleTest()
      .then(() => {
        console.log("rolled");
      })
      .catch(() => {
        return null;
      });
  }

};

const displayResult = function () {
    rollResult.innerText = dieResult;
}

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
    rollanddisplay(4);
});