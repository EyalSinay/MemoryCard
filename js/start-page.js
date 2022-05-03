import { objCards } from './obj_cards.js';
import { shuffleArray } from './tools.js';

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
    const backgroundSrc = objCards.getImagBackgroundSrcByCardStyle(cardsStyle)
    const board = document.querySelector("#gameBoard");
    for (let i = 0; i < arr.length; i++){
        const card = document.createElement("img");
        card.setAttribute("data-pairNum", arr[i]);
        card.setAttribute("src", backgroundSrc);
        card.style.width = '100%';
        card.setAttribute("data-open", "false");
        card.addEventListener('click', ()=>handleCardClick(card)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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