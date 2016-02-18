---
layout: post
author: Chris_Tufts
share:  true
title: "Model Sensitivity Analysis"
modified:
categories: blog r
excerpt: ""
tags: [R, sensitivity analysis]
image:
  feature: sensitivityAnalysis_V6to8.png
date: 2015-04-30 ##T19:39:55-04:00

---

I attended the [Machine Learning Conference](http://mlconf.com/mlconf-2015-nyc/) in NYC last month and was lucky enough to catch a [presentation by Dan Mallinger](http://www.slideshare.net/SessionsEvents/mallinger-analyticscommunicationcomplex-models).  The talk focused on properly communicating models and methods to others regardless of their technical background. The base of this communication is in understanding the model and methods we are using so that we can present them to others. 

One way of gaining a greater understanding of our model is through sensitivity analysis.  Through this analysis we can visualize different feature interactions and the interaction between each feature and the response. I stumbled onto Marcus Beck's blog post on [sensitivity analysis for neural networks](https://beckmw.wordpress.com/2013/10/).  His post provided great detail on how to perform the analysis as well as a function for neural net sensitivity analysis.  Using his analysis on neural networks as a template, I created an example using a [gradient boosted tree model](http://cran.r-project.org/web/packages/gbm/index.html).  The <i>biopsy</i> data set provided in the [MASS package](http://cran.r-project.org/web/packages/MASS/index.html) was used to train the model via the [Caret package](http://topepo.github.io/caret/index.html).   

{% highlight r %}
library(gbm)
library(MASS)
library(caret)
library(dplyr)
library(tidyr)
fitControl <- trainControl(method = "repeatedcv", 
                           number = 5,
                           repeats = 5,
                           classProbs = T,
                           summaryFunction = twoClassSummary)

gbmFit <- train(class~., data = biopsy[,-1],
                trControl = fitControl,
                method = "gbm",
                metric = "ROC")
{% endhighlight %}


After training our model the next step is to generate the quantile values for each feature.

{% highlight r %}
q.set <- seq(0.2, 1, 0.2)
feature.quantiles <- data.frame(apply(biopsy[,c(-1,-11 )], 2,
                                      quantile, 
                                      probs = q.set,
                                      na.rm = T))
{% endhighlight %}
Once the quantiles have been generated sensitivity analysis can begin. For each feature of the <i>biopsy</i> dataset the range of possible values is generated.  The <i>response</i> matrix is created and will be used to store the quantile, the value of the feature tested, and the response of the model. 

{% highlight r %}
plot.df <- NULL
# perform sensitivity analysis on all variables
# (leave out the ID and outcome)
for(i in names(biopsy[,c(-1,-11)])){
  # quantile value dictates color
  # get range of i and predic for all values
  # in the range
  var.range <- range(biopsy[,i], na.rm = T)
  possible.vals <- seq(var.range[1], var.range[2])
  response <- matrix(0, nrow = nrow(feature.quantiles),
                     ncol = length(possible.vals) + 1, 
                     dimnames = list(NULL, c("Quantile", possible.vals)))
  # first column contains the quantile
  response[,1] <- q.set
  
  # run the model for the selected variable
  # while holding all other variables steady at a quantile
  
{% endhighlight %}

The next step is to create a test set for the model.  The test set contains each value of a single feature and the quantile values for all other features.  

{% highlight r %}
for(j in 1:nrow(feature.quantiles)){
  test.set <- apply(feature.quantiles[j,],
                     2,function(x)rep(x,length(possible.vals)))
  test.set[,i] <- possible.vals
{% endhighlight %}

Now I can run the model on each value of the feature while holding the quantile values for all other features at a constant rate. 

{% highlight r %}
 response[j,-1] <- predict(gbmFit, newdata = test.set, 
                            type = "prob")[,2]
}
{% endhighlight %}
  

After the responses from the model have been calculated I reshape and combine the results. 

{% highlight r %}
# reshape the response matrix for storage with other results
  temp <-  as.data.frame(response) %>%
    gather(value, response, 2:(length(possible.vals)+1))
  temp$value <- as.numeric(as.character(temp$value))
  # append the name of the explanatory variable tested
  temp$Variable <- i
  # bind all results together into one dataframe 
  plot.df<- rbind(plot.df, temp) 
}
{% endhighlight %}

The last task is to plot the analysis results in a faceted plot. To help style the plots I used the <i>fte_theme</i> function written by [Max Woolf](http://minimaxir.com/2015/02/ggplot-tutorial/) with few slight modifications.   

{% highlight r %}
# plot the values ####
palette.offset <- 3
palette <- brewer.pal("GnBu",
                      n=length(q.set)+palette.offset)[
                        seq(from = 3,
                            length.out = length(q.set))]
g <- ggplot(plot.df, aes(x = value, y = response, color = factor(Quantile))) + 
  stat_smooth(size = 1.2, se = F) + labs(x = "Value",
                                         y = "Response",title = "Sensitivity") + 
  scale_colour_manual(name = "Quantile", 
                      values = palette) +
  scale_x_continuous(limits = range(plot.df$value)) +
  facet_grid(.~Variable) + fte_theme()
print(g)
{% endhighlight %}


<figure>
  <img src="/images/sensitivityAnalysis.png" alt="image">
</figure>



[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
