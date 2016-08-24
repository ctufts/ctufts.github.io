---
layout: post
author: Chris_Tufts
share:  true
title: "What's the difference? : An Overview of Non-Parametric Tests"
modified:
categories: blog r
excerpt: ""
tags: [non-parametric, feature selection, broom]
link:
image:
date: 2016-08-23 ##T19:39:55-04:00

---
# Are my datasets different?
I ran into the following problem:

I am performing a regression analysis.  I have a training dataset named <i>train</i> and a test dataset named <i>test</i> with a single dependent variable (my output).  I find that when performing cross validation on the training set I get a low MSE and a high R2 value (yea!). Now that I have some faith this model could work, I train a model using all my training data and then predict on the features from the test set.  When I check the R2 I find that it is negative and the MSE is much higher.  So what could be my issue?   

In my case I am using data that was collected at different times, i.e. <i>train</i> was collected a year before <i>test</i>. Is it possible some of the features in the dataset have different distribution? I can use the following tests to find out.

The tests and methods I'll cover in this post can be used for a number of different purposes outside of the example I provided.

# Purpose
The purpose of this post is to provide examples of non-parametric tests and methods along with brief (generalized) descriptions of what each test does.  If you are looking for advice on which test to choose for your application, that is beyond the scope of this post. However I would point you to the links below as a great starting point:

