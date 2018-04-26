Yarden Ne'eman
Web Science Lab 10

Things to note for this lab:
1) I used chart.js for the visualizations. I found this to be super helpful and easy to use, and I was really impressed with how they turned out. I did run into a few glitches where colors would change or the hover states would be messy, and I think this has to do with how I made the chart responsive. I tried my best to fix them but sometimes they weren't reproducible.

2) The three visualizations I did were of queries, retweets, and hashtags. The queries visualization displays the queries used to collect the data in a donught chart. This shows the proportions of which queries were used to collect the tweets in the database. An example of this visualization with some data is found in the screenshots folder under visualization1.png. The retweets visualization displays which of the tweets were original tweets and which were retweets. This is displayed as a donught as well so that you can easily see the proportion of which are retweets and which are not. An example of this visualization is found in the screenshots folder under visualization2.png. The hashtags visualization displays the counts for the hashtags used in the tweets as a bar graph. This is done using an associative array that compares the hashtags in all lower case and keeps track of the counts. An example of this is found in the screenshots folder under visualization3.png.

3) I structured the application so that when a user clicks on the "visualize" button in the main application, they are taken to a new page visualize.html. Here, it will automatically display the query visualization when the page loads. There are three buttons that represent each visualization and when you click on the buttons, you can switch between visualizations. Each time the button is clicked, the data is refreshed as a new call is made to the server for the data each time. To return to the main application, there is a back button.

4) The new page is responsive, including the visualizations. Chart.js has some weird bugs with responsive charts but for the most part it resizes with no issues.

5) I used some code that I found on stack overflow (link in the code) to randomly generate RGB color values that I could use to color the visualizations. I did it this way because for things like queries and hashtags I didn't know how many colors I would need so each time a new entitiy is created I generate a new color.

6) I removed the "max" attribute on my tweet count (it used to be 25) so that more data could be collected to create more meaningful visualizations.

7) I added into my database a field called "query" so that each tweet would also store the query that it was collected from. I then added a function in the server that would return the query for each tweet which I could then use to generate the query visualization.