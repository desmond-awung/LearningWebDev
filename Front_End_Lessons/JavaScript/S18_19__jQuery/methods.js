// To verify that jQuery works:
// if (jQuery) {
//     alert("jQuery Connected!");
// }
// else {
//     alert("No jQuery Connected :( ")
// }

// setter and getter paradigm

//
/*
.text()
.html

.attr()
.val()

*/

// type these in console to see effect

// ***************************
// .text() ==> js: textContent() ==> this is html safe!
// returns all text in an elt
/*
$("h1").text()
$("ul").text()
// prettyweird: smasches it all together
$("li").text()

// set text
$("h1").text("New Text")
// this loops through all the elts for us as well
$("li").text("This is really dope")

// ***************************
// .html ==> js innerHTML()
// returns html inside elt
$("h1").html()
$("ul").html()
// if multiple of selected elt, selcts the first
$("li").html()
// better use css selectors:
$("li:nth-of-type(2)").html()
// replace existing html
$("ul").html("<li>I hacked your ul tag </li><li> I hacked your ul _ another li</li>")
// updates all elts if multiple are on a page
$("li").html("<a href='http://google.com'> CLICK ME </a>")

// ***************************
// .attr ==>
// retrieve (for first) or set an attribute
// reduce img sizes: $("img").css("width", "300px")

// first get current/first href attribute
$("img").attr("src")

// change img href: sets on multiple elts on a page
$("img").attr("src", "https://images.unsplash.com/photo-1544211393-7fdc8fca9f4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60")
// specific, first: 
$("img:first-of-type").attr("src", "http......
// last
$(img).last().attr(...
// note: $(div:last) and $(div:first) have been deprecated: use $(img).last() and $(img).last()

// input types:
$("input").attr("type")
$("input").attr("type", "checkbox")

// ***************************
// .val() ==> vanilla js: .value()
// good for inputs, checkboxes, dropdown
$("input").val()
// good for clearing inputs, eg in to-do list
$("input").val("")

// ***************************
.addClass ==> vanilla js: classList.add()
.toggleClass ==> classList.toggle()

$("li:nth-of-type(1)").toggleClass("correct") // first li
$("li:nth-of-type(2)").toggleClass("wrong") // second li
$("li:nth-of-type(3)").toggleClass("done")
// we can also stack them: add one class and remove the other
// back to back:
$("li:nth-of-type(2)").addClass("wrong")
$("li:nth-of-type(2)").removeClass("wrong").addClass("correct")
// also multiple elts





*/
// 

