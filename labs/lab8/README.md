Yarden Ne'eman
Web Science Lab 8
4/12/18

Things to note for this lab:
1) The installation for this application works through the package.json file. The package.json file stores all of the dependencies for the application, which are the node packages I installed. When the "npm install" command is run, node takes this package.json file and automatically installs all of the dependencies. This makes it so that all a person needs to install this application is the package.json file and the source files. Any dependencies will install automatically when "npm install" is run.

2) Like for all previous labs, this application is responsive for all screen sizes and mobile devices through the use of the Bootstrap grid system.

3) I added a landing page for this application so that the user sees information about the application and its purpose before being presented with the functionality. This landing page has a button labeled "Start" that when clicked, scrolls the user down to the actual applicaiton. I did this using jQuery scrolling animations. The rest of the workflow for the application is the same as Lab 7.

4) I added a confirmation dialog for resetting the database because I felt that it was important to encapsulate that functionality because it's irreversible. This way, if the user accidentally clicks on the button it won't delete the database unless they confirm this action. This is also the case for overwriting a file.

5) I updated the way I pulled trends for this lab. Previously, regardless of the user's location it would pull the trending topics from the United States. What I do now is render the trends based on the user's location. I do this through two calls to the Twitter API, one to "trends/closest" and another to "trends/place". "Trends/closest" takes the user's location (which I get from navigator.geolocation.getCurrentLocation()) and returns the geographic ID of the closest location with trending data available. I then use this geographic ID as the parameter for the "trends/place" call which returns the list of trends for that area. I also included a small button to refresh these trending topics.

6) For this lab I updated my Bootstrap version from 3.3.7 to 4.0.0. This was so that I could better utilize the new grid system which was updated in the latest version.

7) Same as all previous labs, I use a .env file to separate the API keys.

8) My lab keeps the user informed of the state of the application at all times. I have multiple different loading spinners that indicate when something is loading, which helps inform the user of what is happening. I also keep the user informed of the number of tweets in the database at all times. The language used in the application is meant to be simplistic so that any user can understand the premise.