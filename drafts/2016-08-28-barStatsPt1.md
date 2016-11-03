---
layout: post
author: Chris_Tufts
share:  true
title: "Can I Sit at the Bar: Part 1"
modified:
categories: blog r
excerpt: ""
tags: [R, bayesian, STAN]
image:
  feature:
date: 2016-08-28 ##T15:39:55-04:00
---

# Can I Sit at the Bar?
This is the first in a series of posts to calculate the probability of a seemingly simple real world problem: Will the bar have an open stool when I walk in.  I often have trouble transferring examples from books to real life applications when it comes to statistics.  Basically I can solve any coin flip problem on the planet, but if you dress up the coin as an empty bar stool, somehow it becomes pandora's box.  The premise of this series is to start with a basic (naive) description of the issue, then in each iterative post I will build in other complexities.  The general layout of the posts will be as follows:

1. Is a single bar stool open? This is the naive starting point where I assume a single bar stool is completely independent of any other bar stools. This is basically the 'coin flip' starting point.
2. Probability of a specific bar stool being open while also taking into account the occupancy of the surrounding bar stools.  This will be a more realistic compound analysis, but will only take into account the probabilities of the surrounding stools being occupied.  
3. Probability of a specific bar stool being open, taking into account surrounding bar stool occupancies and rates of arrival/occupancy.  This will build off of post 2, but will add in a time component.

# Probability of a Specific Stool Open


## Frequentist



## Bayesian
[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
