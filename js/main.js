const columns = 3;
const rows = 4;
document.documentElement.style.setProperty("--columns", columns);
document.documentElement.style.setProperty("--rows", rows);

const cardsArr = [];
const columnsArr = new Array(columns);
for (let i = 0; i < rows; i++) {
    cardsArr.push([...columnsArr]);
}

const objCards = {
    cards: {
        card1: {
            dataId: 1,
            image1: "./path...",
            image2: "./path...",
        },
        card2: {
            dataId: 2,
            image1: "./path...",
            image2: "./path...",
        },
        card3: {
            dataId: 3,
            image1: "./path...",
            image2: "./path...",
        },
        card4: {
            dataId: 4,
            image1: "./path...",
            image2: "./path...",
        },
        card5: {
            dataId: 5,
            image1: "./path...",
            image2: "./path...",
        },
        card6: {
            dataId: 6,
            image1: "./path...",
            image2: "./path...",
        },
        // ...
    },
    getIdOfCards: function () {
        const valuesArr = Object.values(this.cards);
        const newArr = valuesArr.map(obj => obj.dataId);
        return newArr;
    },
}


function getRandomArrMatrix() {
    const idOfCards = objCards.getIdOfCards();
    idOfCards.push(...idOfCards);
    for (let i = 0; i < cardsArr.length; i++) {
        for (let j = 0; j < cardsArr[i].length; j++) {
            const randomIndexId = Math.floor(Math.random() * idOfCards.length);
            cardsArr[i][j] = idOfCards[randomIndexId];
            idOfCards.splice(randomIndexId, 1);
        }
    }
    return cardsArr;
}

console.log(getRandomArrMatrix());