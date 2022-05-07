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
  pairsNeed: null,
  score: 0,
  scoreTwoPlayers1: 0,
  scoreTwoPlayers2: 0,
  unique: null,
  playing: 1,
  winner: [null, null],
};

const scoreResultArr = [];

export function handleCardClick(card) {
  // OPENING CARD ONE  //
  if (
    card.getAttribute("data-unique") != statusObj.unique &&
    statusObj.open < 2
  ) {
    statusObj.unique = card.getAttribute("data-unique");
    statusObj.open++;
    card.setAttribute("data-open", true);
    if (statusObj.open < 2) {
      statusObj.currentCard = card.getAttribute("data-pairNum");
    } else {
      setTimeout(checkMatch, 1000, card);
    }
  }
}
// CARD TWO CHECK MATCH//
function checkMatch(card) {
  let numOfPlayers = userChoicesObj["num-of-players"];
  if (card.getAttribute("data-pairNum") === statusObj.currentCard) {
    if (numOfPlayers > 1) {
      if (statusObj.playing == 1) {
        statusObj.scoreTwoPlayers1++;
      } else {
        statusObj.scoreTwoPlayers2++;
      }
      if (statusObj.scoreTwoPlayers1 >= statusObj.scoreTwoPlayers2) {
        statusObj.winner[0] = userChoicesObj["player1-name"];
        statusObj.winner[1] = statusObj.scoreTwoPlayers1;
      } else {
        statusObj.winner[0] = userChoicesObj["player2-name"];
        statusObj.winner[1] = statusObj.scoreTwoPlayers2;
      }
    } else {
      statusObj.score++;
    }
    statusObj.open = 0;
    statusObj.pairsRemaining--;
    addPointToScore();
    checkScore();
    if (statusObj.pairsRemaining === 0) {
      endGame();
    }
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
  const scoreStatus = document.querySelector(".countSingle");
  const player1ScoreBox = document.querySelector(".count1");
  const player2ScoreBox = document.querySelector(".count2");

  if (userChoicesObj["num-of-players"] === "1") {
    scoreStatus.innerText = statusObj.score;
    AnimateScore(scoreStatus);
  } else {
    if (statusObj.playing == 1) {
      player1ScoreBox.innerText = statusObj.scoreTwoPlayers1;
      statusObj.playing = 2;

      AnimateScore(player1ScoreBox);
    } else {
      player2ScoreBox.innerText = statusObj.scoreTwoPlayers2;
      statusObj.playing = 1;
      AnimateScore(player2ScoreBox);
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
  if (statusObj.pairsRemaining === 0) {
    renderBestScore();
    appendNewScores();
  }
}

//RENDER BEST SCORE
function renderBestScore() {
  const insertName = document.querySelector("#player1-name");
  const scoreDiv = document.createElement("div");
  const finalTime = document.querySelector(".timer");

  saveStorage(0, finalTime.innerText, insertName.value);
}
// SAVE SCORE RESULT ON LOCAL STORGE
function saveStorage(pos, finalTime, name) {
  if (localStorage.getItem("data") == null) localStorage.setItem("data", "[]");

  let old_data = JSON.parse(localStorage.getItem("data"));
  if (old_data.length < 10) old_data.push({ pos, finalTime, name });

  localStorage.setItem("data", JSON.stringify(old_data));
}

// APPEND NEW SCORE TO HTML
export function appendNewScores() {
  let old_data = JSON.parse(localStorage.getItem("data"));
  sortScoreResult(old_data);
  loadScoreResult();
}

// SORT SCORE RESULT
function sortScoreResult(old_data) {
  old_data.sort((result1, result2) => {
    const result1Time = result1.finalTime.split(":");
    const result2Time = result2.finalTime.split(":");
    const totalSeconds1 = parseInt(result1Time[1] * 60 + result1Time[0]);
    const totalSeconds2 = parseInt(result2Time[1] * 60 + result2Time[0]);
    if (totalSeconds1 <= totalSeconds2) return -1;
    return 0;
  });
}
// LOAD SCORE RESULT
export function loadScoreResult() {
  let old_data = JSON.parse(localStorage.getItem("data"));
  if (old_data) {
    const newHighScoreParent = document.querySelector(".newHighScore");
    newHighScoreParent.innerHTML = "";
    sortScoreResult(old_data);
    for (let i = 0; i < old_data.length; i++) {
      const scoreDiv = document.createElement("div");
      buildScoreDiv(scoreDiv, old_data[i], i);
      old_data[i].pos = i + 1;
      updateScoreTag(old_data[i], scoreDiv);
      newHighScoreParent.appendChild(scoreDiv);
    }
  }
}

// BUILD SCORE DIV
function buildScoreDiv(newDiv, scoreDiv, index) {
  newDiv.classList.add("highScoresWinners");
  newDiv.classList.add("highScoresTable");
  if (index === 0) {
    const att = document.createAttribute("data-place");
    att.value = scoreDiv.finalTime;
    newDiv.setAttributeNode(att);
  } else {
    newDiv.setAttribute("data-place", scoreDiv.finalTime);
  }
}

// UPDATE SCORE TAG
function updateScoreTag(resultObj, newScoreElement) {
  newScoreElement.innerHTML = `
        <div data-rank="1">${resultObj.pos}ST</div>
        <div data-time="1">${resultObj.finalTime}</div>
        <div data-winName="a">${resultObj.name}</div>
      `;
}
