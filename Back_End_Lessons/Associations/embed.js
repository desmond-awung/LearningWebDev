
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {
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
    // embed the user's posts in the user collection 
    // we want it to be an array of posts => use the name of the schema
    posts : [postSchema]
});
const User = mongoose.model("User", userSchema); 



// const newUser = new User({
//     email : "kawhi@leonard.edu",
//     name : "Kawhi Leonard" 
// });
// // push a new post assoiated with this user
// newUser.posts.push ({
//     title : "Trophies don't matter to me.",
//     content : "I just love the game of basketball, and I enjoy the competitive spirit in the NBA, as players and coaches try to prove themeselves. Trophies are just an icing on top! "
// })
// newUser.save((err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${user} saved to DB` );
//     }
// })

// const newPost = new Post({
//     title : "I am the G.O.A.T",
//     content : "Many believe that Michael Jordan is the greatest basketball player of all time. But when you look at history, you realize I am the G.O.A.T! "
// });
// newPost.save((err, post) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${post} \n saved to DB`);
//     }
// });

User.findOne({name : "Kawhi Leonard"}, (err, user) => {
    if(err) {
        console.log(err);
    } else {
        // console.log(`${user} found`);
        // once we've found the user, add a post to this user
        user.posts.push({
            title : "Why I don't talk much.",
            content : "Talking is for losers! If you want, talk all day. I'll show you what I'm made of with what I do."
        });
        user.save((err, user) => {
            if(err) {
                console.log(err);
            } else {
                console.log(`${user} saved to DB` );
            }
        })
    }
});