[How to choose between t-test or non-parametric test](http://stats.stackexchange.com/questions/121852/how-to-choose-between-t-test-or-non-parametric-test-e-g-wilcoxon-in-small-sampl)

[When to Use Non-Parametric Tests](http://sphweb.bumc.bu.edu/otlt/MPH-Modules/BS/BS704_Nonparametric/BS704_Nonparametric_print.html)

# Example 1 : Single Feature Comparison

For this example I will only be focusing on 1 feature with two labels <i>a</i> and <i>b</i>. To clarify <i>a</i> is one of my features from the <i>train</i> dataset and <i>b</i> is the same feature from the <i>test</i> dataset.

{% highlight R %}
# number of samples
n = 1000
# plot distributions
a <- rnorm(n = n, mean = 100, sd = 13)
b <- rnorm(n = n, mean = 98, sd = 11)
{% endhighlight %}


### Probability Density of <i>a</i> and <i>b<i/>

<img src='/images/non-parametric-methods/density_1feat.svg'>

### Empirical CDF of <i>a</i> and <i>b</i>

<img src='/images/non-parametric-methods/cdf_1feat.svg'>

[comment]: <> #######################################



## [Kolmogorov-Smirnov (KS) test](http://www.mit.edu/~6.s085/notes/lecture5.pdf)
The KS test compares cumulative distribution functions (CDF) of two sample sets.   The KS test calculates a [D statistic](http://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/ks2samp.htm) value which indicates the maximum discrepancy between the two CDF's.

### Things to know about KS:

* Null HYPOTHESIS: The two distributions are the same
* p-value can be used to determine rejection of null hypothesis (i.e. p< 0.05 reject null)
* D close to 1 indicates the two samples are from different distributions
* D closer to 0 indicates the two samples are from the same distribution

In the case of our example dataset we can see the KS test returns a p-value < 0.05, so we would
reject the null hypothesis. However we can also see that the D statistic is only 0.1, so although the
distributions are different, this lets us know they are not so far apart.
{% highlight R %}
> ks.test(a, b)

	Two-sample Kolmogorov-Smirnov test

data:  a and b
D = 0.109, p-value = 1.384e-05
alternative hypothesis: two-sided
{% endhighlight %}


# Median Comparison
The next set of tests, the Wilcoxon signed-rank test and the Mann-Whitney U test, examine a difference in the
median value between the two distibutions. The Wilcoxon signed-rank test is used for [paired data](http://www.sjsu.edu/faculty/gerstman/StatPrimer/paired.pdf), while the
Mann-Whitney U test is used for unpaired data.

Given the example I cited at the beginning of the post one would assume the data is not paired, but I will
go through how to test paired samples anyway. In R, both the Wilcoxon and Mann-Whitney tests
are carried out using the <i>wilcox.test</i> function. To implement the Wilcoxon test
the <i>paired</i> argument should be set to TRUE, to implement the Mann-Whitney test <i>paired</i>
is set to FALSE.

### Things to know about [Wilcoxon Signed-Rank Test](http://www.mit.edu/~6.s085/notes/lecture5.pdf):

* For use with matched/paired data.
* Null Hypothesis: The median difference between the pairs is zero.
* W: Test Statistic
  * Non-zero median differences will cause this value to be very large (negative or positive)
  * Small values when median difference is zero/close to zero.
* p-value: significance value used to determine if null hypothesis should be rejected (i.e. p <0.05 -> reject)

{% highlight R %}
> wilcox.test(a, b, paired = TRUE)

	Wilcoxon signed rank test with continuity correction

data:  a and b
V = 276960, p-value = 0.00346
alternative hypothesis: true location shift is not equal to 0
{% endhighlight %}

The results of the Wilcoxon test are a p-value less than 0.05 and and a large statistic value. In this case we reject the null
hypothesis that the difference between the medians is zero. (Note: R lists the W statistic I mentioned before as V.)

### Things to know about the [Mann-Whitney U Test:](http://www.mit.edu/~6.s085/notes/lecture5.pdf)

* For use with unmatched/unpaired data
* Null Hypothesis: [The distributions are identical.](https://statistics.laerd.com/premium-sample/mwut/mann-whitney-test-in-spss-2.php)
* U statistic:
	* If U is close to 1, the medians are very different
	* If the medians are similar U will be close to n1*n2/2.
		* where n1 is the number of samples in distribution 1 and n2 is the number of samples in distribution 2.
* p-value : significance value used to determine if null hypothesis should be rejected (i.e. p <0.05 -> reject)

{% highlight R %}
> wilcox.test(a,b, paired = FALSE)

	Wilcoxon rank sum test with continuity correction

data:  a and b
W = 537370, p-value = 0.003801
alternative hypothesis: true location shift is not equal to 0
{% endhighlight %}

We can see in this case the p-value is less than 0.05, so we reject the null hypothesis.  However if we look at the value of the
U-statistic we can see it is reasonably close to 5e5 (n1*n2/2). From this we can gather, the null hypothesis should be rejected, but the medians are not all that far from one another.

# [Permutation Tests](http://faculty.washington.edu/kenrice/sisg/SISG-08-06.pdf)

Permutation tests are a method that can be used to estimate any statistic which you
specify such as difference in means, difference in medians, difference in CDF's etc.

### Things to know about permutation tests:

* Permutation tests can be used with any desired statistic.
* The way it works:
	* For N repetitions:
		* Shuffle labels of the datasets randomly.
			* Example [a,a,a,b,b,b] corresponding to values [1,2,3,4,5,6]
				* After shuffle: labels [a,b,b,a,a,b] , values stay the same [1,2,3,4,5,6]
		* Calculate statistic of the shuffled set:
			* Example using the difference between the means (similar to a t-test) and the shuffle above:
				* mean of a = [ 1,4,5] = 3.33
				* mean of b = [2,3,6]  = 3.67
				* difference between the means = 0.34
		* Store value
	* Calculate the sample means for the two original datasets (with their original labels)
	* Compare the N mean differences from the shuffles with the difference between the
		sample mean difference
	* mean(abs(N_mean_differences) > abs(sample_mean_a - sample_mean_b)) = p-value approximation


{% highlight R %}
mean_diff <- function(x, n, m){
  aindex <- sample.int(n+m, n)
  a <- x[aindex]
  b <- x[-aindex]
  w <- mean(a)-mean(b)
}

perm_test_mean <- function(test_set, label){
  aindex <- label == unique(label)[1]
  bindex <- !aindex
  n <- sum(aindex)
  m <- sum(bindex)

  w <- replicate(10000, mean_diff(test_set, n,m))

  a <- test_set[aindex]
  b <- test_set[bindex]

  wstar <- mean(a) - mean(b)
  mean(abs(w) > abs(wstar))
}

# create dataframe with labels and data values
ds <- data.frame(data = c(a,b), label = c(rep('a',n), rep('b',n)))

> perm_test_mean(ds$data,ds$label)
[1] 0.0021
{% endhighlight %}

The functions in the above snippet perform the example I outlined previously. It looks at the
difference between the means each time the data is shuffled. To make things a bit more compact I
first create a dataframe, <i>ds</i>, which contains the name of the original distribution and the values
from the original distribution.

We can see from the results that the estimated p-value for the permutation test is less than
0.05 indicating that the null hypothesis should be rejected. In the case of this test my null
hypothesis was the same as a [t-test : the means of the two distributions are equal.](http://www.itl.nist.gov/div898/handbook/eda/section3/eda353.htm)

<img src='/images/non-parametric-methods/perm_test_1feat.svg'>

The plot above shows the resulting distribution of the difference in means
from each permutation. The difference between the true sample means is shown by
the dashed red line. We can see that the distribution doesn't overlap the
difference between the sample means further reinforcing the rejection of
the null hypothesis.




# Example 2: Multiple Feature Testing with Broom
The above example is great if we only have one feature we want to check, but what if I'm trying to determine which features have the same distribution in both datasets and which features have different distributions? We can do the same thing, but then we have a bunch of test model output objects (lists) that are messy. That is where the [<i>broom</i>](https://cran.r-project.org/web/packages/broom/vignettes/broom.html) package comes into play.  It takes the outputs of all our tests and puts them in a dataframe.

First I'll create a dataframe which has two features one with a gamma distribution  and one with a normal distribution. The parameters of the distributions vary depending on the label <i>a</i> or <i>b</i> in the gamma distribution feature.

{% highlight R %}
# dataset with multiple features (using broom to gather results) #####
n = 1000
feature1_a <- rnorm(n = n, mean = 0, sd = 10)
feature1_b <- rnorm(n = n, mean = 0, sd = 10)
feature2_a <- rgamma(n = n, shape = 1, rate = 2)
feature2_b <- rgamma(n = n, shape = 5, rate = 1)

ds <- data.frame(feature1 = c(feature1_a, feature1_b),
                 feature2 = c(feature2_a, feature2_b),
                 label = c(rep('a', n), rep('b', n)))

{% endhighlight %}

Below are the contents of the dataframe.  Each row is an observation and each column is a variable; the first two columns are independent variables (features) and the last column is the label of the dataset they reside in (<i>a</i> is from the <i>train</i> dataset, <i>b</i> is from the <i>test</i> dataset). I didn't create a dependent variable in this case as we are only concerned with checking if a given feature has a different distribution based on which dataset it came from.

{% highlight R %}
> head(ds)
     feature1   feature2 label
1   0.1874617 0.15300090     a
2  -1.8425254 1.77396038     a
3 -13.7133055 0.07850998     a
4  -5.9916772 0.24030272     a
5   2.9454513 1.75804063     a
6   3.8979430 0.21628637     a

{% endhighlight %}

To perform my test I want to reshape my data a bit.
{% highlight R %}
ds <- ds %>% gather(feature_name, feature_value, -label)

> head(ds)
  label feature_name feature_value
1     a     feature1     0.1874617
2     a     feature1    -1.8425254
3     a     feature1   -13.7133055
4     a     feature1    -5.9916772
5     a     feature1     2.9454513
6     a     feature1     3.8979430

{% endhighlight %}

In the above snippet I used the <i>tidyr</i> package to gather the feature columns so that I now have a <i>feature_name</i> column and a <i>feature_value</i> column. This structure will allow me to run my remaining analysis with <i>broom</i>.

# Shapiro-Wilk
The first test I'm going to run here is the [Shapiro-Wilk](https://en.wikipedia.org/wiki/Shapiro%E2%80%93Wilk_test) test for
normality.  The Shapiro-Wilk test is one of the available options for testing normality along with the KS test (using a normal distribution for comparison) and the Anderson Darling test.

### Things to know about the Shapiro-Wilk test:

* Null Hypothesis: The data is normally distributed.
* W statistic:
	* [Similar to a correlation between the sample data and the ideal score from a normal distribution](http://geography.unt.edu/~wolverton/Normality%20Tests%20in%20SPSS.pdf)
	* Values between 0 and 1
		* Value closer to 1 would suggest a good fit to normality (sample matches the scores of
			a normal distribution)
		* [Value closer to 0 would suggest non-normality](https://math.mit.edu/~rmd/465/shapiro.pdf)
* p-value : significance value used to determine if null hypothesis should be rejected (i.e. p < 0.05 -> reject)
* [q-q plot](http://onlinestatbook.com/2/advanced_graphs/q-q_plots.html) should also be used to plot sample values against normally distributed values.
	* Quantiles from the sample data should run along the diagnonal of the plot (think x = y).  The plot can be used to help support or dispute the	rejection of the null hypothesis.


{% highlight R %}
shapiro_wilk_ds <- ds %>% group_by(feature_name, label) %>%
  do(tidy(shapiro.test(.$feature_value)))

> shapiro_wilk_ds
Source: local data frame [4 x 5]
Groups: feature_name, label [4]

  feature_name  label statistic      p.value                      method
         <chr> <fctr>     <dbl>        <dbl>                      <fctr>
1     feature1      a 0.9979280 2.537700e-01 Shapiro-Wilk normality test
2     feature1      b 0.9978733 2.335823e-01 Shapiro-Wilk normality test
3     feature2      a 0.8081384 7.840952e-33 Shapiro-Wilk normality test
4     feature2      b 0.9546945 5.111850e-17 Shapiro-Wilk normality test

{% endhighlight %}

From the above test results we can gather that the null hypothesis should only be rejected for feature 2 (both <i>a</i> and <i>b</i> samples).  However lets assume each feature comes from a single distribution (a and b are the same - which we already know is not true for feature 2) . We can plot the q-q plot for each feature and do a follow up Shapiro Wilk test on the each feature as a whole (a and b combined).  

#### Q-Q Plot of Feature 1 (<i>a</i> and <i>b</i>)
<img src='/images/non-parametric-methods/qqplot_feature1.svg'>
{% highlight R %}
shapiro.test(ds$feature_value[ds$feature_name=='feature1'])

	Shapiro-Wilk normality test

data:  ds$feature_value[ds$feature_name == "feature1"]
W = 0.99859, p-value = 0.09443
{% endhighlight %}
In the q-q plot above the sample data runs along the diagonal (the points are from the sample data and
the line is from a normal distribution).  This goes along with the result from the Shapiro-Wilk test which
has a p-value > 0.05 for both breakdowns of feature 1 which indicate that the null hypothesis (NH: the distribution being
	tested has a normal distribution) should not be rejected.

#### Q-Q Plot of Feature 2 (<i>a</i> and <i>b</i>)
<img src='/images/non-parametric-methods/qqplot_feature2.svg'>
{% highlight R %}
> shapiro.test(ds$feature_value[ds$feature_name=='feature2'])

	Shapiro-Wilk normality test

data:  ds$feature_value[ds$feature_name == "feature2"]
W = 0.86611, p-value < 2.2e-16
{% endhighlight %}
The q-q plot and Shapiro-Wilk test for feature 2 shows a much different result. The test has a very small p-value indicating the null hypothesis should be rejected. The q-q plot confirms this result as we can see the sample data does not overlay the solid line representing a normal distribution.

The above results confirm what we already know, but I wanted to make sure I run through at least one test for normality prior to
moving on with the non-parametric tests.

[comment]: <> ######################## KS - MULTI FEATURE ####################################

The following snippets run through KS, Mann-Whitney, and a permutation test which checks the difference between the median values between the distributions. Each test is implemented using the broom package along with dplyr so that I can group by feature and compare the distributions of the <i>a</i> and <i>b</i> labeled data.

# KS
{% highlight R %}
ks_ds <- ds %>% group_by(feature_name) %>%
  do(tidy(
    ks.test(.$feature_value[.$label=='a'],
            .$feature_value[.$label=='b'])))

> ks_ds
Source: local data frame [2 x 5]
Groups: feature_name [2]

  feature_name statistic   p.value                             method alternative
         <chr>     <dbl>     <dbl>                             <fctr>      <fctr>
1     feature1     0.033 0.6475573 Two-sample Kolmogorov-Smirnov test   two-sided
2     feature2     0.942 0.0000000 Two-sample Kolmogorov-Smirnov test   two-sided

{% endhighlight %}

### Result of KS Test:
Null HYPOTHESIS: The two distributions are the same

* feature 1 : Do not reject the null hypothesis
* feature 2 : Reject null hypothesis


[comment]: <> ######################## WILCOX - MULTI FEATURE####################################



# Mann-Whitney U Test
{% highlight R %}
wilcox_ds <- ds %>% group_by(feature_name) %>%
  do(tidy(
    wilcox.test(feature_value~label,
                data=., paired=FALSE)))

> wilcox_ds <- ds %>% group_by(feature_name) %>%
+   do(tidy(
+     wilcox.test(feature_value~label,
+                 data=., paired=FALSE)))
> wilcox_ds
Source: local data frame [2 x 5]
Groups: feature_name [2]

  feature_name statistic   p.value                                            method alternative
         <chr>     <dbl>     <dbl>                                            <fctr>      <fctr>
1     feature1    495710 0.7397532 Wilcoxon rank sum test with continuity correction   two.sided
2     feature2      4597 0.0000000 Wilcoxon rank sum test with continuity correction   two.sided
{% endhighlight %}

### Result of Mann-Whitney U Test:
Null Hypothesis: The distributions are identical.

* feature 1 : Do not reject null hypothesis
* feature 2 : Reject null hypothesis

[comment]: <> ########################PERM TEST - MEDIAN ####################################

# Perm test
{% highlight R %}
median_diff <- function(x, n, m){
  aindex <- sample.int(n+m, n)
  a <- x[aindex]
  b <- x[-aindex]
  w <- median(a)-median(b)
}

perm_test_median <- function(test_set, label){
  aindex <- label == unique(label)[1]
  bindex <- !aindex
  n <- sum(aindex)
  m <- sum(bindex)

  w <- replicate(4000, median_diff(test_set, n,m))

  a <- test_set[aindex]
  b <- test_set[bindex]

  wstar <- median(a) - median(b)
  mean(abs(w) > abs(wstar))
}

w_stats <- ds %>% group_by(feature_name) %>%
  summarise(
    wdiff = perm_test_median(feature_value,label)
  ) %>% arrange(wdiff)

> w_stats
# A tibble: 2 x 2
  feature_name   wdiff
         <chr>   <dbl>
1     feature2 0.00000
2     feature1 0.87575
{% endhighlight %}

### Result of Median Difference Permutation Test:
Null Hypothesis: The median difference between the distributions is zero.

* feature 1 : Do not reject null hypothesis
* feature 2 : Reject null hypothesis


# Conclusion for Example 2

Test outcomes:
<style>
	table{
	    border-collapse: collapse;
	    border-spacing: 0;
	    border:2px solid #000000;
	}

	th{
	    border:2px solid #000000;
	}

	td{
	    border:2px solid #000000;
	}
</style>

| Feature | Shapiro-Wilk   | KS            |  Mann-Whitney | Permutation Test |
|---------|----------------|---------------|---------------|------------------|
|Feature 1| Do Not Reject  | Do Not Reject | Do Not Reject | Do Not Reject    |
|Feature 2| Reject         | Reject				 | Reject        | Reject           |


The table above contains the results from the tests performed on the sample data. In this case all our tests reinforce what we already know about the dataset.  However this is not to say all the tests will always agree, but using the broom package it is simple enough to run through several test and compare results.

# References

* [MIT Notes](https://stuff.mit.edu/~6.s085/)
* [JHU Notes](http://ocw.jhsph.edu/courses/methodsinbiostatisticsii/PDFs/lecture26.pdf)
* [Permutation Test - UW](http://faculty.washington.edu/kenrice/sisg/SISG-08-06.pdf)

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
