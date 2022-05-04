import { submitEventListener } from "./start-page.js";
import { setRandomColorToBody } from "./tools.js";

document.getElementById('2players').addEventListener('change', function() {
    const player2Name = document.getElementById('player2-name');
    if (this.checked) {
        player2Name.removeAttribute('disabled');
    } else {
        player2Name.setAttribute('disabled', '');
    }
});

const form = document.querySelector("#start-page-form");
form.addEventListener("submit", submitEventListener);

// AMIR CODE - GENERATE RANDOM COLOR TO THE MAIN GAME
setRandomColorToBody();
