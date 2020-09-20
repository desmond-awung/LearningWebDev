// app for Authentication Demo 

const express = require("express"),
    passport = require("passport"),
    mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local")


// mongoose
mongoose.connect("mongodb://localhost/auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to the auth_demo DB"))
    .catch(error => console.log(error));

// User model: mongoose + passport
const User = require("./models/user");

// express
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// ===========
// session ==> be sure to init express-session BEFORE doing passport.initialize() and passsport.session()
// ===========
// use session with require() inline
app.use(require("express-session")({
    secret: "Nothing beats chilling at the beach",     // used to encode and decode date from/to the session
    resave: false,
    saveUninitialized: false,
}));

// setup passport to work with our express app
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());       // encoding and putting it into the session
passport.deserializeUser(User.deserializeUser());   // decoding data from session

//================================
// ROUTES
//================================

app.get("/", (req, res) => {
    res.render("home");
});

// secret route - accessible only when user is logged in / authenticated
// isLoggedIn is the middleware in this route
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
})

//==================
// AUTH ROUTES

// REGISTER ROUTES

// Show signup form
app.get("/register", function (req, res) {
    res.render("register");
});

// user signup logic
app.post("/register", function (req, res) {
    // res.send("This is the register post route");
    // console.log(req.body.username);
    // console.log(req.body.password);
    User.register(new User({ username: req.body.username }),
        req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");      // short-circuit everything below
            }

            console.log(user);
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secret");
            })
        })

});

// LOGIN ROUTES

// login Form
app.get("/login", function (req, res) {
    res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local", { // this is middleware
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
    // nothing here for now
    // req.session.save(() => {
    //     res.redirect("/secret");
    // })
});

// LOGOUT ROUTE
app.get("/logout", function(req, res){
    // res.send("I will log you out eventually");
    req.logOut();   // passport is destrying the user data in this session from request to request
    res.redirect("/");
});

// middleware function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        console.log("User is good to go!");
        return next();
    }

    // if user is not authenticated, show the login form
    console.log("Opps. Hold up! User is not good to go!");
    res.redirect("/login")
}

//=========================
app.listen(port, () => {
    console.log(`AuthDemo Server started at port ${port}`);
});