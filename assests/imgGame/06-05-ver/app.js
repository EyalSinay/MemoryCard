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

import { handleCardClick, statusObj, loadScoreResult } from "./game.js";

loadScoreResult();
