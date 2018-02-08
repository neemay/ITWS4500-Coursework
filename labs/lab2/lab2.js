$(document).ready(function() {
  //Gets the geolocation from the browser and calls the getWeather function with those coordinates
  navigator.geolocation.getCurrentPosition(getWeather);
});

//Function to call the API with this geolocation
function getWeather(position) {
  //Unique API key
  var appid = "ed385aaf7b99c0461f00dfc1ef01ce11";
  //API url with the specified coordinates, the API key, and a specification for imperial (F) units
  var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + 
      "&lon=" + position.coords.longitude + 
      "&appid=" + appid +
      "&units=imperial";
  //Call the api using an AJAX call, populating the weather on success and alerting failure
  //on an error
  $.ajax({
    url: api,
    success: function(result) {
      populateWeather(result);                    
    },
    error: function(result) {
      var output = "<div class='data-container'>Failed to retreive weather data for this location</div>";
      $("#forecast").append(output);
    }});
}

//Function to display the current weather retreived from the API
function populateWeather(result) {
  //String to store the html output to be generated
  var output = "<div class='data-container'>";
  output += "<h2>Current weather for ";
  output += result.name + ", " + result.sys.country + "</h2>";
  output += "<div class='temp'>";
  output += "<img class='icon' alt='Weather description image' src='https://openweathermap.org/img/w/" + result.weather[0].icon + ".png'>";
  output += "<div class='description'>" + result.weather[0].main + "<br/>" + Math.round(result.main.temp) + "&deg;F</div></div>";
  output += "<div class='details'>Details: " + result.weather[0].description + "</div>";
  output += "<div class='data-ticker'><ul class='data'>";
  output += "<li>Humidity: " + result.main.humidity + "%</li>";
  output += "<li>Pressure: " + result.main.pressure + " hPa</li>";
  //These parameters are only present if these weather conditions are found in that location
  //so check that they exist before trying to genetrate a value
  if(result.wind) {
    output += "<li>Wind Speed: " + result.wind.speed + " mph</li>";
  }
  if(result.clouds) {
    output += "<li>Cloud Cover: " + result.clouds.all + "%</li>";
  }
  if(result.rain) {
    output += "<li>Rain in the last 3 hours: " + result.rain['3h'] + " mm</li>";
  }
  if(result.snow) {
    output += "<li>Snow in the last 3 hours: " + result.snow['3h'] + " mm</li>";
  }
  output += "</ul></div>";
  //Display the current date so the user can see when this data was retrieved
  var d = new Date();
  output += "<span class='collected'>Data collected: " + d.toLocaleString() +"</span></div>";
  $("#forecast").append(output);
}