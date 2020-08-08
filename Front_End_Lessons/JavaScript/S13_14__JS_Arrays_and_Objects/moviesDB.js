
// remember: key: value pairs
movies = [
    {
        title: "Die Hard",
        rating: 4.5,
        hasWatched: true,
    },
    {
        title: "Forrest Gump",
        rating: 5,
        hasWatched: false,
    },
    {
        title: "Mr and Mrs Smith",
        rating: 4,
        hasWatched: true,
    },
    {
        title: "The Smurfs",
        rating: 4.5,
        hasWatched: false,
    },
    {
        title: "Avengers: Infinity War",
        rating: 5,
        hasWatched: true,
    },
    {
        title: "The Greatest Showman",
        rating: 5,
        hasWatched: true,
    },

];

// iterate through array and print out movie details:
// let movTitle;
// let movRating;
// let textWatched;

// for(let i = 0; i < movies.length; i++){
//     movTitle = movies[i].title;
//     movRating = movies[i].rating;
//     if(movies[i].hasWatched) textWatched = "have watched "
//     else  textWatched = "have not seen "

//     console.log("You " + textWatched + "\"" + movTitle + "\"" + " - " + movRating + " stars")
// }

// alrenative: using forEach + function
movies.forEach(function(movie) {
    // much cleaner code here. All logic is dumped in the function
    console.log(bldString(movie));
})

// takes a movie object as argument
function bldString(movie) {
    let str = "You have ";

    if (movie.hasWatched === true) {
        str += "watched ";
    }
    else {
        str += "not seen ";
    }
    
    str += "\"" + movie.title + "\"" ;
    str +=  " - " + movie.rating + " stars";

    return str;
}