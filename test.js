console.log("Twitter API Project Start");

var Twit = require('twit');
var Snoowrap = require('snoowrap');
var RedditApi = require('reddit-oauth');
var request = require('request');

var CONFIG = require('./config');
var REDDITCONFIG = require('./redditConfig');

var T = new Twit(CONFIG);
var reddit = new RedditApi(REDDITCONFIG);

postProgrammerHumorTweet();

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
