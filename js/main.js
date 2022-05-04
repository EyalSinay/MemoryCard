import { submitEventListener } from "./start-page.js";
import { setRandomColorToBody } from "./tools.js";

const form = document.querySelector("#start-page-form");
form.addEventListener("submit", submitEventListener);

// AMIR CODE - GENERATE RANDOM COLOR TO THE MAIN GAME
setRandomColorToBody();
