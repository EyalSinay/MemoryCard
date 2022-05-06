import { statusObj } from "./game.js";
import { userChoicesObj } from "./start-page.js";

export function shuffleArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// function pairsGrid(userChoice){
//     const grid = [];
// for(let i=1; i<=userChoice/2; i++) {
//     grid.push(i);
//     grid.push(i);
// }

// return grid;
// }

// function randomizeGrid(grid){
//     for (let i = grid.length-1; i>0; i--){
//        let rand = Math.floor(Math.random() * i);

//       let holder = grid[i];
//       grid[i] = grid[rand];
//       grid[rand] = holder;
//     }
//     return grid;
// }

// const pairsgrid = pairsGrid(12);
// const randomized = randomizeGrid(pairsgrid);

// createElements(randomized, 1);

// function handleCardClick(card){
//     card.setAttribute("data-open", true);
//     if (!statusObj.open){
//         statusObj.open = true;
//     statusObj.currentCard = card.getAttribute("data-pairNum");
//     // console.log(statusObj);
// } else {

//     checkMatch(card);
// }

// }

// function checkMatch(card){

//     if (card.getAttribute("data-pairNum") === statusObj.currentCard){
//         statusObj.score++;
//        const allOpen = document.querySelectorAll("[data-open='true']");
// //! ADD DELAY HERE //
//        allOpen.forEach((e)=>{
//            e.style.visibility = "hidden";
//         })
//         statusObj.open = false;

//     //     console.log(statusObj);
//     } else{

//     }
// }

// Amir code:
function generateRandomColor() {
  const RandomColorArr = [
    "#23B936",
    "#9980ff",
    "#8066ff",
    "#cc5599",
    "#ffb600",
    "#ff5c00",
    "#00f5ff",
    "#990000",
    "#b6fcd5",
    "#003366",
    "#bada55",
    "#e6e6fa",
  ];
  const randomColor = Math.floor(Math.random() * RandomColorArr.length);
  return RandomColorArr[randomColor];
}
// SET RANDOM COLOR TO BODY //
export function setRandomColorToBody() {
  document.body.style.background = `linear-gradient(135deg, ${generateRandomColor()} 0%, ${generateRandomColor()} 50%, ${generateRandomColor()} 100%)`;
}

const startButton = document.querySelector(".exitBtn");

// START THE TIME WHEN GAME START
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
    // test //
    if (statusObj.pairsRemaining === 0) {
      clearInterval(startInterval);
    }
  }, 1000);
}

export function matchCardsAnimationByCardsCollection(cardsCollection) {
  cardsCollection.forEach((element) => {
    element.setAttribute("data-open", false);
    const startPosition = element.getBoundingClientRect();
    const flyCard = document.createElement("div");
    flyCard.setAttribute("class", "fly_card");
    flyCard.style.left = startPosition.left + "px";
    flyCard.style.top = startPosition.top + "px";
    flyCard.style.width = startPosition.width + "px";
    flyCard.style.height = startPosition.height + "px";
    flyCard.style.backgroundImage =
      element.querySelector(".front_card").style.backgroundImage;
    element.style.visibility = "hidden";
    document.body.appendChild(flyCard);

    // const targetPositionCollection = document.querySelectorAll('.winning');
    let targetPosition;
    let score;
    if (userChoicesObj["num-of-players"] === "1") {
      targetPosition = document
        .querySelector(".one-player")
        .getBoundingClientRect();
      score = statusObj.score;
    } else {
      if (statusObj.playing === 1) {
        targetPosition = document.querySelector(".pl1").getBoundingClientRect();
        score = statusObj.scoreTwoPlayers1 * -1;
      } else {
        targetPosition = document.querySelector(".pl2").getBoundingClientRect();
        score = statusObj.scoreTwoPlayers2 * -1;
      }
    }

    const targetX = targetPosition.x - startPosition.x;
    const targetY = targetPosition.y - startPosition.y;
    const move = cardsCollection[0].getBoundingClientRect().width / 5;

    const newspaperSpinning = [
      { transform: `translate(0,0) scale(1)` },
      {
        transform: `translate(${targetX + score * move}px,${
          targetY + 0.5 * startPosition.height
        }px) scale(0.5)`,
      },
    ];
    const newspaperTiming = {
      duration: 2000,
      easing: "ease-in-out",
      iterations: 1,
      fill: "forwards",
    };

    flyCard.animate(newspaperSpinning, newspaperTiming);
  });
}
