---
layout: post
author: Chris_Tufts
share:  true
title: "Power Analysis and Effect Size Estimation"
modified:
categories: blog r
excerpt: ""
tags: [rstats]
link:
image:
date: 2017-06-21 ##T19:39:55-04:00

---

# What is Statistical Power?

Let's start by going over type I and type II error which occurs in hypothesis
testing. To aid in this review I'll use an example of comparing two samples. I
have one sample of 100 students did not study for a test and 100 students that
took the same test and studied for 2 hours.

* Null hypothesis: The mean score of each sample is the same. Said differently,
there is no difference in the means between the two samples (i.e. there is no
	effect present)
* Alternative hypothesis: The mean score for the students who studied will be
different than the sample of students that did not study. We want to know if it
has a positive or negative effect on the score.

The possible errors that may occur are:

* Type I (&alpha;)- Often referred to as a false positive. Basically this is when you
observe an effect that isn't actually present (Rejecting the Null Hypothesis
	when it is actually true).
	* In this example that would mean our results indicate the group that
		studied had a higher (or lower) score on average than students that didn't. Only problem is that we would be wrong.



* Type II (&beta;)- False Negative. This is what happens when we don't detect a difference (effect) that is actually present.
	* This would mean we fail to reject the null hypothesis (i.e. we believe both
		groups are the same based on our data), but we are wrong and the study group
		actually did score higher (or lower) on average.


I'm going to focus on type II error for the moment, as this is the one most
associated with power. The statistical power is a measure of our ability to
detect an effect if one is present and it is defined as 1-&beta;.



# Why Do We Need Power?
Our experiment looks at the difference studying has on test scores. Before we perform
such an experiment we need to answer a few questions:

1. What would we consider a practically significant effect? Is an increase (decrease) of
1 point really anything to care about? Or do we only care about a change of 10 points or more?
2. At what point do we reject the null hypothesis?
3. How many participants do we need in each group to detect the effect? This would
 be the effect we determined in question 1.

Calculating the statistical power of the experiment will allow us to answer question
3, however first we must answer the first 2 questions.

# Effect Size
Let's address question 1 first. In order to understand what power really is we need to understand effect size. Effect size is a standardized measure of an effect. For
example is a change of 10 points on the test when the standard deviation is 2 points
any different than a change of 5 points with a standard deviation of 1 point? Effect
size allows for the comparison of experiments which may be on different scales.

In our case we are concerned with comparing two means. In the case of a t-test the
effect is simply the difference between the sample means divided by the sample standard deviation. The effect size can be calculated as follows assuming equal sample
sizes in each group:

<span>$$d_{s} = {\bar{X_{1}} - \bar{X_{2}}\over{s_{pooled}}}$$</span>

<span>$$s_{pooled} = \sqrt{(s_{1}^2 + s_{2}^2)\over{2}}$$</span>

