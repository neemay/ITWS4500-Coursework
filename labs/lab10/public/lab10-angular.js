//Initialize the angular application
var feed = angular.module('myApp', []);

//Function for the controller methods
feed.controller('myCtrl', function($scope, $http) {
  
  //Initialize the loading variable to false;
  $scope.loading = false;
  //Default the number of tweets collected to 10
  $scope.count = 5;
  //Initialize the filetype
  $scope.filetype = "json";
  //Initialize the filename
  $scope.filename = "neemay-tweets";
  //Initialize the tweet counters
  $scope.tweet_results = 0;
  $scope.tweet_count = 0;
  
  //Function to hide the file alerts
  $scope.hideAlerts = function() {
    $("#file_success").hide();
    $("#file_error").hide();
  }
  
  //Call the server to get the trends and generate an array with the top 10 trends
  //Set this array to its corresponding scope variable
  $scope.trends = function() {
    $("#trends").hide();
    $("#spinner3").show();
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.getTrends(position);
      });
    }
    else {
      $scope.getTrends(null);
    } 
  }
  
  $scope.getTrends = function(position) {
    if(position != null) {
      $http.get("trends", {params: { lat: position.coords.latitude, long: position.coords.longitude}}).then(function(response) {
        $scope.printTrends(response.data);
      });  
    }
    else {
      $http.get("trends", {params:  {lat: "-73.68", long: "42.72"} }).then(function(response) {
        $scope.printTrends(response.data);
      })
    }
  }
  
  $scope.printTrends = function(data) {
    $scope.trending = [];
    for(var i = 0; i < 10; i++) {
      var topic = data["0"].trends[i]["name"];
      var url = data["0"].trends[i]["url"];
      $scope.trending.push({"topic": topic, "url": url});
    }
    $("#spinner3").hide();
    $("#trends").show();
  }
  
  //Initial call to get trends
  $scope.trends();
  
  //Get the number of items currently in the database
  $http.get("dbCount").then(function(response) {
    $scope.tweet_count = parseInt(response.data, 10);
  });
  
  //Called when the search button is clicked
  $scope.search = function () {
    //Hide existing tweets
    $("#tweets").hide();
    //Reset any error messages
    $scope.error = "";
    //Set the loading variable to true
    $scope.loading = true;
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
      //Set the number of tweets that were returned
      $scope.tweet_results = response.data;
      //Update the count of items in the database
      var new_count = parseInt($scope.tweet_results, 10) + parseInt($scope.tweet_count, 10);
      $scope.tweet_count = new_count;
      //Set the loading variable to false
      $scope.loading = false;
      //Reset the query to be blank
      $scope.query = "";
    }).catch(function(response) { //if there is an error
      //Set the loading status to false
      $scope.loading = false;
      //Display the error message
      $scope.error = response.data;
    });
  }
  
  //Called when the user clicks the button to export the data
  $scope.export = function() {
    //Hide the file saving errors
    $("#file_success").hide();
    $("#file_error").hide();
    //Generate the filename
    var filename = $scope.filename + "." + $scope.filetype;
    //Calls the server to check if the file exists
    $http.get("check_file", {
      params: {
        filename: filename
      }
    }).then(function(response) {
      //If the server responds with a 200 status, the file does not exist and it can be written to
      $scope.save();
    }).catch(function(response) {
      //If the server responds with a 400 status, the file exists
      //Open the confirmation modal
      $("#exists_modal").modal();
    });
  }
  
  //Called when a user clicks the button to display database
  $scope.readTweets = function() {
    //Set the loading status to true
    $scope.loading2 = true;
    //Get the tweets from the database
    $http.get("read").then(function(response) {
      //Call function to display tweets
      $scope.displayTweets(response.data);
      $scope.loading2 = false;
    }).catch(function(response) {
      //Set the error status
      $scope.error = "We have encountered an error reading from the database.";
      $scope.loading2 = false;
    });
  }
  
  //Called when a user clicks the button to clear the database
  $scope.resetDB = function() {
    //Calls the server to delete the tweets
    $http.get("clear").then(function(response) {
      $("#tweets").hide();
      $scope.tweet_count = 0;
    }).catch(function(response) {
      $scope.error = "We have encountered an error resetting the database.";
    });
  }
  
  //Function to display the tweets on the front-end
  $scope.displayTweets = function(data) {
    //Initialize an array for the tweets
    $scope.tweets = [];
    //Keep track of how many tweets you got back
    var count = 0;
    //Use an angular foreach loop to parse through the results and extract
    //the desired values for each tweet
    //Push each entry to the $scope.teeets array to be displayed in the html
    angular.forEach(data, function(value) {
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
  }
  
  //Function to get the tweets from the database to be saved
  $scope.save = function() {
    $http.get("read").then(function(response) {
      //Calls saveFile to create the save data
      $scope.saveFile(response.data);
    }).catch(function(response) {
      $scope.error = response.data;
    });
  }
  
  //Function to generate the save data in the proper format
  $scope.saveFile = function(data) {
    var result;
    //If the specified filetype is json
    if($scope.filetype == 'json') {
      //Initialize the save_data array
      var save_data = [];
      //Extract the desired fields using an angular foreach loop
      angular.forEach(data, function(value) {
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
        //Push this entry to the save_data array
        save_data.push({"created_at": created_at, "id": id, "text": text, "user_id": user_id, "user_name": user_name, "user_location": user_location, "user_followers_count": user_followers_count, "user_friends_count": user_friends_count, "user_created_at": user_created_at, "user_time_zone": user_time_zone, "user_profile_background_color": user_profile_background_color, "user_profile_image_url": user_profile_image_url, "geo": geo, "coordinates": coordinates, "place": place});
      });
      //Turn this array into a JSON string
      result = JSON.stringify(save_data);
    }
    //If the filetype is CSV
    else if($scope.filetype == 'csv') {
      //Store the header row
      result = '"created_at","id","text","user_id","user_name","user_location","user_followers_count","user_friends_count","user_created_at","user_time_zone","user_profile_background_color","user_profile_image_url","geo","coordinates","place"\n';
      //Iterate through each entry using an angular foreach loop
      //Extract the data and append it to result, separate with commas
      //Add a newline at the end of each entry
      angular.forEach(data, function(value) {
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
    //If the filetype is XML
    else if($scope.filetype == 'xml') {
      //Start building the XML string
      result = "<?xml version='1.0' encoding='UTF-8'?>\n";
      result += "<tweets>\n"
      angular.forEach(data, function(value) {
        result += "\t<tweet>\n";
        result += "\t\t<created_at>" + value["created_at"] + "</created_at>\n";
        result += "\t\t<id>" + value["id"] + "</id>\n";
        result += "\t\t<text>" + value["text"] + "</text>\n";
        result += "\t\t<user_id>" + value["user"]["id"] + "</user_id>\n";
        result += "\t\t<user_name>" + value["user"]["name"] + "</user_name>\n";
        result += "\t\t<user_location>" + value["user"]["location"] + "</user_location>\n";
        result += "\t\t<user_followers_count>" + value["user"]["followers_count"] + "</user_followers_count>\n";
        result += "\t\t<user_friends_count>" + value["user"]["friends_count"] + "</user_friends_count>\n";
        result += "\t\t<user_created_at>" + value["user"]["created_at"] + "</user_created_at>\n";
        result += "\t\t<user_time_zone>" + value["user"]["time_zone"] + "</user_time_zone>\n";
        result += "\t\t<user_profile_background_color>" + value["user"]["profile_background_color"] + "</user_profile_background_color>\n";
        result += "\t\t<user_profile_image_url>" + value["user"]["profile_image_url"] + "</user_profile_image_url>\n";
        result += "\t\t<geo>" + value["geo"] + "</geo>\n";
        result += "\t\t<coordinates>" + value["coordinates"] + "</coordinates>\n";
        result += "\t\t<place>" + value["place"] + "</place>\n";
        result += "\t</tweet>\n"
      });
      result += "</tweets>"
    }
    //Call the server to save the file
    $http.get("save", {
      //Send the data to be saved and the filename to be saved under
      params: {
        data: result,
        filename: $scope.filename + "." + $scope.filetype
      }
    }).then(function(response) {
      //If the server returns a success, show a success message
        $("#file_success").show();
        $("#file_error").hide();
    }).catch(function(response) {
      //If the server returns an error, show an error message
        $("#file_success").hide();
        $("#file_error").show();
    });
  }
});

//jQuery for smooth scrolling
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("#scroll").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});