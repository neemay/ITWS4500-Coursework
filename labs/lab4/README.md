Yarden Ne'eman
Web Science Lab 4
3/1/18

For this lab I mimicked my Lab 2 but instead used Angular to make the api calls and process the data. Like in lab 2, I got the geolocation from the browser and then called a function to get the weather for that location. This function calls the API with the required parameters and API key using the $http.jsonp service because the API returns a JSON file. The JSON file is then parsed and the angular variables are initialized with their values. By doing this, the data from the API is populated into the HTML. 

What I added for this lab is a call to also get the 5-day 3-hour forecast for that location. This API call is made the same way but is parsed slightly differently. When the API returns the JSON, the data is parsed using an angular forEach loop since there are multiple entries to be parsed (there are 40 entries returned). To parse this, an array is created for each entry with all of the variables required to be displayed for that entries. The variables for each entry are pushed to this array and is then displayed in the HTML using angular's ng-repeat property. This makes it so the HTML does not need to be repeated for each of the 40 entries since angular does this automatically.

Finally, the website is completely responsive. I used bootstrap grids to display the future forecasts such that when the screen is large, there are 4 columns, when it is medium, there are 3 columns, and when it is small, there are 2 columns. When the website is viewed through a mobile emulator, then there is 1 column. Furthermore, I used a media query to force the width of a container to be 100% when it is viewed on a screen that is maximum 400px wide (meaning a mobile device).

To further illustrate these media queries, I made it so that the background of the forecasts turn to purple when the screen width is 400px or less.