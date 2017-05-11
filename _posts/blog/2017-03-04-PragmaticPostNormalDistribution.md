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
  feature: pragmatic_stats_normaldist/nd_mean0_sd1.svg
date: 2015-03-04 ##T15:39:55-04:00
---

# What is it?
The normal distribution, also known as a Gaussian distribution, is a continuous
probability distribution that describes a number of populations we see in
everyday life. It is known for it's bell shaped curve and has 3 primary properties <a href="#fn2" id="ref2">(Urdan, T. (2010))</a>:

1. Asymptotic: The tails of the distribution never go to zero, i.e. they never
touch the x-axis
2. Mean, Median, and Mode are all at the same place in the center of the
distribution.
3. Symmetric: The upper and lower tails are mirror images of one another.

![Normal Distribution](/images/pragmatic_stats_normaldist/normal_ex1.svg)

## What is a Probability Distribution?
A probability distribution
is a list of all possible outcomes and their corresponding probabilities. <a href="#fn1" id="ref1">(Kruschke, J. (2015))</a>

# What is it used for?
The normal distribution is used to model many events occurring in our world.
In statistics we can use our knowledge of the normal distribution to calculate
the probability of a random variable. For example, say I have a sample of adults and
I want to know the probability of a random sample having a height between 60 and 62 inches.
I can determine the probability using the normal distribution. This post will only
focus on the general properties and parameters of the distribution. In upcoming posts
I will go over the calculation of probability.
In addition to estimation of probability, the normal distribution
 is also used as an integral part of many
different statistical tests and machine learning applications.

It is extremely important to have an understanding of the normal distribution as you will often find that the 'assumption of normality' is being made by different methods. If this assumption is wrong you will need to change your course of action for the
problem you are solving.   

# Terminology

### Parameters:

