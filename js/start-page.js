import { objCards } from "./obj_cards.js";
import { shuffleArray } from "./tools.js";
import { handleCardClick, statusObj, scoreResultStart } from "./game.js";
import { startTimer } from "./tools.js";

export const userChoicesObj = {};

function setUserChoices(e) {
  const inputsFormCollection = e.target.querySelectorAll(
    "#start-page-form input"
  );
  const inputsFormElementsTruth = [...inputsFormCollection].filter(
    (option) => option.checked === true
  );
  const inputFormElementsNames = [...inputsFormCollection].filter(
    (input) => input.type === "text"
  );
  inputsFormElementsTruth.forEach((element) => {
    userChoicesObj[element.name] = element.value;
  });
  inputFormElementsNames.forEach((element) => {
    let name = element.value;
    if (!name) {
      name = element.placeholder;
    }
    name = name.toUpperCase();
    userChoicesObj[element.name] = name;
  });
}

function setGridPropertyByNumOfCards(numOfCards) {
  let rows;
  let columns;
  if (numOfCards === "12") {
    rows = 3;
    columns = 4;
    statusObj.pairsNeed = 1;
    statusObj.pairsRemaining = 1;
  } else if (numOfCards === "18") {
    rows = 3;
    columns = 6;
    statusObj.pairsNeed = 9;
    statusObj.pairsRemaining = 9;
  } else if (numOfCards === "24") {
    rows = 4;
    columns = 6;
    statusObj.pairsNeed = 12;
    statusObj.pairsRemaining = 12;
  }
  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);
 
}

function getRandomArrIdByNumOfCards(numOfCards) {
  const idOfCards = objCards.getIdOfCardsArr();
  shuffleArray(idOfCards);
  idOfCards.splice(0, idOfCards.length - numOfCards / 2);
  idOfCards.push(...idOfCards);
  shuffleArray(idOfCards);
  return idOfCards;
}

//* creates HTML elements based on received grid and chosen image set.
function createElementsByArrAndCardsStyle(arr, cardsStyle) {
  const backgroundSrc = objCards.backgroundCards[cardsStyle]; // get imag background src by card style
  const board = document.querySelector("#gameBoard");
  for (let i = 0; i < arr.length; i++) {
    // the card div
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("data-pairNum", arr[i]);
    card.setAttribute("data-open", "false");
    card.setAttribute("data-unique", i);

    // the front card
    const frontCard = document.createElement("div");
    frontCard.setAttribute("class", "front_card");
    frontCard.style.backgroundImage = `url(${objCards.getImagSrcByDataIdAndCardStyle(
      arr[i],
      cardsStyle
    )})`;
    card.appendChild(frontCard);
    // the back card
    const backCard = document.createElement("div");
    backCard.setAttribute("class", "back_card");
    backCard.style.backgroundImage = `url(${backgroundSrc})`;
    card.appendChild(backCard);

    card.addEventListener("click", (e) => {
      handleCardClick(card);
    });

    board.appendChild(card);
    //! cards get smaller when game is bigger //
    // board.style.gridTemplateColumns = `repeat(var(--columns), ${(1/userChoicesObj["num-of-cards"])*120}vw)`;
    // board.style.gridTemplateRows = `repeat(var(--rows), ${(1/userChoicesObj["num-of-cards"])*250}vh)`;
    if (userChoicesObj["num-of-cards"]==="12"){
    board.style.gridTemplateColumns = `repeat(var(--columns), 12vw)`;
    board.style.gridTemplateRows = `repeat(var(--rows), 13vw)`;
  } else if (userChoicesObj["num-of-cards"]==="18"){
    board.style.gridTemplateColumns = `repeat(var(--columns), 8vw)`;
    board.style.gridTemplateRows = `repeat(var(--rows), 13vw)`;
    document.querySelector("#gameBoard").style.gap = "16px";
  } else {
    board.style.gridTemplateColumns = `repeat(var(--columns), 7vw)`;
    board.style.gridTemplateRows = `repeat(var(--rows), 9vw)`;
    document.querySelector("#gameBoard").style.gap = "7px 0";
  }
}
}

export function starGame() {
  statusObj.pairsRemaining = statusObj.pairsNeed;
  startTimer();
  scoreResultStart();
  const matrixCardsNumbers = getRandomArrIdByNumOfCards(
    userChoicesObj["num-of-cards"]
  );
  console.log(matrixCardsNumbers);

  createElementsByArrAndCardsStyle(
    matrixCardsNumbers,
    userChoicesObj["cards-style"]
  );
}

export function submitEventListener(e) {
  e.preventDefault();

  setUserChoices(e);
  console.log(userChoicesObj);

  setGridPropertyByNumOfCards(userChoicesObj["num-of-cards"]);

  if (userChoicesObj["num-of-players"] === "1") {
    document.querySelector(".pl1").setAttribute("data-display", "false");
    document.querySelector(".pl2").setAttribute("data-display", "false");
    document.querySelector(".highScores").setAttribute("data-display", "true");
    document.querySelector(".one-player").setAttribute("data-display", "true");
  } else {
    document.querySelector(".pl1").setAttribute("data-display", "true");
    document.querySelector(".pl2").setAttribute("data-display", "true");
    document.querySelector(".highScores").setAttribute("data-display", "false");
    document.querySelector(".one-player").setAttribute("data-display", "false");
  }
  startTimer();
  starGame();

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
  startPageMainContainer.setAttribute("animation", "opacity-out");

  // display-grid game page with animation:
  const gameContainer = document.querySelector(".game-container");
  gameContainer.setAttribute("animation", "opacity-in");
  gameContainer.setAttribute("data-display", "true");
}
