
const statusObj = {
    open: false,
    currentCard: null,
    userChoice: null,
    waiting: false,
    score: 0,

}

export function handleCardClick(card) {
    // OPENING CARD ONE  //
    card.setAttribute("data-open", true);
    if (!statusObj.open) {
        statusObj.open = true;
        statusObj.currentCard = card.getAttribute("data-pairNum");
        // console.log(statusObj);
    } else {

        checkMatch(card);
    }

}
// CARD TWO CHECK MATCH//
function checkMatch(card) {

    if (card.getAttribute("data-pairNum") === statusObj.currentCard) {
        statusObj.score++;
        const allOpen = document.querySelectorAll("[data-open='true']");
        //! ADD DELAY HERE //
        allOpen.forEach((e) => {
            e.style.visibility = "hidden";
        })
        statusObj.open = false;

        //     console.log(statusObj);
    } else {

    }
}