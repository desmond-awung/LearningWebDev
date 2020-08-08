
// alert("Connected");

// Check off specific todos by clicking
// .on('click')
// when an li is clicked inside a ul, run this code ==> do this for li elements created after page initially loads. 
$("ul").on("click", "li", function () {
    // when we click on li, the li gets greyed out, and its text gets strike-through
    $(this).toggleClass("taskCompleted");    // single line powerful solution!!
});

// click on red trash can to delete to-do
$("ul").on("click", ".deleteTask" , function (event) {
    // fadeout li ==> immediate parent of <span>
    $(this).parent().fadeOut(600, function () {
        //remove li from DOM after fadeOut, just so we don' have a whole bunch of hidden lis on the page 
        $(this).remove();
    });
    // prevent event from bubbling up to li, ul, etc all the way to html
    event.stopPropagation();
})

// text input event listeer when user kepresses "Enter"
$("input[type=text]").on("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("Enter was pressed.");
        // grab new todo text from input, erase input box and create new ul
        // console.log($(this).val());
        let newTodo = $(this).val();
        // append this to the ul on the page
        $("#container ul").append("<li> <span class=\"deleteTask\"><i class=\"fas fa-trash-alt\"></i></span> " + newTodo + "</li>")
        console.log(newTodo);
        $(this).val("");
        
    }
    
});

// click listener for plus '+' button to toggle fading in or out the input box
$(".fa-plus").click(function() {
    $("input[type=text]").fadeToggle();
});

