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
  feature: power_analysis/power_feature_image.svg
date: 2017-07-11 ##T19:39:55-04:00

---

# What is Statistical Power?

Let's start by going over type I and type II error which occurs in hypothesis
testing. To aid in this review I'll use an example of comparing two samples. I
have one sample of students which did not study for a test and another sample of students
 (from the same population) that took the same test and studied for 2 hours.

* <b>Null hypothesis (H<sub>o</sub>)</b>: The mean score of each sample is the same. Said differently,
there is no difference in the means between the two samples (i.e. there is no
	effect present)
* <b>Alternative hypothesis (H<sub>a</sub>)</b>: The mean score for the students who studied will be different than the sample of students that did not study. This is representative
of a hypothesis with [two tails](https://en.wikipedia.org/wiki/One-_and_two-tailed_tests), if we were only looking for a positive effect (scores
    go up for the study group) it would be a one tail test.

The possible errors that may occur are:

* Type I (&alpha;)- Often referred to as a false positive. Basically this is when you
observe an effect that isn't actually present (Rejecting the null hypothesis
	when it is actually true).
	* In this example that would mean our results indicate the group that
		studied had a higher (or lower) score on average than students that didn't. Only problem is that we would be wrong.



* Type II (&beta;)- False Negative. This is what happens when we don't detect a difference (effect) that is actually present.
	* This would mean we fail to reject the null hypothesis (i.e. we believe both
		groups are the same based on our data), but we are wrong and the study group
		actually did score higher (or lower) on average.


I'm going to focus on type II error for the moment, as this is the one most
associated with power. The statistical power is a measure of our ability to
detect an effect, if one is present, and it is defined as 1-&beta;.



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
Let's address question 1 first. In order to understand what power really is we need to understand effect size. Effect size is a standardized measure of an effect. Is a change of 10 points on the test when the standard deviation is 2 points
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

