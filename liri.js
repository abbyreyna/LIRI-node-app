require("dotenv").config();

//variables that allow us to access the dependencies in the package.json file

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var spotify = require("node-spotify-api");
var inquirer = require("inquirer");

var nodeArgs = process.argv;

//Bands in Town API
//CMD will be "node liri.js concert-this <artist/band name here>""
//This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal
// var bandsInTown = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
//This will render the name of the venue, venue location and the date of the event using moment to farmat to "MM/DD/YYYY"


//Node Spotify API

//CMD will be "node liri.js spotify-this-song '<song name here'>"
//The CMD will render the artist(s), song's name, preview link from Spotify & album that the song is from
var songName = "";

function spotifyThis (songName){
    //Access to Spotify's access keys
    var spotifyKey = new spotify(keys.spotify);
    //If no song is provided, the program will default to "The Sign" by Ace of Base
    if (!songName){
        songName = "The Sign";
    }
    spotifyKey.search({type: 'track', query: songName}, function(err,data){
        if (err){
            console.log("Error occurred: " + err);
            return;
        }else{
           data = "Song Name: " + "'" + songName + "'" + "\nAlbum Name: " + data.tracks.items[0].album.name + "\nArtist Name: " + data.tracks.items[0].album.artists[0].name + "\nURL: " + data.tracks.items[0].album.external_urls.spotify;
            console.log(data);
        }
    });
};

//OMDB API
//CMD will be "node liri.js movie-this '<movie name here>'"
//CMD will render title of the movie, year the movie came out, IMDB rating, rotten tomatoes rating, country where the movie was produced, language of the movie, plot of the movie & actors in the movie
//If user doesn't type a movie, the program will output data for "Mr. Nobody" http://www.imdb.com/title/tt0485947/
var movieName = "";
var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&type=&apikey=trilogy";

for (var i = 2; i < nodeArgs.length; i++){
    if (i > 2 && i < nodeArgs.length){
        movieName = movieName + "+" + nodeArgs[i];
    }else{
        movieName = "Mr. Nobody";
    }
};

axios.get(queryURL).then(
    function(response){
        console.log("Title: " + response.data.title + "\n Release Year: " + response.data.Year + "\n IMDB Rating: " + response.data.imdbRating);
    }
)

//CMD "node liri.js do-what-it-says"
//Using the fs Node package, LIRI will take the text from random.txt and use it to call LIRI's cmd.
//spotify-this-song should run for "I Want it That Way"





