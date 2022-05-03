const statusObj = {
  open: false,
  currentCard: null,
  userChoice: null,
  waiting: false,
  score: 1,
};

function handleCardClick(card) {
  // OPENING CARD ONE  //
  card.setAttribute("data-open", true);
  if (!statusObj.open) {
    statusObj.open = true;
    statusObj.currentCard = card.getAttribute("data-pairNum");
    // console.log(statusObj);
  } else {
    checkMatch(card);
  }
}
// CARD TWO CHECK MATCH//
function checkMatch(card) {
  if (card.getAttribute("data-pairNum") === statusObj.currentCard) {
    statusObj.score++;
    const allOpen = document.querySelectorAll("[data-open='true']");
    //! ADD DELAY HERE //
    allOpen.forEach((e) => {
      e.style.visibility = "hidden";
    });
    statusObj.open = false;

    //     console.log(statusObj);
  } else {
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
