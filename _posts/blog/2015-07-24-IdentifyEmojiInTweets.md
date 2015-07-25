---
layout: post
author: Chris_Tufts
share:  true
title: "Twimoji: Identifying Emoji in Tweets"
modified:
categories: blog r
excerpt:
tags: [R, rstats, emoji, Twitter]
image:
  feature: EmojiTitlePic.png
date: 2015-07-24 ##T19:39:55-04:00

---

I recently had the oppurtunity to do a [lightning talk](https://blog.rjmetrics.com/2015/07/22/heres-what-went-down-at-phillys-first-annual-data-jawn/) at the first annual [Data Jawn](http://rjmetrics.ticketleap.com/data-jawn/details) event hosted by [RJ Metrics](https://rjmetrics.com/).  Myself and [Lauren Ancona](https://twitter.com/laurenancona) presented a small project we had been working on.  We collected tweets geolocated in the Philadelphia area for a couple of months and decided to look at emoji use in tweets.  

My primary contribution to the project was to isolate the emojis in each tweet and determine the number of tweets which used each emoji.  The tweets were collected using IFTTT and saved in a series of csv files. The tweet files are imported followed by a copy of Tim Whitlock's [Emoji Unicode Tables](http://apps.timwhitlock.info/emoji) labeled as <i>emoticon_conversion_noGraphic.csv</i> in the code below.   

{% highlight r %}

library(readxl)
library(dplyr)
library(RWeka)

# get list of files
fin <- list.files(path = "data/", full.names = T)
# import and combine files
ds.list <- lapply(fin, read_excel, col_names = F)
ds <- unique(do.call(rbind.data.frame, ds.list))
# read in emoji tables and assign names to cols
emoticons <- read.csv("emoticon_conversion_noGraphic.csv", header = F)
names(emoticons) <- c("unicode", "bytes","description")
names(ds) <- c("created","screenName", "text" , "ID", "map.info.A", "map.info.B")
{% endhighlight %}


After importing the data I used the [RWeka](https://cran.r-project.org/web/packages/RWeka/index.html) package to tokenize the tweets. The next step is to identify which emoji are present in each tweet.  Below you will see a simple <i>for</i> loop coupled with a regular expression statement to search for each emoji in the table.   
{% highlight r %}
# get word frequencies and tokens
tokens <- WordTokenizer(ds$text)
emoji.frequency <- matrix(NA, nrow = nrow(ds), ncol = nrow(emoticons))
for(i in 1:nrow(emoticons)){
  emoji.frequency[,i] <- regexpr(emoticons$bytes[i],ds$text, useBytes = T )
}
{% endhighlight %}

As an R user I am well aware of the cons of using a <i>for</i> loop and therefore I will offer up a more efficient way to identify the emoji.  I use <i>vapply</i> to accomplish the same task below.  To confirm the results are identical I use the <i>all.equal</i> function to compare the results. 

{% highlight r %}
emoji.frequency.vapply <- vapply(emoticons$bytes,
                                   regexpr,FUN.VALUE = integer(nrow(ds)),
                                   ds$text, useBytes = T )

> all.equal(emoji.frequency, emoji.frequency.vapply)
[1] TRUE
{% endhighlight %}


Each column in the <i>emoji.frequency</i> matrix represents an emoji in the table.  If the emoji is not present in a tweet the value is -1, otherwise the value returned by the <i>regexpr</i> function is the position of the emoji in the tweet.  To calculate the number of tweets which contain each emoji the <i>colSums</i> function is utilized. The frequency of each emoji in the data set is appended to the original <i>emoticons</i> data.frame. 

{% highlight r %}
emoji.counts <- colSums(emoji.frequency>-1)
emoticons <- cbind(emoji.counts, emoticons)
{% endhighlight %}

We found the most frequently used emoji were: 

<iframe src="http://laurenancona.github.io/twimoji/#/6" width="100%" height="600px"></iframe> 

Although the focus of this post was identifying the frequency of emoji use in tweets, I figured I'd end with some great visualizations of the data we collected. Lauren made some amazing maps showing the tweet locations over time: 

<iframe src="http://laurenancona.github.io/twimoji/#/3" width="100%" height="600px"></iframe> 

As well as a heat map showing tweet density over time:

<iframe src="http://laurenancona.github.io/twimoji/#/7" width="100%" height="600px"></iframe> 

Please feel free to check out the [slides](http://laurenancona.github.io/twimoji/#/) from our presentation as well as the [git repo](https://github.com/laurenancona/twimoji) containing the project. 

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
