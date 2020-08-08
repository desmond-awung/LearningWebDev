const express = require("express");
const app = express();
const port = 3000;

// JS Object to hold a dictionary of animal-sound pairings 
const sounds = {
    cow : "Moooooo",
    dog : "Woof-Woof",
    cat : "Meow",
    wolf: "Hoooowl",
    pig: "Oink"
};

// ROUTES

// root page
app.get("/",function(req, res){
    // console.log(req.params);
    res.send("Hi there! Welcome to my assignment!!!")
})

// "speak" route
// if the animal in the req param is one of the keys of the animals object: print the animal name (from req arg) and the sound the animal makes 
// else: redirect to the error page
app.get("/speak/:animal",function(req, res){
    const animal = req.params.animal.toLowerCase(); // get the animal from the route params ==> always of type string
    // console.log(typeof(req.params.animal));
    if(sounds.hasOwnProperty(animal))   // if this animal is one of the object's keys
    {
        console.log(sounds[animal]);    // get the property's value from the sounds object
        // res.send("The " + animal + " says " + sounds[animal]);
        res.send(`The ${animal} says '${sounds[animal]}'`);
    }
    else
    {
        // redirect to error page - in this case, goes to the "catch all" page
        res.redirect("/error");
    }
})

// "repeat" route
// repeat whatever was sent to the 'message' param 'num' number of times
app.get("/repeat/:message/:num", function(req, res) {
    console.log(req.params)
    let num = parseInt(req.params.num);     // since the params are always strings, we convert to int
    console.log(num);
    // in case of erroneous input, redirect to error page
    if(num < 0 || isNaN(num)){
        res.redirect("/error");  
    }
    else{
        // else process as normal
        let message = req.params.message;
        // evaluate the string to be sent to the response. We can't do res.send() in the for loop sice we get only one respond for a request
        let result = String();   // create an empty string
        for(let i = 0; i < num; i++)
        {
            result += `${message} `;
        }
        // send the string to the response
        res.send(result);
    }
})

// catch all route / error route
app.get("*",function(req, res){
    console.log(req.params);
    res.send("Sorry, page not found. Get outta here!");
})


// start the server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});