const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");  // for parsing info from forms: npm i -S body-parser


app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : true}))   // for body parser

// global scope
let friends = ["Yvann", "Kwasi", "Jeremiah", "Shamiso", "Lenzwite"];

// ROUTES

// root
app.get("/", (req, res) => {
    res.render("home");  // render the home.ejs page
});

// friends ==> will contain list of friends, which 
app.get("/friends", (req, res) => {
    res.render("friends", {friends : friends});
});

// post route:  sending new data to be used on the server side
app.post("/add-friend", (req, res) => {
    // res.send("You have reached the post route!");
    // two lines below will work only with body-parser package installed, cuz Express.js can't parse req.body as an object out of the box. 
    //      Throws this error: TypeError: Cannot read property 'movSearch' of undefined
    // console.log(req.body);
    // console.log(req.body.newFriend);
    let newFriend = req.body.newFriend;     // from the name attribute in the html input in friends.ejs
    friends.push(newFriend);        // add this newFrriend to the array friends
    res.redirect("/friends");   // redirect to the /friends page, updated with newFriend added

});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})