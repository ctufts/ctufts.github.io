---
layout: post
author: Chris_Tufts
share:  true
title: "Identifying Non-Matching Rows Between Data Frames Using Dplyr"
modified:
categories: blog
excerpt:
tags: []
image:
  feature:
date: 2015-04-13 ##T19:39:55-04:00
---

Earlier today I ran into a situation where I had to compare two data frames for some analysis I was doing. In particular I needed to identify the rows in data frame A which were not present in data frame B.  I have used several different methods for this task in the past, but recently I have been using the <i>anti_join</i> function in the [<i>dplyr</i>](http://cran.r-project.org/web/packages/dplyr/index.html) package. 

I provided an example below using the <i>sleep</i> dataset.  
{% highlight r %}
library(dplyr)

set.seed(7)
sleep.A <- sample_n(sleep, 5 )
> sleep.A
   extra group ID
20   3.4     2 10
8    0.8     1  8
3   -0.2     1  3
2   -1.6     1  2
4   -1.2     1  4
sleep.B <- sample_n(sleep, 5 )
> sleep.B
   extra group ID
16   4.4     2  6
7    3.7     1  7
18   1.6     2  8
3   -0.2     1  3
8    0.8     1  8
{% endhighlight %}

I want to find all the rows of <i>sleep.A</i> not present in <i>sleep.B</i> based on the columns <i>group</i> and <i>ID</i>.  The <i>group</i> and <i>ID</i> combinations present in rows 20, 2, and 4 of <i>sleep.A</i> are not present in <i>sleep.B</i>.  Using <i>anti_join</i> we can confirm this as shown below. 

{% highlight r %}
> anti_join(sleep.A, sleep.B, by = c("group", "ID"))
  extra group ID
1  -1.2     1  4
2  -1.6     1  2
3   3.4     2 10
{% endhighlight %}




[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
