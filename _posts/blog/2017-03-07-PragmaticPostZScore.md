---
layout: post
author: Chris_Tufts
share:  true
title: "Pragmatic Stats: Z-Score"
modified:
categories: blog pragmaticstats
excerpt: ""
tags: [pragmaticstats, r, python]
image:
  feature:
date: 2017-03-07 ##T15:39:55-04:00
---

# What is it?
The z-score is a standardized value for a sample from a normal distribution
displayed in units of standard deviation. The
value is standardized by subtracting the mean from the value and dividing the
difference by the standard deviation.

# What is it used for?
The z-score, in conjunction with a [lookup table](http://www.sjsu.edu/faculty/gerstman/EpiInfo/z-table.htm), can be used to calculate
the probability of a sample being between a given interval. For example,
say I want to know the probability of random subject's height falling between
65 and 68 inches.

The z-score also allows for comparison between two different, but normally
distributed, populations (samples). For example, say I want to compare my
height when I was in 4th grade, relative to all other 4th graders, with
my height when I was in 8th grade, relative to all other 8th graders. In
most cases of these comparisons we would still convert the z score to a probability
for comparison.

# Symbols & Formulas
&sigma; - Symbol Name (Greek Letter): Sigma,
  Parameter Name: Population Standard Deviation<br/>
s - Statistic Name: Sample Standard Deviation

Formulas:<br />
<b>Z-score : Population mean and standard deviation known</b><br/>
<span>
$$
\begin{equation}
z = {X-\mu \over \sigma}
\end{equation}
$$
</span><br/>
<b>Z-score: Population parameters unknown</b><br/>
<span>
$$
\begin{equation}
s = {X-\bar{X} \over s}
\end{equation}
$$
</span>


X - individual score<br/>
&mu; - Population Mean<br />
&sigma; - Population Standard Deviation<br/>
X&#772; - Sample Mean<br/>
s - Sample Standard Deviation

# When Should I Use This?

#### Use:

There are a few primary reasons to use a z-score. It provides a method of
comparison between two normal distributions that may have different parameters.
In addition we can use the score to derive probabilities of drawing a sample
from a given interval.

#### Don't Use:
If your data is not normally distributed.

# Assumptions, Prerequisites, and Pitfalls
Data must be from a normal distribution. If you are unsure of normality always
test for it.

# Example - No Code

#### Z Score to Probability with Table
Let's calculate the z-score for the weight of a lime, then calculate
the probability of a lime having a weight less than the value of our lime.

DRAW APPLE'S EXAMPLE  AND DECODE WITH TABLE

1. Calculate z score as per formula above.
2. Find your z score (to first decimal place) in the first column.<br/>
[z table source](http://www.sjsu.edu/faculty/gerstman/EpiInfo/z-table.htm)<br/>
![Step 2](/images/pragmatic_stats_zscore/ztable_step1.png)<br/>
3. Now follow the row containing your score until you hit the column
that contains the next decimal value.
![Step 3](/images/pragmatic_stats_zscore/ztable_step2.png)
4. Since the z-score was negative we are going to to subtract that value from 1.
<br/>Resulting in a p(X &le; x) = 0.1056 

In addition to the example above the interactive visualization at the
link below shows the probability of selecting a random sample greater than
a given value from a standard normal distribution.

[Cumulative distribution function](https://bl.ocks.org/ctufts/raw/a90019910166d8378c6462dfd2f6f3ec/)

# Example - Code

#### Python

{% highlight python %}
from scipy import stats
import numpy as np

sample_a = stats.norm.rvs(size=100, loc = 0, scale = 3)
# calculate z score based on sample mean and standard deviation
z_score  = stats.zscore(sample_a)
>>> z_score
array([-0.81963293,  0.36002583,  0.80103744, -0.43440364, -2.60416558,
        0.84227617,  0.93472321, -1.8692968 , -0.22968896,  0.04908181,
        1.10933995,  1.46639859, -0.01449947, -0.70734835,  0.69458453,
        1.07705481, -0.51067586,  0.87340216,  0.59712616, -0.22102545,
        0.88960975, -0.86587373,  0.58235053,  0.21814223, -0.3486155 ,
       -0.91684575, -0.04007688,  1.11626195,  0.29255973, -1.56953396,
       -0.9068852 , -0.00847972, -1.23875388, -0.09873936, -1.85955505,
       -0.48281647,  0.27986437,  0.82042073, -0.10979171,  1.79662833,
        0.84122853,  0.4460127 , -0.04683229, -1.16402321,  1.96106204,
        0.11175984,  0.03889449,  0.07733268,  0.92013274, -0.48831498,
        0.89168003, -0.52598743, -1.08009123,  0.55972369, -1.38062107,
        1.15950256, -0.14990688,  0.04984614, -0.10633908,  1.32259797,
       -1.38067332,  0.25545187,  0.33771353, -0.88862666,  1.14319357,
       -2.1330984 ,  0.43421622, -0.77173306,  0.9961095 , -1.89581514,
        0.48319381,  0.50071185,  2.29272082, -1.2394054 ,  0.24680831,
        0.18338661, -0.96212201,  0.51449491, -0.86411049,  0.5384277 ,
       -0.20584513, -0.30101981,  0.95080065, -1.40743874,  2.02954286,
        0.69556566, -0.89438131,  0.59864555,  0.00610339, -1.63665816,
       -0.07242259,  0.95611567, -1.54891467,  0.02934002,  0.51414639,
        0.49367896, -1.31581467,  1.16018518, -1.82591398,  1.6015992 ])

p_value_less_than_given = stats.norm.cdf(0.25)
p_value_more_than_given = stats.norm.sf(0.25)

print(p_value_less_than_given)
>>> 0.598706325683
print(p_value_more_than_given)
>>> 0.401293674317
{% endhighlight %}

#### R
{% highlight R %}
# Calculate z_scores f a random sample from a normal distribution
mu = 0
sigma = 3

sample_a <- rnorm(n = 100, mean = mu, sd = sigma)
z_scores <- scale(sample_a)

# pnorm - give the probability a sample drawn from the
# distribution will be less than a given value
given_value = 2.5
pnorm(given_value, mu, sigma)
[1] 0.7976716

# Probability a random sample is > given value
pnorm(given_value, mu, sigma, lower.tail = FALSE)
[1] 0.2023284

# Probability between intervals:
lower_bound <- -3.0
upper_bound <- 3.0
# less than upper bound but greater than lower bound:
pnorm(upper_bound, mu, sigma) - pnorm(lower_bound, mu, sigma)
[1] 0.6826895
{% endhighlight %}

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
