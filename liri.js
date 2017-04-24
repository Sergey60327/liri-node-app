var twitterKeys = require('./keys.js');
var Twitter = require("twitter");
var fs = require('fs');
var command = process.argv[2];
var spotify = require('spotify');
// nice use of `.slice` here
var userInput = process.argv.slice(3);
var request = require('request');
var logArray = [command, userInput];


function getTweets(){
  // since you've already named your twitter keys the same as what the Twitter client expects
  // you can simply pass those in instead of redundantly naming them.
  var client = new Twitter(twitterKeys.twitterKeys)

  // It may seem silly, but consistent indentation makes parsing your code considerably easier
  var params = { screen_name: 'realDonaldTrump'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      // not sure why you were logging out the created_at of the last tweet, but it breaks from the expected behavior
      // console.log(tweets[19].created_at);
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
       console.log(tweets[i].created_at +'\n'+ tweets[i].text);
      }
     }
  });
};

function getSpotify(userInput){

	if(userInput.length < 1){
    	userInput = 'Sign'
    }
    	spotify.search({ type: 'track', query: userInput }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }

		 	var path = data.tracks.items[0];

		 	console.log('\n Artist: ' + path.artists[0].name
		 	 +'\n Name: '+ path.name
		 	 +'\n Listen: '+ path.external_urls.spotify
		 	 + '\n Album: '+ path.album.name
		  	+ '\r\n')


	})
}

function movies(){

  if (userInput <= 1) {
    userInput = "Mr. Nobody"
  }
var urlMovie = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json"
request (urlMovie, function(err, response, body) {

  // you should check to see if there's an error before logging out the results and you should
  // halt the execution of this function if there is one like so:
  if (err) {
    // display the error
    console.log(err)
    // this will return out of the function and prevent any further code from running
    return
  }

var moviePath = JSON.parse(body);
  console.log('\n Movie: ' + moviePath.Title + '\n Released: ' + moviePath.Year
  + '\n Rated: ' + moviePath.imbdRating + '\n Country: ' + moviePath.Country
  + '\n Language: ' + moviePath.Language + '\n\n Plot: ' + moviePath.Plot +'\n'
  + '\n Actors: ' + moviePath.Actors + '\n Website: ' + moviePath.Website
  + '\n RT Rated: ' + moviePath.Ratings[1].Value + '\n');
});
 };

function LetsdoIt(){

fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){
			console.log(err);
		}
var input = data.split(',');
command = input[0];
userInput = input[1];
Get(command);
})
}

function Get(command){

      switch (command){
      case 'my-tweets':
      getTweets();
      break;

      case 'spotify-this-song':
      getSpotify(userInput);
      break;

      case 'movie-this':
      movies(userInput);
      break;

      case 'do-what-it-says':
      LetsdoIt();
      break;

         }
    }

    Get(command);

  function logFile(){

  var getData = logArray[1].join('');

	var logData = command + ',' + '"'+ getData +'"'+'\n';

	fs.appendFile('log.txt', logData, function(err){
		if(err) throw err;
		console.log('Log Updated!!')
	})
}
