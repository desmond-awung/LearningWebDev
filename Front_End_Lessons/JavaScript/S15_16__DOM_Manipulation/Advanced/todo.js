
// alert("Connected")

// let li1 = document.querySelector("li");

// mouseover: does not keep continuously firing: event fires only when hovering starts

/*
li1.addEventListener("mouseover", function() {
    // console.log("Mouse Over");
    li1.classList.add("changeColor");
    
})

// this fires when mouse/cursor moves away from element
li1.addEventListener("mouseout", function() {
    // console.log("Mouse Over");
    li1.classList.remove("changeColor");
    
})
*/

// do it for all lis
let lis = document.querySelectorAll("li");

for(let i=0; i<lis.length; i++) {
    // mouse-over
    lis[i].addEventListener("mouseover", function(){
        // lis[i].classList.add("changeColor");
        // console.log(this); ==> YESS. _this_ is the item/elt the event was triggered on
        this.classList.add("changeColor");
    });

    // mouse-out
    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("changeColor");
    });

    // remove to-do when clicked
    lis[i].addEventListener("click", function(){
        this.classList.toggle("done");
    });
}