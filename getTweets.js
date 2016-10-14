var fs = require("fs"),
 	request = require("request"),
 	options = require('./config.js'),
 	Twit = require('twit');

var fetch;
fetch = new Twit({
    consumer_key: options.storageConfig.consumer_key,
    consumer_secret: options.storageConfig.consumer_secret,
    access_token: options.storageConfig.access_token,
    access_token_secret: options.storageConfig.access_token_secret
});


 //Pushing tweets into elastic search.
var hashtags;
hashtags =  'election,trump,hillary,vote,clinton,democrats,republicans,debate,voting,elections' +
            'games,sports,fifa,espn,racing,race,cricket,soccer,football,nba,baseball,sports,basketball,golf,swimming,' +
            'entertainment,music,movie,song,songs,broadway,hollywood,bollywood,selfie,' +
            'health,gym,exercise,fitness,yoga,healthy,fit,nutrition,wellness,ill' +
            'technology,apple,mac,gadget,samsung,iphone,sony,mobile,science,engineering,tech,robotics' +
            'travel,travelling,journey,trip,roadtrip,tour,driving,flying,transit,trekking,riding,bikig,cruising,weekend' +
            'religion,faith,god,jesus,spirituality,church,humanity,peace,worship,prayer,ritual' +
            'food,restraunt,lunch,dinner,breakfast,foodie,pizza,dining,tasty,eat,eating,recipes,wine,bar' +
            'fashion,style,models,magazine,playboy,clothes,dress,trend,gucci,halloween,brand' +
            'facebook,snapchat,youtube,social,media';
var world = [ '-180', '-90', '180', '90' ];
var stream = fetch.stream('statuses/filter', {track: hashtags}, { locations: world});
var count=0;
 stream.on('error',function(error){
  throw error
});
  stream.on('tweet', function(tweet) {
  	if (tweet.geo !=null){
  		count+=1;
  		console.log("tweets counted:"+count+" tweet: "+tweet.text);
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
