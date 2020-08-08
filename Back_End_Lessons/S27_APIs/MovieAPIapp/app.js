
// framworks and node packages
const express = require("express");
const app = express()
const axios = require("axios");
const bodyParser = require("body-parser");  // for parsing info from forms

// init web app
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}))   // for body parser

// init API
const apiKey = "thewdb";
const omdbBaseUrl = `http://www.omdbapi.com/?&apikey=${apiKey}`;
let movSearch = "Los Angeles"

// ROUTES

// root
app.get("/", (req, res) => {
    res.render("home");  // renders home.ejs
})


// input form
app.post("/search", (req, res) =>{
    // method 1: using a POST request: be sure to use body-parser
    // movSearch = req.body.movSearch; // get movSearch param from input form
    // console.log(req.body);   // for debug
    res.redirect("/results");
})

app.get("/results", (req, res) => {
    // method 2: using a GET request (to parse the query string) - no need for POST request here
    movSearch = req.query.movSearch; // update movSearch param from query string of the POST request above
    // console.log(req.query);      // for debug
    axios.get(`${omdbBaseUrl}&s=${movSearch}`)
        .then((apiResp) => {
            let movSearchObj = apiResp.data;
            // console.log(res.data)
            // res.send(apiResp.data); // displays the list of 10 from API search results to the web page
            // res.send(movSearchObj.Search[0].Title);   // displays the title of the first movie in the Search array
            res.render("results", {movies : movSearchObj.Search});

        })
        .catch((apiErr) => {
            // console.log(`Status: ${apiErr.response.status}, Config.url: ${apiErr.response.config.url}`);
            // console.log(apiErr)
        })

    
});



// get thee server started

app.listen(port, () => {
    console.log(`Server listening for Movie App at port ${port}`);
})
