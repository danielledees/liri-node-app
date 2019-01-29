require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var bandsintown = require('bandsintown');
var omdbApi = require('omdb-client');
var moment = require('moment');
var inquirer = require('inquirer');
var fs = require('fs');
var path = require('path');
var axios = require('axios');
var spotify = new Spotify(keys.spotify);
//var command = ['concert-this', "spotify-this-song", "movie-this", "do-what-it-says"];
var command = process.argv[2];
var input  = process.argv.splice(3).join(' ');
fs.appendFile("log.txt", input + command, function(err) {

  if (err) {
    console.log("Search Not Saved" + err);
  }

  else {
    console.log("Search Saved");
  }
});


//function to read which command
function processCommand(){
if (command === "concert-this") {
  findConcert()
} else if (command === "spotify-this-song") {
  findSong()
} else if (command === "movie-this") {
  findMovie()
} else if (command === "do-what-it-says") {
  simonSays()
}
}

processCommand()

//spotify-this-song function

function findSong(){
  //default response if a song title is not included
  if (!input) {
    input = "The Sign Ace of Base"
  }
 
//searches for song title requested
  spotify.search({ type: 'track', query: input}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  //console.log(data.tracks.items[0]); 
  console.log("Artist Name : " + data.tracks.items[0].artists[0].name)
  console.log("Song Name : " + data.tracks.items[0].name )
  console.log("Preview URL : " + data.tracks.items[0].preview_url)
  console.log("Album: " + data.tracks.items[0].album.name )
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  });
}

//concert-this function

function findConcert() {

 var query = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
 axios.get(query).then(function(res){
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log("Venue name: " + res.data[0].venue.name)
  console.log("Venue location: " + res.data[0].venue.city)
  var date = moment(res.data[0].datetime).format("MM/DD/YYYY");
  console.log("Date: " + date)
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
 });
}


//movie-this function

function findMovie() {
  //default repsonse if a movie title is not included
  if(!input) {
    input = "Mr. Nobody"
  }
//searches for movie requested
  var moviequery = "http://www.omdbapi.com/?t="+ input +"&y=&plot=short&apikey=trilogy";
  axios.get(moviequery).then(
  function(response) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //console.log(response.data)
    console.log("Movie Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB rating is: " + response.data.imdbRating);
    console.log("Rotten Tomato rating is: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  }
);
}

//do-what-it-says function

function simonSays() {
  var filePath = path.join(__dirname, 'random.txt')
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        var arr = data.split(',');
        command = arr[0];
        input = arr[1];
        processCommand()
       
        
    } else {
        console.log(err);
    }
  });
}
 
