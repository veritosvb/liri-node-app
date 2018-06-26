var Liri = require("./functions.js");
var fs = require("fs");

var liri = new Liri();

var search = process.argv[2];
var term = process.argv[3];
selector();

function selector(){
if (!search) {
  search = "my-tweets";
}

if (search === "my-tweets") {

     console.log("Searching for my latest 20 tweets");
    liri.findTweet();

}else if (search === "spotify-this-song"){

    console.log("Searching for Song in Spotify");
    if (!term) {
        term = "The Sign";
    }
    liri.findSong(term);

}else if (search === "movie-this"){
    console.log("Searching for Movie");

    if (!term) {
        term = "Mr. Nobody";
      }
    liri.findMovie(term);

}else if (search === "do-what-it-says"){
    console.log("Reading from the file");
    fs.readFile("random.txt", "utf8", function(error, data){

        if (error){
            return console.log(error);
        } else {
        var line = data.split(",");
        search = line[0];
        term= line[1];
        selector();
        }
    });
}else{
    console.log("Invalid option");

}

}


