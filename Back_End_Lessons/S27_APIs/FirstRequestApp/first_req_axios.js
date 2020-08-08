// first request API app using axios instead of request
const axios = require("axios");

// axios is promise-based  
const freeApi = "https://jsonplaceholder.typicode.com/users/a";

axios.get(freeApi)
    .then((repsonse) => {
        // handle success
        let respObj = repsonse.data // note that unlike request, respObj already converts the JSON string into a JS object
        console.log(respObj.name);
        console.log(respObj.address);
    })
    .catch((err) => {
        // handle error
        console.log(err.response);   // err contains a lot more information. Be sure to print out err.response obj, to get the statusCode
        console.log(`Status: ${err.response.status}, Config.url: ${err.response.config.url}`);
    })
    .finally(() => {
        // always executed .. kinda like 'finally' in python
    })

    // we can also use async