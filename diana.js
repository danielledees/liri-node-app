// require("dotenv").config();

var axios= require ("axios");

//variable
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command= command;
var thisSong= "spotify-this-song";
var movieThis= "movie-this";
var doWhatSays= "do-what-it-says";
var band= "concert-this";



//store the band name in a variable
var bandName= process.argv[3];
console.log(bandName);
//insert that band name into the URL
//store the band name in a variable
var bandURL= "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

//make a request using axios for the band information
// Make a request for a user with a given ID - from Axious NPM 
axios.get(bandURL)
  .then(function (response) {
   
       console.log (response.data[0].lineup[0]);
         console.log (response.data[0].venue.name);
         console.log(response.data[0].venue.city);

  })
  .catch(function (error) {
    console.log(error);
  });
//pars (gathering the correct infomation that we need from the request response)

// display the relevant responce information
// if (command === band)(bandTownAPI)
//     console.log ();
// )