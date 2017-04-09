var twitterKeys = require('./keys.js');
var fs = require('fs');
var Twitter = require("twitter");
var command = process.argv[2];
var spotify = require('spotify');
var userInput = process.argv.slice(3);

  switch (command){
  case 'my-tweets':
  getTweets();
  break;

  case 'spotify-this-song':
  getSpotify(userInput);
  break;
  }
// if (tweets === 'my-tweets') {
  // getTweets();


function getTweets(){

  var client = new Twitter({
	  consumer_key: twitterKeys.twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.twitterKeys.access_token_secret
});

var params = { screen_name: 'realDonaldTrump'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      console.log(tweets[19].created_at);
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
       console.log(tweets[i].created_at +'\n'+ tweets[i].text);
      }
     }
  });
};

//var getArtistNames = function(artist) {
//  return artist.name;
//};

function getSpotify(userInput){

	var returned = " ";

	if(userInput.length < 1){
    	userInput = 'Sign'
    }
    	spotify.search({ type: 'track', query: userInput }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }

		 	var firstResult = data.tracks.items[0];

		 	returned += '\n Artist: ' +firstResult.artists[0].name;
		 	returned += '\n Name: '+ firstResult.name;
		 	returned += '\n Listen: '+ firstResult.external_urls.spotify;
		 	returned += '\n Albulm: '+ firstResult.album.name
		 	returned += '\r\n';
		    console.log(returned)

	})
}
