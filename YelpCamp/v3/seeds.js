const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const allCamps = [
    { 
        name : "Cloud's Rest", 
        image : "https://images.unsplash.com/photo-1573111651692-39ec7f38fec9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Great Places dfljdf"
    },
    
    { 
        name : "Great Austin Woods", 
        image : "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "the Austin woods are really cool, nothing beats this!"
    },
    { 
        name : "Hill Country Mountains", 
        image : "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Hill country .. nothing like it"
    },

]

function seedDB() {
    // remove every document from the campgrounds and comments collections:
    // remove all comments
    Comment.remove((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("removed all comments");
        }
    });

    // remove all campgrounds
    Campground.remove((err) => {
        if(err) {
            console.log(err);
        } else {
            // do this only in case of no error above
            console.log("removed all campgrounds!");
            console.log("******************");
            // add a few campgrounds + comments
            addCamgrounds();
        }
    })
}

// add a few campgrounds
function addCamgrounds() {
    allCamps.forEach ((seed) => {
        Campground.create(seed, function(err, campground){
            if(err) {
                console.log(err);
            } else {
                // console.log(`added a campground: ${campground.name}`);
                console.log(`added a campground`);
                // create comments only when the campground is successfully created
                addComments(campground); 
            }
        })
    })
}

// add a comment
function addComments(campground) {
    Comment.create(
        {
            content : "This is a pretty great place. Loving it! Only thing missing is wi-fi",
            author : "Apostle Peter",
        }, (err, comment) => {
            if(err) {
                console.log(err);
            } else {
                console.log(`Comment Created`);
                // associate this _comment_ to this _campground_
                campground.comments.push(comment);
                campground.save((err, camp) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("******************");
                        console.log(`campground + comment saved:`);
                        // console.log(camp);
                    }
                })
            }
        })
}



module.exports = seedDB;    // send the function name, don't run the function here, so no ()