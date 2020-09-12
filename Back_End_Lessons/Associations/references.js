
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(() => console.log("Connected to the Associations Blog Demo"))
.catch((err) => console.log(err.message));

// two models:
// POST - title, content
const postSchema = new mongoose.Schema({
    title : String,
    content : String,
});
const Post = mongoose.model("Post", postSchema);

// USER - email, name
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
const User = mongoose.model("User", userSchema); 


// User.create({
//     email : "matt.maher@worship.com",
//     name : "Steven Maher",
// }, (err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${user} saved to DB` );
//     }
// });

// creating a post and adding to a user
/*
Post.create({
    title : "Peter Piper",
    content : "jfbid wfhIDF DBFSDB dfhgifdh",
}, (err, post) => {
    if(err) {
        console.log(err);
    } else {
        // associate this post to a specific user, by reference
        User.findOne({email : "matt.maher@worship.com"}, (err, foundUser) => {
            if(err) {
                console.log(err);
            } else {
                // add this new _post_ to the user's _posts_ array
                // console.log(`user found: \n${foundUser}`);
                console.log(foundUser);
                console.log("******************");
                foundUser.posts.push(post);
                // save this update user data to DB
                foundUser.save((err, user) => {
                    if(err) {
                        console.log(err);
                    } else {
                        // console.log(`updated user data:\n${user}`);
                        console.log(user);
                        console.log("******************");
                    }   
                })  // end .save callback 

            }
        })  // end of .findOne callback  
    }
}); // end of .create callback
*/

// retrieve user data with all posts populated, not just references
// we see that user only stores references to a post, via object IDs.
// How do we find the user correct post from the object IDs in the posts array?

// chain qucommands: find user + find all posts for that user
// .populate -- populates the field _posts_ for the _user_ in the callback with actual posts, not just the Object IDs
// .exec -- starts the query, execute the code
User.findOne({email : "matt.maher@worship.com"}).populate("posts").exec((err, user) => {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
})
