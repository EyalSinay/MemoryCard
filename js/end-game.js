import { statusObj, addPointToScore, addPointToTurnOver } from "./game.js";
import { starGame, userChoicesObj } from "./start-page.js";

function resetGame() {
    
    const allCardsCollection = document.querySelectorAll('.card');
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

    addPointToScore();
    addPointToTurnOver();
}

export function endGame() {
    const endPage = document.querySelector('.end-page-container');
    if (userChoicesObj['num-of-players'] === '1') {
        endPage.querySelector('.eng-msg__header').textContent = `You did it!`;
        endPage.querySelector('.eng-msg__time').textContent = `in 1:11 minutes`;
        endPage.querySelector('.eng-msg__place').textContent = `You got the 5th place in the table`;
    } else {
        endPage.querySelector('.eng-msg__header').textContent = `PL1 WIN!`;
        endPage.querySelector('.eng-msg__time').textContent = `PL1 found 4 matches`;
        endPage.querySelector('.eng-msg__place').textContent = `PL2 found 2 matches`;
    }
    endPage.setAttribute("data-display", "true");
}

export function restartGame() {
    const endPage = document.querySelector('.end-page-container');
    if (endPage.getAttribute("data-display") === "true") {
        endPage.setAttribute("data-display", "false");
    }
    resetGame();
    starGame();
}

export function exit() {
    const endPage = document.querySelector('.end-page-container');
    if (endPage.getAttribute("data-display") === "true") {
        endPage.setAttribute("data-display", "false");
    }
    resetGame();

    // un-display game
    const gameContainer = document.querySelector(".game-container");
    gameContainer.addEventListener("animationend", (e) => {
        e.target.setAttribute("data-display", "false");
    }, { once: true });
    gameContainer.setAttribute("animation", "opacity-out");

    // display start game
    const startPageMainContainer = document.querySelector(".start-page-main-container");
    startPageMainContainer.setAttribute("animation", "opacity-in");
    startPageMainContainer.setAttribute("data-display", "true");
}