const mongoose = require("mongoose");

// POST model - title, content
const postSchema = new mongoose.Schema({
    title : String,
    content : String,
});
// const Post = mongoose.model("Post", postSchema);


// this is what we "return" from file: the _Post_ model
module.exports = mongoose.model("Post", postSchema);