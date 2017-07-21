---
layout: post
author: Chris_Tufts
share:  true
title: "Confidence Intervals"
modified:
categories: blog r
excerpt: ""
tags: [rstats]
link:
image:
date: 2017-07-13 ##T19:39:55-04:00

---

# What are Confidence Intervals?

I don't find the concept of confidence intervals to be very straightforward
and I'll admit it took me a while to get my head wrapped around them. To
try and explain them, let's look at the following process.

1. Sample a population.
2. Calculate your statistic from the sample. For sake of simplicity we can just
go with the sample mean.
3. Calculate confidence interval around sample. I realize I still haven't explained
what it is, but bear with me. For now just know it is a range of values.  
4. Is the population parameter (assuming it is known) inside the confidence interval?
5. Repeat a large number of times (let's call that N for now).

Once this experiment is done sum up the number of samples where the parameter
fell inside the interval (step 4) and divide by the total number of repetitions (N).
This provides you with your confidence coefficient. So what does that actually mean?
When someone says 95% confidence interval - the 95% is the confidence coefficient.
It means the following:

* If I take a sample from a population and calculate the statistic and confidence interval around the statistic, there is a 95% chance that interval contains the population
parameter.

[So the calculation of the statistic and the confidence interval answer the following
questions:](http://medblog.stanford.edu/lane-faq/archives/PValuesAugust2007.pdf)

* What is the estimated value of the population parameter? (i.e. the statistic)
* How precisely did this sample estimate the parameter? (confidence intervals surrounding
    the statistic)

The first question is pretty straightforward, but the second could use a bit of
explanation.  Let's start with [how a confidence interval is calculated.](http://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm)

<span>$$ \bar{x} \pm t_{95} * se $$ </span>

* $$\bar{x}$$ - sample mean
* $$t_{95}$$ - t-value at a given &alpha; value
* $$se$$ - standard error

The &alpha; value is our critical value which is a value of 0.05 for a 95%
confidence interval. We need to calculate the t-value at &alpha;/2 and multiply
it times the standard error:

<span>$$se_{\bar{x}} = {s \over{\sqrt{n}}}$$</span>


{% highlight R %}
##### T-test - calculate confidence intervals ####

# Create population
N <- 10000
mu <- 12
population <- rnorm(N, mean = mu, sd = 3)


# Sample and calculate 95% confidence interval
n <- 1000
sample_a <- sample(population, n)
df <- n-1
sample_a_sd   <- sd(sample_a)
sample_a_mean <- mean(sample_a)
se <- sample_a_sd/sqrt(n)
t <- (sample_a_mean - mu)/se

# critical t-level for p=0.05 in two tail test
t_95 <- abs(qt(0.05/2, df))
ci <- c(sample_a_mean - t_95*se, sample_a_mean + t_95*se)

> cat('t-value: ', abs(t), ', critical value: ', t_95, 'CI: [', ci[1],',',ci[2],']')
t-value:  0.001293056 , critical value:  1.962341 CI: [ 11.81147 , 12.18878 ]
{% endhighlight %}

The t-value is not larger than the critical value, i.e. null hypothesis is
not rejected. We can think of this as there is a lack of evidence to suggest
the sample statistic is different from the population parameter.

{% highlight R %}
> t.test(sample_a, mu=mu)

One Sample t-test

data:  sample_a
t = 0.0012931, df = 999, p-value = 0.999
alternative hypothesis: true mean is not equal to 12
95 percent confidence interval:
11.81147 12.18878
sample estimates:
mean of x
12.00012
{% endhighlight %}

In my initial explanation of CI's I said if we repeated the sampling over and over
again, in 95% of CI's we calculate, the population mean (parameter) would be present. So let's try this out.

{% highlight R %}
#### testing the assumption of confidence ####
get_ci <- function(n, population, mu){
  t.test(sample(population, n), mu = mu)$conf.int
}

results <- t(replicate(100, get_ci(100,population, mu)))
mean(results[,1] < mu & results[,2] > mu)
> mean(results[,1] < mu & results[,2] > mu)
[1] 0.95
{% endhighlight %}

<img src='/images/CI/100_trials.svg'>

We see the results in the image above. Only 5 of the trials have CI's where
the population parameter (mean) was not within the bounds. Note: If I were to
do this trial of 100 samples over again, I may get a different number of trials
outside the bounds, but on average should only be 5% of samples.


## Bootstrap Estimation of Confidence Intervals
In addition to the traditional methods of calculating confidence intervals, we
can do the same using [bootstrapping](http://www.mit.edu/~6.s085/notes/lecture5.pdf).
[Bootstrap estimation of CI is accomplished by:](https://ocw.mit.edu/courses/mathematics/18-05-introduction-to-probability-and-statistics-spring-2014/readings/MIT18_05S14_Reading24.pdf)

1. Take a sample of the data of size <i>n</i>.
2. Calculate the statistic (in this case the mean).
3. Using the sample from step 1, you sample <i>n</i> samples with <i>replacement</i>.
4. Calculate the mean of the new sample and calculate the difference between
the new sample's mean and the mean calculated in step 2.
5. Repeat steps 3 and 4 many times (get a value for this).
6. For all the mean differences calculated in steps 4 and 5, calculate the
quantiles for the upper and lower tail. For example, if you want to know the
95% confidence intervals, calculate the 97.5% and 2.5% quantiles (in the case of a two tail test).
7. Subtract the quantiles from the mean calculated in step 2. These are the confidence intervals.



{% highlight R %}
n <- 1000
set.seed(13)
sample_n <- sample(population, n)
xhat <- mean(sample_n)
n_experiments <- 10000
xhat_est <- replicate(n_experiments, mean(sample(sample_n, n, replace = T)))

mean_diff <- xhat_est - xhat
CI_bounds <- quantile(mean_diff, c(0.975, 0.025))
CI_bootstrap <- xhat - CI_bounds
CI_bootstrap
> CI_bootstrap
   97.5%     2.5%
11.73839 12.11573
> diff(CI_bootstrap)
     2.5%
0.3773411
> diff(ci)
[1] 0.3773023
{% endhighlight %}


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
