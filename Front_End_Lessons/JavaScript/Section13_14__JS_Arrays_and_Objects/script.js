
// alert("Connected")

// create n empty array to hold items in to-do list
list = [];
// prompt user for first action
let action = prompt("What do you want to do?");

while (action !== "quit") {

    if (action === "list") {
        console.log(list)
    }
    else if (action === "new") {
        // ask for new to-do
        newitem = prompt("Enter a new to-do");
        // add to to-do list
        list.push(newitem);
    }

    else
        console.log("Unknown acion. Please type either: \"list\", \"new\" or \"quit\"")

    // prompt user for next action
    action = prompt("What do you want to do?");
}

// once user enter squit,
console.log("DONE! You quit the app.")

// Learning about forEach -  an alternative to for() to loop through an array
// Both 1. and 2. produce the same result

// 1. Using an anonymous function / function expression 
// say we have an array colors: 
colors = ["red", "orange", "yellow", "green", "blue", "green", "blue"];
colors.forEach(function (col, i) {      // anonymous func in forEach takes up to 3 args: element, index, array 
    // let i = colors.indexOf(col)
    console.log(i + ": " + col);
    console.log("*************");
})

// 2. another way of using forEach, this time using a function declared :
function printcol(col) {
    let i = colors.indexOf(col)
    console.log(i + ": " + col);
    console.log("*************");
}

colors.forEach(printcol);