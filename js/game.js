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
  const scoreStatus = document.querySelector(".winningCount");
  const player1ScoreBox = document.querySelector(".count1");
  const player2ScoreBox = document.querySelector(".count2");

  if (userChoicesObj["num-of-players"] === 1) {
    scoreStatus.innerText = statusObj.score;
    AnimateScore(scoreStatus);
  } else {
    if (statusObj.playing == 1) {
      player1ScoreBox.innerText = statusObj.scoreTwoPlayers1;
      statusObj.playing = 2;
      AnimateScore(scoreStatus);
    } else {
      player2ScoreBox.innerText = statusObj.scoreTwoPlayers2;
      statusObj.playing = 1;
      AnimateScore(scoreStatus);
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
    const newHighScoreParent = document.querySelector(".newHighScore");
    if (newHighScoreParent.childNodes.length > 0) {
      renderBestScore();
    } else {
      scoreResultStart();
    }
  }
}

// //RENDER FIRST SCORE
// function renderFirstScore(newHighScoreParent) {
//   // popUpWinnerMassege();   //! what is this func?
//   const newDiv = document.createElement("div");
//   const newScoreHeader = newDiv;
//   newScoreHeader.innerHtml = `<div class="highScoresWinners highScoresTable"></div>`;
//   const newScorePlace = newDiv;
//   newScorePlace.innerHtml = `<div>1ST</div>`;
//   const newScoreTime = newDiv;
//   newScoreTime.innerHtml = `<div>${statusObj.score}</div>`;
//   const newScoreName = newDiv;
//   newScoreName.innerHtml = `<div>SOB</div>`;

//   console.log("before append");
//   //   newHighScoreParent1.appendChild(newScore);
//   //   console.log(newScore);
// }

// // RENDER BEST SCORE
// function renderBestScore() {
//   const allScores = document.querySelectorAll(".highScoresWinners");
// }
// // POP UP WINNER MASSEGE
// // function popUpWinnerMassege()

// SCORE RESULT START
export function scoreResultStart() {
  const insertName = document.querySelector("#player1-name");
  //   insertNameBtn.addEventListener("click", function () {
  const scoreDiv = document.createElement("div");
  const finalTime = document.querySelector(".timer");

  buildScoreDiv(scoreDiv, 0, finalTime);

  scoreResultArr.push(scoreDiv);

  //   changeScoreTag(1, firstScore, "00:10", insertName);
  saveStorage(1, finalTime.innerText, insertName.value);
  appendNewScores(scoreDiv);
  console.log(scoreResultArr.length);

  //   addNewScore();
  //   });
}

//RENDER BEST SCORE
function renderBestScore() {
  let old_data = JSON.parse(localStorage.getItem("data"));
  console.log(old_data.length);
  for (let i = 0; i < old_data.length; i++) {
    const insertNameBtn = document.querySelector(".insertNameBtn");
    // insertNameBtn.addEventListener("click", function () {
    const insertName = document.querySelector(".insertName");
    const scoreDiv = document.createElement("div");
    const finalTime = document.querySelector(".timer");

    buildScoreDiv(scoreDiv, i + 1, finalTime);

    scoreResultArr.push(scoreDiv);
    //   changeScoreTag(1, firstScore, "00:10", insertName);
    saveStorage(i, finalTime.innerText, insertName.value);
    appendNewScores(scoreDiv);

    //   addNewScore();
    // });
    //    name event listenr
  } //end loop
}

function buildScoreDiv(scoreDiv, index, finalTime) {
  scoreDiv.classList.add("highScoresWinners");
  scoreDiv.classList.add("highScoresTable");
  if (index === 0) {
    const att = document.createAttribute("data-place");
    att.value = finalTime.innerText;
    scoreDiv.setAttributeNode(att);
  } else {
    scoreDiv.setAttribute("data-place", finalTime.innerText);
  }
}

