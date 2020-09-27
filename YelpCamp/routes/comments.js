// =====================
// COMMENT ROUTES
// =====================

const express = require("express");
// since the comment routes are nested routes: for example the comment edit route will be:
// campgrounds/:id/comments/:comment_id/edit
// and we appended ** campgrounds/:id/comments ** to all the comment routes in this file in app.js, we need to merge the params from the campground and the comment together, so in the comment routes, we can access ":id" --> req.params.id, which gets us the campground id
// we also rename the comment's id to comment_id, to avoid :id and :id from conflicting in the req object
const router = express.Router({mergeParams : true});   

// import DB models needed
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const User = require("../models/user");

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

                    //  3. add username and id to the comment - we know that user is logged in before we get here
                    newComment.author.username = req.user.username;
                    newComment.author.id = req.user._id;
                    // console.log(`******** ${req.user} *********`);

                    // and save comment
                    newComment.save();
                    console.log(newComment);

                    // 4. associate comment to campground and save the campground
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

// COMMENT EDIT
// using async / await for this one
router.get("/:comment_id/edit", async(req, res) => {
    // res.send(`EDIT ROUTE FOR COMMENT - ${req.params.comment_id}`);
    try {
        // get the campground, then find the comment
        let foundCampground = await Campground.findById(req.params.id);
        // console.log(foundCampground); for debug
        let foundComment = await Comment.findById(req.params.comment_id);
        console.log(`Editing Comment: ${foundCampground._id}`);
        // console.log(foundComment); for debug
        res.render("comments/edit", {campground : foundCampground, comment : foundComment});   // relative to the views directory
        
    } catch (error) {
        // catches error both in finding campground and in finding comment 
        console.log(error);
        res.redirect("back");
    }

});

// COMMENT UPDATE
router.put("/:comment_id", async(req, res) => {
    const commentId = req.params.comment_id;
    const campgroundId = req.params.id;
    try {
        // let updatedComment = await Comment.findByIdAndUpdate(commentId, req.body.comment)
        await Comment.findByIdAndUpdate(commentId, req.body.comment);
        console.log(`Comment was updated: ${commentId}`);
        res.redirect(`/campgrounds/${campgroundId}`);       // redirect to campgrounds show page
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
});

 // COMMENT DESTROY
 router.delete("/:comment_id", async(req, res) => {
    const commentId = req.params.comment_id;
    const campgroundId = req.params.id;
    console.log(`Comment to be deleted: ${commentId}`);
    
    try {
        await Comment.findByIdAndDelete(commentId);
        console.log(`Comment deleted: ${commentId}`);
        res.redirect(`/campgrounds/${campgroundId}`);       // redirect to campgrounds show page
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
    
 });

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