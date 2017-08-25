const fs = require('fs');
const snoowrap = require('snoowrap');
var CONFIG = require('./config');
var RedditApi = require('reddit-oauth');
var REDDITCONFIG = require('./redditConfig');
var request = require('request').defaults({ encoding: null });
var Snoowrap = require('snoowrap');
var Twit = require('twit');

var reddit = new RedditApi(REDDITCONFIG);
var T = new Twit(CONFIG);

const POST_LOG_PATH = "reddit_post_logs";
const SUBREDDIT_TO_VIEW = 'ProgrammerHumor';
const MINUTES_BETWEEN_TWEETS = 20;
var access_token = '';
var app_id = 'oot0dyzuCLqZQw';
var app_secret = 'heJJOPBL36eDOtpgwhOXoaKJPoM';
var redditPassword = 'sd1530';
var redditUsername = 'theseanathan';
var redirect_uri = 'https://theseanathan.github.io/';

var secondsBetweenTweets = MINUTES_BETWEEN_TWEETS * 60;
var millisecondsBetweenTweets = secondsBetweenTweets * 1000;

console.log("Starting...");

setInterval(function() { tweetHotPost() }, millisecondsBetweenTweets);

function tweetHotPost() {
    console.log("Starting process...");
    reddit.passAuth('theseanathan', 'sd1530', function (success) {
        if (success) {
            console.log("Authorized Reddit API...");
            access_token = reddit.access_token;

            var redSno = new snoowrap({
                userAgent: 'theseanathan',
                clientId: app_id,
                clientSecret: app_secret,
                username: redditUsername,
                password: redditPassword,
                accessToken:  access_token
            });

            redSno.getSubreddit(SUBREDDIT_TO_VIEW).getHot().then(function(submissions) {
                console.log("Getting subreddit...");
                var topPostTitle;
                var imageSource;
                var topPostAuthor;
                var topPostId;
                var pastPosts;
          
                fs.readFile(POST_LOG_PATH, function(err, success) {
                    console.log("Looking for duplicate posts...");
                    pastPosts = "" + success;
                    pastPosts = pastPosts.split('\n');

                    for (var submission of submissions) {
                        if (!pastPosts.includes(submission.id)) {
                            topPostTitle = submission.title;
                            imageSource = submission.url;
                            topPostId = submission.id;
                            break;
                        }
                    };
                    
                    logPost(topPostId);
                    postImageUrlAsTweet(imageSource, topPostTitle);
                });
            });
        }
    });
};

function tweetRedditPost(topPostTitle, topPostImg) {
    console.log("Tweeting post...");
    T.post('media/upload', { media_data: topPostImg }, function (err, data, response) {
        var mediaIdStr = data.media_id_string;
        var altText = "This was supposed to be a picture but iss not smh";

        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText  }  }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                var params = { status: topPostTitle, media_ids: [mediaIdStr]  }

                T.post('statuses/update', params, function (err, data, response) {
                    console.log("Tweeted successfully! " + data.created_at);
                });
            }
        });
    });
};

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getUserTimeline(username) {
    var param = {
        screen_name: username,
        count: '200',
        include_rts: 'false'
    };

    T.get('statuses/user_timeline', param, function(err, data, response) {
        data.forEach(function(tweet) {
            console.log(tweet.text + "\n");
        });
        process.exit();
    });

};

function logPost(postId) {
    function callback(err, data) {
        if (!err) {
            console.log("Logged post successfully...");
        } else {
            console.log("Error logging post!!");
        }
    };

    fs.appendFile(POST_LOG_PATH, postId + '\n', callback);
};

function postImageUrlAsTweet(imageSource, topPostTitle) {
    var imageInB64;
    request.get(imageSource, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            data = new Buffer(body).toString('base64');
            imageInB64 = data;
            tweetRedditPost(topPostTitle, imageInB64);
        }
    });
}

