// all routes for Campgrounds

// RESTful routes
/**
 * name         url             verb    desc
 * ============================================================
 * INDEX    /dogs           GET     Displays all dogs
 * NEW      /dogs/new       GET     Displays form to make a new dog
 * CREATE   /dogs           POST    Adds new dog to DB    
 * SHOW     /dogs/:id       GET     Shows info about one dog
 * 
 */

const express = require("express");
const router = express.Router();

// import index.js
const indexRouter = require("./index");

// import DB models needed
const Campground = require("../models/campground");
const Comment = require("../models/comment");
// const { route } = require("./index");
// const { update } = require("../models/campground");


// INDEX - all campgrounds
router.get("/", (req, res) => {                 // REST format
    // console.log(req.user);  // req.user the username and _id of the currently logged in user
    // get all capgrounds from db
    Campground.find((err, allCampgrounds) => {
        if(err) {
            console.log(err);
        } else {
            // allCampgrounds contains a list/array of all objects corresponding to the documents from the db
            res.render("campgrounds/index", {camps : allCampgrounds })
            // console.log((allCampgrounds));
        }
    });
});

// CREATE
// contains middleware to check for user authentication
router.post("/", isLoggedIn, (req, res) => {                // REST format
    // get data from form and add to campgrounds[] array
    const campName = req.body.camp_name;
    const campImgUrl = req.body.image_url;
    const campDescription = req.body.description;
    // console.log(req.user);
    const author = {
        id : req.user._id,
        username : req.user.username
    }
    const newCampground = {
        name : campName,
        image : campImgUrl,
        description : campDescription,
        author : author
    };
    // console.log(newCampground);
    // create a new campground document and save to campgrounds collection in DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`New Campground created: ${newlyCreated.name}`);
            // console.log(newlyCreated);
            // redirect back to /index page
            res.redirect("/campgrounds");  
        }
    });  // end of Campground.create 
});    // end of campground POST route

// NEW
// shows form that sends data to post route
// contains middleware to check for user authentication
router.get("/new", isLoggedIn, (req, res) => {                 // REST format
    res.render("campgrounds/new");
})

// SHOW
// shows more info on one campground
// make sure this is declared AFTER thee NEW route, since both have similar formats
router.get("/:id", (req, res) => {
    // find the campground with a specific id, which is passed from the <a> tag for this campground in the index page
    // we get req.params.id: from the xxxxx portion of the url: /campgrounds/xxxxx,
    // populate the comment data into foundCampground's _comments_ array 
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // // render the show template for this foundCampground
            res.render("campgrounds/show", {campground : foundCampground});
            // console.log(req.params);
        }

    });     // end of findById callback
});     // end of SHOW route


// EDIT
// contains middleware to check for user authentication and authorization
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    // console.log(req);
    res.render("campgrounds/edit", {campground : req.foundCampground});
})


// UPDATE
// contains middleware to check for user authentication and authorization
router.put("/:id", checkCampgroundOwnership, (req, res) => {
    // req.body.    ==> for sanitize
    // console.log("Now in put request");    debug
    // console.log(req.body);   debug
    /**
     * I thought of just updating without using findById - i.e. using .updateOne() or .update(), since we already know the campground: req.foundCampground (from checkCampgroundOwnership() middleware). However, for .update(),
     * MyModel.update( myQuery, new_value, callback);
     *  we still need to do a query here, and there is no point in modifying the query which already works 
     */

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");   // if this campground's id is not found, redirect to index page
        } else {
            console.log(`Campground was updated: ${updatedCampground.name}`);
            // console.log(updatedCampground);
            res.redirect(`/campgrounds/${req.params.id}`);     // redirect to this campground's show page
        }
    });
})

