Yarden Ne'eman
Web Science Lab 7
4/8/18

Things to note for this lab:
1) The workflow for this lab is as follows: A user can see the number of tweets that are currently stored in the database. They display these tweets right away or reset the database. If there are more than 0 tweets currently in the database, they can export the database to JSON/CSV/XML as well. If the user searches for tweets, they are automatically added to the database (and the number displayed is incremented). From here, they can choose to view the database which will show them all the tweets in the database including the new ones they just searched for. They can also export tweets at this stage. The reason I chose to have the searches added to the database instead of clearing it each time was this way, the user could choose if they wanted to add multiple searches into the database. It also gave more meaning to the reset button because if the database was reset for each search then the reset button would be redundant.

2) The entire application is responsive for all screen sizes and mobile by utilizing the bootstrap grid system.

3) I changed the layout of my page for this lab to a three-column layout instead of the two-column one I had previously. This is because the additional buttons and features made it so that when the tweets were displayed, they appeared near the bottom of the page. I wanted the tweets to be the central focus of the application so I gave them their own column at the center of the page. I also gave a background to the search and trending columns so that it would give a sense of separation between the columns and the tweets.

4) Like I did in lab 6, the user can specify the file name for export and a confirmation dialog is presented if the user tries to save a file with the same name. This gives the user the choice of overwriting the file and keeps them informed. This field has a default value of "neemay-tweets".

5) The code can be run using the "npm start" command as defined in my package.json file. The file for the server is called lab7.js and the file with the angular code is called lab7-angular.js.

6) Like for lab 5 and lab 6, I used a .env file to separate my API keys from the code to increase the security of the application.

7) I used the mongoose package to handle the interaction between the node server and the Mongo database.

8) At any point the user can click the "Reset Database" button to clear the tweets from the database. This doesn't delete the database itself, it just clears out the documents from the collection by using the mongoose "remove" function.

9) The zip file includes examples of the JSON, CSV, and XML save files. Each of these files is named "neemay-tweets" with the appropriate extension and has 5 tweets that were collected using the search parameter "avengers".