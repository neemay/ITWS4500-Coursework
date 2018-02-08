Yarden Ne'eman (neemay)
Web Science Lab 2
2/8/18

The following are challenges/things to take note/assumptions I made for this lab.

1) getCurrentPosition() has been deprecated in Google Chrome and will only work through a secure connection like https.
  They specify in their manual several options that can be used by developers to go around this, one of which is to use localhost
  as localhost is considered to be a secure location. So, I needed to change my virtual host to use localhost in order to properly
  access the geolocation.
  
2) Using the API for openWeatherMap was really simple once I realized that I needed to create an account and generate an API key.
  Their sample API calls didn't have the api key listed and so it was unclear that it was required from those examples.
  
3) I modified the following example (https://codepen.io/anon/pen/ZrOJyj) to create a CSS3 animation ticker for information like
  wind speed, humidity, and pressure so all of that extra information doesn't visually overwhelm the user.
  
4) The API does not always return parameters for "rain", "snow", "clouds", and "wind"; they are only returned when that weather condition
  is measured in that location. As such, I check if these parameters are present in the return result before appending them to the list
  of weather data that is displayed.
  
5) I used an AJAX call to request the information from the API. When the API returned its response, I took the data that it returned and pulled out the
  parameters that I wanted to display.