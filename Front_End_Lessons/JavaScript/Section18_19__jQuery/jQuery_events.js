// if(jQuery) {
//     alert("Connected");
// }

// click()
/*
// click event listener to lone h1 on the page

$("h1").click(function() {
    alert("h1 clicked");
});

// add event listeners to a collection of buttons - jQuery makes it easy - no need for "for" loop!!
$("button").click(function() {
alert("button clicked");
})

// $(this) helps us select only the specific element that was clicked
// note jQuery wrapper on this: the simple 'this' from vanilla JS won't work here
// error: this.css is not a function! hmm.
$("button").click(function() {
$(this).css("backgroundColor", "yellow");
});

// pretty cool:
$("button").click(function() {
    console.log("You clicked: " + $(this).text());
});

*/

// keypress() - check difference b/w this, keyup and keydown
/**
  // keypress event when user enters a character in input. Note. "keypress()" only considers actual characters (letters, nums, @)  + Enter key. Does NOT consider Delete, Shift, Etc.
  Note: to select a tag with a specific attribute(for example many input tags on a page):
  $("input[type = text]")
  // check this out
  $("input[type = text]").keypress(function() {
    console.log("You pressed a key.")
});

// event.which gives us the keycode of the ACTUAL key that was pressed. (How about event.key)
$("input[type = text]").keypress(function(event) {
    console.log(event.which);
});
  
// Ketpress event for "ENTER"
$("input[type = text]").keypress(function(event) {
    if(event.which === 13)
        alert("You hit ENTER");
}); 


 */

 // on()
//  on() ==> addEventListener, but you enter in the jQuery event name
// so much better than "click" event, since 'on' also will apply to all elts added later to the page.
 /**
  
  
// click
example: change text color of h1 when clicked:
$("h1").on('click', function() {
    $(this).css("color", "green") ;
});
 
// keypress
$("input[type = text]").on('keypress', function(event) {
    console.log("You pressed " + event.key);
})

// mouseenter + mouseleave
// to bold the button text on hover - aka mouse enter, and return to normal after hove: mouseleave:
// 2 events:
$("button").on("mouseenter", function() {
    $(this).css("font-weight", "bold");
    //console.log("Mouse Enter!!");
});
$("button").on("mouseleave", function() {
    $(this).css("font-weight", "normal");
    //console.log("Mouse Enter!!");
});


  */
