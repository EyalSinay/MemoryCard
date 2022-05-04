var count = -50;

export function matchCardsAnimationByCardsCollection(cardsCollection) {
    cardsCollection.forEach(element => {
        element.setAttribute("data-open", false);
        const startPosition = element.getBoundingClientRect();
        const flyCard = document.createElement('div');
        flyCard.setAttribute("class", "fly_card");
        flyCard.style.left = startPosition.left + "px";
        flyCard.style.top = startPosition.top + "px";
        flyCard.style.width = startPosition.width + "px";
        flyCard.style.height = startPosition.height + "px";
        flyCard.style.backgroundImage = element.querySelector('.front_card').style.backgroundImage;
        element.style.visibility = "hidden";
        document.body.appendChild(flyCard);

        const targetPosition = document.querySelector('.winningImg').getBoundingClientRect();
        const targetX = (targetPosition.x - startPosition.x);
        const targetY = (targetPosition.y - startPosition.y);

        const newspaperSpinning = [
            { transform: `translate(0,0) scale(1)` },
            { transform: `translate(${targetX + count}px,${targetY + (0.5*startPosition.height)}px) scale(0.5)` },
        ];
        const newspaperTiming = {
            duration: 2000,
            easing: "ease-in-out",
            iterations: 1,
            fill: "forwards",
        }

        flyCard.animate(newspaperSpinning, newspaperTiming);
    });
    count += cardsCollection[0].getBoundingClientRect().width / 5;
}


/*
export function matchCardsAnimationByCardsCollection(cardsCollection) {
    cardsCollection.forEach(element => {
        const startPosition = element.getBoundingClientRect();
        const flyCard = document.createElement('div');
        flyCard.setAttribute("class", "fly_card");
        flyCard.style.left = startPosition.left + "px";
        flyCard.style.top = startPosition.top + "px";
        flyCard.style.width = startPosition.width + "px";
        flyCard.style.height = startPosition.height + "px";
        flyCard.style.backgroundImage = element.querySelector('.front_card').style.backgroundImage;
        element.style.visibility = "hidden";
        document.body.appendChild(flyCard);

        const targetPosition = document.querySelector('.winningImg').getBoundingClientRect();
        const targetX = (targetPosition.x - startPosition.x);
        const targetY = (targetPosition.y - startPosition.y);

        const newspaperSpinning = [
            { transform: `translate(0,0) scale(1)` },
            { transform: `translate(${targetX}px,${targetY}px) scale(0)` },
        ];
        const newspaperTiming = {
            duration: 2000,
            easing: "ease-in-out",
            iterations: 1,
            fill: "forwards",
        }

        flyCard.animate(newspaperSpinning, newspaperTiming);
    });
}
*/