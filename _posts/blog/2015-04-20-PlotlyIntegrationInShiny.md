---
layout: post
author: Chris_Tufts
share:  true
title: "Embedding Plotly Charts into a Shiny App"
modified:
categories: blog r
excerpt:
tags: [R, Shiny, Plotly]
image:
  feature:
date: 2015-04-20 ##T19:39:55-04:00
---

Last week I attended a couple of data science talks at the [DataPhilly](http://www.meetup.com/DataPhilly/) meetup.  One of the presenters was Matt Sundquist from [Plotly](https://plot.ly/api/).  He gave an overview of some of the capabilities and features of Plotly.  During the talk, Matt mentioned that Plotly visualizations can be embedded into a [Shiny](http://shiny.rstudio.com/) application.  Shiny is a web application framework available in RStudio which allows you to create web applications using only R.  

A while back I made a Shiny app as an exercise to learn about the framework using the [heart disease data set](https://archive.ics.uci.edu/ml/datasets/Heart+Disease) in the UCI repository. The app uses K-nearest neighbors to classify the presence or absence of heart disease given several features. I decided to alter the app using Plotly graphs in place of the [ggplot2](http://cran.r-project.org/web/packages/ggplot2/index.html) graphs in the original app.  You can try both apps out and get the code at the links below:

* [KNN Heart Disease App](http://miningthedetails.shinyapps.io/knn-dashboard-shiny)
  * [KNN Heart Disease GitHub](https://github.com/ctufts/knn-dashboard-shiny)
* [KNN Heart Disease App with Plotly](http://miningthedetails.shinyapps.io/knn-dashboard-shiny-plotly)
  * [KNN Heart Disease with Plotly GitHub](https://github.com/ctufts/knn-dashboard-shiny-plotly)

# Overview of the Shiny App Layout
The apps contains 4 tabs: 

* Classifier - This tab contains slider bar for selection of <i>k</i> and check boxes for features to be included during the classification.  A confusion matrix and the classification error value for the selected parameters is displayed.
* Visualize Features - This tab allows the user to view the distribution of two features and the two features plotted against one another.  The color in the plots is based on the presence (positive) or absense (negative) of heart disease in the dataset.
* Feature Description - Provides a short description of each feature
* References - Data source references.

# Embedding Plotly in the App
The plots present in the <i>Visualize Features</i> tab were originally created using the ggplot2 package.  To implement Plotly graphs in place of the old graphs a few new functions were necessary. Lucky for me Plotly provides some [examples in GitHub](https://github.com/chriddyp/plotly-shiny) which I used as my starting point.  

To provide the new functionality to my app I used the two files listed below:

* <i>plotlyGraphWidget.R</i>
* <i>plotlyGraphWidget.js</i>
 
Both files can be found in the [<i>ggplot2 UN</i>](https://github.com/chriddyp/plotly-shiny/blob/master/ggplot2/UN) example.  I copied both the files into my Shiny app project folder. (NOTE: For the <i>plotlyGraphWidget.js</i> file I copied the complete <i>www</i> directory.)


The <i>plotlyGraphWidget.R</i> script contains two functions: <i>graphOutput</i>, which will be used to display the plot in the <i>ui.R</i> file, and <i>renderGraph</i>, which is used in the <i>server.R</i> file. The original app uses the <i>plotOutput</i> function in the <i>ui.R</i> file to define where a plot is shown.  

{% highlight r %}
fluidRow(
          column(4, plotOutput("distPlotA")),                              
          column(4, plotOutput("distPlotB")),
          column(4, plotOutput("ScatterPlot"))
        )
{% endhighlight %}

To use Plotly, the <i>graphOutput</i> function is swapped in place of the <i>plotOutput</i> function as shown below.

{% highlight r %}
fluidRow(
          column(4, graphOutput("distPlotA")),                              
          column(4, graphOutput("distPlotB")),
          column(4, graphOutput("ScatterPlot"))
        )
{% endhighlight %}

After updating the <i>ui.R</i> file, the <i>server.R</i> file needs to be updated.  The first step is to replace the instances of <i>renderPlot</i> with <i>renderGraph</i>. In the base app a ggplot object was created inside the <i>renderPlot</i> function, but to use Plotly the ggplot object must be converted to a list containing the plot details.  This task is handled by the <i>gg2list</i> function provided in the [<i>plotly library</i>](https://plot.ly/r/getting-started/).

{% highlight r %}
 ggscatter <- ggplot(ds, aes_string(x = input$featureDisplay_x, 
                          y = input$featureDisplay_y, 
                          color = "factor(num)")) + 
      geom_point(size = 8, position = position_jitter(w = 0.1, h = 0.1)) + 
      labs(x = input$featureDisplay_x,
           y = input$featureDisplay_y) +
      fte_theme() + 
      scale_color_manual(name = "Heart Disease",values=c("#7A99AC", "#E4002B")) 
  
      # convert plot details to list
      # for plotly
      fig <- gg2list(ggscatter)
{% endhighlight %}

From this point the data and layout information for the Plotly graph can be edited then returned by the <i>renderGraph</i> function. 

{% highlight r %}
data <- list()
for(i in 1:(length(fig)-1)){data[[i]]<-fig[[i]]}

layout <- fig$kwargs$layout
# Remove the existing annotations (the legend label)        
layout$annotations <- NULL 

# place legend to the right of the plot
layout$legend$x <- 100
layout$legend$y <- 1
list(
   list(
        id="ScatterPlot",
        task="newPlot",
        data=data,
        layout=layout
      )
    )      
{% endhighlight %}


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
