// Get age and convert it to a Number (prompt always returns a String)
const age = Number(prompt("Enter your age: "));

if(age < 0) {
    console.log("ERROR: Age has to be non-negative.");
}

// We enter a string in the browser, and if we don't convert using Number function, we cannot use === to compare this string type entered with number 21
if(age === 21) {
    console.log("Happy 21st Birthday");
}

// Here, even if and if we don't convert using Number function, age % 2 always converts to number, so yes we can use === since both left and right are numbers
if(age % 2 === 1) {
    console.log("Your age is odd");
} 

if(age !== 0 && Math.sqrt(age) % 1 === 0) {
    console.log("Nice. Your age is a Perfect Square")
}