// DESTROY
// contains middleware to check for user authentication and authorization
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
    // res.send("You really want to delete...")
    // display the canpground name first..
    let campToDel_name;
    Campground.findById(req.params.id, (err, campgroundToDelete) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");   // redirect to the index page
        } else {
            // console.log(foundCampground);
            campToDel_name = campgroundToDelete.name; 
            console.log(`Campground to be deleted: ${campToDel_name}`);   // will use this for the "Are you sure you want to delete" pop-up      
            // .remove() is deprecated. Use deleteOne,deleteMany, or bulkWrite instead.
            // Campground.remove({_id : foundCampground._id}, (err, result) => {
            Campground.deleteOne({_id : campgroundToDelete._id}, (err, result_camp) => {
                if(err) {
                    console.log(err);
                    console.log("campground could not be deleted");
                    res.redirect("/campgrounds");
                } else {
                    // delete all comments associated with this campground from DB
                    Comment.deleteMany({_id : {$in : campgroundToDelete.comments}}, (err, result_comment) => {
                        if(err) {
                            console.log("campground could not be deleted");
                            console.log(err);
                            res.redirect("/campgrounds");   // redirect to the index page
                        } else {
                            console.log("Comments deletion info:");
                            console.log(result_comment);
                        }
                    });
                    // code reaches here if 
                    console.log(`Campground successfully deleted: ${campToDel_name}, with all associated comments.`);            
                    console.log("Campgrrounds deletions info:");
                    console.log(result_camp);    // displays object with details on what was deleted
                    res.redirect("/campgrounds");   // redirect to the index page
                }
            });
        }
    });

    // another way - the old way?
    // Campground.findByIdAndRemove(req.params.id, (err) => {
    //     if(err) {
    //         console.log(err);
    //         res.redirect("/campgrounds");   // redirect to the index page
    //     } else {
    //         console.log(`Campground successfully deleted: ${camp_name}`);
    //         res.redirect("/campgrounds");   // redirect to the index page
    //     }

    // });
})


// middleware to implement authentication - verifies logging in
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()){
        console.log("User is authenticated, and good to go");
        return next();  
    }
    // if user is not authenticated, don't allow access and redirect to the login page
    console.log("Opps. Hold up! User is not authenticated.");
    res.redirect("/login")

}

// middleware to check for authorization on campgrounds
function checkCampgroundOwnership (req, res, next) {
    /// is user logged in?
    if(req.isAuthenticated()) {
        console.log("User logged in successfully");
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                // console.log(foundCampground);
                /// does user own campground
                /*
                    Even though both req.user._id and foundCampground.author.id appear to be the same when displayed on the console, they are not. 
                    Both are of type object, but do not equal each other.
                    Hence we cannot compare them using === or ==. That is, the following does not work - it will never evaluate to true 
                    if(req.user._id == foundCampground.author.id) { 
                    We have to use the .equals() method from mongoose:
                    if(foundCampground.author.id.equals(req.user._id)) { 
                        make sure the document found is on the left hand side, and req.user._id is on the right
                */
                console.log(req.user._id, typeof(req.user._id));  
                console.log(foundCampground.author.id, typeof(foundCampground.author.id)); 

                if(foundCampground.author.id.equals(req.user._id)) { 
                    console.log("User is Authorized to do this action.");
                    // pass the foundCampground to next() using req - similar to how bodyParser attaches body property to request object 
                    // Thanks to Farid's answer: https://stackoverflow.com/a/23965964/12008034
                    // make sure no other library uses this property - foundCampground - so there's no conflicts within the objects in req
                    req.foundCampground = foundCampground;
                    next();
                } else {
                    // res.send(`You - ${req.user.username} -  cannot edit since you don't own the campground. Campground is owned by ${foundCampground.author.username}`);
                    console.log("AUTHORIZATION FAILED");
                    console.log(`You - ${req.user.username} -  do not have permissions to edit/delete since you don't own the campground. Campground is owned by ${foundCampground.author.username}`);
                    res.redirect("back");
                }
            }  // end else findById no error
        }); // end of .findbyId callback
    } else {
        console.log("LOGIN FAILED - You need to be logged in to do that.");
        res.redirect("back");   // take the user back to previous page they were on
    }
} 

module.exports = router;