Yarden Ne'eman
Web Science Lab 6
3/8/18

Where would it be better to place the CSV conversion code, in the node server or in an Angular controller? Why?
  It is better to place the CSV conversion code in an Angular controller than the node server. Since the data is accessible on both sides, the availability of the data is not an issue to consider here. What does matter, is that the node server would be spending extra time and resources to convert the file to CSV before saving. As servers become larger and more sophisticated, it is not a good idea to implement basic things that can be done in the client's browser on the server itself as it is inefficient. Also if many people use the server, it would make more sense to have this precomputation happen on their individual machines instead of on the server. All the server has to do is save the file regardless of the format it is required to be in.
  
Other things to note for this lab:
1) I allowed the user to specify the filename to be exported and set it to neemay-tweets by default.

2) The application appends the file extension to the filename automatically so the user doesn't have to specify it when they enter the filename.

3) If the file already exists, then a modal opens up to ask the user if they want to overwrite the file. If they cancel, nothing happens and they can rename the file and try to export again. If they click yes, then the original file is overwritten.

4) On success or failure of file saving, a dialogue is displayed to inform the user of the status of the file. The console also logs the various stages of checking if files exist and which files are written to.

5) A file can only be exported if there is data available. As a result, the export button is disabled by default and is only enabled after data is pulled from the Twitter API. The button is also disabled whenever new tweets are being loaded.

6) Included in the zip file are two of the files I saved: neemay-tweets.json and neemay-tweets.csv. These files were both exported from the same data that was generated using the search parameter "black panther" and a count of 5 tweets.