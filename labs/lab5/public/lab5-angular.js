//Initialize the angular application
var feed = angular.module('myApp', []);

//Function for the controller methods
feed.controller('myCtrl', function($scope, $http) {
  //Default the number of tweets collected to 10
  $scope.count = 10;
  //Call the server to get the trends and generate an array with the top 10 trends
  //Set this array to its corresponding scope variable
  $http.get("trends").then(function(response) {
    $scope.trending = [];
    for(var i = 0; i < 10; i++) {
      var topic = response.data["0"].trends[i]["name"];
      var url = response.data["0"].trends[i]["url"];
      $scope.trending.push({"topic": topic, "url": url});
    }
  });
  //Called when the search button is clicked
  $scope.search = function () {
    //Reset any error messages
    $scope.error = "";
    //Show the loading spinner
    $("#spinner").show();
    //Call the server to get the searched for tweets with the corresponding parameters
    $http.get("query", {
      params: {
        track: $scope.query,
        count: $scope.count
      }
    }).then(function(response) { //on a successful call
      //Initialize an array for the tweets
      $scope.tweets = [];
      //Keep track of how many tweets you got back
      var count = 0;
      //Use an angular foreach loop to parse through the results and extract
      //the desired values for each tweet
      //Push each entry to the $scope.teeets array to be displayed in the html
      angular.forEach(response.data, function(value) {
        var name = value["user"]["name"];
        var pic = value["user"]["profile_image_url_https"];
        var screen_name = value["user"]["screen_name"];
        var date = new Date(value["created_at"]);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var text = value["text"];
        var favorites = value["favorite_count"];
        var retweets = value["retweet_count"];
        $scope.tweets.push({"name": name, "pic": pic, "screen_name": screen_name, "month": month, "day": day, "year": year, "text": text, "favorites": favorites, "retweets": retweets});
        count++;
      });
      //Set the number of tweets that were returned
      $scope.tweet_count = count;
      //Hide the loading spinner
      $("#spinner").hide();
      //Reset the query to be blank
      $scope.query = "";
    }).catch(function(response) { //if there is an error
      //Hide the loading spinner
      $("#spinner").hide();
      //Display the error message
      $scope.error = response.data;
    });
  }
});