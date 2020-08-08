// using the example in the Express Getting Started guide

// console.log("OUR EXPRESS APP WILL GO HERE");
const express = require("express");   // includes all content in the express directory
const app = express();
const port = 3000

// ROUTES - the order of routes matters
// the first route that matches would be run only by that route: would not move on to any other route

// root page: "/"  ==> "Hi there"
app.get("/", function(req, res){
    // req and res are objects:
    // req: contains all info about the request that triggered this route
    // res: contains info about the response
    res.send("Hi there");
})

// "/bye" ==> "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye");
})

app.get("/login", function(req, res){
    console.log("A use wants to log in!")
    res.send("Welcome to my Login Page. This is a I wonder app!")
})

// how to match a pattern: no need to match every single route on our website

// note: only matches 1 word after "/", but any more "/" after the subredditName falls through down the list
app.get("/r/:subredditName", function(req, res){
    // accessing router stuff ==>
    // console.log(req.params);
    const subredditName = req.params.subredditName;
    res.send("Welcome to the " + subredditName.toUpperCase() + " subreddit");
})

// here is how to match multiple "/"
app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    console.log(req.params);
    res.send("Welcome to this comment's page");
})


// catch all: accessing a route not defined
// this MUST be last, down the list of all routes
app.get("*", function(req, res){
    console.log("**");
    res.send("You entered an invalid page");
})


// LISTEN
// Tell Express to listen for requests (start server)
app.listen(port, () => {
    console.log('Server has started: app listening at http://localhost:{port}')
})
