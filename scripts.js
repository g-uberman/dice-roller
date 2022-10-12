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

let numOfD4 = 0;
let numOfD6 = 0;
let numOfD8 = 0;
let numOfD10 = 0;
let numOfD100 = 0;
let numOfD12 = 0;
let numOfD20 = 0;

// FUNCTIONS

plusDice = function (dice) {
  switch (dice) {
    case "D4":
      numOfD4++;
      D4input.value = numOfD4;
      break;
    case "D6":
      numOfD6++;
      D6input.value = numOfD6;
      break;
    case "D8":
      numOfD8++;
      D8input.value = numOfD8;
      break;
    case "D10":
      numOfD10++;
      D10input.value = numOfD10;
      break;
    case "D100":
      numOfD100++;
      D100input.value = numOfD100;
      break;
    case "D12":
      numOfD12++;
      D12input.value = numOfD12;
      break;
    case "D20":
      numOfD20++;
      D20input.value = numOfD20;
      break;
    default:
      console.log("Dice not added yet.");
  }
};

minusDice = function (dice) {
  switch (dice) {
    case "D4":
      if (numOfD4 > 0) {
        numOfD4--;
        D4input.value = numOfD6;
        break;
      } else {
        return null;
      }
    case "D6":
      if (numOfD6 > 0) {
        numOfD6--;
        D6input.value = numOfD6;
        break;
      } else {
        return null;
      }
    case "D8":
      if (numOfD8 > 0) {
        numOfD8--;
        D8input.value = numOfD8;
        break;
      } else {
        return null;
      }
    case "D10":
      if (numOfD10 > 0) {
        numOfD10--;
        D10input.value = numOfD10;
        break;
      } else {
        return null;
      }
    case "D100":
      if (numOfD100 > 0) {
        numOfD100--;
        D100input.value = numOfD100;
        break;
      } else {
        return null;
      }
    case "D12":
      if (numOfD12 > 0) {
        numOfD12--;
        D12input.value = numOfD12;
        break;
      } else {
        return null;
      }
    case "D20":
      if (numOfD20 > 0) {
        numOfD20--;
        D20input.value = numOfD20;
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
  for (dieCurrent; dieCurrent == sides; ) {
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
  // ROLL ALL D4s:
  for (let i = 0; i < numOfD4; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(4);
    } else {
      currentRoll = rollDie(4);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D4: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D4: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D6s:
  for (let i = 0; i < numOfD6; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(6);
    } else {
      currentRoll = rollDie(6);
    }
    rollsTotal = rollsTotal + currentRoll;
    //Create element
    let icon = document.createElement("div");
    icon.classList.add("D6icon");
    icon.innerText = currentRoll;
    individualResults.append(icon);

    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D8s:
  for (let i = 0; i < numOfD8; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(8);
    } else {
      currentRoll = rollDie(8);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D8: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D8: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D10s:
  for (let i = 0; i < numOfD10; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(10);
    } else {
      currentRoll = rollDie(10);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D10: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D10: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D100s:
  for (let i = 0; i < numOfD100; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(100);
    } else {
      currentRoll = rollDie(100);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D100: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D100: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D12s:
  for (let i = 0; i < numOfD12; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(12);
    } else {
      currentRoll = rollDie(12);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D12: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D12: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
  // ROLL ALL D20s:
  for (let i = 0; i < numOfD20; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(20);
    } else {
      currentRoll = rollDie(20);
    }
    rollsTotal = rollsTotal + currentRoll;
    // display:
    if (individualResults.innerText == "") {
      individualResults.innerText = `D20: ${currentRoll}`;
    } else {
      individualResults.innerText =
        individualResults.innerText + `, D20: ${currentRoll}`;
    }
    rollResult.innerText = rollsTotal;
  }
};

// BUTTONS

D4plus.addEventListener("click", (e) => {
  plusDice("D4");
  e.preventDefault();
});
D4minus.addEventListener("click", (e) => {
  minusDice("D4");
  e.preventDefault();
});

D6plus.addEventListener("click", (e) => {
  plusDice("D6");
  e.preventDefault();
});
D6minus.addEventListener("click", (e) => {
  minusDice("D6");
  e.preventDefault();
});

D8plus.addEventListener("click", (e) => {
  plusDice("D8");
  e.preventDefault();
});
D8minus.addEventListener("click", (e) => {
  minusDice("D8");
  e.preventDefault();
});

D10plus.addEventListener("click", (e) => {
  plusDice("D10");
  e.preventDefault();
});
D10minus.addEventListener("click", (e) => {
  minusDice("D10");
  e.preventDefault();
});

D100plus.addEventListener("click", (e) => {
  plusDice("D100");
  e.preventDefault();
});
D100minus.addEventListener("click", (e) => {
  minusDice("D100");
  e.preventDefault();
});

D12plus.addEventListener("click", (e) => {
  plusDice("D12");
  e.preventDefault();
});
D12minus.addEventListener("click", (e) => {
  minusDice("D12");
  e.preventDefault();
});

D20plus.addEventListener("click", (e) => {
  plusDice("D20");
  e.preventDefault();
});
D20minus.addEventListener("click", (e) => {
  minusDice("D20");
  e.preventDefault();
});

roll.addEventListener("click", () => {
  rollAll();
});
