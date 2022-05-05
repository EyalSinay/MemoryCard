import { submitEventListener } from "./start-page.js";
import { setRandomColorToBody } from "./tools.js";
import { restartGame, exit } from "./end-game.js";

const player2Name = document.getElementById('player2-name');
document.getElementById('2players').addEventListener('change', function () {
    player2Name.removeAttribute('disabled');
    player2Name.focus();
});
document.getElementById('1player').addEventListener('change', function () {
    player2Name.setAttribute('disabled', '');
});

const form = document.querySelector("#start-page-form");
form.addEventListener("submit", submitEventListener);

const exitBtnCollection = document.getElementsByClassName('exitBtn');
for (let element of exitBtnCollection) {
    element.addEventListener('click', exit);
};

const restartBtnCollection = document.getElementsByClassName('restartBtn');
for (let element of restartBtnCollection) {
    element.addEventListener('click', restartGame);
};

document.querySelector('.exit-popup').addEventListener('click', () => {
    document.querySelector('.end-page-container').setAttribute("data-display", "false");
});

// AMIR CODE - GENERATE RANDOM COLOR TO THE MAIN GAME
setRandomColorToBody();
