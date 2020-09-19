const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
});

// adds a bunch of methods to the UserSchema, important features for user auth
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);