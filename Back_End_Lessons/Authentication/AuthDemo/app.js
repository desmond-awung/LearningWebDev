// app for Authentication Demo 

const   express = require("express"),
        passport = require("passport"),
        mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose"),
        bodyParser = require("body-parser"),
        LocalStrategy = require("passport-local")


// express
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// setup passport to work with our express app
app.use(passport.initialize());
app.use(passport.session());
// session
// use session with require() inline
app.use(require("express-session")({
    secret : "Nothing beats chilling at the beach",     // used to encode and decode date from/to the session
    resave : false,
    saveUninitialized : false,
}))

// User model: mongoose + passport
const User = require("./models/user");

passport.serializeUser(User.serializeUser());       // encoding and putting it into the session
passport.deserializeUser(User.deserializeUser());   // decoding data from session

// mongoose
mongoose.connect("mongodb://localhost/auth_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to the auth_demo DB"))
.catch(error => console.log(error));

//================================
// ROUTES
//================================

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
})

// Auth Routes

// Show signup form
app.get("/register", function(req, res){
    res.render("register");
});

// handling user signup
app.post("/register", function(req, res){
    // res.send("This is the register post route");
    // console.log(req.body.username);
    // console.log(req.body.password);
    User.register(  new User({username : req.body.username}),
                    req.body.password, 
                    function(err, user) {
                        if(err) {
                            console.log(err);
                            return res.render("register");      // short-circuit everything below
                        } 
                        
                        console.log(user);
                        passport.authenticate("local")(req, res, function(){
                            res.redirect("/secret");
                        })
                    })

});

app.listen(port, () => {
    console.log(`AuthDemo Server started at port ${port}`);
});