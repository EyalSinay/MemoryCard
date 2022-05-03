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
    if (sum === 9) clearInterval(startInterval);
  }, 1000);
  console.log(startInterval);
}
