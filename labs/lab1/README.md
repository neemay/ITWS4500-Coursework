Yarden Ne'eman (neemay)
Web Science Lab 1
2/1/18

The following are things to take note/assumptions I made for this lab.

1) When parsing through the tweets, I considered a tweet "valid" if it had user information. This was to prevent errors from trying to display
  screen names and handles if there was no user present. This was the case for 5 objects in the JSON file, which appeared to be garbage data. By
  creating this distinction, errors on the user's end are avoided and junk data is not displayed on the front-end.
  
2) Favorites and retweets are displayed for the tweet itself, not the retweet or quoted tweet. This is because it is misleading to present the
  statistics for a retweet in a way thar could be associated with the tweet itself.
  
3) I displayed the date in MM/DD/YYY format instead of the UTC encoding that was stored in the data. A user does not care exactly what time the tweet was posted
  down to the millisecond, so I felt that just the date was sufficient.
  
4) For these tweets, the dates are all the same and the favorite and retweet counts are all zero. This is presumably because this data was captured
  live over a specific period of time on the same day. Since the tweets were captured when they were created, they have no favorite/retweet statistics
  and since the JSON is a static data format, these did not get updated after they were captured. If this data was dynamic, this would not be the case.
  
5) Hashtags were compared using all lower case so that hashtags like "#alternativefacts" and "#AlternativeFacts" count as the same hashtag.

6) The hashtags link to the twitter page for that hashtag, and the screennames link to that user's twitter page.

7) In the event that a profile picture for a twitter user no longer exists, the default twitter icon was used. This was done using an onerror attribute
  that would replace any image that returned a 404 error with the default image.
  
8) The jQuery animations fadeOut() and fadeIn() were used to create the smooth scrolling effect on the tweets.