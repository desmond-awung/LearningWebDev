const mongoose = require("mongoose");


// USER model - email, name, posts[]
const userSchema = new mongoose.Schema({
    email : String,
    name : String,
    // reference the user's posts in the user collection using reference IDs 
    // an array of mongoose object IDs belonging to a Post model
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
});
// const User = mongoose.model("User", userSchema); 

// this is what we "return" from this file: the _User_ model
module.exports = mongoose.model("User", userSchema); 