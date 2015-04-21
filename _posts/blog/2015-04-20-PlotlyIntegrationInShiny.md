---
layout: post
author: Chris_Tufts
share:  true
title: "Ingegrating Plotly Charts into a Shiny App"
modified:
categories: blog
excerpt:
tags: []
image:
  feature:
date: 2015-04-20 ##T19:39:55-04:00
---

Last week I attended a couple of data science talks at the [DataPhilly](http://www.meetup.com/DataPhilly/) meetup.  One of the presenters was Matt Sundquist from [Plotly](https://plot.ly/api/).  He gave an overview of some of the capabilities and features of Plotly.  During the talk, Matt mentioned that Plotly visualizations can be embedded into a [Shiny](http://shiny.rstudio.com/) application.  Shiny is a web application framework available in RStudio which allows you to create web applications using only R.  

A while back I made a Shiny app to learn about the framework using the [heart disease data set](https://archive.ics.uci.edu/ml/datasets/Heart+Disease) in the UCI repository. The app used K-nearest neighbors to classify if an observation has heart disease present or absent. I decided to alter the app using Plotly graphs in place of the ggplot2 graphs in the original apps.  You can try both apps out at the links below:

* [KNN Heart Disease App](http://miningthedetails.shinyapps.io/knn-dashboard-shiny)
* [KNN Heart Disease App with Plotly](http://miningthedetails.shinyapps.io/knn-dashboard-shiny-plotly)

The apps contains 4 tabs: 

* Classifier - This tab contains slider bar for selection of <i>k</i> and check boxes for features to be included during the classification.  A confusion matrix and the classification error value for the selected parameters is displayed.
* Visualize Features - This tab allows the user to view the distribution of two features and the two features plotted against one another.  
* Feature Description - Provides a short description of each feature
* References - Data source references.

The plots present in the <i>Visualize Features</i> ...


  


{% highlight r %}

{% endhighlight %}




[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
