// entry point for Blog app

// APP CONFIG
// declare packages used
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

const port = 3000;      // port used for node.js server

// init express, ejs and body-parser
app = express();
app.set("view engine", "ejs"); // skip all .ejs file extensions in routes
// tell express to use the public/ directory, which will contain our front-end styling: css, js & bootstrap
// so all html <link> tags in the head will point to public/...
app.use(express.static("public"));  // to serve our custom stylesheets
app.use(bodyParser.urlencoded({extended: true}));   // init body-parser for html passing info from forms
// config the app: whenever we receive a POST request with the string "_method" as a parameter, take whatever this param is equal to and treat the req as that kind of request.
// .../?_method=PUT ===> treats the req as a PUT request 
app.use(methodOverride("_method"));
// this is needed for sanitizing inputs in the UPDATE and CREATE routes
// make sure this line goes _after_ body-parser
app.use(expressSanitizer());

// configure mongoose
mongoose.connect("mongodb://localhost/restful_blog_app", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => console.log("Connected to the RESTful Blog DB"))
.catch(error => console.log(error.message));

// MONGOOSE/MODEL CONFIG

/* blog schema for MongoDB: 
title, image, body, date: all strings
*/
const blogSchema = mongoose.Schema({
    title : String,
    // we caould also have a default image string url or local image here: 
    // {type: String, default: "https://..."}
    image : String,
    body : String,
    // don't just say "Date" ==> user would have to manually enter the date.
    // this obj below initializes the date to be the currrent date by default
    created : {type: Date, default: Date.now}, 
});

const Blog = mongoose.model("Blog", blogSchema);    // compile the schema into a model

// // test blog
// Blog.create(
//     {
//         title : "Test Blog",
//         image : "https://images.unsplash.com/photo-1543285198-3af15c4592ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
//         body : "This is a test blog post", 
//     }
// );

/**
 * RESTFUL ROUTES
 */

// LANDING PAGE --> INDEX page
app.get("/", (req, res) => {
    res.redirect("/blogs");     // from home page, go to the "/blogs" route
})

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find((err, blogs) => {
        if(err) {
            console.log("Error");
            console.log(err);
        } else {
            // send all blogs content from DB (in the var "blogs") to be displayed in the info page
            res.render("index", {blogs : blogs});
        }
    })
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    // get the blog info from the form and create a Blog document to the DB
    // console.log(req.body.blog);     // - for debug

    // sanitize the blog body
    // console.log(req.body.blog.body); - debug
    req.body.blog.body = req.sanitize(req.body.blog.body)
    // console.log("==================");   - for debug
    // console.log(req.body.blog.body);    // shows body with script tags stripped off: sanitized
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            console.log(err);
            res.render("new")   // if there was an error in saving to db, then we re-display an empty form
        } else {
            console.log(`New blog created\n${newBlog}`);
            // redirect to the index page to show all blogs
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    // console.log(req.params.id);  - for debug
    // res.send(`  This is the SHOW page.\
    //         \n  id = ${req.params.id}  Yeah...`);

    // first find the corresponding blog from DB
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            // If not found, redirect to INDEX page
            console.log(err);
            res.redirect("/blogs")  
        } else {
            // render the show template for this blog selected
            // console.log(foundBlog);  - for debug
            res.render("show", {blog : foundBlog})
            
        }
    })
});


// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
    // use the id to get the blog to display
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) {
            // If not found, redirect to INDEX page
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog : foundBlog});
        }
    });

});

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
    // res.send(`update Route. ID for this route is: ${req.params.id} `) - for debug
    // really cool method - find and upadte a DB document in one swoop
    // Blog.findByIdAndUpdate(id, newDataObj, callback)
        // sanitize the blog body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            // redirect to this blog's show page, to show updated content
            console.log(`Blog was Updated: ${updatedBlog}`);
            res.redirect(`/blogs/${req.params.id}`);

        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res) => {
    // res.send("YOU HAVE REACHED THE DESTROY ROUTE") - for debug
    // find and delete a blog in one swoop
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
            res.redirect("/blogs")      // redirect to index page
        } else {
            // console.log(`Blog was Deleted: ${deletedBlog}`); -- does not work 
            res.redirect("/blogs");     // redirect to index page
        }
    });
});

app.listen(port, () => {
    console.log(`Blog App started at: ${port}`);
});
