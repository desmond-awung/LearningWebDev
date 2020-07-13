// alert("CONNECTED")
let userAns = prompt("Are we there yet?");

// Check if user enters in yes, yeah or any other string containing yes
// while(userAns !== "yes" && userAns !== "yeah") {
while(userAns.indexOf("yes") === -1) {
    userAns = prompt("Are we there yet?");
}

// This code after while loop is done: user enters "yes"
alert("Yayy! We made it.")