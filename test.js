console.log("Twitter API Project Start");

var http = require('http');
var express = require('express');
var app = express();
var instagram = require('instagram-node').instagram();
//var RedditApi = require('reddit-oauth');
//var request = require('request');
//var Snoowrap = require('snoowrap');
//var Twit = require('twit');

//var CONFIG = require('./config');
//var REDDITCONFIG = require('./redditConfig');

//var T = new Twit(CONFIG);
//var reddit = new RedditApi(REDDITCONFIG);

var IG_REDIRECT_URI = "https://theseanathan.github.io/";
var IG_CODE = "ad5ab24896fb40ebb46d9fab069e16dc";
var IG_AUTH_TOKEN = "23437423.5788048.e67e782e8e5d4ae984f561b5b49a6fb7";

app.set('port', 8080);

instagram.use({ client_id: '57880480c3a3480196cea019f9b8385b',
         client_secret: '0c5367d64a42436fbd1e3aed25bc9148' });
instagram.use({ access_token: IG_AUTH_TOKEN });

/*
instagram.authorize_user(IG_CODE, IG_REDIRECT_URI, function(err, res) {
    if (err) {
        console.log(err);
        console.log("WE FUCKED UP.");
    } else {
        accessToken = res.access_token;
        console.log("ACCESS TOKEN: " + accessToken);
    }
});
*/

instagram.user('theseanathan', function(err, result, remaining, limit) {
    if (err) {
        console.log("WE FUCKED UP AGAIN BRUH: " + JSON.stringify(err));
    } else {
        console.log(result);
    }
});



//postProgrammerHumorTweet();

/*
function postProgrammerHumorTweet() {
    reddit.passAuth('theseanathan', 'sd1530', function (success) {
        if (success) {
            console.log(reddit.access_token);
        }
    });

    console.log(reddit.oAuthUrl('some_random_state', 'identity'));

    reddit.oAuthTokens('some_random_state', request.query, function (success) {
    // Print the access and refresh tokens we just retrieved 
        console.log(reddit.access_token);
        console.log(reddit.refresh_token);
    });

    console.log(reddit.isAuthed());
    
    //reddit.get('http://www.reddit.com/r/programmerhumor/new.json?sort=new', {}, function (error, response, body) {
    //    console.log(error);
    //    console.log(body);
    //});
   
    var param = {
        status: '#ProgrammerHumor '
    }

    //T.post('statuses/update', {status: 'testtesttesttest'}, function(err, data, response) {
    //    console.log("Posted tweet!");
    //    console.log(data);
    //});
};
*/


function getSDarryantoTweet() {
    var param = {
        user_id: 'sdarryanto',
        count: '1',
        include_rts: 'false'
    }

    T.get('statuses/user_timeline', param, function(err, data, response) {
        console.log(data[0].text);
        process.exit();
    });
};
