# twitter_project
Gets the top posts on Reddit's r/ProgrammerHumor subreddit 
and tweets the title and image of the top post. Logs previously
tweeted post in a log 'reddit_post_log' so that it doesn't tweet
duplicate posts. 

Uses reddit-oauth for Reddit API authorization.

Uses snoowrap for Reddit API wrapper.

Uses Twit for Twitter API wrapper.

Uses FileSystem to read/write logs.

Uses Request to get base-64 encoding for the Reddit image to
be submitted to Twitter.
