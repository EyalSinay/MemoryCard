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

    


function handleCardClick(card){
    card.setAttribute("data-open", true);
    if (!statusObj.open){
        statusObj.open = true;
    statusObj.currentCard = card.getAttribute("data-pairNum");
    // console.log(statusObj);
} else {
   
    checkMatch(card);
}

}

function checkMatch(card){

    if (card.getAttribute("data-pairNum") === statusObj.currentCard){
        statusObj.score++;
       const allOpen = document.querySelectorAll("[data-open='true']");
//! ADD DELAY HERE //
       allOpen.forEach((e)=>{
           e.style.visibility = "hidden";
        })
        statusObj.open = false;
       
    //     console.log(statusObj);
    } else{
        
    }
}