So back to question 1, what size effect are we looking for? This is somewhat of
a tricky question. If you already know your standard deviation or you can estimate it
based on past studies you can calculate the effect size you are looking for. However
if this is not the case there are generally accepted guidelines on effect size
proposed by [Cohen](http://www2.psych.ubc.ca/~schaller/528Readings/Cohen1992.pdf).  

Cohen's <i>d</i> is not the only method for calculating effect sizes. Depending on your
data and test you are performing there are various options, some can be found
here:

* [Dr. Becker of CSSS](http://www.uccs.edu/lbecker/effect-size.html)
* [Some Practical Guidelines for Effective Sample Size Determination by Russell V. Length](http://pegasus.cc.ucf.edu/~lni/sta5175/Lenth2001.pdf)

## What Is the Acceptable Amount of Type I Error?
Let's get back to question 2 - "At what point do we reject the null hypothesis?".
This question is basically asking "What level of type I error are we comfortable
with?". I won't go into much detail on this as the generally acceptable p-value
is 0.05 (an &alpha; value of 0.95). This translates to "If the probability
of the effect seen is due to chance (sampling error) is less than 5%, reject
the null hypothesis."


BASED ON ALPHA OF 0.05, BETA OF 0.2 - PLOTS
PLOTS OF TYPE I II AND POWER AND EXPLANATION OF ANY MISCONCEPTION, I.E.
IT IS THE EFFECT SIZE THAT WE ARE LOOKING FOR NOT THE ACTUAL MEAN DIFFERENCE

<img src='/images/power_analysis/Type_I_distributions.svg'>
<img src='/images/power_analysis/Type_II_distributions.svg'>
<img src='/images/power_analysis/Power_distributions.svg'>


## Selecting the Sample Size for an Experiment
Now on to question 3. Sample size should be determined prior to starting an
experiment. To select the proper sample size we use power analysis. A power
value of 0.80 (Type II error of 0.2) is considered the required minimum power
value when performing an experiment.

What is the relation ship between sample size and power?

ADD GRAPHICS FROM SAMPLE_SIZE_EFFECT_ON_POWER.R

<figure>
    <img src='/images/power_analysis/Power_0_11.svg'>
    <figcaption>N=100</figcaption>
</figure>
<figure>
    <img src='/images/power_analysis/Power_0_61.svg'>
    <figcaption>N=1000</figcaption>
</figure>
<figure>
    <img src='/images/power_analysis/Power_0_89.svg'>
    <figcaption>N=2000</figcaption>
</figure>



# Example: What Sample Size Do I Need?
It is [general consensus](http://www2.psych.ubc.ca/~schaller/528Readings/Cohen1992.pdf) that a power value of 0.80 is acceptable. In addition
a p-value below 0.05 (a type I error below 0.05) is normally used as the
constraint to reject a null hypothesis. I point this out as we need to know our
preference for power and alpha to determine our sample size a priori. In our
example we only require the ability to detect a 'medium' effect of 0.5 in a
two sided t-test.

First step is to identify the sample size necessary to meet our requirements:
* Detects an effect size of 0.5
* Power = 0.80
* &alpha; = 0.05

{% highlight R %}
library(ggplot2)
library(pwr)

t_test_pwr <- pwr.t.test(d = 0.5,
                         power = 0.80, sig.level = 0.05,
                         alternative = 'two.sided')
print(t_test_pwr)

Two-sample t test power calculation

				 n = 63.76561
				 d = 0.5
 sig.level = 0.05
		 power = 0.8
alternative = two.sided

NOTE: n is number in *each* group
{% endhighlight %}

We can also plot the power vs. the sample size (built into pwr)
{% highlight R %}
plot(t_test_pwr)
{% endhighlight %}

<img src='/images/power_analysis/medium_effect_pwr.svg'>



I wrote a small function to create random samples of our experiment ...

{% highlight R %}
perform_t_test <- function(n,mu_a, mu_b, s){
  group_a <- rnorm(n, mean = mu_a, sd = s)
  group_b <- rnorm(n, mean = mu_b, sd = s)
  t.test(group_a, group_b)$p.value
}
{% endhighlight %}

So now that we know the minimun sample size to meet our requirements, let's
test it out. First we will try an experiment with a sample size smaller than
our power analysis stated.

Let's start with an underpowered experiment. From the power analysis we know
the sample size should be 64 or higher to allow us to detect a medium
effect. So let's start with two groups with 25 samples each (underpowered) and
an effect present of 0.5. We perform the experiment 1000 times.

{% highlight R %}
n <- 25
mu_a <- 80
mu_b <- 75
s <- 10

cohen_d <- (mu_a - mu_b)/s

effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)
print(cohen_d)
[1] 0.5
print(effect_detected_percent)
[1] 0.41
{% endhighlight %}

The results show the null hypothesis is only rejected 41% of the time assuming
we are using an &alpha; of 0.05.

Now let's try it with a sample size which is greater than the required sample
size.
{% highlight R %}
n <- 80
effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)
print(effect_detected_percent)
[1] 0.885
{% endhighlight %}


What can happen if I perform an experiment that is overpowered? In the case
of a trial that uses animals or humans there are [ethical concerns](https://www.ma.utexas.edu/users/mks/statmistakes/UnderOverPower.html)
in addition to the added cost and waste of resources. On top of these concerns
an overpowered experiment may detect extremely small effect as significant. Take
the example below. Say my two groups have mean test scores of 80 and 80.5, but
the standard deviation of the groups is 25 points instead of 10.

{% highlight R %}
n <- 8000
mu_a <- 80
mu_b <- 80.5
s <- 25

cohen_d <- abs(mu_a - mu_b)/s
effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)

print(cohen_d)
[1] 0.02
print(effect_detected_percent)
[1] 0.23
{% endhighlight %}

As a result the effect is only 0.02, but the null hypothesis is rejected in
approximately 22% of the experiments. This means 22% of the time we would find a
significant result that would cause us to reject the null hypothesis, but knowing
the data a priori, we know that the effect is neglibable and there is most likely
no real difference between the two groups.

If we use the same means and standard deviation and adjust to a smaller sample size,
80, we see the null hypothesis is only rejected 5% of the time.

{% highlight R %}
n <- 80
mu_a <- 80
mu_b <- 80.5
s <- 25

cohen_d <- abs(mu_a - mu_b)/s
effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)

print(cohen_d)
print(effect_detected_percent)

{% endhighlight %}

Effect size stuff

To calculate the power for a given sample size, I need to know the size of the
effect that I want to be able to detect. Note that this would also be the case if
I wanted to calculate the appropriate sample size for a given power value.

There a few different methods for calculating the effect size which can be found
in the following resources:

* [Dr. Becker of CSSS](http://www.uccs.edu/lbecker/effect-size.html)
* [Some Practical Guidelines for Effective Sample Size Determination by Russell V. Length](http://pegasus.cc.ucf.edu/~lni/sta5175/Lenth2001.pdf)


You may notice that the methods to calculate effect size are based on a
statistic (or parameter? (check this)) which we may not know prior to calculating
the sample size for our experiment.

In addition there are also general guidelines for effect sizes cited by
[Cohen](http://www2.psych.ubc.ca/~schaller/528Readings/Cohen1992.pdf).  


# References and Further Reading
* [The Power of “P”: On Overpowered Clinical Trials and “Positive” Results by Howard S. Hochster, MD](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2630828/pdf/gcr2_2p0108.pdf)


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
