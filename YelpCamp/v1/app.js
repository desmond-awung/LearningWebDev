// init express
const express = require("express");
const app = express();
app.set("view engine", "ejs");  // skip all .ejs file extensions
// tell express to use the public directory, which will contain our front-end styling: css, js & bootstrap
// so all html <link> tags in the head will point to public/...
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

// init node server
const port = 3000;


// In v1: all campgrounds are stored in an array. And each campground has only 2 pieces of info:
// - name
// - image
let campgrounds = [

    { name: "Lake Travis", image: "https://images.unsplash.com/photo-1522893442332-0718950d64d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Balcones Ridge", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Zilker Park", image: "https://images.unsplash.com/photo-1481973964012-59a7f3225eb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Mueller Park", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Balcones Ridge", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Zilker Park", image: "https://images.unsplash.com/photo-1481973964012-59a7f3225eb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Mueller Park", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Lake Travis", image: "https://images.unsplash.com/photo-1522893442332-0718950d64d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Balcones Ridge", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Zilker Park", image: "https://images.unsplash.com/photo-1481973964012-59a7f3225eb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    { name: "Mueller Park", image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
]

// ROUTES
// Landing page
app.get("/", (req, res) => {
    // res.send("This will be the Landing page");
    res.render("landing")   // landing.ejs
})

// campgrounds page
app.get("/campgrounds", (req, res) => {                 // REST format
    res.render("campgrounds", {camps : campgrounds})
})

app.post("/campgrounds", (req, res) => {                // REST format
    // get data from form and add to campgrounds[] array
    const campName = req.body.camp_name;
    const campImgUrl = req.body.image_url;
    const newCamp = {
        name : campName,
        image : campImgUrl,
    };
    console.log(newCamp);
    // add to end of campgrounds array
    campgrounds.push(newCamp);
    // redirect back to /campgrounds page
    // res.send("This is the POST route");
    res.redirect("/campgrounds");   // even though we have two of these "/campgrounds" routes, the default is to go to a get() route.
})

// shows form that sends data to post route
app.get("/campgrounds/new", (req, res) => {                 // REST format
    res.render("new");
})

// start server
app.listen(port, () => {
    console.log(`YelpCamp started at port: ${port}`);
})