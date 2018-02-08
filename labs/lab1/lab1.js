//Execute the following when the document has been loaded
$(document).ready(function() {
  //Global variables for these functions
  var tweets;
  var tweet_num = 5;
  var tags;
  //Uses an AJAX call to get the tweets from the JSON file
  $.getJSON('TwitterTweets17.json', function(data) {
    //Store the returned JSON array into a javascript array
    tweets = data;
    //Array to store the hashtags
    var hashtags = [];
    //For each tweet, find the hashtags and generate an associative array
    //where the key is the hashtag and the value is the number of times
    //this hashtag appears in the tweets
    for(var key in data) {
      if(data[key].entities != null) {
        var value = data[key].entities.hashtags;
        for(var i in value) {
          //Compare using the lowercase versions of the tweets
          var tag = value[i].text.toLowerCase();
          //If this hashtag already exists, increment the value
          if(hashtags[tag] >= 1) {
            hashtags[tag] += 1; 
          }
          //Otherwise, set its value to 1 and add it to the array
          else {
            hashtags[tag] = 1;
          }
        } 
      }
    }
    var i;
    //Sort the hashtags by greatest value
    hashtags.sort();
    //Extract the keys from hashtags into an array
    tags = Object.keys(hashtags);
    //Load the top 5 appearing hashtags
    for(i = 0; i < 5; i++) {
      var tag = loadHashtags(i);
      $("#hashtags").append(tag);
    }
    //Load the first 5 tweets
    for(i = 0; i < 5; i++) {
      var tweet = loadTweet(i);
      $("#tweets").append(tweet);
    }
    //Call the ticker function every 3 seconds
    time = setInterval(startTicker, 3000);
  });

  //Function that implements the ticker functionality using jQuery animations
  function startTicker() {
    //Fade out the first tweet
    $('li').first().fadeOut("slow", function() {
      //Remove this tweet from the list
      $(this).remove();
      //Find the next valid tweet
      while(!validTweet(tweet_num)){
        tweet_num += 1;
      }
      //Load the information for this tweet
      var tweet = loadTweet(tweet_num);
      $("#tweets").append(tweet);
      //Fade in this tweet and increment the number of total tweets we've processed
      $('li').last().hide().fadeIn("slow");
      tweet_num += 1;
      //If we've reached the last tweet, reset the counter and loop back to the first tweet
      if(tweet_num == tweets.length)
        tweet_num = 0;
    });
  }
  
  //Function to process the information for the tweet and return a string containing
  //the information to display
  function loadTweet(i) {
    //Build the string with the information from the tweet and the necessary html
    var tweet = "";
    tweet += "<li>";
    tweet += "<div class='tweet-content'><img class='profile'  src='" + tweets[i].user.profile_image_url_https + "' onerror=this.src='https://pbs.twimg.com/media/C8WgcPwUAAEUyKn.jpg';>";
    var url = tweets[i].user.screen_name;
    tweet += "<a class='screename' href='https://www.twitter.com/" + url +"'>" + tweets[i].user.name + " </a><span class='handle'>@" + url + "</span>";
    //Create the date from the tweet in MM/DD/YYYY format
    var date = new Date(tweets[i].created_at);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    tweet += "<span class='date'>" + month + "/" + day + "/" + year + "</span>";
    tweet += "<div class='tweet-text'>" + tweets[i].text;
    //Favorites and retweets for the tweet we are displaying itself, not the retweeted tweet statistics
    tweet += "<span class='stats'>Favorites: " + tweets[i].favorite_count + " Retweets: " +tweets[i].retweet_count +"</span>";
    tweet += "</div></div></li>";
    //Return the generated string
    return tweet;
  }

  //Function to check whether the tweet to be processed is valid
  //Validity is judged by whether or not there is a user for this data
  function validTweet(i) {
    if(tweets[i].user == null)
      return false;
    return true;
  }
  
  //Function to process the hashtag information and return a string containing
  //the information to display
  function loadHashtags(i) {
    //Build the string with the information form the tweet and the necessary html
    var hashtag = "";
    hashtag += "<a class='tags' href='https://twitter.com/hashtag/" + tags[i] + "?src=hash'>#" + tags[i] + "</a>";
    //Return the string
    return hashtag;
  }
});