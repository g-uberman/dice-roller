// STORING ARRAYS

const diceTypes = [4, 6, 8, 10, 12, 20];
let selectors = [];

const numberOfDice = [];
for (let i = 0; i < 101; i++) {
  numberOfDice.push(0);
}

let recordTemplate = {
  id: 0,
  total: 0,
};
diceTypes.map((sides) => {
  let key = "D" + sides;
  recordTemplate[key] = [];
});

let recordCounter = 1;
let currentRecord = structuredClone(recordTemplate);

if (localStorage.getItem('rollHistory')) {
recordHistory = JSON.parse(localStorage.getItem('rollHistory'));
recordCounter = Math.max(...recordHistory.map((record) => {return record.id})) + 1;
} else {
recordHistory = [];
recordCounter = 1;
};

// SELECTORS

const rollResult = document.getElementById("rollResult");
const individualResults = document.getElementById("individualResults");
const recordedResults = document.getElementById("recordedResults");
const explodingCheckbox = document.getElementById("exploding");
const cardContainer = document.getElementById("cardContainer");
const roll = document.getElementById("roll");
const clear = document.getElementById("clear");
const clearHistory = document.getElementById("clearHistory");

// GENERATE DICE WRAPPERS

const generateAll = (array) => {
  generateCards(array);
  generateSelectors(array);
  generateEventListeners(array);
};

const generateCards = (array) => {
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

const generateSelectors = (array) => {
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

const generateEventListeners = (array) => {
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
      }
    });
  }
};

generateAll(diceTypes);

// INPUT FUNCTIONS

const plusDice = (sides, input) => {
  numberOfDice[sides] += 1;
  input.value = numberOfDice[sides];
};

const minusDice = (sides, input) => {
  if (numberOfDice[sides] > 0) {
    numberOfDice[sides] -= 1;
    input.value = numberOfDice[sides];
  }
};

const manualInput = (sides, input) => {
  numberOfDice[sides] = Number(input.value);
};

// DISPLAY HISTORY

const displayHistory = () => {
  //clear old
  recordedResults.innerHTML = null;
  recordHistory.map((record) => {
    //create elements
    const newRecord = document.createElement("tr");
    newRecord.classList.add("recordRow");
    newRecord.innerHTML = `<td class="recordId">ID</td><td class="recordTotal">Total</td><td class="recordIcons"></td>`;
    //paste values
    newRecord.getElementsByClassName("recordId")[0].innerText = record.id + ".";
    newRecord.getElementsByClassName("recordTotal")[0].innerText = record.total;
    //create icons
    for (const [key, value] of Object.entries(record)) {
      if (value.length) {
        const sides = Number(key.replace("D", ""));
        value.map((currentRoll) => {
          createIcon(
            sides,
            currentRoll,
            newRecord.getElementsByClassName("recordIcons")[0]
          );
        });
      }
    }
    //display all
    recordedResults.prepend(newRecord);
    //delete old results
    if (recordHistory.length > 10) {
      recordHistory.shift();
    }
  });
};

// ROLL MECHANICS

const rollOnce = (sides) => {
  let dieCurrent = Math.ceil(Math.random() * Number(sides));
  return dieCurrent;
};

const rollExploding = (sides) => {
  let dieTotal = 0;
  let dieCurrent = rollOnce(sides);
  dieTotal = dieTotal + dieCurrent;
  for (dieCurrent; dieCurrent == sides; ) {
    dieCurrent = rollOnce(sides);
    dieTotal = dieTotal + dieCurrent;
  }
  return dieTotal;
};

const createIcon = (sides, currentRoll, destination) => {
  let icon = document.createElement("div");
  icon.classList.add(`D${sides}`);
  icon.classList.add("icon");
  icon.innerText = currentRoll;
  destination.prepend(icon);
};

const rollDtype = (sides) => {
  let typeTotal = 0;
  let currentRoll = 0;
  for (let i = 0; i < numberOfDice[sides]; i++) {
    if (explodingCheckbox.checked == true) {
      currentRoll = rollExploding(sides);
    } else {
      currentRoll = rollOnce(sides);
    }
    createIcon(sides, currentRoll, individualResults);
    typeTotal += currentRoll;
    recordDtype(sides, currentRoll);
  }
  return typeTotal;
};

// RECORD RESULTS

const recordDtype = (sides, currentRoll) => {
  currentRecord["D" + sides].push(currentRoll);
};

const recordTotal = (total) => {
  currentRecord.id = recordCounter;
  currentRecord.total = total;
  recordCounter++;
  recordHistory.push(currentRecord);
  // push record to localStorage
  localStorage.setItem('rollHistory', JSON.stringify(recordHistory));
  // reset currentRecord 
  currentRecord = structuredClone(recordTemplate);
};

// ROLL BUTTON EFFECT

const rollAll = () => {
  individualResults.innerText = "";
  let rollsTotal = 0;
  for (let i = 0; i < numberOfDice.length; i++) {
    rollsTotal += rollDtype(i);
  }
  rollResult.innerText = rollsTotal;
  recordTotal(rollsTotal);
  displayHistory();
};

const clearAll = () => {
  for (let i = 0; i < diceTypes.length; i++) {
    selectors[i].input.value = 0;
  }
  for (let i = 0; i < numberOfDice.length; i++) {
    numberOfDice[i] = 0;
  }
  rollResult.innerText = "-";
  individualResults.innerText = "";
};

// BUTTONS

roll.addEventListener("click", () => {
  rollAll();
});

clear.addEventListener("click", () => {
  clearAll();
});

clearHistory.addEventListener("click", () => {
  localStorage.clear();
  recordedResults.innerHTML = null;
});

// INITIAL HISTORY DISPLAY

displayHistory();