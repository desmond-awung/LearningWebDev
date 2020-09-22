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


// INDEX - all campgrounds
router.get("/", (req, res) => {                 // REST format
    console.log(req.user);  // req.user the username and _id of the currently logged in user
    // get all cgs from db
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
    const newCampground = {
        name : campName,
        image : campImgUrl,
        description : campDescription,
    };
    // console.log(newCampground);
    // create a new campground document and save to campgrounds collection in DB
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            console.log(`New Campground created:`);
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
            res.render("campgrounds/show", {showCampground : foundCampground});
            // console.log(req.params);
        }

    });     // end of findById callback
});     // end of SHOW route


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

module.exports = router;