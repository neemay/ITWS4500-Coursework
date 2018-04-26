//Initialize the angular application
var vis = angular.module('myApp', []);

//Function for the controller methods
vis.controller('myCtrl', function($scope, $http) {
  $scope.colors = [];
  
  //From stackoverflow
  //https://stackoverflow.com/questions/45771849/chartjs-random-colors-for-each-part-of-pie-chart-with-data-dynamically-from-data
  $scope.randomColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  
  $scope.queries = function() {
    $("#queryChart").hide();
    $http.get('queries').then(function(response) {
      $scope.chart_title = "Tweet Queries";
      $scope.chart_description = "Breakdown of the queries used to collect saved tweets"
      var queries = response.data;
      var arr = [];
      for(var i in queries) {
        var query = queries[i];
        if(arr[query] >= 1) {
          arr[query] += 1;
        }
        else {
          arr[query] = 1;
          $scope.colors.push($scope.randomColors());
        }
      }
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
    });
    $("#queryChart").show();
    $("#retweetChart").hide();
    $("#tagChart").hide();
  }
  $scope.queries();
  $scope.chart_title = "Tweet Queries";
  $scope.chart_description = "Breakdown of the queries used to collect saved tweets"
  
  $scope.retweets = function() {
    $("#retweetChart").hide();
    $http.get('read').then(function(response) {
      $scope.chart_title = "Retweets";
      $scope.chart_description = "Was this an original tweet or a retweet?"
      var tweets = response.data;
      var arr = [0, 0];
      $scope.colors.push($scope.randomColors());
      $scope.colors.push($scope.randomColors());
      angular.forEach(tweets, function(value) {
        if(value["retweeted_status"]) {
          arr[0] += 1;
        }
        else {
          arr[1] += 1;
        }
      });
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
    });
    $("#queryChart").hide();
    $("#retweetChart").show();
    $("#tagChart").hide();
  }

  $scope.tags = function() {
    $("#locationsChart").hide();
    $http.get('read').then(function(response) {
      $scope.chart_title = "Hashtags";
      $scope.chart_description = "Breakdown of the hashtags used in these tweets"
      var tweets = response.data;
      var hashtags = [];
      for(var key in tweets) {
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
          }
        } 
      }
    }
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
    });
    
    
    $("#queryChart").hide();
    $("#retweetChart").hide();
    $("#tagChart").show();
  }
});