<b><u>Mean</u></b><br/>
<b>Description:</b> The [mean](http://miningthedetails.com/blog/pragmaticstats/PragmaticPostMean/) is the
parameter that signifies the centrality of the distribution.<br/>
<b>Symbol:</b> &mu; - Symbol Name: Mu <br />

<b><u>Standard Deviation</u></b><br/>
<b>Description:</b> The [standard deviation](http://miningthedetails.com/blog/pragmaticstats/PragmaticPostStandardDeviation/) determines the spread of the data. Another way
to think about this is that the standard deviation determines how dense the probability
is surrounding the mean. High standard deviation ~ probability is spread out across
a wider range (less dense), low standard deviation ~ probability surrounding the mean is
more dense. <br/>
<b>Symbol:</b> &sigma; - Symbol Name: Sigma

Experiment with the interactive data visualization below to get a better sense of how the
parameters effect the shape of the distribution:

<div id='normalDistDiv'>
<div id='meanDiv'>
    <p id='meanValDisplay'></p>
    <input id="meanSlider" class="paramSlider" type="range" min="-3"  max="3" step="0.1" value="0"  data-orientation="vertical" >
  </div>
  <div id='sdDiv'>
    <p id='sdValDisplay'></p>
    <input id="sdSlider" class="paramSlider" type="range" min="1" max="3"  step="0.1"  value="1"  data-orientation="vertical" >
  </div>
</div>

### Standard Normal Distribution

You will often see references to the standard normal distribution. It is the normal
distribution with a mean of zero and a standard deviation of 1. When we want to
 calculate the probability of a random sample we will scale a
normal distribution ,using the standard normal distribution, then derive the probability.
This process is known as standardization and will be discussed in an upcoming post.

# When Should I Use This?

#### Use:
In upcoming post I will go into detail on how we can use the normal distribution.
For now, know that the normal distribution can be used to derive the probability
of a random variable when it is originating from a normal distribution. In addition,
it is used as an integral part in a variety of applications.

#### Don't Use:
If you are working with data from a sample that is non-normal.

# Assumptions, Prerequisites, and Pitfalls
If you are unsure of the distribution your data was drawn from do not automatically
assume it was from a normal distribution. If you assume normality incorrectly
any results you derive cannot be trusted. It is always best to [test for
normality](http://miningthedetails.com/blog/r/non-parametric-tests/) if you are unsure.

# Example - No Code
The 'no-code' example is an attempt to explain what probability density is. In
this example we will use an example that we assume has a normal distribution.<br/>
<i>How many ounces are actually in your pint glass when you order a beer?<i><br/>

![Empirical Density 1&2](/images/pragmatic_stats_normaldist/empirical_ex1_2.png)

We recorded the number of ounces in 167 pours and plotted it in the histogram below.

![Empirical Density 3&4](/images/pragmatic_stats_normaldist/empirical_ex3_4.png)

The probability density is the probability divided by the size of the bin. In
our case the bin size is 0.2 ounces.

![Empirical Density 5](/images/pragmatic_stats_normaldist/empirical_ex5.png)

You may have noticed a couple of things in the example above:

1. Probability density can have a value greater than 1. Remember it is the
density of probability in the bin, not a probability value.
2. We used bins with a width of 0.2 ounces to look at the density,
 but what would happen if I wanted
to estimate the probability of a single point? In a continuous distribution there
are infinite possible values and therefore the probability would approach zero. When
we want to identify a probability for a specific value we have to use an interval
(more on this in upcoming posts).

# Example - Code
For the following examples I'll work through some code examples of how the parameters,
&mu; and &sigma;, effect the shape of our distributions by plotting them in R and Python.

#### Python & Matplotlib

{% highlight python %}
import numpy as np
from scipy.stats import norm
import matplotlib.pyplot as plt

# plot density using different parameters
x = np.linspace(-15,15, 1000)
params = [[1,1], [1,3], [3,1], [3,3]]
for p in params:
    value = norm.pdf(x,loc = p[0], scale = p[1])
    plt.figure(figsize=(8,2), dpi=72)
    plt.title(r'$\mu$' + ' = ' + str(p[0]) + ', ' + r'$\sigma$' +
                ' = ' + str(p[1]))
    plt.plot(x,value)
    plt.subplots_adjust(top=0.8)
    plt.savefig('nd_mean'+str(p[0])+'_sd'+str(p[1])+'_py.svg', format='svg')
    # clear figure
    plt.clf()

{% endhighlight %}

![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean1_sd1_py.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean3_sd1_py.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean1_sd3_py.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean3_sd3_py.svg)




#### R & ggplot2
{% highlight R %}
library(ggplot2)

n <- seq(-15,15,0.01)
mean_param <-c(0, 3)
sd_param   <-c(1,3)
params <- expand.grid(mean_param, sd_param)
names(params) <- c('mean', 'std')
for(i in 1:nrow(params)){
  ds <- data.frame(value = n, probability = dnorm(n,params[i,1],params[i,2]))

  p <- ggplot(ds, aes(x = value, y = probability )) +
    geom_density(stat='identity',                                                               fill='#0B6C8C') +
    labs(title =bquote(mu == .(params[i,1]) ~~ sigma == .(params[i,2])),
         x='x', y='p(x)')
  print(p)
}
{% endhighlight %}
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean0_sd1.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean3_sd1.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean0_sd3.svg)
![Normal Distribution](/images/pragmatic_stats_normaldist/nd_mean3_sd3.svg)



# References

<sup id="fn1">Kruschke, J. (2015). Doing Bayesian data analysis : a tutorial with R, JAGS, and Stan. Boston: Academic Press.
  <a href="#ref1"></a>
</sup><br/>
<sup id="fn2">Urdan, T. (2010). Statistics in plain English. New York: Routledge.
  <a href="#ref2"></a>
</sup>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://cdn.jsdelivr.net/jstat/latest/jstat.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/rangeslider.js/2.3.0/rangeslider.min.js"></script>

<!-- <link rel="stylesheet" type="text/css" href="main.css"> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/rangeslider.js/2.3.0/rangeslider.css">
<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
<style>


.axis path,
.axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
}

.axis text {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
}

.text-label {
    font-size: 10px;
    font-family: 'Roboto Slab', serif;
}
.paramSlider{
  width:50%;
}
.dot {
    stroke: #293b47;
    fill: #7A99AC;
}

#meanValDisplay, #sdValDisplay {
font-family: 'Roboto Slab', serif;
}
</style>
<script>
var numDataPoints = 1000;
       var interval = 0.05
       var upper_bound = 10.0;
       var lower_bound = -10.0;
       var mean = 0;
       var std = 1;

       var margin = {top: 20, right: 10, bottom: 20, left: 40};

       var width = 600 - margin.left - margin.right,
           height = 400 - margin.top - margin.bottom;
       //create data points
       var sdLabel = "Standard Deviation: " + std;
       var meanLabel = "Mean: " + mean;
       document.getElementById("meanValDisplay").innerHTML = meanLabel;
       document.getElementById("sdValDisplay").innerHTML = sdLabel;

       var dataset = create_data(interval, upper_bound, lower_bound, mean, std);


       ////// Define Scales /////////////////
       var xScale = d3.scaleLinear()
           .domain([d3.min(dataset, function(d) {
               return d.x;
           }), d3.max(dataset, function(d) {
               return d.x;
           })])
           .range([0,width]);
       var yScale = d3.scaleLinear()
           .domain([
               d3.min(dataset, function(d) {
                   return (d.y);
               }),
               d3.max(dataset, function(d) {
                   return d.y;
               })
           ])
           .range([height,0]);


       /////// Define Axis //////////////////////////////
       var xAxis = d3.axisBottom()
           .scale(xScale);

       var yAxis = d3.axisLeft()
           .scale(yScale)
           .ticks(8);

       var svg = d3.select("#normalDistDiv").append("svg")
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       // append data points
       svg.append("g")
           .attr("id", "circles")
           .selectAll("circle")
           .data(dataset)
           .enter()
           .append("circle")
           .attr("class", "dot")
           .attr("cx", function(d) {
               return xScale(d.x);
           })
           .attr("cy", function(d) {
               return yScale(d.y);
           })
           .attr("r", 3.0);


       // append Axes ///////////////////////////
       svg.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(xAxis);

       svg.append("g")
           .attr("class", "y axis")
           .call(yAxis)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("x", -10)
           .attr("dy", "0.71em")
           .attr("fill", "#000")
           .text("Probability Density");;



       d3.selectAll(".paramSlider")
         .on("input", function(){

               var mean = d3.select('#meanSlider').property('value');
               var std = d3.select('#sdSlider').property('value');


               var sdLabel = "Standard Deviation: " + std;
               var meanLabel = "Mean: " + mean;
               document.getElementById("meanValDisplay").innerHTML = meanLabel;
               document.getElementById("sdValDisplay").innerHTML = sdLabel;

               // create new data
               // dataset = create_data(numDataPoints);
               var dataset = create_data(interval, upper_bound, lower_bound, mean, std);
               var dur = 50;

               //Update scale domains
               xScale.domain([d3.min(dataset, function(d) {
                       return d.x;
                   }),
                   d3.max(dataset, function(d) {
                       return d.x;
                   })
               ]);
               yScale.domain([
                   d3.min(dataset, function(d) {
                       return d.y;
                   }),
                   d3.max(dataset, function(d) {
                       return d.y;
                   })
               ]);

               // update data points
               svg.selectAll("circle")
                   .data(dataset)
                   .transition()
                   .duration(dur)
                   .attr("cx", function(d) {
                       return xScale(d.x);
                   })
                   .attr("cy", function(d) {
                       return yScale(d.y);
                   });


               // update axis
               svg.select(".x.axis")
                   .transition()
                   .duration(dur)
                   .call(xAxis);

               svg.select(".y.axis")
                   .transition()
                   .duration(dur)
                   .call(yAxis);

       });



       function create_data(interval, upper_bound, lower_bound, mean, std) {
           var n = Math.ceil((upper_bound - lower_bound) / interval)
           var data = [];

           x_position = lower_bound;
           for (i = 0; i < n; i++) {
               data.push({
                   "y": jStat.normal.pdf(x_position, mean, std),
                   "x": x_position
               })
               x_position += interval
           }
           return (data);
       }
</script>

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
