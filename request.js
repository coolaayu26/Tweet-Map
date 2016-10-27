/**
 * Created by ADDY on 19/10/16.
 */
module.exports = function(app){
    var elasticsearch = require('elasticsearch');

    var q = require("q");


    var client = new elasticsearch.Client({
        host: 'https://search-es-twitter-tweets-xvyjqon7dx2pquurvjs45mirti.us-east-1.es.amazonaws.com/domain/tweets'
    });

    var domains = [
        /*
         * 0 : Election
         * 1 : Sports
         * 2 : Entertainment
         * 3 : Health
         * 4 : Technology
         * 5 : Travel
         * 6 : Religion
         * 7 : Food
         * 8 : Fashion
         * 9 : Social Media
         */
        "election,trump,hillary,vote,clinton,democrats,republicans,debate,voting,elections",
        "games,sports,fifa,espn,racing,race,cricket,soccer,football,nba,baseball,sports,basketball,golf,swimming",
        "entertainment,music,movie,song,songs,broadway,hollywood,bollywood,selfie",
        "health,gym,exercise,fitness,yoga,healthy,fit,nutrition,wellness,ill",
        "technology,apple,mac,gadget,samsung,iphone,sony,mobile,science,engineering,tech,robotics",
        "travel,travelling,journey,trip,roadtrip,tour,driving,flying,transit,trekking,riding,bikig,cruising,weekend",
        "religion,faith,god,jesus,spirituality,church,humanity,peace,worship,prayer,ritual",
        "food,restraunt,lunch,dinner,breakfast,foodie,pizza,dining,tasty,eat,eating,recipes,wine,bar",
        "fashion,style,models,magazine,playboy,clothes,dress,trend,gucci,halloween,brand",
        "facebook,snapchat,youtube,social,media"
    ];


    function es(type){
        var deferred = q.defer();

        var myLat = [];
        var myLng = [];

        if(type == "All"){type =domains[0]+domains[1]+domains[2]+domains[3]+domains[4]+domains[5]+domains[6]+domains[7]+domains[8]+domains[9];}
        else if(type == "Religion"){type = domains[6];}
        else if(type == "Entertainment"){type = domains[2];}
        else if(type == "Technology"){type = domains[4];}
        else if(type == "Sports"){type = domains[1];}
        else if(type == "Election"){type = domains[0];}
        else if(type == "Food"){type = domains[7];}
        else if(type == "Social"){type = domains[9];}
        else if(type == "Fashion"){type = domains[8];}
        else if(type == "Travel"){type = domains[5];}
        else if(type == "Health"){type = domains[3];}

        client.search({
            size: 10000,
            q: type

        }).then(function (body) {
            var hits = body.hits.hits;
            console.log("hits length count : "+hits.length);
            deferred.resolve(hits);
        }, function (error) {
            console.trace(error.message);
            deferred.reject(error);
        });
        return deferred.promise;

    }
   //---------------------------------------------------------
    app.get("/api/tweet/:type",querysearch)


    function querysearch(req,res){

        var type=req.params.type;
        console.log(type);
       es(type)
           .then(function(result){
            console.log("hits length sent : "+result.length);
            res.json(result)});

    }

};

