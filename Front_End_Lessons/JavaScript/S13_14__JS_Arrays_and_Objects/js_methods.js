// Methods are functions declared inside objects
// Nice: methods help avoid name-space collosion.
// note: this refers to the object I am inside of
kidSection = {
    name: "Ethan",
    activity: "play",
    food: "mac and cheese",
    sleep: function (x) {
        console.log("For " + this.name + " the kid, set Timer for " + x + " to " + (x + 2) + " hours");
    },
}

adultSection = {
    name: "Johnnie",
    activity: "work",
    food: "pork chops",
    sleep: function (x) {
        console.log("For " + this.name + " the adult, set Timer for exactly " + x + " hours");
    },
}

// the keyword this helps us access data that has been predefined in the object 
// one way to declare an object
comments = {};
comments.arr = ["Great job", "Me Like :)", "Meeh..", "Loving this"];
comments.print = function() {
    // loop through all elts of arr above
    this.arr.forEach(function(el) {
        // and prints each line on console
        console.log(el);
    })
}


// try
kidSection.sleep(2);
adultSection.sleep(2);
console.log("***************")
comments.print();

