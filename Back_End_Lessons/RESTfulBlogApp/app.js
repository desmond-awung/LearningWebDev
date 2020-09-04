// entry point for Blog app

// declare packages used
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;      // port used for node.js server

// init express, ejs and body-parser
app = express();
app.set("view engine", "ejs"); // skip all .ejs file extensions in routes
// tell express to use the public/ directory, which will contain our front-end styling: css, js & bootstrap
// so all html <link> tags in the head will point to public/...
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));   // init body-parser for html passing info from forms


// configure mongoose
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => console.log("Connected to the RESTful Blog DB"))
.catch(error => console.log(error.message));


/* blog model for MongoDB: 
title, image, body, date: all strings
*/
const blogSchema = mongoose.Schema({
    title : String,
    image : String,
    body : String,
    date : Date,
});


app.listen(port, () => {
    console.log(`Blog started at: ${port}`);
});
