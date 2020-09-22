// =====================
// COMMENT ROUTES
// =====================

const express = require("express");
const router = express.Router({mergeParams : true});    // merge the params from the campground and the comment together, so in the comment routes, we can access :id we defined

// import DB models needed
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// NEW COMMENT
// contains middleware to check for user authentication
router.get("/new", isLoggedIn, (req, res) => {
    // res.send("This will be the NEW COMMENT form")
    // const campID = req.params.id; 
    // lookup campground using ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            // pass that campground to the comments/new template
            res.render("comments/new", {campground : foundCampground})
        }
    })
    // res.render("comments/new", {campground : camp});
});

// CREATE COMMENT
// contains middleware to check for user authentication
router.post("/", isLoggedIn, (req, res) => {
    // 1. lookup campground using ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log("Campground found: ");
            // console.log(foundCampground);
            // 2. create new comment
            Comment.create(req.body.comment, (err, newComment) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Comment created:");
                    // console.log(newComment);

                    // 3. associate comment to campground and save the campground
                    foundCampground.comments.push(newComment);
                    foundCampground.save((err, savedCampground) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("campground + comment associated & saved:");
                            // console.log(savedCampground);

                            // 4. redirect to campground show route  
                            res.redirect(`/campgrounds/${savedCampground._id}`);
                        }
                    }); // .save callback
                }
            }); // .create callback
        }
    })  // .findbyOne Callback
})

// middleware to restrict access
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        console.log("User is authenticated, and good to go");
        return next();  
    }
    // if user is not authenticated, don't allow access and redirect to the login page
    console.log("Opps. Hold up! User is not authenticated.");
    res.redirect("/login")

}

// export these modules to be used by app.js
module.exports = router;