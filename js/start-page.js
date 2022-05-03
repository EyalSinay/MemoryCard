import { objCards } from './obj_cards.js';
import { shuffleArray } from './tools.js';
import { handleCardClick } from './game.js';

function getUserChoices(e) {
    const inputsFormCollection = e.target.querySelectorAll('#start-page-form input');
    const inputsFormElementsTruth = [...inputsFormCollection].filter(option => option.checked === true);
    const userChoicesObj = {};
    inputsFormElementsTruth.forEach(element => {
        userChoicesObj[element.name] = element.value;
    });
    return userChoicesObj;
}


function setGridPropertyByNumOfCards(numOfCards) {
    let rows;
    let columns;
    if (numOfCards === '12') {
        rows = 3;
        columns = 4;
    } else if (numOfCards === '18') {
        rows = 3;
        columns = 6;
    } else if (numOfCards === '24') {
        rows = 4;
        columns = 6;
    }
    document.documentElement.style.setProperty('--columns', columns);
    document.documentElement.style.setProperty('--rows', rows);
}


function getRandomArrIdByNumOfCards(numOfCards) {
    const idOfCards = objCards.getIdOfCardsArr();
    shuffleArray(idOfCards);
    idOfCards.splice(0, idOfCards.length - numOfCards/2);
    idOfCards.push(...idOfCards);
    shuffleArray(idOfCards);
    return idOfCards;
}


//* creates HTML elements based on received grid and chosen image set.
function createElementsByArrAndCardsStyle (arr, cardsStyle) {
    const backgroundSrc = objCards.backgroundCards[cardsStyle]; // get imag background src by card style
    const board = document.querySelector("#gameBoard");
    for (let i = 0; i < arr.length; i++){
        // the card div
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("data-pairNum", arr[i]);
        card.setAttribute("data-open", "false");  // ! back to false!
        // the front card
        const frontCard = document.createElement("div");
        frontCard.setAttribute("class", "front_card");
        frontCard.style.backgroundImage = `url(${objCards.getImagSrcByDataIdAndCardStyle(arr[i], cardsStyle)})`;
        card.appendChild(frontCard);
        // the back card
        const backCard = document.createElement("div");
        backCard.setAttribute("class", "back_card");
        backCard.style.backgroundImage = `url(${backgroundSrc})`;
        card.appendChild(backCard);

        card.addEventListener('click', (e)=>{
            /*
            const startPosition = e.target.getBoundingClientRect();
            console.log(startPosition);
            const imgPath = e.target.getAttribute("data-pairNum");
            // const endPositionX = 0;
            // const endPositionY = 0;
            const flyCard = document.createElement('img');
            flyCard.setAttribute("class", "fly_card");
            flyCard.setAttribute("data-end-left", "0");
            flyCard.style.position = "absolute";
            flyCard.style.left = startPosition.left + "px";
            flyCard.style.top = startPosition.top + "px";
            flyCard.style.width = startPosition.left - startPosition.right + "px";
            flyCard.style.height = startPosition.top - startPosition.bottom + "px";
            flyCard.style.backgroundImage = getImagSrcByDataIdAndCardStyle(imgPath, cardsStyle);
            document.body.appendChild(flyCard);
            e.target.style.display = "none";

            */
            handleCardClick(card);
        }); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        board.appendChild(card);
    }
}


export function submitEventListener(e) {
    e.preventDefault();

    const userChoicesObj = getUserChoices(e);
    console.log(userChoicesObj);

    setGridPropertyByNumOfCards(userChoicesObj["num-of-cards"]);

    const matrixCardsNumbers = getRandomArrIdByNumOfCards(userChoicesObj['num-of-cards']);
    console.log(matrixCardsNumbers);
    
    createElementsByArrAndCardsStyle(matrixCardsNumbers, userChoicesObj["cards-style"]);

    // display-none start page with animation:
    const startPageMainContainer = document.querySelector('.start-page-main-container');
    startPageMainContainer.addEventListener('animationend', e => {
        e.target.setAttribute('data-display', 'false');
    }, { once: true });
    startPageMainContainer.setAttribute('animation', 'rotate_scale_opacity-out');

    // display-grid game page with animation:
    const gameContainer = document.querySelector(".game-container");
    gameContainer.setAttribute("data-display", "true");
    gameContainer.setAttribute("animation", "rotate_scale_opacity-in");
};