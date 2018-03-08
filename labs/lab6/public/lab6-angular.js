//Initialize the angular application
var feed = angular.module('myApp', []);

//Function for the controller methods
feed.controller('myCtrl', function($scope, $http) {
  //Initialize the loading variable to false;
  $scope.loading = false;
  //Disable the export button
  $scope.export_disable = true;
  //Default the number of tweets collected to 10
  $scope.count = 10;
  //Initialize the filetype
  $scope.filetype = "json";
  //Initialize the filename
  $scope.filename = "neemay-tweets";
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
    //Hide existing tweets
    $("#tweets").hide();
    //Reset any error messages
    $scope.error = "";
    //Set the loading variable to true
    $scope.loading = true;
    //Disable the export button
    $scope.export_disable = true;
    //Hide file saving errors
    $("#file_success").hide();
    $("#file_error").hide();
    //Call the server to get the searched for tweets with the corresponding parameters
    $http.get("query", {
      params: {
        track: $scope.query,
        count: $scope.count
      }
    }).then(function(response) { //on a successful call
      $scope.json_data = response.data;
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
      //Set the loading variable to false
      $scope.loading = false;
      //Reset the query to be blank
      $scope.query = "";
      //Show new tweets
      $("#tweets").show();
      //Enable the export button
      $scope.export_disable = false;
    }).catch(function(response) { //if there is an error
      //Hide the loading spinner
      $("#spinner").hide();
      //Display the error message
      $scope.error = response.data;
    });
  }
  $scope.export = function() {
    $("#file_success").hide();
    $("#file_error").hide();
    var filename = $scope.filename + "." + $scope.filetype;
    $http.get("check_file", {
      params: {
        filename: filename
      }
    }).then(function(response) {
      $scope.saveFile();
    }).catch(function(response) {
      $("#exists_modal").modal();
    });
  } 
  $scope.saveFile = function() {
    var result;
    if($scope.filetype == 'json') {
      var save_data = [];
      angular.forEach($scope.json_data, function(value) {
        var created_at = value["created_at"];
        var id = value["id"];
        var text = value["text"];
        var user_id = value["user"]["id"];
        var user_name = value["user"]["name"];
        var user_location = value["user"]["location"];
        var user_followers_count = value["user"]["followers_count"];
        var user_friends_count = value["user"]["friends_count"];
        var user_created_at = value["user"]["created_at"];
        var user_time_zone = value["user"]["time_zone"];
        var user_profile_background_color = value["user"]["profile_background_color"];
        var user_profile_image_url = value["user"]["profile_image_url"];
        var geo = value["geo"];
        var coordinates = value["coordinates"];
        var place = value["place"];
        save_data.push({"created_at": created_at, "id": id, "text": text, "user_id": user_id, "user_name": user_name, "user_location": user_location, "user_followers_count": user_followers_count, "user_friends_count": user_friends_count, "user_created_at": user_created_at, "user_time_zone": user_time_zone, "user_profile_background_color": user_profile_background_color, "user_profile_image_url": user_profile_image_url, "geo": geo, "coordinates": coordinates, "place": place});
      });
      result = JSON.stringify(save_data);
    }
    else if($scope.filetype == 'csv') {
      result = '"created_at","id","text","user_id","user_name","user_location","user_followers_count","user_friends_count","user_created_at","user_time_zone","user_profile_background_color","user_profile_image_url","geo","coordinates","place"\n';
      angular.forEach($scope.json_data, function(value) {
        result += '"' + value["created_at"] + '",';
        result += '"' + value["id"] + '",';
        result += '"' + value["text"] + '",';
        result += '"' + value["user"]["id"] + '",';
        result += '"' + value["user"]["name"] + '",';
        result += '"' + value["user"]["location"] + '",';
        result += '"' + value["user"]["followers_count"] + '",';
        result += '"' + value["user"]["friends_count"] + '",';
        result += '"' + value["user"]["created_at"] + '",';
        result += '"' + value["user"]["time_zone"] + '",';
        result += '"' + value["user"]["profile_background_color"] + '",';
        result += '"' + value["user"]["profile_image_url"] + '",';
        result += '"' + value["geo"] + '",';
        result += '"' + value["coordinates"] + '",';
        result += '"' + value["place"] + '"\n';
      });
    }
    $http.get("save", {
        params: {
          data: result,
          filename: $scope.filename + "." + $scope.filetype
        }
    }).then(function(response) {
        if(response.status = 200) {
          $("#file_success").show();
          $("#file_error").hide();
        }
        else {
          $("#file_error").show();
          $("#file_success").hide();
        }
    });
  }
});