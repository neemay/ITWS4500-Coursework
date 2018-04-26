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
    $("#locationChart").hide();
  }
  $scope.queries();
  $scope.chart_title = "Tweet Queries";
  
  $scope.retweets = function() {
    $("#retweetChart").hide();
    $http.get('read').then(function(response) {
      $scope.chart_title = "Was the tweet a retweet?";
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
          labels: ["Yes", "No"],
          datasets: [{
            data: arr,
            backgroundColor: $scope.colors
          }]
        }
      });
    });
    $("#queryChart").hide();
    $("#retweetChart").show();
    $("#locationChart").hide();
  }
//  var ctx = document.getElementById("myChart");
//  var myChart = new Chart(ctx, {
//      type: 'bar',
//      data: {
//          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//          datasets: [{
//              label: '# of Votes',
//              data: [12, 19, 3, 5, 2, 3],
//              backgroundColor: [
//                  'rgba(255, 99, 132, 0.2)',
//                  'rgba(54, 162, 235, 0.2)',
//                  'rgba(255, 206, 86, 0.2)',
//                  'rgba(75, 192, 192, 0.2)',
//                  'rgba(153, 102, 255, 0.2)',
//                  'rgba(255, 159, 64, 0.2)'
//              ],
//              borderColor: [
//                  'rgba(255,99,132,1)',
//                  'rgba(54, 162, 235, 1)',
//                  'rgba(255, 206, 86, 1)',
//                  'rgba(75, 192, 192, 1)',
//                  'rgba(153, 102, 255, 1)',
//                  'rgba(255, 159, 64, 1)'
//              ],
//              borderWidth: 1
//          }]
//      },
//      options: {
//          scales: {
//              yAxes: [{
//                  ticks: {
//                      beginAtZero:true
//                  }
//              }]
//          }
//      }
//  });
});