//Require statements
//Need dotenv, express, fs, and twitter packages
require('dotenv').config();
var express = require('express');
var fs = require('fs');
var Twitter = require('twitter');
var app = express();
var mongoose = require('mongoose');

//Set the default file location
app.use(express.static(__dirname + '/public'));

//Load the html file on a call to the page
app.get('/', (req, res) => res.sendFile('public/lab8.html', {root: __dirname}));

//Connect to the Mongo Database
mongoose.connect('mongodb://localhost/tweets');

//Set up the database schema
var Schema = mongoose.Schema;

//Save the whole tweet object in the database for extensibility
var tweetSchema = new Schema({
  tweet: Object
});

//Create a model using this schema
var Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;

//Set up Twitter client
//Keys are located in a separate .env file to enhance security
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET
});

//Call the api to get the current trending topics in the US
app.get('/trends', function(req, res) {
  console.log("Getting trending topics for " + req.query.lat + " " + req.query.long);
  client.get('trends/closest', {"lat": req.query.lat, "long": req.query.long}, function(error, data, response) {
    client.get('trends/place', {id: data["0"].woeid}, function(error, data, response) {
      res.send(data);
    });
  });
});

//Function to get the current number of items in the database
app.get('/dbCount', function(req,res) {
  Tweet.find().exec(function (err, results) {
    count = results.length;
    res.send("" + count + "");
  });
});

//Call the api with the search parameters
app.get('/query', function(req, res) {
  var query = {};
  var search_loc = "-73.68, 42.72,-73.67, 42.73";
  //If no query is defined, default to looking for tweets in the Troy area
  if ('track' in req.query){
    if(req.query.track == "") {
      query.locations = search_loc;
    }
    else {
     query.track = req.query.track; 
    }
  }
  else {
    query.locations = search_loc;
  }
  var count = req.query.count;
  var data = [];
  var tweets = 0;
  //Log the query in the console 
  console.log(query);
  //Instantiate the twitter stream and start collecting tweets
  var stream = client.stream('statuses/filter', query, function(stream) {
    stream.on('data', function(tweet) {
      //Add this tweet data to the array
      data.push(tweet);
      tweets++;
      //Output the number of tweets collected to the console
      console.log(tweets + ' out of ' + count);
      //Once you have collected the desired number of tweets
      if(tweets == count) {
        //Close the stream
        stream.destroy();
        //Send angular the number of tweets collected
        res.send("" + tweets + "");
        //Iterate through the tweets and save each to the database
        for(var i = 0; i < tweets; i++) {
          var new_tweet = new Tweet({
            tweet: data[i]
          });
          new_tweet.save(function(err) {
            if(err) throw err;
          }); 
        }
        console.log("Closed stream and saved tweets to database.");
      }
    });
    //If the stream encounters an error
    stream.on('error', function(error) {
      //Close the stream
      stream.destroy();
      //Set an error status code and send an error message
      res.status(400);
      res.send("We have encountered an error, please try again later.");
      console.log(error);
    });
  }); 
});

//Function to read tweets from the database
app.get('/read', function(req, res) {
  console.log("Reading tweets from database");
  //Query to get all tweets from the database
  Tweet.find({}, function(err, docs) {
    if(err) throw err;
    var tweets = [];
    for(var i in docs) {
      tweets.push(docs[i].tweet);
    }
    //Send the tweets to the angular
    res.send(tweets);
  });
});

//Function to clear the tweets from the database
app.get('/clear', function(req, res) {
  console.log("Clearing database");
  //Query to remove all tweets from the database
  Tweet.remove({}, function(err, docs) {
    if(err) throw err;
    console.log("Database cleared");
    res.sendStatus(200);
  });
});

//Function to check if the file exists
app.get('/check_file', function(req, res) {
  console.log("Checking if " + req.query.filename + " exists");
  //Check if the file exists, if it does return a 400 error.
  fs.stat(req.query.filename, function(error, stat) {
    if(error == null) {
      res.sendStatus(400); //file exists
      console.log(req.query.filename + " exists.");
    }
    else {
      res.sendStatus(200); //file does not exist
      console.log(req.query.filename + " does not exist.");
    }
  });
});

//Function to save the file given the filename and data
app.get('/save', function(req, res) {
  console.log("Saving to file " + req.query.filename);
  //Write the data to the specified file and return a status of 200 if successful
  fs.writeFile(req.query.filename, req.query.data, function(error) {
    if(error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
  res.sendStatus(200);
});

//Set up the server to listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000.'));