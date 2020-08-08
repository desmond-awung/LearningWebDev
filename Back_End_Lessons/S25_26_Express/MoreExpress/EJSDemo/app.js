const express = require("express");
const app = express();
const port = 3000;

// tell express to use the public directory, which will contain our css and js
app.use(express.static("public"));

// tell express all routes are to render .ejs files ==> no need to enter extensions in the res.render() calls
app.set("view engine", "ejs");

// ROUTES

// root
app.get("/", function (req, res) {
    // res.send("<h1>Welcome to Home Page!!</h1> <p> The home page to my EJS app </p>");
    // here is a better way to render html: res.render(path_to_file)
    res.render("home")  // looks for this filename in the "views" folder located in the project root dir
    // res.render("home.ejs")
})

app.get("/travel/:destination", function (req, res) {
    // let dest = req.params.destination.toUpperCase();
    let dest = req.params.destination;
    // res.send(dest + " is a great place to travel to. Pack your bags!");
    res.render("travel.ejs", { travelSite: dest });
})


app.get("/posts", function (req, res) {
    const postsArr = [
        { title: "Post0", author: "Mark" },
        { title: "This is a great country", author: "Mark" },
        { title: "Lovely panoramic views", author: "Des" },
    ];

    res.render("posts.ejs", { allPosts: postsArr });
})

// Is the line below the same as what I used for app.listen() ?
// app.listen(port, () => function(){
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})
