import { objCards } from "./obj_cards.js";

export const statusObj = {
  cardStyle: null,
  open: false,
  currentCard: null,
  userChoice: null,
  waiting: false,
  turnOver: 0,
  needToWIN: 0,
  score: 0,
};

export function handleCardClick(card) {
  // OPENING CARD ONE  //
  let pairNum = parseInt(card.getAttribute("data-pairNum"));
  let src = objCards.getImagSrcByDataIdAndCardStyle(
    pairNum,
    `${statusObj["cardStyle"]}`
  );
  card.setAttribute("src", src);
  card.setAttribute("data-open", true);
  if (!statusObj.open) {
    statusObj.open = true;
    statusObj.currentCard = card.getAttribute("data-pairNum");
  } else {
    card.setAttribute("src", src);
    setTimeout(checkMatch, 1200, card);
  }
}
// CARD TWO CHECK MATCH//
function checkMatch(card) {
  if (card.getAttribute("data-pairNum") === statusObj.currentCard) {
    // alert('correct');
    statusObj.score++;
    addPointToScore();
    checkScore();
    statusObj.open = false;
    const allOpen = document.querySelectorAll("[data-open='true']");
    allOpen.forEach((e) => {
      e.setAttribute("data-open", false);
      e.style.visibility = "hidden";
    });
  } else {
    statusObj.turnOver++;
    addPointToTurnOver();
    // statusObj.score--;
    const allOpen = document.querySelectorAll("[data-open='true']");
    allOpen.forEach((e) => {
      e.setAttribute("data-open", false);
      e.setAttribute("src", objCards.backgroundCards[statusObj["cardStyle"]]);
    });
    statusObj.open = false;
  }
}
// ADD POINT TO SCORE //
export function addPointToScore() {
  const scoreStatus = document.querySelector(".winningCount");
  scoreStatus.innerText = statusObj.score;
  AnimateScore(scoreStatus);
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
  if (statusObj.score === statusObj.needToWIN) {
    const newHighScoreParent = document.querySelector(".newHighScore");
    if (newHighScoreParent.childNodes.length > 0) renderBestScore();
    else renderFirstScore(newHighScoreParent);
  }
}

//RENDER FIRST SCORE
function renderFirstScore(newHighScoreParent) {
  popUpWinnerMassege();
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
function popUpWinnerMassege() {}
