import { objCards } from "./obj_cards.js";

export const statusObj = {
  cardStyle: null,
  open: false,
  currentCard: null,
  userChoice: null,
  waiting: false,
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
    statusObj.open = false;
    const allOpen = document.querySelectorAll("[data-open='true']");
    allOpen.forEach((e) => {
      e.setAttribute("data-open", false);
      e.style.visibility = "hidden";
    });
  } else {
    statusObj.score--;
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
  let currentScore = scoreStatus.innerText;
  statusObj.score++;
  scoreStatus.innerText = statusObj.score;
  AnimateScore(scoreStatus);
}

// ANIMATE SCORE AND TURN OVER
function AnimateScore(StatusBoardEL) {
  StatusBoardEL.setAttribute("data-addPoint", "true");
  setTimeout(() => {
    StatusBoardEL.setAttribute("data-addPoint", "false");
  }, 4000);
}

//  ADD POINT TO TURN OVER
export function addPointToTurnOver() {
  const turnOverCountStatus = document.querySelector(".turnOverCount");
  let currentTurnOverCount = turnOverCountStatus.innerText;
  statusObj.score++;
  turnOverCountStatus.innerText = statusObj.score;
  AnimateScore(turnOverCountStatus);
}
