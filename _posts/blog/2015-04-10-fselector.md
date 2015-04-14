---
layout: post
author: Chris_Tufts
share:  true
title: "Feature Selection with FSelector Package"
modified:
categories: blog
excerpt:
tags: []
image:
  feature:
date: 2015-04-07 ##T15:39:55-04:00
---

I am currently working on the [Countable Care Challenge](http://www.drivendata.org/competitions/6/) hosted by the [Planned Parenthood Federation of America](http://www.plannedparenthood.org/). The dataset for this challenge has over a thousand features. Feature selection was used to help cut down on runtime and eliminate unecessary features prior to building a prediction model. The <i>random.forest.importance</i> function in the [FSelector](http://cran.r-project.org/web/packages/FSelector/index.html) package was implemented in R to accomplish this task.

To demonstrate how random.forest.importance can be implemented, I used the <i>SAheart</i> dataset<sup>1</sup> available in the [ElemStatLearn package](http://cran.r-project.org/web/packages/ElemStatLearn/index.html).  The <i>SAheart</i> disease dataset is a retrospective sample of males in a heart-disease high-risk region of the Western Cape, South Africa. Patients positive for coronary heart disease, <i>chd</i>, are labeled with a value of 1 and patients negative for coranary heart disease are labeled with a value of zero. 

{% highlight r %}
> library(ElemStatLearn)
> library(FSelector)

> head(SAheart)
sbp tobacco  ldl adiposity famhist typea obesity alcohol age chd
1 160   12.00 5.73     23.11 Present    49   25.30   97.20  52   1
2 144    0.01 4.41     28.61  Absent    55   28.87    2.06  63   1
3 118    0.08 3.48     32.28 Present    52   29.14    3.81  46   0
4 170    7.50 6.41     38.03 Present    51   31.99   24.26  58   1
5 134   13.60 3.50     27.78 Present    60   25.99   57.34  49   1
6 132    6.20 6.47     36.21 Present    62   30.77   14.14  45   0
{% endhighlight %}

The <i>random.forest.importance</i> function is used to rate the importance of each feature in the classification of the outcome, <i>chd</i>.  The function returns a data frame containing the name of each attribute and the importance value based on the mean decrease in accuracy.  

{% highlight r %}
> SAheart$chd <- as.factor(SAheart$chd)
> att.scores <- random.forest.importance(chd ~ ., SAheart)
          attr_importance
sbp              4.511806
tobacco         19.434096
ldl              5.959607
adiposity        8.099294
famhist         12.450121
typea            2.472882
obesity         -3.520101
alcohol         -3.420076
age             22.236682
{% endhighlight %}

The FSelector package offers several functions to choose the best features using the importance values returned by <i>random.forest.importance</i>.  The <i>cutoff.biggest.diff</i> function automatically identifies the features which have a significantly higher importance value than other features. <i>cutoff.k</i> provides the <i>k</i> features with the highest importance values.  Similarly, <i>cutoff.k.percent</i> returns <i>k</i> percent of the features with the highest importance values.  

{% highlight r %}
> cutoff.biggest.diff(att.scores)
[1] "age"     "tobacco"
> cutoff.k(att.scores, k = 4)
[1] "age"       "tobacco"   "famhist"   "adiposity"
> cutoff.k.percent(att.scores, 0.4)
[1] "age"       "tobacco"   "famhist"   "adiposity"
{% endhighlight %}


<hr>
<sup>1</sup>Rousseauw, J., du Plessis, J., Benade, A., Jordaan, P., Kotze, J. and Ferreira, J. (1983). Coronary
risk factor screening in three rural communities, South African Medical Journal 64: 430–436.

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
