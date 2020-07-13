
// alert("Connected")

// create n empty array to hold items in to-do list
list = [];
// prompt user for first action
let action = prompt("What do you want to do?");

while (action !== "quit") {

    if (action === "list") {
        listTodos();
    }
    else if (action === "new") {
        addTodos();
    }
    else if (action === "delete") {
        deleteTodos();
    }

    else
        console.log("Unknown action. Please type either: \"list\", \"new\", \"delete\" or \"quit\"")

    // prompt user for next action
    action = prompt("What do you want to do?");
}

// once user enter squit,
console.log("DONE! You quit the app.")

function listTodos() {
    // Print out each list item on a separate line on the console 
    console.log("************")
    list.forEach(function (item, i) {
        console.log(i + ": " + item);
    })
    console.log("************")
}

function addTodos() {
    // ask for new to-do
    newitem = prompt("Enter a new to-do");
    // add to to-do list
    list.push(newitem);
    // display added item in console
    console.log(newitem + " added to the list.");
}

function deleteTodos() {
    // no need to convert user input into number: splice can handle it
    index = (prompt("Enter index of todo to delete:"));
    // if (Number(index) === NaN || index === "") {
    //     console.log("Incorrect format: index has to be a number.");
    // }
    // else {
    // faster way to delete a single specific elt in array: splice
    // list.splice(Number(index), 1);
    list.splice(index, 1);

    // WET way:
    // // declare empty array to hold updated list
    // let updatedList = [];
    // index = Number(index);
    // list.forEach(function (item, i) {
    //     if (i !== index) {
    //         // push the item to the end updatedList as long as the index user entered (index) did not correspond to current index in forEach loop (i)
    //         updatedList.push(item); 
    //     }
    // })
    // // list now equals updatedList
    // list = updatedList;

    console.log("Todo Removed")
    // }
}

// functions for Array Problem Set:

// prints all elements on console, in reverse order 
function printReverse(array) {
    for (let i = array.length; i >= 0; i--) {
        console.log(array[i]);
    }
}

// returns true if all elements in an array are identical, else returns false
function isUniform(array) {
    if (array.lenght === 1) {
        return true;
    }
    else {
        for (let i = 1; i < array.length; i++) {
            if (array[i] !== array[i - 1]) {
                // debugging
                // console.log("Broken at: i = " + i);
                return false;
            }
        }
        // if loop ran till the end, then all elements are identical:
        return true;

        /*    
            // in forEach, return exits anonymous function inside forEach, but keeps iterating through array :(
            // loop through all array elements using forEach
            array.forEach(function(element, i) {
                // skip first element, then compare if current element is equal to prev element
                if(i > 0 && element !== array[i-1]) {
                    console.log("Broken at: i = " + i);
                    return false;
                }
                    
            })
            // if loop ran till the end, then all elements are identical:
            return true; 
            */
    }
}

// returns the sum of all elements in an array, assuming array only comprises numbers
function sumArray(array) {
    let sum = 0;
    array.forEach(function (elt) {
        sum += elt;
    })
    return sum;
}

// retuns the max number in an array, assuming array only comprises numbers
function max(array) {
    // set max_elt to be the first elt 
    let max_elt = array[0];
    array.forEach(function(elt){
        // if current array elt is greater than max, then the max is assigned to the current elt. 
        if(elt > max_elt) {
            max_elt = elt;
        }
    })
    // after loop is complete, return maximum number in the array
    return max_elt
}
