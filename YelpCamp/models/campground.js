const mongoose = require("mongoose");

// setup mongoose campground schema
const campdgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    // add object ID references to the comments for this campground
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"     // name of th model
        }
    ]
});
// compiles the schema into mongoose model
module.exports = mongoose.model("Campground", campdgroundSchema);