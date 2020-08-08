// if(jQuery) {
//     alert("jQuery Connected");
// }

// this line makes the fading happen when page loads! interesting!
// $("div").fadeOut();

// event on button click
// note that display is set to 'none' once the fadeout effect is complete ==> inline elts are shifted left
// the divs are not deleted from the DOM: just hidden 
// $("button").on('click', function() {
//     // $("div").fadeOut('fast');
//     $("div").fadeOut(1000);
// })

// if we want to guarantee that code runs right after fade is complete, don't do this:
// JS does NOT wait for fadeout to be complete before executing to console.log
// $("button").on('click', function() {
//     $("div").fadeOut(1000);
//     console.log("Fadeout complete");
// })

// do this instead: calleback fxn
// $("button").on('click', function() {
//     $("div").fadeOut(1000, function() {
//         console.log("Fadeout s defninitely complete"); // note: does this for all elts that execute "fadeOut" ==> multiple console.log() 
//     });
// })

// now to remove these hidden elts from the DOM:
// $("button").on('click', function() {
//     $("div").fadeOut(1000, function() {
//         $(this).remove();
//     });
// }) 


// now to fade in, assuming we start with display: none
// $("button").on('click', function() {
//     $("div").fadeIn(1000, function() {
//     });
// }) 

// now fadeToggle - the bomb!
// $("button").on('click', function() {
//     $("div").fadeToggle(500, function() {

//     });
// }) 

// checkout: slideUp (@ end: disapears), slideDown (@ end: appears), slideToggle (pretty cool!!)
$("button").on('click', function() {
    $("div").slideToggle(600, function() {

    });
}) 

