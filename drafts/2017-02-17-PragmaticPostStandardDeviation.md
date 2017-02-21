---
layout: post
author: Chris_Tufts
share:  true
title: "Pragmatic Stats: Standard Deviation"
modified:
categories: blog r python pragmatic stats
excerpt: ""
tags: [pragmaticstats]
image:
  feature:
date: 2017-02-17 ##T15:39:55-04:00
---

# What is it?
The standard deviation provides a measure of variability in a sample or population.
It is the average distance, or deviation, a point in a population (sample) is
from the population (sample) mean.  The standard deviation is the square root of
the variance which means it is the same units of measurement as the data.  This
give a more interpretable picture of the spread of the data than the variance.

NOTE: Anytime I list 'population (sample)' this just means it can apply to a
[sample or a population](http://stats.stackexchange.com/questions/269/what-is-the-difference-between-a-population-and-a-sample#answer-416).  

# What is it used for?
The standard deviation gives us a sense of the 'spread' of our data. It can be used in
conjunction with the [median](http://miningthedetails.com/blog/r/python/pragmatic/stats/PragmaticPostMedian/) and [mean](http://miningthedetails.com/blog/r/python/pragmatic/stats/PragmaticPostMean/) to gain a full view of the structure of data.


# Symbols & Formulas
&sigma;<sup>2</sup> - Symbol Name (Greek Letter): Sigma (squared),
  Parameter Name: Population Variance<br/>
s<sup>2</sup> - Statistic Name: Sample Variance

Formulas:<br />
<b>Population Variance</b><br/>
<span>
$$
\begin{equation}
\sigma^2 = \sqrt{\Sigma(X-\mu)^2 \over N}
\end{equation}
$$
</span><br/>
<b>Sample Variance</b><br/>
<span>
$$
\begin{equation}
s^2 = \sqrt{\Sigma(X-\bar{X})^2 \over (n-1)}
\end{equation}
$$
</span>

n - number of scores in a sample<br />
N - number of scores in a population<br />
X - individual score in a population<br/>
&mu; - Population Mean<br />
X&#772; - Sample Mean

###############################################################
# When Should I Use This?

#### Use:
It should be used to 'get a sense of your data', in particular the spread of
your data. It is also used as a component of statistical tests such as
ANOVA.   

#### Don't Use:
If you want to understand the spread of your data on the same scale (same units)
as the sample values (or mean or median) it is better to use the
standard deviation (the square root of the variance).

# Assumptions, Prerequisites, and Pitfalls

In the <i>Formulas</i> section above you may have noticed the difference in the
denominators. I won't go into detail about bias in estimators here, but know that
when estimating the sample variance '(n-1)' is used in place of 'n' for an
unbiased estimation of variance in the sample. For more info check out [this
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
