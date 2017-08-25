console.log("Twitter API Project Start");

var http = require('http');
var express = require('express');
var app = express();
var instagram = require('instagram-node').instagram();

var IG_REDIRECT_URI = "https://theseanathan.github.io/";
var IG_CODE = "ad5ab24896fb40ebb46d9fab069e16dc";
var IG_AUTH_TOKEN = "23437423.5788048.e67e782e8e5d4ae984f561b5b49a6fb7";

app.set('port', 8080);

instagram.use({ client_id: '57880480c3a3480196cea019f9b8385b',
         client_secret: '0c5367d64a42436fbd1e3aed25bc9148' });
instagram.use({ access_token: IG_AUTH_TOKEN });

exports.showSeanathan = function(req, res) {
    instagram.user_search('theseanathan', function(err, users, remaining, limit) {
        if (err) {
            res.send(err);
            console.log("WE FUCKED UP AGAIN BRUH: " + JSON.stringify(err));
        } else {
            console.log(users);
        }
    });
}

app.get('/theseanathan', exports.showSeanathan);

http.createServer(app).listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
});

