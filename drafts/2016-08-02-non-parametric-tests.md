---
layout: post
author: Chris_Tufts
share:  true
title: "What's the difference?"
modified:
categories: blog r python
excerpt: ""
tags: [non-parameteric, feature selection ]
link:
image:
date: 2016-08-02 ##T19:39:55-04:00

---

# Background
In some cases you need to identify is two different datasets have a significant difference.....
## Example: Two Groups of Data.......????
## Example: Regression Analysis
I am performing a regression analysis.  I have a training dataset named *train* and a test dataset named *test* with multiple continuous outputs.  I find that when performing cross validation on the training set I get a low MSE and a high R2 value (yea!). Now that I have some faith this model could work I train a model using all my training data and then predict on the features from the test set.  When I check the R2 I find that it is negative and the MSE is much higher.  So what could be my issue?   

# Are these two things different????

It seems like a simple question. Is A different from B? And it often is one of the first things people learn about in statistics, but I often find myself confused when it comes to application of statistical methods I read in books.  Lots of tests in statistics are formed on the assumption of normality, ie your data needs to be normally distributed.  You can check for normality using .... and if you find your data is normally distributed use any of the following tests...

The other option, which is the focus of this post, is to use non-parametric tests which will work for both normal and non-normal distributions.  



# [Kolmogorov-Smirnov test](http://www.mit.edu/~6.s085/notes/lecture5.pdf)

# [Wilcoxon’s signed-rank test](http://www.mit.edu/~6.s085/notes/lecture5.pdf)

# [Mann-Whitney U Test](http://www.mit.edu/~6.s085/notes/lecture5.pdf)

# [Permutation Tests](http://faculty.washington.edu/kenrice/sisg/SISG-08-06.pdf)


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
