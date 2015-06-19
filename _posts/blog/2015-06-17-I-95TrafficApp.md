---
layout: post
author: Chris_Tufts
share:  true
title: "I-95 Traffic Incident Frequency Analysis"
modified:
categories: blog r
excerpt:
tags: [R, Philadelphia, 511, Shiny, Twitter, nlp]
image:
  feature: Weekday_95Incidents.png
date: 2015-06-18 ##T19:39:55-04:00

---
I, like so many other unlucky drivers, drive thru the I-95 construction zone in Philadelphia each day to and from work. I have sat in my fair share of traffic due to accidents and disabled vehicles and started to wonder just how often these events occur.  Lucky for me I have the internet and I can find these things out.  I started looking for information about the number of incidents in the area.  I couldn't find any recent official records, but I follow the [Philadelphia 511 twitter account](https://twitter.com/511PAPhilly) which always provides updates on traffic in the area. Using the [TwitteR package](http://cran.r-project.org/web/packages/twitteR/) I accessed all available tweets from 511 using the code below:


{% highlight r %}

twitCred <- setup_twitter_oauth(consumer_key=consumerKey,
                             consumer_secret=consumerSecret,
                             access_token = access.token,
                             access_secret = access.secret.token
                             
                            )

tw <- twListToDF(userTimeline('511PAPhilly',n=3200))
{% endhighlight %}
NOTE: For more info on how to gain twitter API access for you keys, tokens, etc. check out this post by [Dave Tang](http://davetang.org/muse/2013/04/06/using-the-r_twitter-package/)

There is one drawback about the Twitter API; it only allows for the most recent 3200 tweets from a user to be accessed via the API.  This left me with data dating back about a month and a half.  I wanted to build a [Shiny app](http://shiny.rstudio.com/) to show the most recent breakdown of traffic incidents, so I had to find a solution for getting realtime updates.  The simplest solution I found was using [IFFT](https://ifttt.com/) to save each tweet from 511 to a file in Google Drive. (Thanks for the idea [Lauren Ancona](https://twitter.com/laurenancona)) 

Once the data was retrieved, I needed a way to access it from Google Drive.  I found a [great post by Timothy Lau](http://statisticalthoughts.blogspot.com/2014/12/pulling-live-snapshots-of-data-from.html) which explained how to import data from Google Drive using the [repmis package](http://cran.r-project.org/web/packages/repmis/index.html).

Now that all my data retrieval and access issues were squared away I created a shiny app to visualize the frequency of traffic incidents.  Using the [RWeka](http://cran.r-project.org/web/packages/RWeka/index.html) package I broke down all available tweets to isolate key tokens and ngrams.  Upon review I found that 511 is very consistent in the way they tweet.  For example, the account uses the keyword "CLEARED" when updating about a previous incident which is now cleared.  511 also reports traffic incidents, which I refer to as obstructions in the app, in a consistent manner.  I found that incidents are broken down into three different types: accident/obstruction, disabled vehicles, and police activity.  511 also reports "Roadwork", but as far as I'm concerned roadwork is constant, so I filtered these tweets out.  Using basic grep commands I was able to filter the data based on highway name, highway direction, exit number and name, and obstruction type.  The app strictly isolates incidents in the construction zone which I defined as all exits from Vine Street up to Academy Road (exits 22 to 32).   

From this point I created filters using [dplyr](http://cran.rstudio.com/web/packages/dplyr) to summarise the data on an hourly and daily basis.  The user can select the histogram of all incidents or the mean number of incidents.  In addition, events can be broken down by hour of the day or by day of the week.  The resulting app is below. (To view the app in a separate window click [here](https://miningthedetails.shinyapps.io/I95PhiladelphiaHighwayIncidents))

<iframe src="https://miningthedetails.shinyapps.io/I95PhiladelphiaHighwayIncidents" width="100%" height="1200px"></iframe>

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