* [CSSS - Effect Size by Dr. Lee Becker](http://www.uccs.edu/lbecker/effect-size.html)
* [Some Practical Guidelines for Effective Sample Size Determination by Russell V. Length](http://pegasus.cc.ucf.edu/~lni/sta5175/Lenth2001.pdf)

## What Is the Acceptable Amount of Type I Error?
Let's get back to question 2 - "At what point do we reject the null hypothesis?".
This question is basically asking "What level of type I error are we comfortable
with?". I won't go into much detail on this as the generally consensus is an p-value
below an &alpha; of 0.05. This translates to "If the probability
of the effect seen is due to chance (sampling error) is less than 5%, reject
the null hypothesis."

For further reading on the pitfalls/shortcomings of p-values checkout:

* [Null Hypothesis Significance Testing: A Review of an Old and Continuing Controversy](https://www.researchgate.net/publication/12384017_Null_Hypothesis_Significance_Testing_A_Review_of_an_Old_and_Continuing_Controversy?enrichId=rgreq-e7be0c4f538cd263a7ad406bdc1e50ac-XXX&enrichSource=Y292ZXJQYWdlOzEyMzg0MDE3O0FTOjIwODM5ODY5NzE0NDMyMEAxNDI2Njk3NTMwMDk3&el=1_x_2&_esc=publicationCoverPdf)
* [Null Hypothesis Testing: Problems, Prevalence, and an Alternative](http://www.jstor.org/stable/3803199)


### A Slight Detour
Now that we have talked about what effect size is and the generally excepted
Type I error, let's go through some visual examples.
The plots below show the regions of overlap between the null hypothesis (H<sub>o</sub>)
and the alternative hypothesis (H<sub>a</sub>).  In this example the alternative
hypothesis is defined as an effect of 0.1 which can be seen by the mean value of it's
distribution.

<img src='/images/power_analysis/Type_I_distributions.svg'>
The grey area in the plot above is the area where type I error can occur.
There is overlap between the tail of the null hypothesis and the alternative
hypothesis.
<img src='/images/power_analysis/Type_II_distributions.svg'>
The grey area in this plot is the area of the alternative hypothesis that cannot
be detected due to overlap with the null hypothesis. In other words we would fail
to reject the null hypothesis (i.e. detect  a real effect) in this
region.
<img src='/images/power_analysis/Power_distributions.svg'>
The grey area in this plot shows the region we are capable of detecting an effect
and rejecting the null hypothesis, i.e. the power.


## Selecting the Sample Size for an Experiment
Now on to question 3. Sample size should be determined prior to starting an
experiment. To select the proper sample size we use power analysis. [A power
value of 0.80](http://www2.psych.ubc.ca/~schaller/528Readings/Cohen1992.pdf) (Type II error of 0.2) is considered the required minimum power
value when performing an experiment.



First let's take a look at the relation ship between sample size and power? Below you will
see the distributions of the null and alternative hypotheses based on an
&alpha; of 0.05 and an effect size of 0.1 with varying sample sizes.

In the previous visualizations I mentioned the distributions have means of zero (null)
and 0.1 (alternative), but you may be wondering what the standard deviation for
the distributions is. The standard deviation is the standard error:

<span>$$SE_{\bar{x}} = {s \over{\sqrt{n}}}$$</span>

The standard error is driven down as the sample size goes up as can be seen in
the examples below. You can see the distributions become narrower and separate
making a clearer decision boundary with less overlap. This has the effect of
increasing our ability to detect an effect if present - in other words our
power increases.

<figure>
    <img src='/images/power_analysis/Power_0_11.svg'>
    <figcaption>N=100</figcaption>
</figure>


<figure>
    <img src='/images/power_analysis/power_0_61.svg'>
    <figcaption>N=1000</figcaption>
</figure>
<figure>
    <img src='/images/power_analysis/power_0_89.svg'>
    <figcaption>N=2000</figcaption>
</figure>



### Example: What Sample Size Do I Need?

First step is to identify the sample size necessary to meet our requirements:

* Detects an effect size of 0.5
* Power = 0.80
* &alpha; = 0.05
* two-sided t-test

To estimate sample size I've used the [<i>pwr</i>](https://cran.r-project.org/web/packages/pwr/vignettes/pwr-vignette.html) package in R.

{% highlight R %}
library(ggplot2)
library(pwr)

t_test_pwr <- pwr.t.test(d = 0.5,
                         power = 0.80, sig.level = 0.05,
                         alternative = 'two.sided')
print(t_test_pwr)
{% endhighlight %}

{% highlight R %}
Two-sample t test power calculation

         n = 63.76561
         d = 0.5
 sig.level = 0.05
     power = 0.8
alternative = two.sided

NOTE: n is number in *each* group
{% endhighlight %}

We can also plot the power vs. the sample size.
{% highlight R %}
plot(t_test_pwr)
{% endhighlight %}

<img src='/images/power_analysis/medium_effect_pwr.svg'>



I wrote a small function to create random samples of an experiment.

{% highlight R %}
perform_t_test <- function(n,mu_a, mu_b, s){
  group_a <- rnorm(n, mean = mu_a, sd = s)
  group_b <- rnorm(n, mean = mu_b, sd = s)
  t.test(group_a, group_b)$p.value
}
{% endhighlight %}

So now that we know the minimum sample size to meet our requirements, let's
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
size.  We find the null hypothesis is rejected in 88.5% of the experiments.

{% highlight R %}
n <- 80
effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)
print(effect_detected_percent)
[1] 0.885
{% endhighlight %}


What can happen if I perform an experiment that is overpowered? In the case
of a trial that uses animals or humans there are [ethical concerns](https://www.ma.utexas.edu/users/mks/statmistakes/UnderOverPower.html)
in addition to the added cost and waste of resources. In addition to these issues,
an overpowered experiment is more likely to detect extremely small effects as significant. Take the example below. Say my two groups have mean test scores of 80 and 80.5, but
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
 23% of the experiments. This means 23% of the time we would find a
significant result that would cause us to reject the null hypothesis, but knowing
the data a priori, we know that the effect is negligible and there is most likely
no real difference between the two groups.

If we use the same means and standard deviation and adjust to a smaller sample size,
80, we see the null hypothesis is only rejected 5.6% of the time.

{% highlight R %}
n <- 80
mu_a <- 80
mu_b <- 80.5
s <- 25

cohen_d <- abs(mu_a - mu_b)/s
effect_detected_percent <- mean(
  replicate(1000, perform_t_test(n, mu_a, mu_b, s)) < 0.05)

print(cohen_d)
[1] 0.02
print(effect_detected_percent)
[1] 0.056

{% endhighlight %}


If you are interested in further reading into overpowered studies checkout
[The Power of “P”: On Overpowered Clinical Trials and “Positive” Results by Howard S. Hochster, MD](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2630828/pdf/gcr2_2p0108.pdf)


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
