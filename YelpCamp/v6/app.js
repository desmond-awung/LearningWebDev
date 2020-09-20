// Yelpcamp v5: - Adding a sidebar to the show template
//              - Style display of comments 

// to start a MongoDB service/daemon: $ brew services start mongodb-community@4.4
// to stop the service: $ brew services stop mongodb-community@4.4


// declare packages used - stylistic aligning
const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"),
        LocalStrategy = require("passport-local"),
        seedDB      = require("./seeds")        // make sure the last one has no comma :)
 
// init mongoose for MongoDB
// should this be "mongodb://localhost:27017/yelp_camp" instead (as per mongoodes docs?)
mongoose.connect("mongodb://localhost/yelp_camp_v6", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to the Yelpcamp v6 DB"))
.catch(error => console.log(error.message));

// import DB models
const User = require("./models/user");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

// init express
app.set("view engine", "ejs");  // skip all .ejs file extensions in routes
// tell express to use the public/ directory, which will contain our front-end styling: css, js & bootstrap
// so all html <link> tags in the head will point to public/...
app.use(express.static(__dirname +  "/public"));    // just to be safe: dir name is absolute path, and will always point to this public dir  

// init body-parser  - for pssing objects b/w front-end and back-end 
app.use(bodyParser.urlencoded({extended : true}));

// seed the DB:
seedDB();

// init node server
const port = 3000;

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "2020, despite the craziness so far, has been a blessing",
    resave : false,
    saveUninitialized : false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware called in every single route, to pass the user info to all templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// ROUTES
// Landing page
app.get("/", (req, res) => {
    // res.send("This will be the Landing page");
    res.render("landing")   // landing.ejs
})

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

// INDEX
app.get("/campgrounds", (req, res) => {                 // REST format
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
app.post("/campgrounds", isLoggedIn, (req, res) => {                // REST format
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
app.get("/campgrounds/new", isLoggedIn, (req, res) => {                 // REST format
    res.render("campgrounds/new");
})

// SHOW
// shows more info on one campground
// make sure this is declared AFTER thee NEW route, since both have similar formats
app.get("/campgrounds/:id", (req, res) => {
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

// =====================
// COMMENT ROUTES
// =====================
// NEW COMMENT
// contains middleware to check for user authentication
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    // res.send("This will be the NEW COMMENT form")
    // const campID = req.params.id; 
    // lookup campground using ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // pass that campground to the comments/new template
            res.render("comments/new", {campground : foundCampground})
        }
    })
    // res.render("comments/new", {campground : camp});
});

// CREATE COMMENT
// contains middleware to check for user authentication
app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    // 1. lookup campground using ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log("Campground found: ");
            // console.log(foundCampground);
            // 2. create new comment
            Comment.create(req.body.comment, (err, newComment) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Comment created:");
                    // console.log(newComment);

                    // 3. associate comment to campground and save the campground
                    foundCampground.comments.push(newComment);
                    foundCampground.save((err, savedCampground) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("campground + comment associated & saved:");
                            // console.log(savedCampground);

                            // 4. redirect to campground show route  
                            res.redirect(`/campgrounds/${savedCampground._id}`);
                        }
                    }); // .save callback
                }
            }); // .create callback
        }
    })  // .findbyOne Callback



})

// =============
// AUTH ROUTES
// =============

// 1. REGISTER
// show register form
app.get("/register", function(req, res){
    res.render("register");
});

// handle sign up / register logic
app.post("/register", function(req, res){
    const newUser = new User({username : req.body.username});   
    // res.send("Signing you up");
    User.register(  newUser,
                    req.body.password,
                    function(err, user){
                        if(err) {
                            console.log(err);
                            return res.redirect("/register");   // short-circuits the code below if error occurs
                        }
                        // when the user successfully signs up, log the user in (.authenticate) and redirect to the campgrounds page
                        passport.authenticate("local")(req, res, function(){
                            console.log(`registration successful: ${user.username} logged in.`);
                            res.redirect("/campgrounds");
                        });                        
                    });
});

// 2. LOG IN
// show the log in form
app.get("/login", function(req, res){
    res.render("login");
});

// handle login logic
// app.post("/login", middleware, callback)
app.post(   "/login",
            passport.authenticate(  "local",
                                    {   // redirects object
                                        successRedirect : "/campgrounds",
                                        failureRedirect : "/login"
                                    }),         
            function(req, res){
                // res.send("I will log you in soon.")
                // console.log(`user: ${req.body.username} logged in successfully.`);
            }
);

// 3. LOG OUT
app.get("/logout", function(req, res){
    req.logout();
    console.log(`user logged out successfully.`);
    res.redirect("/campgrounds");
});

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

// start server
app.listen(port, () => {
    console.log(`YelpCamp started at port: ${port}`);
})