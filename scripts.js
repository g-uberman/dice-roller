// STORING ARRAYS

const diceTypes = [4, 6, 8, 10, 12, 20];

let selectors = [];

const numberOfDice = [];
for (let i = 0; i < 101; i++) {
  numberOfDice.push(0);
}

// SELECTORS

const rollResult = document.getElementById("rollResult");
const individualResults = document.getElementById("individualResults");
const recordedResults = document.getElementById("recordedResults");
const explodingCheckbox = document.getElementById("exploding");
const cardContainer = document.getElementById("cardContainer");

// GENERATE DICE WRAPPERS

const generateAll = function (array) {
  generateCards(array);
  generateSelectors(array);
  generateEventListeners(array);
};

const generateCards = function (array) {
  for (let i = 0; i < array.length; i++) {
    const dieWrapper = document.createElement("div");
    dieWrapper.classList.add("dieWrapper");
    dieWrapper.innerHTML = `
      <form class="dieForm" type="get">
          <div>
              <input id="D${array[i]}input" value="0" class="numInput D${array[i]} icon" onClick=(this.select()) />
              <section>
              <button id="D${array[i]}plus" class="numHandler" onclick="return null">+</button>
              <button id="D${array[i]}minus" class="numHandler">-</button>
              </section>
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
    selectors[i].input.addEventListener("change", (e) => {
      manualInput(selectors[i].sides, selectors[i].input);
      e.preventDefault();
    });
    selectors[i].input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        selectors[i].input.blur();
        event.preventDefault();
      };
    });
  }
};

generateAll(diceTypes);

// INPUT FUNCTIONS

const plusDice = function (sides, input) {
  numberOfDice[sides] += 1;
  input.value = numberOfDice[sides];
};

const minusDice = function (sides, input) {
  if (numberOfDice[sides] > 0) {
    numberOfDice[sides] -= 1;
    input.value = numberOfDice[sides];
  }
};

const manualInput = function (sides, input) {
  numberOfDice[sides] = Number(input.value);
};

// ROLL MECHANICS

const rollOnce = function (sides) {
  let dieCurrent = Math.ceil(Math.random() * Number(sides));
  return dieCurrent;
};

const rollExploding = function (sides) {
  let dieTotal = 0;
  let dieCurrent = rollOnce(sides);
  dieTotal = dieTotal + dieCurrent;
  for (dieCurrent; dieCurrent == sides; ) {
    dieCurrent = rollOnce(sides);
    dieTotal = dieTotal + dieCurrent;
  }
  return dieTotal;
};

const createIcon = function (sides, currentRoll) {
  let icon = document.createElement("div");
  icon.classList.add(`D${sides}`);
  icon.classList.add("icon");
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
      currentRoll = rollOnce(sides);
    }
    createIcon(sides, currentRoll);
    typeTotal += currentRoll;
  }
  return typeTotal;
};

// RECORD RESULTS

const recordResults = (total) => {
  const newRecord = document.createElement("p");
  newRecord.innerText = total;
  recordedResults.append(newRecord);
}

// ROLL BUTTON EFFECT

const rollAll = function () {
  individualResults.innerText = "";
  let rollsTotal = 0;
  for (let i = numberOfDice.length; i > 0; i--) {
    //for ( let i = 0; i < numberOfDice.length; i++ ) {       <- normal direction
    rollsTotal += rollDtype(i);
  }
  rollResult.innerText = rollsTotal;
  //record
  recordResults(rollsTotal);
};

const clearAll = function () {
  for (let i = 0; i < diceTypes.length; i++) {
    selectors[i].input.value = 0;
  }
  for (let i = 0; i < numberOfDice.length; i++) {
    numberOfDice[i] = 0;
  }
  rollResult.innerText = "-";
  individualResults.innerText = "-";
};




// BUTTONS

roll.addEventListener("click", () => {
  rollAll();
});

clear.addEventListener("click", () => {
  clearAll();
});
