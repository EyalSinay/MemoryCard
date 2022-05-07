// CHECK SCORE
function checkScore() {
  if (statusObj.score === statusObj.needToWIN) {
    // STOP TIMER
    statusObj.finish = true;
    console.log("win");
    const newHighScoreParent = document.querySelector(".newHighScore");
    // renderFirstScore();
    if (newHighScoreParent.childNodes.length > 0) renderFirstScore();
    //  addNewScore();
    else scoreResultStart();
  }
}
function scoreResultStart() {
  const insertNameBtn = document.querySelector(".insertNameBtn");
  insertNameBtn.addEventListener("click", function () {
    const insertName = document.querySelector(".insertName");
    const scoreDiv = document.createElement("div");
    const finalTime = document.querySelector(".timer");

    buildScoreDiv(scoreDiv, 1, finalTime);

    scoreResultArr.push(scoreDiv);

    //   changeScoreTag(1, firstScore, "00:10", insertName);
    saveStorage(1, finalTime.innerText, insertName.value);
    appendNewScores(scoreDiv);
    console.log(scoreResultArr.length);

    //   addNewScore();
  });
}

//RENDER FIRST SCORE
function renderFirstScore() {
  let old_data = JSON.parse(localStorage.getItem("data"));
  console.log(old_data.length);
  for (let i = 0; i < old_data.length; i++) {
    const insertNameBtn = document.querySelector(".insertNameBtn");
    insertNameBtn.addEventListener("click", function () {
      const insertName = document.querySelector(".insertName");
      const scoreDiv = document.createElement("div");
      const finalTime = document.querySelector(".timer");

      buildScoreDiv(scoreDiv, i + 1, finalTime);

      scoreResultArr.push(scoreDiv);
      //   changeScoreTag(1, firstScore, "00:10", insertName);
      saveStorage(i, finalTime.innerText, insertName.value);
      appendNewScores(scoreDiv);

      //   addNewScore();
    });
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


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/start-page.css" />
    <link rel="stylesheet" href="css/style.desktop.css" />
    <link rel="stylesheet" href="css/style.mobile.css" />
    <link rel="stylesheet" href="css/displaying.css" />
    <script src="js/main.js" defer type="module"></script>
    <title>Memory Cards Game</title>
  </head>

  <body>
    <div class="start-page-main-container" data-display="true">
      <div class="start-page-sub-container">
        <div class="start-page-title">
          <h1>Memory Cards Game</h1>
        </div>
        <form id="start-page-form">
          <h2 class="input-title" id="num-of-cards-title">Number of Cards:</h2>
          <div class="input-radio" id="num-of-cards-container">
            <input
              type="radio"
              name="num-of-cards"
              id="12cards"
              value="12"
              checked
            />
            <label for="12cards">Easy (12 Cards)</label><br />
            <input type="radio" name="num-of-cards" id="18cards" value="18" />
            <label for="18cards">Medium (18 Cards)</label><br />
            <input type="radio" name="num-of-cards" id="24cards" value="24" />
            <label for="24cards">Hard (24 Cards)</label><br />
          </div>

          <h2 class="input-title" id="num-of-players-title">
            Number of players:
          </h2>
          <div class="input-radio" id="num-of-players-container">
            <input
              type="radio"
              name="num-of-players"
              id="1player"
              value="1"
              checked
            />
            <label for="1player">1 player</label><br />
            <input type="radio" name="num-of-players" id="2players" value="2" />
            <label for="2players">2 players</label><br />
            <input type="radio" name="num-of-players" id="3players" value="3" />
            <label for="3players">3 players</label><br />
            <input type="radio" name="num-of-players" id="4players" value="4" />
            <label for="4players">4 players</label><br />
          </div>
          <h2 class="input-title" id="cards-style-title">Cards Style:</h2>
          <div class="input-radio" id="cards-style-container">
            <input
              type="radio"
              name="cards-style"
              id="french-suited-cards"
              value="cardStyle1"
              checked
            />
            <label for="french-suited-cards">French suited cards</label><br />
            <input
              type="radio"
              name="cards-style"
              id="flags"
              value="cardStyle2"
            />
            <label for="flags">Country flags</label><br />
            <input
              type="radio"
              name="cards-style"
              id="something3"
              value="cardStyle3"
            />
            <label for="something3">something3</label><br />
          </div>
          <div id="submit-container">
            <button id="start-game" type="submit">START GAME</button>
          </div>
        </form>
      </div>
    </div>

    <div class="game-container" data-display="false">
      <!-- STATUS BOARD PLAYER1-->
      <div class="statusBoardPl1">
        <div class="clock">
          <div class="statusImgBox clockImg"></div>
          <div class="timer">
            <span id="minutes">00</span>:<span id="seconds">00</span>
          </div>
        </div>
        <div class="turnOver">
          <div class="statusImgBox turnOverImg"></div>
          <div class="turnOverCount" data-addPoint="false">00</div>
        </div>
        <div class="winning">
          <div class="statusImgBox winningImg"></div>
          <div class="winningCount" data-addPoint="false">00</div>
        </div>

        <div class="gameButtons">
          <button class="gameBtn exitBtn"></button>
          <button class="gameBtn restartBtn"></button>
        </div>
      </div>
      <!-- STATUS BOARD PLAYER1 END-->

      <!-- GRID SECTION -->
      <div class="grid">
        <h1>MEMORY GAME</h1>
        <div id="gameBoard"></div>
      </div>
      <!-- GRID SECTION END -->

      <!-- STATUS BOARD PLAYER2-->
      <!-- <div class="statusBoardPl2">
        <div class="clock">
          <div class="statusImgBox clockImg"></div>
          <div class="timer">00:00</div>
        </div>
        <div class="turnOver">
          <div class="statusImgBox turnOverImg"></div>
          <div class="turnOverCount">00</div>
        </div>
        <div class="winning">
          <div class="statusImgBox winningImg"></div>
          <div class="winningCount">00</div>
        </div>
        <div class="gameButtons">
          <button class="gameBtn exitBtn"></button>
          <button class="gameBtn restartBtn"></button>
        </div>
      </div> -->
      <!-- STATUS BOARD PLAYER2 END-->

      <!--  SIDE BAR -->
      <div class="sideBar">
        <div class="highScores">
          <h1>HIGHSCORES</h1>
          <div class="highScoresHeaders highScoresTable">
            <h1>POS</h1>
            <h1>SCORE</h1>
            <h1>NAME</h1>
          </div>
          <div class="newHighScore"></div>
          <label for="">insert name</label>
          <input class="insertName" type="text" />
          <button class="insertNameBtn"></button>
        </div>
        <!-- SIDE BAR END -->
      </div>
    </div>
  </body>
</html>
<!-- <div class="highScoresWinners highScoresTable" data-place="1">
              <div data-rank="1">1ST</div>
              <div data-time="9">00:09</div>
              <div data-winName="a">SOB</div>
            </div>
            <div class="highScoresWinners highScoresTable" data-place="2">
              <div data-rank="2">2ST</div>
              <div data-time="11">00:11</div>
              <div data-winName="a">EYL</div>
            </div>
            <div class="highScoresWinners highScoresTable" data-place="3">
              <div data-rank="3">3ST</div>
              <div data-time="12">00:12</div>
              <div data-winName="a">AMG</div>
            </div> -->


export function startTimer() {
  let second = 0;
  let sum = 0;

  function pad(value) {
    return value > 9 ? value : "0" + value;
  }

  const startInterval = setInterval(function () {
    sum++;
    document.getElementById("seconds").innerHTML = pad(++second % 60);
    document.getElementById("minutes").innerHTML = pad(
      parseInt(second / 60, 10)
    );

    if (statusObj.pairsRemaining === 0) {
      clearInterval(startInterval);
    }
  }, 1000);
}

export function starGame() {
  statusObj.pairsRemaining = statusObj.pairsNeed;
  startTimer();

  const matrixCardsNumbers = getRandomArrIdByNumOfCards(
    userChoicesObj["num-of-cards"]
  );
  console.log(matrixCardsNumbers);

  createElementsByArrAndCardsStyle(
    matrixCardsNumbers,
    userChoicesObj["cards-style"]
  );
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
    statusObj.pairsRemaining = 9;
  } else if (numOfCards === "24") {
    rows = 4;
    columns = 6;
    statusObj.pairsRemaining = 12;
  }
  document.documentElement.style.setProperty("--columns", columns);
  document.documentElement.style.setProperty("--rows", rows);
}
export const statusObj = {
  cardStyle: null,
  // open: false,
  open: 0,
  currentCard: null,
  userChoice: null,
  waiting: false,
  turnOver: 0,
  pairsRemaining: null,
  pairsNeed: null,
  score: 0,
  scoreTwoPlayers1: 0,
  scoreTwoPlayers2: 0,
  unique: null,
  playing: 1,
  //   startGame: false,
  //   restartGame: false,
};

function resetGame() {
  const allCardsCollection = document.querySelectorAll(".card");
  for (let card of allCardsCollection) {
    card.remove();
  }

  statusObj.cardStyle = null;
  statusObj.open = 0;
  statusObj.currentCard = null;
  statusObj.userChoice = null;
  statusObj.waiting = false;
  statusObj.turnOver = 0;
  statusObj.pairsRemaining = 0;
  statusObj.score = 0;
  statusObj.unique = null;

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
    endPage.querySelector(".eng-msg__time").textContent = `in 1:11 minutes`;
    endPage.querySelector(
      ".eng-msg__place"
    ).textContent = `You got the 5th place in the table`;
  } else {
    endPage.querySelector(".eng-msg__header").textContent = `PL1 WIN!`;
    endPage.querySelector(".eng-msg__time").textContent = `PL1 found 4 matches`;
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
}