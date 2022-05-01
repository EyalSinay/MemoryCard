const objCards = {
    cards: {
        card1: {
            dataId: 1,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card2: {
            dataId: 2,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card3: {
            dataId: 3,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card4: {
            dataId: 4,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card5: {
            dataId: 5,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card6: {
            dataId: 6,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card7: {
            dataId: 7,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card8: {
            dataId: 8,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card9: {
            dataId: 9,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card10: {
            dataId: 10,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card11: {
            dataId: 11,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        card12: {
            dataId: 12,
            image1: "../assets/images/allCards.jpg",
            image1X: 0,
            image1Y: 0,
            image2: "./path...",
            image3: "./path...",
        },
        // ...
    },
    getIdOfCards: function () {
        const valuesArr = Object.values(this.cards);
        const newArr = valuesArr.map(obj => obj.dataId);
        return newArr;
    },
}

const cardsArr = createMatrix(5, 4);

function createMatrix(columns, rows) {
    document.documentElement.style.setProperty("--columns", columns);
    document.documentElement.style.setProperty("--rows", rows);

    const emptyCardsArr = [];
    const columnsArr = new Array(columns);
    for (let i = 0; i < rows; i++) {
        emptyCardsArr.push([...columnsArr]);
    }

    return emptyCardsArr;
}

function getRandomArrMatrix(arr) {
    const idOfCards = objCards.getIdOfCards();
    idOfCards.push(...idOfCards);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const randomIndexId = Math.floor(Math.random() * idOfCards.length);
            arr[i][j] = idOfCards[randomIndexId];
            idOfCards.splice(randomIndexId, 1);
        }
    }
    return arr;
}

console.log(getRandomArrMatrix(cardsArr));