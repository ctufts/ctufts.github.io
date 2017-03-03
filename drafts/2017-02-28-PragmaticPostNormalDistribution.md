---
layout: post
author: Chris_Tufts
share:  true
title: "Pragmatic Stats: Normal Distribution"
modified:
categories: blog pragmaticstats
excerpt: ""
tags: [pragmaticstats, r, python]
image:
  feature: pragmatic_stats_eda/scatter_plot.svg
date: 2017-02-25 ##T15:39:55-04:00
---

# What is it?
The normal distribution, also known as a Gaussian distribution, is a probability
distribution that describes a number of populations we see in everyday life.
For example, the height of a population of women between ages 20 and 25 or the weight of American men.  

![Normal Distribution](/images/pragmatic_stats_normaldist/normal_ex1.svg)

## What is a Probability Distribution?
Before getting too far into what the normal distribution is, let's take a few
minutes to go over what a probability distribution is. A probability distribution
is a list of all possible outcomes and their corresponding probabilities. <a href="#fn1" id="ref1">(Kruschke, J. (2015))</a>

The plot above is a plot of a probability density function of a standard normal
distribution...what is a density function? We will get to that shortly.

# What is it used for?
The normal distribution is used to model many events occurring in our world.
In statistics we can use our knowledge of the normal distribution to calculate
the probability of a random variable (the probability of a value we observed,
i.e. height of subject 1). It is also used as an integral part of many
different statistical tests and machine learning applications.

It is extremely important to have an understanding of the normal distribution as you will often find that the 'assumption of normality' is being made by different methods. If this assumption is wrong you will need to change your course of action for the
problem you are solving.   

# Terminology

* Probability Mass?
  * Probability mass will sum to 1 across all intervals
  * For example you create a histogram of your values
  * The (sum of each bin) / total samples = 1, i.e. sum of each bin = total samples

    ----- Should you go into this?
* Probability Density: Does not need to be on the scale of 0-1, but the
standard normal distribution is....
  * Density is just the probability mass over the bin width, but we are dealing
  with a continuous distribution which would have bins which are infinitely small. 

 Function [Explanation and formula]
* Probability Distribution Function [Explanation and formula]
* Parameters
  * Mean
  * Standard Deviation
* Standard Normal Distribution
  * A normal distribution with the parameters:
    * Mean = 0
    * Standard Deviation = 1

# When Should I Use This?

#### Use:
In upcoming post I will go into detail on how we can use the normal distribution.
For now, know that the normal distribution can be used to derive the probability
of a random variable when it is originating from a normal distribution.

#### Don't Use:

# Assumptions, Prerequisites, and Pitfalls
If you assume your data was drawn from a normal distribution, you should
always check your assumption otherwise you can't rely on any results made under
the assumption of normality.

# Example - No Code


# Example - Code

#### Python & Matplotlib

{% highlight python %}

{% endhighlight %}


{% highlight python %}

{% endhighlight %}


#### R & ggplot2
{% highlight R %}

{% endhighlight %}


{% highlight R %}

{% endhighlight %}


<sup id="fn1">Kruschke, J. (2015). Doing Bayesian data analysis : a tutorial with R, JAGS, and Stan. Boston: Academic Press.
  <a href="#ref1"></a>
</sup>

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
