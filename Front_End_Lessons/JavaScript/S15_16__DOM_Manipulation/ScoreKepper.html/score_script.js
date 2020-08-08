
// select buttons
const btnP1 = document.querySelector(".btn-p1");
const btnP2 = document.querySelector(".btn-p2");
const btnReset = document.querySelector(".reset");

// select score texts. Assigning them as const throws an error (since they are modified by function)
let p1Display = document.querySelector(".p1Display");
let p2Display = document.querySelector(".p2Display");

// method1: select score cap
// const scoreSelected = document.getElementsByTagName("select")[0];
// method2: score cap is input == winningScore
const scoreCapInput = document.getElementsByTagName("input")[0];
// *** or we can specify only number inputs:
// const scoreCapInput = document.getElementsByTagName("input[type='number']");

// select winning Score displayed
const winScoreDisplay = document.querySelector(".playingTo")


// reset scores everytime we reload the page
let p1Score = 0;
let p2Score = 0;
let winningScore = 5;
let gameOver = false;   // this tells us when one of the players has reached the score cap: winningScore 

// **** Event Listeners *****

// increment player 1 score and check if game is over
btnP1.addEventListener("click", function() {
    [p1Score, p1Display] = incrementScore(p1Score, p1Display);
    isGameOver(p1Score, p1Display); // verify if game is over
})

// increment player 2 score and check if game is over
btnP2.addEventListener("click", function() {
    [p2Score, p2Display] = incrementScore(p2Score, p2Display);
    isGameOver(p2Score, p2Display) // verify if game is over
})

// event to reset game
btnReset.addEventListener("click", resetGame)

// for both methods: this ==> event.target.value (where event is arg to anonymous function)
// method1: change event on scoreSelected 
/*
scoreSelected.addEventListener("change", function() {
    // one way using "option" as function arg
    // console.log("scoreSelected changed to " + option.target.value );
    // easier way: this: (note that this.selectedIndex could be useful too!(like for array index, starts from 0))
    console.log("scoreSelected changed to " + this.value);
    // debugger;
    // change the scoreCap var, and the text on the page
    winningScore = this.value;
    winScoreDisplay.textContent = this.value;
})
*/

// method2: input event to scoreCapInput - note: also resets the game
scoreCapInput.addEventListener("input", function() {
    console.log("Score Input changed to " + this.value);
    // it's important we convert to a number
    winningScore = Number(this.value);      // or scoreCapInput.value
    winScoreDisplay.textContent = this.value;
    // and then reset the game
    resetGame();
})

// Function to increment score
function incrementScore(pxScore, pxDisplay) {
    // Only increment when player x score is less than selected winningScore
    if (!gameOver) {
        pxScore +=1; // increment player score
        // display updated text on screen
        pxDisplay.textContent = pxScore;
        console.log(pxDisplay.textContent);
    }
    // we have to return for global _let_ variables to be modified
    return [pxScore, pxDisplay];
}

// Function to verify if game is over
function isGameOver(pxScore, pxDisplay) {
    if (pxScore === winningScore) {
        gameOver = true;
        // change text to green
        pxDisplay.classList.add("winner");
    }
}

// reset score for a single player
function resetScore (pxScore, pxDisplay) { 
    pxScore = 0;
    pxDisplay.textContent = pxScore;
    pxDisplay.classList.remove("winner");

    // we have to return for global _let_ variables to be modified
    return [pxScore, pxDisplay];
}

// reset players scores, and reset gameOver to false
function resetGame() {
    gameOver = false;
    [p1Score, p1Display] = resetScore(p1Score, p1Display);
    [p2Score, p2Display] = resetScore(p2Score, p2Display);
}