import { submitEventListener } from './start-page.js';

const form = document.querySelector("#start-page-form");
form.addEventListener("submit", submitEventListener);


// AMIR CODE - GENERATE RANDOM COLOR TO THE MAIN GAME
setRandomColorToBody();
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
function setRandomColorToBody() {
    document.body.style.background = `linear-gradient(135deg, ${generateRandomColor()} 0%, ${generateRandomColor()} 50%, ${generateRandomColor()} 100%)`;
}
