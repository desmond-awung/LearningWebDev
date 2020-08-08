// Functions exercises  

// alert("Connected to JS")

// return true if num is even, else return false
function isEven(num) {
    // Verify that only numbers are passed as arguments
    if (typeof (num) !== "number") {
        console.log("ERROR! Please Enter a non-negative whole number");
        return;
    }
    return num % 2 === 0
}
// Long version
// function isEven(num) {
//     if (num % 2 === 0)
//         return true;
//     else
//         return false;
// }



// compute factorial of num
function factorial(num) {
    // Verify that only  non-negative integer numbers are passed as arguments
    if (typeof (num) !== "number" || (num < 0 || num % 1 !== 0)) {
        console.log("ERROR! Please Enter a non-negative whole number");
        return;
    }

    if (num === 1 || num === 0)
        return 1;
    else
        return num * factorial(num - 1);
}

// kebabToSnake converts all '-' (kebab-case) in a string arg to '_' (snake_case)
function kebabToSnake(str) {
    if (typeof (str) !== "string") {
        console.log("ERROR! Please Enter a string");
        return;
    }

    // g is for replacing globally (throughout) the string  
    const dash = /-/g;
    str = str.replace(dash, '_');
    return str;
}

// Higher Scope functions

// setInterval - kinda like interrupt

// Ex. 1 - setInterval being passed a function sing as an arg - to run every 1000ms 
// function sing() { 
//     console.log("Twinkle twinkle..");
//     console.log("How I wonder...");
// }
setInterval(sing, 1000);
// This returns a number on the console - num - used below
// To stop, enter clearInterval(num)

// Ex. 2 - setInterval being used with an anonymous function, to run every 3s
setInterval(function() {
    console.log("I am an anonymous func");
    console.log("Pretty cool");
}
, 3000)