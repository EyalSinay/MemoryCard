import { statusObj, addPointToScore, addPointToTurnOver } from "./game.js";
import { starGame, userChoicesObj } from "./start-page.js";
import { startTimer } from "./tools.js";

function resetGame() {
  const allCardsCollection = document.querySelectorAll(".card");
  for (let card of allCardsCollection) {
    card.remove();
  }
  const allFlyCards = document.querySelectorAll(".fly_card");
  for (let card of allFlyCards) {
    card.remove();
  }
  statusObj.cardStyle = null;
  statusObj.open = 0;
  statusObj.currentCard = null;
  statusObj.userChoice = null;
  statusObj.turnOver = 0;
  statusObj.pairsRemaining = 0;
  statusObj.score = 0;
  statusObj.unique = null;
  (statusObj.winner = [null, null]),
    (statusObj.playing = 1),
    (statusObj.scoreTwoPlayers1 = 0),
    (statusObj.scoreTwoPlayers2 = 0),
    // if(​document​.classList.contains(​'fly_card'​)) console.log("yesssss");
    //     const​ ​allFlyCardsCollection​ ​=​ ​document​.​querySelectorAll​(​'.fly_card'​)​;
    //    ​    ​for​ ​(​let​  flyCard​ ​of​ ​allFlyCardsCollection​)​ ​{
    //    ​        ​flyCard​.​remove​(​)​;
    //    ​    ​}
    clearStatusBoard();
}

export function endGame() {
  const endPage = document.querySelector(".end-page-container");
  if (userChoicesObj["num-of-players"] === "1") {
    endPage.querySelector(".eng-msg__header").textContent = `You did it!`;
    endPage.querySelector(".eng-msg__time").textContent = `in 1:11 minutes`;         //* Add time variable <--------<---------<--------
    endPage.querySelector(
      ".eng-msg__place"
    ).textContent = `You got the 5th place in the table`;
  } else {
    endPage.querySelector(
      ".eng-msg__header"
    ).textContent = `${statusObj.winner[0]} WINS!`;
    endPage.querySelector(
      ".eng-msg__time"
    ).textContent = `${statusObj.winner[0]} found ${statusObj.winner[1]} matches`;
    endPage.querySelector(
      ".eng-msg__place"
    ).textContent = `PL2 found 2 matches`;
  }
  endPage.setAttribute("data-display", "true");
}

export function restartGame() {
  const endPage = document.querySelector(".end-page-container");
  if (endPage.getAttribute("data-display") === "true") {
    endPage.setAttribute("data-display", "false");
  }

  resetGame();

  setTimeout(() => {
    starGame();
  }, 1000);
}

export function exit() {
  const endPage = document.querySelector(".end-page-container");
  if (endPage.getAttribute("data-display") === "true") {
    endPage.setAttribute("data-display", "false");
  }
  resetGame();

  // un-display game
  const gameContainer = document.querySelector(".game-container");
  gameContainer.addEventListener(
    "animationend",
    (e) => {
      e.target.setAttribute("data-display", "false");
    },
    { once: true }
  );
  gameContainer.setAttribute("animation", "opacity-out");

  // display start game
  const startPageMainContainer = document.querySelector(
    ".start-page-main-container"
  );
  startPageMainContainer.setAttribute("animation", "opacity-in");
  startPageMainContainer.setAttribute("data-display", "true");
}

// CLEAR STATUS BOARD
function clearStatusBoard() {
  const scoreStatus = document.querySelector(".winningCount");
  scoreStatus.innerText = "00";
  const turnOverCountStatus = document.querySelector(".turnOverCount");
  turnOverCountStatus.innerText = "00";
  const pl1Box = (document.querySelector(".count1").innerText = 0);
  const pl2Box = (document.querySelector(".count2").innerText = 0);
}
