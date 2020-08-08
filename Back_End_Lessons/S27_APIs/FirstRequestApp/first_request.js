// making http request from node / js file
const request = require("request");


const weatherApi = "https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca";
const redditHome = "http://www.reddit.com";
const googleHome = "http://www.google.com"
const freeApi = "https://jsonplaceholder.typicode.com/users/3" // hosted freely, no login or keys needed, at https://jsonplaceholder.typicode.com/
// make the request, and make sense of info cvia callback

// METHOD 1 - request
/*
request(freeApi, function(error, response, body){
    // if statement used by Colt
    // if(!error && response.statusCode === 200)
    
    // locus for debugging ==> npm i -D locus (run this everytime you want to use locus )
    // eval(require("locus"))
    
    if(error) {
        console.log("Something went wrong");
        console.log(error);
    }
    // successful request: status code: 200
    else{
        if(response.statusCode === 200) {
            // console.log(body);  // print out entire html/json API response ==> note that this is a string, not an object
            // try out the API endpoint first on Chrome using "JSON View" extension to see the elements in the object 
            // then extract 
            let parsedObj = JSON.parse(body);    // convert the entire json to an object
            // console.log(parsedObj.address);  // try id, title, body, userId, 
            console.log(`${parsedObj.name}'s website is ${parsedObj.website}, and they live in ${parsedObj.address.city}`);  // complete sentence ==> for API to "https://jsonplaceholder.typicode.com/users/1"
        }
    }
});   
*/

// METHOD 2: in ES6 env't. Use 'promise' syntax. Be sure to install request-promise package (npm i -S request-promise)

const rp = require("request-promise");

rp(freeApi)
    // .then runs when ther is no errors 
    .then((body) => {           // using arrow functions: same as:   .then(function(body) {
        const parsedObj = JSON.parse(body);
        console.log(`${parsedObj.name}'s website is ${parsedObj.website}, and they live in ${parsedObj.address.city}`);  // complete sentence ==> for API to "https://jsonplaceholder.typicode.com/users/1"
    })
    // catch-all for error condition in rp
    .catch((err) => {       
        console.log("Error!", err);
    })
