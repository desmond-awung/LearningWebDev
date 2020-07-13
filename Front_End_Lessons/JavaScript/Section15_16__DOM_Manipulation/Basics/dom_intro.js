
// // SELECT
// let body = document.querySelector("body");

// let isBlue = false;

// // MANIPULATE
// setInterval(function () {
//     // alternate background color periodically
//     if(isBlue) {
//         body.style.background = "white";
//     }
//     else {
//         body.style.background = "#3498db"; // some nice light blue color 
//     }

//     // toggle isBlue 
//     isBlue = !isBlue;

// }, 2000);


// WAYS TO SELCT


//********* */ the first 3 return an HTMLCollection (even when only a single elt is returned)
// rem: an id can occur only once in an HTML page
// document.getElementById()

// rem: a class can occur innumerous elements in a page
// document.getElementsByClassName()

// gets all elements with a certain tag
// document.getElementsByTagName()


// *************
// this makes our lives easier: just put in css selector syntax(whether tag, attribute, class, complex stuff too!)
// #highlight
// .bolded
// h1 + p (p tag adjacent/next to h1 tag)
// li a.spcial (all anchor tags with class special nested in an li)
// document.querySelector()
// returns an object

// document.querySelectorAll()
// returns a NodeList, all of a specificic css selector
// will still work even if there is only one match; still a NodeList

