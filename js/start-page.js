import { objCards } from "./obj_cards.js";
import { shuffleArray } from "./tools.js";
import { startTimer } from "./tools.js";
//only for check
import { addPointToScore } from "./game.js";
import { addPointToTurnOver } from "./game.js";

function getUserChoices(e) {
  const inputsFormCollection = e.target.querySelectorAll(
    "#start-page-form input"
  );
  const inputsFormElementsTruth = [...inputsFormCollection].filter(
    (option) => option.checked === true
  );
  const userChoicesObj = {};
  inputsFormElementsTruth.forEach((element) => {
    let val = element.value;
    if (typeof val === "string") {
      val = parseInt(val, 10);
    }
    userChoicesObj[element.name] = val;
  });
  return userChoicesObj;
}

function createMatrix(numOfCards) {
  let rows;
  let columns;
  if (numOfCards === 12) {
    rows = 3;
    columns = 4;
  } else if (numOfCards === 18) {
    rows = 3;
    columns = 6;
  } else if (numOfCards === 24) {
    rows = 4;
    columns = 6;
  }

  const emptyCardsArr = [];
  const columnsArr = new Array(columns);
  for (let i = 0; i < rows; i++) {
    emptyCardsArr.push([...columnsArr]);
  }

  // set whe greed property:
  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);

  return emptyCardsArr;
}

function getRandomArrMatrix(arr, numOfCards) {
  const idOfCards = objCards.getIdOfCards();

  shuffleArray(idOfCards);

  idOfCards.splice(0, idOfCards.length - numOfCards / 2);
  idOfCards.push(...idOfCards);

  shuffleArray(idOfCards);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = idOfCards[0];
      idOfCards.shift();
    }
  }
  return arr;
}

//* creates HTML elements based on received grid and chosen image set.
function createElements(grid, imageSet) {
  const board = document.querySelector("#gameBoard");
  for (let i = 0; i < grid.length; i++) {
    let rand = Math.floor(Math.random() * objCards.length);
    const card = document.createElement("img");
    card.setAttribute("data-pairNum", grid[i]);
    card.setAttribute(
      "src",
      objCards.cards[`card${grid[i]}`][`image${imageSet}`]
    );
    card.setAttribute("data-open", "false");
    card.addEventListener("click", () => handleCardClick(card)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    board.appendChild(card);
  }
}

export function submitEventListener(e) {
  e.preventDefault();
  // START THE TIME WHEN GAME START
  setTimeout(startTimer, 1000);
  // test
  addPointToScore();
  addPointToTurnOver();
  //test end

  const userChoicesObj = getUserChoices(e);
  console.log(userChoicesObj);

  const arrEmpty = createMatrix(userChoicesObj["num-of-cards"]);
  console.log(arrEmpty);

  const matrixCardsNumbers = getRandomArrMatrix(
    arrEmpty,
    userChoicesObj["num-of-cards"]
  );
  console.log(matrixCardsNumbers);

  //* createElements()   /////

  // display-none start page with animation:
  const startPageMainContainer = document.querySelector(
    ".start-page-main-container"
  );
  startPageMainContainer.addEventListener(
    "animationend",
    (e) => {
      e.target.setAttribute("data-display", "false");
    },
    { once: true }
  );
  startPageMainContainer.setAttribute("animation", "rotate_scale_opacity-out");

  // display-grid game page with animation:
  const gameContainer = document.querySelector(".game-container");
  gameContainer.setAttribute("data-display", "true");
  gameContainer.setAttribute("animation", "rotate_scale_opacity-in");
}
