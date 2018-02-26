require('dotenv').config();
var express = require('express');
var fs = require('fs');
var Twitter = require('twitter');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile('public/lab5.html', {root: __dirname}));

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET
});

app.get('/query', function(req, res) {
  
  var query = {};
    if ('track' in req.query){
      query.track = req.query.track;
    }
    else {
      query.locations = "42.72,-73.68,42.73,-73.67";
    }
    var count = req.query.count || 1;
    var data = [];
    var tweets = 0;
  
  var stream = client.stream('statuses/filter', query, function(stream) {
    stream.on('data', function(tweet) {
      //tweet = JSON.stringify(tweet);
      data.push(tweet);
      tweets++;
      console.log(tweets + ' out of ' + count);
      if(tweets == count) {
        stream.destroy();
        res.send(data);
        console.log("Closed stream");
      }
    });
    
    stream.on('error', function(error) {
      stream.destroy();
      res.status(400);
      res.send("We have encountered an error, please try again later.");
      console.log(error);
    });
  });
  
//  client.get('search/tweets', {q: 'marvel'}, function(error, tweets, response) {
//    if(error) throw error;
//    console.log(tweets);
//    data = tweets;
//  });
});

app.listen(3000, () => console.log('Server listening on port 3000.'));