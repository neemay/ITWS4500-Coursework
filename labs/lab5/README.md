Yarden Ne'eman
Web Science Lab 5
3/1/18

The following are things to note/assumptions I made for this lab:

1) I used a package called dotenv that would load the API key strings from a separate file into my process.env file. This is so that they API keys could be kept secret to increase security. This package was downloaded using npm "install dotenv"

2) My code waits for the specified number of tweets to be collected before outputting them. Searches that are not popular might take some time to collect as a result, but the console will display the number of tweets that have been collected thusfar.

3) The default number of tweets requested is 10 and the maximum that can be requested is 25 (this is an arbitrary limit).

4) If a query parameter is not specified then the search defaults to a location search of the Troy area using the coordinates given in the lab. (I would recommend using a number smaller than 10 tweets if this is tested because it takes some time for tweets to be collected in this area)

5) I make a call to the twitter API to get the trending topics for the United States to be displayed. When you click on a topic it takes you to the twitter link for that topic.

6) Clicking on a person's username will take you to their twitter page.

7) I used bootstrap to make the website fully responsive. I used the grid layouts to make sure that everything looks clean regardless of the screen size. When a user views the app on a mobile device or narrow screen, the trending topics appear to the bottom of the search results.

8) I display the favorites and retweets for each tweet but these are all 0 since the stream collects tweets as they are tweeted (meaning a user can't retweet or favorite it in that time)

9) Once the specified number of tweets are collected they are outputted to a file called "neemay-tweets.json". The sample tweet file I submitted was created using the search parameter "black panther" and 10 tweets were collected.

10) I used angular to make $http calls to the server for the data. Once the server returned a response, this data was set to its respective angular variable and ng-repeat was used to display this data.

11) The code can be run using the "npm start" command as defined in my package.json file. The file for the server is called lab5.js and the file with the angular code is called lab5-angular.js.