//Initialize the angular application
var app = angular.module("myApp", []);
//Function for the controller methods
app.controller("myCtrl", function($scope, $http) {
  //Get the geolocation of the browser
  $scope.position;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.position = position;
      //Once you have the position, call functions to get current weather and forecast
      getCurrentWeather($scope.position);
      getForecast($scope.position);
    });
  }
  else { //Display an error if geolocation is unsupported or blocked
    $("#error").html("Geolocation not supported");
  }
  
  //Function to get the current weather at this location
  getCurrentWeather = function(position) {
    //Unique API key
    var appid = "ed385aaf7b99c0461f00dfc1ef01ce11";
    //API url with the specified coordinates, the API key, and a specification for imperial (F) units
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + 
      "&lon=" + position.coords.longitude + 
      "&appid=" + appid +
      "&units=imperial";
    
    //Call the API and parse the response as a JSON
    //Set the values of the angular variables so the data is displayed
    $http.jsonp(api, { params : { callback: 'JSON_CALLBACK' }
      }).success(function(data, status, headers, config) {
        //Log the data just to make sure it worked
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
  
  //Function to get the 5 day/3 hour forecast for this location
  getForecast = function(position) {
    //Unique API key
    var appid = "ed385aaf7b99c0461f00dfc1ef01ce11";
    //API url with the specified coordinates, the API key, and a specification for imperial (F) units
    var api = "http://api.openweathermap.org/data/2.5/forecast?lat=" + position.coords.latitude + 
      "&lon=" + position.coords.longitude + 
      "&appid=" + appid +
      "&units=imperial";
    
    //Call the API and parse the response as a JSON
    //Generate an array of the values so that angular can use
    //ng-repeat to display the data for each forecast
    $http.jsonp(api, { params : { callback: 'JSON_CALLBACK' }
      }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.forecast = []
        //Use an angular forEach loop to iterate through the JSON
        angular.forEach(data["list"], function(value) {
          var date_time = value["dt_txt"];
          var d = new Date(date_time);
          var time = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          var date = d.toLocaleDateString();
          var temp = Math.round(value["main"]["temp"]);
          var icon = "https://openweathermap.org/img/w/" + value["weather"]["0"]["icon"] + ".png";
          var desc = value["weather"]["0"]["main"];
          var details = value["weather"]["0"]["description"];
          $scope.forecast.push({"date": date, "time": time, "temp": temp, "icon": icon, "desc": desc, "details": details});
        });
      }).error(function(data,status,headers,config) {
        alert("Error: " + status);
      });
  }
});
