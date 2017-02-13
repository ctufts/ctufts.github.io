---
layout: post
author: Chris_Tufts
share:  true
title: "Pragmatic Stats: Mean"
modified:
categories: blog r python pragmatic stats
excerpt: ""
tags: [pragmaticstats]
image:
  feature: prag_mean/mean_1024_256.svg
date: 2017-02-11 ##T15:39:55-04:00
---

# What is it?
The mean is the average of a sample or population of scores.  To break it down one step
further, it is the sum of scores divided by the number of scores in the sample or group.
It is one of the primary measures of centrality in statistics.

# What is it used for?
It provides insight into what our data looks like. However it is
a statistic [(parameter in the case of a population)](http://stats.stackexchange.com/questions/269/what-is-the-difference-between-a-population-and-a-sample#answer-416) that is used in many different
applications in statistics, machine learning, etc.  I won't dive into those right now
but, in upcoming posts it will be referenced often.

# Symbols & Formulas
&mu; - Pronunciation: "mu" , Definition: Population Mean<br />
X&#772; - Pronunciation: "X hat", Definition: Sample Mean

Population Mean<br/>
<span>
$$
\begin{equation}
\mu = {\Sigma X \over N}
\end{equation}
$$
</span>

Sample Mean<br/>
<span>
$$
\begin{equation}
\bar{X} = {\Sigma X \over n}
\end{equation}
$$
</span>

n - number of scores in a sample<br />
N - number of scores in a population<br />
X - individual score

# When Should I Use This?

#### Use:
It should be used to 'get a sense of your data'. Outside of exploration of
your data, it can also be used for application like [mean filtering](http://miningthedetails.com/blog/r/TimeSeriesDecomposition/) to try
and eliminate noise from a signal and/or perform time series decomposition.

#### Don't Use:
Not sure there is a blanket time not to use it (at least in the case of
exploratory analysis).  But there are some things you should know (see next section).

# Assumptions, Prerequisites, and Pitfalls

The mean is great for giving us an idea of what our data looks like..... but it
<b>does not tell the whole story</b>.  This is exactly why we have other measures
of centrality like the median and measures of variation such as variance and standard deviation.  In upcoming
post I'll dive into some of these.

# Example - Sans Code

![Mean example title page](/images/prag_mean/mean_title.jpg)

![Mean example page 1](/images/prag_mean/mean_1.jpg)

The mean gives us some information, but the following example shows
how it can often be misleading. For example, we have a sample set of
scratch off lottery ticket outcomes.

![Not the whole story](/images/prag_mean/mean_3.jpg)
If we only look at the mean we might think our chance of winning is
pretty decent, but if we look at the median,
we might think differently ....
![Mean example page 2](/images/prag_mean/mean_2.jpg)

# Example - Code

#### Python

{% highlight python %}
>>> import statistics
>>> (1 + 2 + 3 + 4)/4
2.5
>>> statistics.mean([1, 2, 3, 4])
2.5
{% endhighlight %}

#### R
{% highlight R %}
> mean(c(1,2,3,4))
[1] 2.5
> (1 + 2 + 3 + 4)/4
[1] 2.5
{% endhighlight %}

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
