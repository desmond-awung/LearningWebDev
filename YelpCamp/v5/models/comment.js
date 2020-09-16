const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    author : String,
    content : String,
});

// export
module.exports = mongoose.model("Comment", commentSchema); 