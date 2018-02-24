var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
  $scope.position;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.position = position;
      getCurrentWeather($scope.position);
    });
  }
  else {
    $("#error").html("Geolocation not supported");
  }
  
  getCurrentWeather = function(position) {
    //Unique API key
    var appid = "ed385aaf7b99c0461f00dfc1ef01ce11";
    //API url with the specified coordinates, the API key, and a specification for imperial (F) units
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + 
      "&lon=" + position.coords.longitude + 
      "&appid=" + appid +
      "&units=imperial";
    
    $http.jsonp(api, { params : { callback: 'JSON_CALLBACK' }
      }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.location = data["name"] + ", " + data["sys"]["country"];
        $scope.image_url = "https://openweathermap.org/img/w/" + data["weather"]["0"]["icon"] + ".png";
        $scope.weather = data["weather"]["0"]["main"];
        $scope.temprature = Math.round(data["main"]["temp"]);
        $scope.description = data["weather"]["0"]["description"];
        $scope.humidity = data["main"]["humidity"];
        $scope.pressure = data["main"]["pressure"];
        $scope.wind = data["wind"]["speed"];
        $scope.clouds = data["clouds"]["all"];
        if(data["rain"]) {
          $scope.rain = data["rain"]["3h"]; 
        }
        if(data["snow"]) {
          $scope.snow = data["snow"]["3h"];
        }
        var date = new Date();
        $scope.time = date.toLocaleString();
      }).error(function(data,status,headers,config) {
        alert("Error: " + status);
      });
  }
});
