// alert("Connected")

// properies for modes
let gameMode = {

    // easy mode
    easy: {
        mode: "easy",
        numSquares: 3,
    },

    // hard mode
    hard: {
        mode: "hard",
        numSquares: 6,
    }
}

// define these variables to be global scope
let modeSelected;   // mode selected: easy or hard
let colors;         // array of colors for squares
let correctColor;   // display color goal:

// select square divs
let squares = document.getElementsByClassName("square");
// select h1 on top
let heading = document.getElementById("heading");
let colorDisplay = document.getElementById("colorDisplay");
let easyBtn = document.querySelector("#easyBtn")
let hardBtn = document.querySelector("#hardBtn")
// select message display
let messageDisplay = document.getElementById("message");
// select reset button
let resetBtn = document.getElementById("reset");

// code execution begins here: 
init();

function init() {
    // by default, gameMode is hard
    modeSelected = gameMode.hard;
    colors = generateColors(modeSelected);

    // set up event listensers for color squares
    setupSquares();
    
    // setup button event listeners
    setupModeButtons();
    
    // then reset the game
    resetGame(modeSelected);
}

// setup button event listeners
function setupModeButtons() {
    // easy button
    easyBtn.addEventListener("click", function () {
        // modify color of btns
        easyBtn.classList.add("selectedBtn");
        hardBtn.classList.remove("selectedBtn");
        modeSelected = gameMode.easy;
        resetGame(modeSelected);
    });

    // hard button
    hardBtn.addEventListener("click", function () {
        // modify color of btns
        easyBtn.classList.remove("selectedBtn");
        hardBtn.classList.add("selectedBtn");
        modeSelected = gameMode.hard;
        resetGame(modeSelected);
    });
    
    // reset button 
    resetBtn.addEventListener("click", function () {
        resetGame(modeSelected);
    });
}

// set up event listensers for color squares
function setupSquares() {
    for (let i = 0; i < squares.length; i++) {    
        // add click event listeners to squares
        squares[i].addEventListener("click", function () {
            let clickedColor = this.style.backgroundColor;
            // compare square clicked to correctColor
            checkClickedSquare(squares[i], clickedColor);
        })
    }
}

// resets game
function resetGame(mode) {
    // first genrate new set of random colors
    colors = generateColors(mode);
    // then pick new color from array
    correctColor = pickColor();
    // display new correct color on top
    colorDisplay.textContent = correctColor;
    messageDisplay.textContent = "";
    setSquareColors();
    // debugger;
    // change resetbutton
    resetBtn.textContent = "New Colors"
    heading.style.backgroundColor = "";
    // heading backgroundColor is set in CSS
    // heading.classList.add("bodyBackground")
    // debugger;

    // if mode is easy, remove bottom 3 squares:
    if (mode.mode === "easy") {
        for (i = 3; i < squares.length; i++) {
            squares[i].classList.add("hideSquares");
        }
    }
    // else re-display bottom 3 squares
    else {
        for (i = 3; i < squares.length; i++) {
            squares[i].classList.remove("hideSquares");
        }
    }
}

// checks if the square the user clicked is the correctColr 
function checkClickedSquare(squareClicked, squareColor) {
    if (squareColor === correctColor) {
        // picked correct color
        // console.log("Great Answer.");
        // display message
        // debugger;
        messageDisplay.textContent = "Correct!"
        changeSquareColors(squareColor);
        // change h1 color
        heading.style.backgroundColor = squareColor;
        // change button text to Play again
        resetBtn.textContent = "Play Again?"
    }
    else {
        // wrong color was picked
        // debugger;
        // first remove the color in "style" attribute to avoid conflict
        squareClicked.style.backgroundColor = "";
        // then change color to bkgnd color
        squareClicked.classList.add("bodyBackground")
        // display message
        messageDisplay.textContent = "Try again!"
    }
}

// changes color when ans is correct
function changeSquareColors(color) {
    // loop thr all squares, 
    for (let i = 0; i < squares.length; i++) {
        // change colors to match correct color
        // this.style.backgroundColor = "";    // first remove background color style
        // this.classList.add("wrong_answer") // then change color

        // temp solution?  alternative:  activate and deactivate css ppty?
        squares[i].style.backgroundColor = color;

    }
}

function pickColor() {
    // pick a random number between 0 and l (where l is the array length)
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];

}

function generateColors(sel) {
    // create a new empty array of length depending on if it's easy or hard
    colorArray = new Array(sel.numSquares);
    for (let i = 0; i < colorArray.length; i++) {
        // array of color channels
        colorArray[i] = rgbChannel();
        // or we can push to array
        // colo
    }

    return colorArray;
}

// select color for each channel
function rgbChannel() {
    let channelArray = new Array(3); // 3 channels in rgb
    let color;
    for (let i = 0; i < channelArray.length; i++) {
        channelArray[i] = Math.round(Math.random() * 255);   // goes from 0 to 255
        // color += " " + channelArray[i];
        if (i < channelArray.length - 1)    // add a comma only after ch1 and ch2
            channelArray[i] += ', '

    }
    // color format: rgb(r, g, b)
    color = "rgb(" + channelArray[0] + channelArray[1] + channelArray[2] + ")";
    return color;
}

// set colors for each square
function setSquareColors() {
    for (let i = 0; i < squares.length; i++) {
        // add initial colors to square
        // use .backGroundColor rather than .background -- compatible with more browsers
        squares[i].style.backgroundColor = colors[i];
    }
}

// old rgb array
    // [
        //     "rgb(255, 0, 0)",
        //     "rgb(255, 255, 0)",
        //     "rgb(0, 255, 0)",
        //     "rgb(0, 255, 255)",
        //     "rgb(0, 0, 255)",
        //     "rgb(255, 0, 255)",
        // ]