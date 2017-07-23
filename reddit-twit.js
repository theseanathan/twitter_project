var RedditApi = require('reddit-oauth');
var request = require('request');
var Snoowrap = require('snoowrap');
var Twit = require('twit');
var request = require('request').defaults({ encoding: null });

var CONFIG = require('./config');
var REDDITCONFIG = require('./redditConfig');

var T = new Twit(CONFIG);
var reddit = new RedditApi(REDDITCONFIG);
const snoowrap = require('snoowrap');
const fs = require('fs');

var access_token = '';
var app_id = 'oot0dyzuCLqZQw';
var app_secret = 'heJJOPBL36eDOtpgwhOXoaKJPoM';
var redirect_uri = 'https://theseanathan.github.io/';
var redditUsername = 'theseanathan';
var redditPassword = 'sd1530';

reddit.passAuth('theseanathan', 'sd1530', function (success) {
    if (success) {
        access_token = reddit.access_token;

        var redSno = new snoowrap({
            userAgent: 'theseanathan',
            clientId: app_id,
            clientSecret: app_secret,
            username: redditUsername,
            password: redditPassword,
            accessToken:  access_token
        });

        //console.log("REDSNO OBJECT CREATED: " + JSON.stringify(redSno, null, 2));

        console.log("\n\nPROGRAMMER HUMOR TOP:");
        redSno.getSubreddit('ProgrammerHumor').getTop().then(function(submissions) {
            var topPostTitle = submissions[0].title;
            var topPostThumbnail = submissions[0].thumbnail;

            //console.log(JSON.stringify(submissions, null, 2));

            var imageSource = submissions[0].preview.images[0].source.url;
            //console.log(imageSource);
            var imageInB64;

            request.get(imageSource, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                    imageInB64 = data;
                    tweetRedditPost(imageInB64);
                }
                console.log("OUT OF IF STATTEMENT");
            });
        });
    }
});

function tweetRedditPost(topPostImg) {
    T.post('media/upload', { media_data: topPostImg }, function (err, data, response) {
        console.log("TWEETED B64 IMAGE URL!");
        console.log("DATA: " + JSON.stringify(data));
        console.log("RESPONSE: " + JSON.stringify(response));
    })
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

