var fs = require("fs"),
 	request = require("request"),
 	options = require('./config.js'),
 	Twit = require('twit');

var fetch = new Twit({
  consumer_key:options.storageConfig.consumer_key,
  consumer_secret:options.storageConfig.consumer_secret ,
  access_token:options.storageConfig.access_token,
  access_token_secret:options.storageConfig.access_token_secret
});


 //Pushing tweets into elastic search.
var hashtags = 'trump,election,hillary,music,sports,weather,movie,technology,twitter,facebook,instagram,snapchat,hell,iphone';
var world = [ '-180', '-90', '180', '90' ];
var stream = fetch.stream('statuses/filter', {track: hashtags}, { locations: world});
var count=0;
 stream.on('error',function(error){
  throw error
});
  stream.on('tweet', function(tweet) {
  	if (tweet.geo !=null){
  		count+=1;
  		console.log("tweets counted:"+count);
  		request({
  			url: 'https://search-es-twitter-tweets-xvyjqon7dx2pquurvjs45mirti.us-east-1.es.amazonaws.com/domain/tweets',
      		method: "POST",
      		json: {
        		'username': tweet.user.name,
        		'text': tweet.text,
        		'location': tweet.geo
      		}
    	}).on('response', function(response) {
    		console.log("Row "+response.statusMessage+" with location: "+JSON.stringify(tweet.geo.coordinates));
    		});
  	}
  });
