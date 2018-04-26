//Initialize the angular application
var vis = angular.module('myApp', []);

//Function for the controller methods
vis.controller('myCtrl', function($scope, $http) {
  //Initialize default variables
  $scope.error = false;
  $scope.colors = [];
  $scope.chart_title = "Tweet Queries";
  $scope.chart_description = "Breakdown of the queries used to collect saved tweets";
  
  //From stackoverflow
  //https://stackoverflow.com/questions/45771849/chartjs-random-colors-for-each-part-of-pie-chart-with-data-dynamically-from-data
  $scope.randomColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  
  //Function to generate the queries visualization
  $scope.queries = function() {
    //Set the error state and hide all of the visualizations
    $scope.error = false;
    $("#queryChart").hide();
    $("#retweetChart").hide();
    $("#tagChart").hide();
    //Call to the server to get the queries used to generate the data
    $http.get('queries').then(function(response) {
      //Set the chart title and description
      $scope.chart_title = "Tweet Queries";
      $scope.chart_description = "Breakdown of the queries used to collect saved tweets";
      //Store the response data
      var queries = response.data;
      var arr = [];
      //Create an associative array with the queries and their respective counts
      for(var i in queries) {
        var query = queries[i];
        if(arr[query] >= 1) {
          arr[query] += 1;
        }
        else {
          arr[query] = 1;
          //Generate a random color for each new entry
          $scope.colors.push($scope.randomColors());
        }
      }
      //Create the chart.js visualization
      var ctx = $("#queryChart");
      var chart1 = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: Object.keys(arr),
          datasets: [{
            data: Object.values(arr),
            backgroundColor: $scope.colors
          }]
        }
      });
      //Show the visualization
      $("#queryChart").show();
    }).catch(function (response) { //if there was an error, display the error
      $scope.error = true;
    });
  }
  //Initial call to display the first visualization
  $scope.queries();
  
  //Function to generate the retweets visualization
  $scope.retweets = function() {
    //Set the error state
    $scope.error = false;
    //Hide all of the visualizations
    $("#queryChart").hide();
    $("#retweetChart").hide();
    $("#tagChart").hide();
    //Call to the server to get the tweets
    $http.get('read').then(function(response) {
      //Set the chart title and description
      $scope.chart_title = "Retweets";
      $scope.chart_description = "Was this an original tweet or a retweet?";
      //Save the tweets
      var tweets = response.data;
      var arr = [0, 0];
      //Generate 2 random colors
      $scope.colors.push($scope.randomColors());
      $scope.colors.push($scope.randomColors());
      //For each tweet, if it was a retweet increment arr[0] otherwise increment arr[1]
      angular.forEach(tweets, function(value) {
        if(value["retweeted_status"]) {
          arr[0] += 1;
        }
        else {
          arr[1] += 1;
        }
      });
      //Create the chart.js visualization for the data
      var ctx = $("#retweetChart");
      var chart1 = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Retweet", "Original"],
          datasets: [{
            data: arr,
            backgroundColor: $scope.colors
          }]
        }
      });
      //Show the visualization
      $("#retweetChart").show();
    }).catch(function (response) { //if there was an error, display the error
      $scope.error = true;
    });
  }

  //Function to generate the hashtags visualization
  $scope.tags = function() {
    //Set the scope variable
    $scope.error = false;
    //Hide all of the visualizations
    $("#queryChart").hide();
    $("#retweetChart").hide();
    $("#tagChart").hide();
    //Call to server to get the tweets
    $http.get('read').then(function(response) {
      //Set the chart title and description
      $scope.chart_title = "Hashtags";
      $scope.chart_description = "Breakdown of the hashtags used in these tweets";
      //Store the response data
      var tweets = response.data;
      var hashtags = [];
      for(var key in tweets) {
      //Generate an associative array for the hashtags
      if(tweets[key].entities != null) {
        var value = tweets[key].entities.hashtags;
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
            //Generate a new color for each new hashtag
            $scope.colors.push($scope.randomColors());
          }
        } 
      }
    }
    //Create the hashtags visualization
    var ctx = $("#tagChart");
    var chart1 = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(hashtags),
        datasets: [{
          data: Object.values(hashtags),
          backgroundColor: $scope.colors
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 1
            }
          }]
        }
      }
    });
    $("#tagChart").show();
  }).catch(function (response) { //if there was an error set the error state
    $scope.error = true;
  });
  }
});