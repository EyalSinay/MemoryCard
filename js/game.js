import { endGame } from "./end-game.js";
import { userChoicesObj } from "./start-page.js";
// import { objCards } from "./obj_cards.js";
import { matchCardsAnimationByCardsCollection } from "./tools.js";

export const statusObj = {
  cardStyle: null,
  // open: false,
  open: 0,
  currentCard: null,
  userChoice: null,
  turnOver: 0,
  pairsRemaining: null,
  score: 0,
  scoreTwoPlayers1: 0,
  scoreTwoPlayers2: 0,
  unique: null,
  playing: 1,
  winner: [null, null],

};


export function handleCardClick(card) {
  // OPENING CARD ONE  //
  if (card.getAttribute("data-unique") != statusObj.unique && statusObj.open < 2) {
    statusObj.unique = card.getAttribute("data-unique");
    statusObj.open++;
    card.setAttribute("data-open", true);
    if (statusObj.open < 2) {
      statusObj.currentCard = card.getAttribute("data-pairNum");
    } else { setTimeout(checkMatch, 1200, card); }

  }
}
// CARD TWO CHECK MATCH//
function checkMatch(card) {
  let numOfPlayers = userChoicesObj['num-of-players'];
  if (card.getAttribute("data-pairNum") === statusObj.currentCard) {
    if (numOfPlayers > 1) {
      if (statusObj.playing === 1) {
        statusObj.scoreTwoPlayers1++;
        statusObj.playing = 2;
      } else {
        statusObj.scoreTwoPlayers2++;
        statusObj.playing = 1;
      }
      if (statusObj.scoreTwoPlayers1 >= statusObj.scoreTwoPlayers2) {
        statusObj.winner[0] = userChoicesObj['player1-name'];
        statusObj[1] = statusObj.scoreTwoPlayers1;
      }
      else {
        statusObj.winner[0] = userChoicesObj['player2-name'];
        statusObj[1] = statusObj.scoreTwoPlayers2;

      }

    }
    else {
      statusObj.score++;
    }
    statusObj.open = 0;
    statusObj.pairsRemaining--;
    addPointToScore();
    checkScore();
    if (statusObj.pairsRemaining === 0) { endGame() }
    const allOpen = document.querySelectorAll("[data-open='true']");
    matchCardsAnimationByCardsCollection(allOpen);
  } else {
    statusObj.turnOver++;
    addPointToTurnOver();
    const allOpen = document.querySelectorAll("[data-open='true']");
    allOpen.forEach((e) => {
      e.setAttribute("data-open", false);
    });
    statusObj.open = 0;
  }
}
// ADD POINT TO SCORE //
export function addPointToScore() {
  const scoreStatus = document.querySelector(".winningCount");
  const player1ScoreBox = document.querySelector(".count1");
  const player2ScoreBox = document.querySelector(".count2");
  if (userChoicesObj['num-of-players'] === 1) {
    scoreStatus.innerText = statusObj.score;
    AnimateScore(scoreStatus);
  } else {
    if (statusObj.playing === 1) {
      player1ScoreBox.innerText = statusObj.scoreTwoPlayers1;
      AnimateScore(scoreStatus);
    } else {

      player2ScoreBox.innerText = statusObj.scoreTwoPlayers2;
    }
  }
}


// ANIMATE SCORE AND TURN OVER
function AnimateScore(StatusBoardEL) {
  StatusBoardEL.setAttribute("data-addPoint", "true");
  setTimeout(() => {
    StatusBoardEL.setAttribute("data-addPoint", "false");
  }, 1000);
}

//  ADD POINT TO TURN OVER
export function addPointToTurnOver() {
  const turnOverCountStatus = document.querySelector(".turnOverCount");
  turnOverCountStatus.innerText = statusObj.turnOver;
  AnimateScore(turnOverCountStatus);
}

// CHECK SCORE
function checkScore() {
  if (statusObj.score === statusObj.pairsRemaining) {
    const newHighScoreParent = document.querySelector(".newHighScore");
    if (newHighScoreParent.childNodes.length > 0) {
      renderBestScore();
    } else {
      renderFirstScore(newHighScoreParent);
    }
  }
}

//RENDER FIRST SCORE
function renderFirstScore(newHighScoreParent) {
 // popUpWinnerMassege();   //! what is this func?
  const newDiv = document.createElement("div");
  const newScoreHeader = newDiv;
  newScoreHeader.innerHtml = `<div class="highScoresWinners highScoresTable"></div>`;
  const newScorePlace = newDiv;
  newScorePlace.innerHtml = `<div>1ST</div>`;
  const newScoreTime = newDiv;
  newScoreTime.innerHtml = `<div>${statusObj.score}</div>`;
  const newScoreName = newDiv;
  newScoreName.innerHtml = `<div>SOB</div>`;

  console.log("before append");
  //   newHighScoreParent1.appendChild(newScore);
  //   console.log(newScore);
}

// RENDER BEST SCORE
function renderBestScore() {
  const allScores = document.querySelectorAll(".highScoresWinners");
}
// POP UP WINNER MASSEGE
// function popUpWinnerMassege()
