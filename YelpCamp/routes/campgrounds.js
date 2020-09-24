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
const { route } = require("./index");
const { update } = require("../models/campground");


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
router.get("/:id/edit", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
    // res.send("The EDit Page");
})


// UPDATE
router.put("/:id", isLoggedIn, (req, res) => {
    // req.body.    ==> for sanitize
    // console.log("Now in put request");    debug
    // console.log(req.body);   debug
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