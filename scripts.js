// SELECTORS

// const D4input = document.getElementById("D4input");
// const D4plus = document.getElementById("D4plus");
// const D4minus = document.getElementById("D4minus");

// const D6input = document.getElementById("D6input");
// const D6plus = document.getElementById("D6plus");
// const D6minus = document.getElementById("D6minus");

// const D8input = document.getElementById("D8input");
// const D8plus = document.getElementById("D8plus");
// const D8minus = document.getElementById("D8minus");

// const D10input = document.getElementById("D10input");
// const D10plus = document.getElementById("D10plus");
// const D10minus = document.getElementById("D10minus");

// const D100input = document.getElementById("D100input");
// const D100plus = document.getElementById("D100plus");
// const D100minus = document.getElementById("D100minus");

// const D12input = document.getElementById("D12input");
// const D12plus = document.getElementById("D12plus");
// const D12minus = document.getElementById("D12minus");

// const D20input = document.getElementById("D20input");
// const D20plus = document.getElementById("D20plus");
// const D20minus = document.getElementById("D20minus");

const rollResult = document.getElementById("rollResult");
const individualResults = document.getElementById("individualResults");
const explodingCheckbox = document.getElementById("exploding");

const cardContainer = document.getElementsByClassName("container")[0];

// STORING ARRAYS

const diceTypes = [4, 6, 8, 10, 100, 12, 20];

let selectors = [];

const numberOfDice = [];
for (let i = 0; i < 101; i++) {
  numberOfDice.push(0);
}

// GENERATE DICE WRAPPERS


const generateAll = function (array) {
  generateCards(array);
  generateSelectors(array);
  generateEventListeners(array);
}

const generateCards = function (array) {
  for (let i = 0; i < array.length; i++) {
    const dieWrapper = document.createElement("div");
    dieWrapper.classList.add("dieWrapper");
    dieWrapper.innerHTML = `
      <h2>D${array[i]}</h2>
      <form class="dieForm" type="get">
          <div>
              <input id="D${array[i]}input" class="numInput" value="0"/>
              <button id="D${array[i]}plus" class="numHandler" onclick="return null">+</button>
              <button id="D${array[i]}minus" class="numHandler">-</button>
          </div>
      </form>
      `;
    cardContainer.append(dieWrapper);
  }
};

const generateSelectors = function (array) {
  for (let i = 0; i < array.length; i++) {
    let object = {
      sides: array[i],
      input: document.getElementById(`D${array[i]}input`),
      plus: document.getElementById(`D${array[i]}plus`),
      minus: document.getElementById(`D${array[i]}minus`),
    };
    selectors.push(object);
  }
};

const generateEventListeners = function (array) {
  for (let i = 0; i < array.length; i++) {
    selectors[i].plus.addEventListener("click", (e) => {
      plusDice(selectors[i].sides, selectors[i].input);
      e.preventDefault();
    });
    selectors[i].minus.addEventListener("click", (e) => {
      minusDice(selectors[i].sides, selectors[i].input);
      e.preventDefault();
    });
  }
};

generateAll(diceTypes);

// FUNCTIONS

const plusDice = function (sides, input) {
  numberOfDice[sides] += 1;
  input.value = numberOfDice[sides];
};

const minusDice = function (sides, input) {
  if (numberOfDice[sides] > 0) {
    numberOfDice[sides] -= 1;
    input.value = numberOfDice[sides];
  } else {
    return null;
  }
};

// ROLL MECHANICS

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

const createIcon = function (sides, currentRoll) {
  let icon = document.createElement("div");
  icon.classList.add("icon");
  icon.classList.add(`D${sides}`);
  icon.innerText = currentRoll;
  individualResults.append(icon);
};

const rollDtype = function (sides) {
  let typeTotal = 0;
  let currentRoll = 0;
  for (let i = 0; i < numberOfDice[sides]; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(sides);
    } else {
      currentRoll = rollDie(sides);
    }
    createIcon(sides, currentRoll);
    typeTotal += currentRoll;
  }
  return typeTotal;
};

// ROLL BUTTON EFFECT

const rollAll = function () {
  individualResults.innerText = "";
  let rollsTotal = 0;
  rollsTotal +=
    rollDtype(4) +
    rollDtype(6) +
    rollDtype(8) +
    rollDtype(10) +
    rollDtype(100) +
    rollDtype(12) +
    rollDtype(20);
  rollResult.innerText = rollsTotal;
};

// BUTTONS

// D4plus.addEventListener("click", (e) => {
//   plusDice(4, D4input);
//   e.preventDefault();
// });
// D4minus.addEventListener("click", (e) => {
//   minusDice(4, D4input);
//   e.preventDefault();
// });

// D6plus.addEventListener("click", (e) => {
//   plusDice(6, D6input);
//   e.preventDefault();
// });
// D6minus.addEventListener("click", (e) => {
//   minusDice(6, D6input);
//   e.preventDefault();
// });

// D8plus.addEventListener("click", (e) => {
//   plusDice(8, D8input);
//   e.preventDefault();
// });
// D8minus.addEventListener("click", (e) => {
//   minusDice(8, D8input);
//   e.preventDefault();
// });

// D10plus.addEventListener("click", (e) => {
//   plusDice(10, D10input);
//   e.preventDefault();
// });
// D10minus.addEventListener("click", (e) => {
//   minusDice(10, D10input);
//   e.preventDefault();
// });

// D100plus.addEventListener("click", (e) => {
//   plusDice(100, D100input);
//   e.preventDefault();
// });
// D100minus.addEventListener("click", (e) => {
//   minusDice(100, D100input);
//   e.preventDefault();
// });

// D12plus.addEventListener("click", (e) => {
//   plusDice(12, D12input);
//   e.preventDefault();
// });
// D12minus.addEventListener("click", (e) => {
//   minusDice(12, D12input);
//   e.preventDefault();
// });

// D20plus.addEventListener("click", (e) => {
//   plusDice(20, D20input);
//   e.preventDefault();
// });
// D20minus.addEventListener("click", (e) => {
//   minusDice(20, D20input);
//   e.preventDefault();
// });

roll.addEventListener("click", () => {
  rollAll();
});

// DISPLAY RESULT:
// if (individualResults.innerText == "") {
//   individualResults.innerText = `D4: ${currentRoll}`;
// } else {
//   individualResults.innerText =
//     individualResults.innerText + `, D4: ${currentRoll}`;
// }