// APPEND NEW SCORE TO HTML
export function appendNewScores(scoreDiv) {
  const newHighScoreParent = document.querySelector(".newHighScore");
  let old_data = JSON.parse(localStorage.getItem("data"));
  console.log(old_data);

  //   console.log(scoreResultArr);
  for (let i = 0; i < old_data.length; i++) {
    console.log(old_data[i]);

    changeScoreTag(old_data[i], scoreDiv);
    // newHighScoreParent.appendChild(old_data[i]);
    newHighScoreParent.appendChild(scoreDiv);
    // saveStorage(scoreResultArr[i]);
  }
}

// ADD NEW SCORE
function addNewScore(bestScore) {
  const insertNameBtn = document.querySelector(".insertNameBtn");
  const newHighScoreParent = document.querySelector(".newHighScore");
  const insertName = document.querySelector(".insertName");
  const finalTime = document.querySelector(".timer");
  const secondScore = document.createElement("div");
  secondScore.classList.add("highScoresWinners");
  secondScore.classList.add("highScoresTable");
  secondScore.setAttribute("data-place", "00:05");
  // const att2 = document.createAttribute("data-place");
  // att2.value = "0017";
  scoreResultArr.push(secondScore);
  changeScoreTag(2, secondScore, "00:05", insertName);

  const thirdScore = document.createElement("div");
  thirdScore.classList.add("highScoresWinners");
  thirdScore.classList.add("highScoresTable");
  thirdScore.setAttribute("data-place", "00:07");
  // const att3 = document.createAttribute("data-place");
  // att3.value = "0015";
  scoreResultArr.push(thirdScore);
  changeScoreTag(3, thirdScore, "00:07", insertName);
  sortScoreResult();
  //   appendNewScores();
  //   saveStorage();
  let old_data = JSON.parse(localStorage.getItem("data"));
  console.log(old_data);
}

// SORT THE SCORE RESULTS
function sortScoreResult() {
  scoreResultArr.sort((result1, result2) => {
    const result1Time = result1.getAttribute("data-place").split(":");
    const result2Time = result2.getAttribute("data-place").split(":");
    const totalSeconds1 = parseInt(result1Time[1] * 60 + result1Time[0]);
    const totalSeconds2 = parseInt(result2Time[1] * 60 + result2Time[0]);
    if (totalSeconds1 <= totalSeconds2) return -1;
    return 0;
  });
}
// SAVE SCORE RESULT ON LOCAL STORGE
function saveStorage(pos, finalTime, name) {
  // if there is noting saved at start then save an empty array
  if (localStorage.getItem("data") == null) localStorage.setItem("data", "[]");
  // get old data and push it to the new data
  let old_data = JSON.parse(localStorage.getItem("data"));
  old_data.push({ pos, finalTime, name });
  console.log(old_data);
  //   old_data = scoreResultArr;

  // save the old + new data to local storage
  localStorage.setItem("data", JSON.stringify(old_data));
}

// CAHNGE SCORE TAG
function changeScoreTag(resultObj, newScoreElement) {
  newScoreElement.innerHTML = `
        <div data-rank="1">${resultObj.pos}ST</div>
        <div data-time="1">${resultObj.finalTime}</div>
        <div data-winName="a">${resultObj.name}</div>
      `;
}
// LOAD SCORE RESULT
export function loadScoreResult() {
  let old_data = JSON.parse(localStorage.getItem("data"));
  if (old_data) {
    const newHighScoreParent = document.querySelector(".newHighScore");

    console.log(old_data);
    const att = document.createAttribute("data-place");

    for (let i = 0; i < old_data.length; i++) {
      const scoreDiv = document.createElement("div");
      scoreDiv.classList.add("highScoresWinners");
      scoreDiv.classList.add("highScoresTable");
      if (i === 0) {
        att.value = old_data[i].finalTime;
        scoreDiv.setAttributeNode(att);
      } else {
        scoreDiv.setAttribute("data-place", old_data[i].finalTime);
      }

      changeScoreTag(old_data[i], scoreDiv);
      newHighScoreParent.appendChild(scoreDiv);
    }
  }
}
