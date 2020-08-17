// demo for using mongoose: ODM (object data mapper)
// mongoose docs: https://mongoosejs.com/docs/index.html

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pets_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to DB'))
.catch(error => console.log(error.message));

// schema/pattern for mongoose to use - template for mongoose, not for MongoDB (remember it's NoSql)
const petSchema = new mongoose.Schema({
    name: String,
    age: Number,
    type: String,
    breed: String,
    temperament: String,
});

// compiles the schema into a mongoose model - save to a variable, which has a bunch of methods for db access
// a model is a class with which we construct documents 
const Pet = mongoose.model("Pet", petSchema);   // creates a new collection in our db which we can access via db.pets (where db in this case refers to the pets_app db above)

// adding a new pet to the database
// first create a document to represent the pet.
// const george = new Pet ({
//     name: "George",
//     age: 11,
//     type: "Cat",
//     temperament: "Grouchy"  
// })
// the name george could be used over and over on the JS side.
/*
// next pet 
const george = new Pet ({
    name: "Rocky",
    age: 5,
    type: "Dog",
    breed: "Husky",
    temperament: "Playful"  
})

// save this document to the db. 1st arg is a lways be an error (in this case named "err") if any occured.
george.save((err, pet) => {
    if(err){
        console.log("Something Went Wrong: Pet not saved");
    }
    else {
        console.log("We just saved a new pet to the db");
        console.log(pet);   // pet is what is been sent back from the db, not the same as georgs
    }
})
*/

// combo: create new document and saves to db
Pet.create({
    name: "Tweety",
    age: 10,
    type: "Bird",
    breed: "Yellow Canary",
    temperament: "Smart",
}, (err, pet) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`New Pet Created: \n${pet}`);
    }
});

// reading info from database: .find()
// find all documents in the pets collections, referred to as the 'Pet' const here on the JS side 
Pet.find((err, pets) => {
    if(err) {
        console.log("Oh no! ERROR");
        console.log(err);
    }
    else{
        console.log("all the Pets:");
        console.log(pets);  // returns an array of pets objects from the database
    }
});