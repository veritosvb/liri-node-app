require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var keys = require("./keys.js");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


 // Create the Liri constructor
var Liri = function() {
    // divider will be used as a spacer between the  data we print in log.txt
    var divider =  "\n------------------------------------------------------------\n\n";
  
    // findShow takes in the name of a tv show and searches the tvmaze API
    this.findSong = function(Song) {
        console.log(divider);

        spotify.search({ type: 'track', query: Song, limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            var showData = [
                "Artist name: " + data.tracks.items[0].artists[0].name,
                "Song name: " + data.tracks.items[0].name,
                "Album name: " + data.tracks.items[0].album.name,
                "Preview URL: " + data.tracks.items[0].external_urls.spotify
        ].join("\n\n");
        console.log(showData);
        fs.appendFileSync("log.txt", showData);
        fs.appendFileSync("log.txt", divider);

        console.log(divider);

          });
      
    };
  
    this.findTweet = function(tweet) {
        console.log(divider);

        var params = {screen_name: 'veritosvb'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
          for (var i = 0; i < tweets.length; i++)
           if(i < 20)
            console.log(tweets[i].text);
            fs.appendFileSync("log.txt", tweets[i].text);
            fs.appendFileSync("log.txt", divider);


          }
            console.log(divider);
        });

    
    };

    this.findMovie= function(movie) {

        console.log(divider);

        request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

            // If there were no errors and the response code was 200 (i.e. the request was successful)...
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                var rrt;

                for (var i = 0; i < jsonData.Ratings.length; i++){

                    if(jsonData.Ratings[i].Source == 'Rotten Tomatoes'){
                        rrt = jsonData.Ratings[i].Value;
                    }
                }

                var showData = [
                    "Title: " + jsonData.Title,
                    "Year: " + jsonData.Year,
                    "Rated: " + jsonData.Rated,
                    "Rating 'Rotten Tomato':  " + rrt,
                    "Country: " + jsonData.Country
                  ].join("\n\n");
                    console.log(showData);
                    fs.appendFileSync("log.txt", showData);
                    fs.appendFileSync("log.txt", divider);

                    console.log(divider)
            }
          });   
      };




  };




module.exports = Liri;
