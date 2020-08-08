// select first button elt
let btn1 = document.querySelector("button");

// select p element
let p1 = document.querySelector(".btn-click");

// Manipulate
// create event listener: click listener
btn1.addEventListener("click", function () {
    p1.textContent = "Someone Clicked me!";
});

// WE can even create events for text clicks too:
// for ex: for 1st h1
let h1 = document.querySelector("h1");
h1.addEventListener("click", function() {
    alert("first h1 was clicked !!!");
})

// yes! we can have multiple listeners on one elt. Both run, either when it applies to the elt or to the parent

// now on parent elt:
let ul1 = document.querySelector("ul");
ul1.addEventListener("click", function() {
    // change entire 
    ul1.style.background = "orange"
})

// not the best: better detect indiv li elts:
let lis = document.getElementsByTagName("li");  // contains all li elts on page
for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function() {
        // change indiv li bkground to grey
        // debugger;   // client side js debugger
        // lis[i].style.background = "#ff3"     // for this be sure to use let i in the for loop init
        this.style.background = "#606070"    // inside a listener, _this_ refers to the element selected in question. It is "event.currentTarget" here (if event is passed as arg to callback fxn)
    })
}


let btn2 = document.querySelector(".body-click");
btn2.addEventListener("click", function() {
    // best way: with CSS class .purple 
    document.body.classList.toggle("purple");
    // interesting way to toggle style in js.. hmm. very similar to C.
    // document.body.style.background = document.body.style.background === "purple" ? "white": "purple" ;
});








