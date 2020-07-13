// create secret number
const ans = 7

// Get guess from user and convert it to a Number (prompt always returns a String)
const myGuess = Number(prompt("Enter your Guess.."));

// check if guess is lower
if (myGuess < ans) {
    alert("Oops, TOO LOW.")
}
// check if guess is correct 
else if (myGuess === ans) {
    alert("YESS!!! You guessed it Right.")
}
// otherwise check if number is higher than ans
else {
    alert("Whoa, TOO HIGH")
}
