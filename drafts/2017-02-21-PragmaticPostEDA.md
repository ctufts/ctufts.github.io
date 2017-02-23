---
layout: post
author: Chris_Tufts
share:  true
title: "Pragmatic Stats: Exploratory Data Analysis - The Basics"
modified:
categories: blog r python pragmatic stats
excerpt: ""
tags: [pragmaticstats]
image:
  feature:
date: 2017-02-21 ##T15:39:55-04:00
---
<!--  This post will cover how to get an 'idea' of what your data looks like
  will contain the mean/median/standard deviation/variance and introduce
  histograms and scatter plots(?). Short blurb on tools for plotting.
-->
# What is it?
Exploratory data analysis (EDA) is the process of reviewing your data to
get a sense of what you are dealing with. You will often need to look at
both statistics derived from your data in conjuction with visualizations.

# What is it used for?
It is often the first step in solving any data related problem. You need to know
what you are dealing with before you can propose a plan on how to attack (regardless
  of application - prediction, correlation, ANOVA, etc.)

It is used to answer the following:

* What is the range of my data?
* Where is my data centered?
* How spread out is my data?
* What distribution is my data from?


# Terminology

* Histogram: Bar chart that has multiple equal sized bins (intervals) on the
x-axis which represents the range of data values. The y-axis is the frequency, or
count, of the number of samples in a specific range.

* Scatter Plot: Plot used to plot dependent (y-axis) and independent variable (x-axis).
 

* Range : The maximum and minimum values of your data.
  * Example: Sample of Heights for 5 men = [60, 66, 75, 77, 70]</br>
  Range - [60,77]

# When Should I Use This?

#### Use:
It should be used to 'get a sense of your data', in particular the spread of
your data. It is also one of the parameters used to describe a [normal distribution](http://stattrek.com/probability-distributions/normal.aspx)
along with the mean.

#### Don't Use:
Not sure there is a blanket time not to use it (at least in the case of
exploratory analysis).  But there are some things you should know (see next section).


# Assumptions, Prerequisites, and Pitfalls

In the <i>Formulas</i> section above you may have noticed the difference in the
denominators. I won't go into detail about bias in estimators here, but know that
when estimating the sample standard deviation '(n-1)' is used in place of 'n' for an
unbiased estimation of standard deviation in the sample. For more info check out [this
post](http://stats.stackexchange.com/questions/51237/population-variance-and-sample-variance#answer-51239).  

# Example - No Code

<!-- ![Variance example title page](/images/variance/variance_title.jpeg)

![Variance example page 1](/images/variance/Variance_pg1.jpg)

![Variance example page 2](/images/variance/Variance_pg2.jpg) -->

# Example - Code

#### Python

Using statistics library
{% highlight python %}
>>> import statistics
>>> # create sample of floats
... sample = [1., 1., 2., 2., 3., 3., 2., 2., 1., 1.]
>>> statistics.stdev(sample)
0.7888106377466155
{% endhighlight %}

Using sample variance formula
{% highlight python %}
import statistics
import math
# create sample of floats
sample = [1., 1., 2., 2., 3., 3., 2., 2., 1., 1.]
# calculate sample mean
sample_mean = statistics.mean(sample)
numerator = 0.
for s in sample:
  numerator += (s - sample_mean)**2
sample_stdev = math.sqrt(numerator/(len(sample) - 1))
print(sample_stdev)
0.7888106377466155
{% endhighlight %}

#### R
{% highlight R %}
> sample <- c(1, 1, 2, 2, 3, 3, 2, 2, 1, 1)
> sd(sample)
[1] 0.7888106
{% endhighlight %}

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
