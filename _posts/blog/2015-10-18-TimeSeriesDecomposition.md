---
layout: post
author: Chris_Tufts
share:  true
title: "Time Series Decomposition with Moving Averages"
modified:
categories: blog r
excerpt:
tags: [rstats, timeseries]
image:
  feature: Trend_RobberyFirearm_TitlePane.png
date: 2015-10-20 ##T19:39:55-04:00

---

# Overview
When analyzing a time series some common questions are:

1. What is the overall trend of the data?
2. Does the output change with season? (quarterly, daily, monthly, etc.)

However these answers are often not easily observable due to noise present in the data.  One of the tools which can be used to remove noise, isolate the overall trend, and identify any seasonal characteristics is time series decomposition using moving averages. To help explain this method I will use open data on Philadelphia crime incidences from 2012-2014 available at [opendataphilly](https://www.opendataphilly.org/dataset/crime-incidents). You can also take a look at my [dashboard app](https://miningthedetails.shinyapps.io/Philly-Crime-Parts-I-II) which provides time series decompositions for each type of crime in the dataset as well as an interactive map. 

Moving on to time series decomposition...   

# Step 1: Identify the Type of Model 
The first step is determining if the model is additive or multiplicative. Additive models can be identified as having a relatively stable frequency over time. An example of an additive model is provided below.

<figure>
  <img src="/images/AdditiveModel.png" alt="image">
</figure> 

An additive model can be described using the following equation:

Y[t] = T[t] + S[t] + e[t]

* Y[t] : Output of the model
* T[t] : Trend component of the model
* S[t] : Seasonal component of the model
* e[t] : Noise/remainder


Multiplicative models exhibit a change in frequency over time and are described using the following equation:

Y[t] = T[t] * S[t] * e[t]

An example of a multiplicative model is shown below. Note there is an increasing trend which is also accompanied by an increase in frequency over time. 

<figure>
  <img src="/images/MultiplicativeModel.png" alt="image">
</figure> 


Philadelphia's <i>Robbery via Firearm</i> crime data, as well as nearly all other crime types, can be described using an additive model as the seasonal variations remain relatively constant over time. The remainder of this post will focus on decomposition using the additive model.


# Step 2: Identify the Trend
The trend component of a time series is identified using a moving average filter.  I've decided to look at the data in terms of monthly incident counts.  Since there are 12 months in a year I need to use a moving average of length twelve. This means that at each point I want to average the 6 steps behind and 6 steps in front of the position I am calculating an average value for. However since my moving average is an even length I have to take the average of two averages as shown in the graphic below.   

<div class="mxgraph" style="position:relative;overflow:auto;width:100%;"><div style="width:1px;height:1px;overflow:hidden;">7Vtbb6M6EP41fWzF7RIemzTd87LSStW5PVJwiFWCI0PaZn/9jmHMJWaTnBYWc7SJFMHYeOD7ZjzjwbmxV7v3Lzzcb7+ymKQ3lhG/39gPN5bl2h78CsGxEtjWohIknMaVyGwET/Q7QaGB0gONSd7pWDCWFnTfFUYsy0hUdGQblnZV7MNEDt8InqIwVaV/07jYVlLPwHsR8j8ITbaoxvWx4TmMXhLODhmqy1hGqpZdKEfBru8GqnKq86M8D6SOrHMv3xnbdQSc5A1I+Jy0+9xZ+NrRmdLspYvWM+Mx4a1O9ho45IzBQOJo974iqeBRcmQvjM3Csf04IsTxn63baujHa7vXyHKS4c1+ekjDrgZ9DdMDAlIJ8uIoGc234V4cRgeeHpcceCKgfvm2pQV52oeRaHsDwwXZttilcGbCYUklEYqrsyIsKBO83AZA1zIvOHshK5ayCkJ7WX6hBW+I8IKgA1zz4GUffOovhO1IwY/CVLC7iWOgB8mnfGss1ELj2baM03EQnhCpT+qRG5ThAIG+GnR033OgX0B3Q9NUgld6ir2Mw3xb463AG5SfkeA13Q66todO04LX9fCh2/gusN+g8Pp+D7peKkz2GQ4ScfCVvdIsgU73AISY0MREx+F3nZKdQMEyYBTjz7zqhdIcDgHce7MeEG6uHlOhsOsBFwjdpyHNbrnovkx4GFPQd0LwGMw5aHnIHLjmKXGOJKlNnCR4UOKCvrloMOIAhHsTNIxD3P7A9+LyX8ndossdhNIJyTPBMzSJJKNOdZacxxD1W9PBLORSLLFRODDsqP33bHdNGoAzjIxTMvdsUye94xd4DEbN3/PdleyJR9WIPvTnc/Q90iwUo/TQ+Fd5WS+d41D2XN5mTdgD5bDWqybSjHEB4M/IbCeb5fy6Wj0CbKOQLIMYclwHsGmCmlxBnwtqJIvvOWdvIq6lYZ7TqIs+IMGP/8CJcWcGvhT8K+KXcWcIP12Sd1pUPSwXT0V7ffU3wik8TbnavCbkkVhZo/93QtrJew/gUsZJCvH4tauvjwXU8I3R0s5rp8ZxJOHOCZE5O/CI4FXtte3JQFYQ3Jle8/FlcQDH9YO7VmvdLNUUIU9IoagpTaYG5WNW5Kp5LcI078WCLI20XbPHUE4JHcQzPTXtUT1zDpieJvFTYqrmI2i5M8PUlLagA6hYu22BiqY7N1A9jUBVSzxouzMDVaTp2oCqViXRdj8H6hH0iuzoyuzycbFar1a9FeKF60DWMRITOgU3dWWBBj+ieZ/SAB+Yu3poePCWnitaRqFBo3gol5ctGtBF5lb20Cge+mqZEK19bqBqFA99vJX2CgP1zG2JoVFA9HvWbTNduGkU3OTCu43qPJdujk6xSl27ieLvZ1D9+Rv6DWvwHfvNvatR7JJ1x+EKOSdJ16b8aIO93P2A0Jt9b4d/GfZq3jDIrDHJi1udcFVTh0GKPlPgaspb1wJYNXsYpPAzCbCeTsCqCcQgxZ8pgLXk/jstgFVziCkKQGvzwV2L92TqWy7Pt+9HqzxoFe3UqvEgFaBLNq5LEUgnKtRa8yBVoEl2UGgVINV68yCVoEmA1SpAquXjYapBUyDr6BQhpe7BK0KTIKtTwAvU5d0wVaFJkNUpfgU9teHZrvDcCQMYccLIDzd+bG4CEm3wrzadnWCw7eoJT8WOOpYw2P63bqStrcziPWZ7k9iFHWDtNrl9TDR+eL8X3Hi5serCy+BqW9TZTipZV28J+yj06pz7f4Iew/d56MtOw0MPp80/2KrNb81fEu31Dw==</div></div>


We begin taking moving averages at position 7 in the data since this is the first position with 6 trailing values.  To calculate the moving average of position 7, I first take the average of elements 1 through 12.  Then I take the average of positions 2 through 13.  These two averages are then averaged together to give me my moving average for position 7.

The moving average is calculated for each element from element 7 until there are no longer 6 leading values remaining. Below is an example of the sliding window for the moving average.  Each time it advances to the next element, the whole window shifts.  In the case of element 7 we required elements 1 through 13 to calculate our moving average.  The average for element 8 will use 2 through 14, element 9 will use 3 through 15, and so on. 

<div class="mxgraph" style="position:relative;overflow:auto;width:100%;background-color:#ffffff;"><div style="width:1px;height:1px;overflow:hidden;">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</div></div>


The result of these moving averages yeilds the overall trend of the data. The trend plot representing <i>Robberies via Firearm</i> from 2012 to 2014 are shown in the graph below. Note the six month lag and six month lead on each end of the trend.  This is due to the moving average which needs 6 months of data both behind and in front of each month's data to calculate the average.  

<figure>
  <img src="/images/Trend_RobberyFirearm.png" alt="image">
</figure> 

One last note on moving averages: if there were 13 months in a year, only one average would need to be taken at each position as opposed to the average of two averages.  This is due to the fact that a center value exists when the window is an odd number of elements (6 lag, current element, 6 lead). 

# Step 3: Identify Seasonal Component
The seasonal component of the time series is found by subtracting the trend component from the original data  then grouping the results by month and averaging them. Below is some basic <i>R</i> code to describe this process. The montly incident count, <i>event</i>, and the previously calculated <i>trend</i> values are stored in a dataframe entitled <i>monthly.incidents</i>.  I use <i>dplyr</i> to group the counts by month, subtract the trend from the number of events, then take the average for that given month.  After the average for each month has been calculated, the seasonal trend value for each month is normalized by subtracting the mean of all <i>avg.seasonal</i> values from each individual <i>avg.seasonal</i> value.  

{% highlight r %}

# first ten entries of the montly incidents table
General.Crime.Category events    trend  month
                   (fctr)  (int)    (dbl) (fctr)
1         Robbery Firearm    282       NA    Jan
2         Robbery Firearm    226       NA    Feb
3         Robbery Firearm    216       NA    Mar
4         Robbery Firearm    239       NA    Apr
5         Robbery Firearm    291       NA    May
6         Robbery Firearm    247       NA    Jun
7         Robbery Firearm    314 281.9167    Jul
8         Robbery Firearm    314 280.1667    Aug
9         Robbery Firearm    342 278.0417    Sep
10        Robbery Firearm    313 276.1667    Oct

monthly.incidents %>% group_by(month) %>%
  summarise(
    avg.seasonal = mean(events - trend, na.rm = T)
  ) %>% mutate(
    normalized.seasonal = avg.seasonal-mean(avg.seasonal)
  )

    month avg.seasonal normalized.seasonal
   (fctr)        (dbl)               (dbl)
1     Jan    22.145833           20.454861
2     Feb   -77.416667          -79.107639
3     Mar   -74.041667          -75.732639
4     Apr   -33.541667          -35.232639
5     May    12.062500           10.371528
6     Jun    -3.145833           -4.836806
7     Jul    -5.250000           -6.940972
8     Aug    22.541667           20.850694
9     Sep    33.145833           31.454861
10    Oct    32.333333           30.642361
11    Nov    54.125000           52.434028
12    Dec    37.333333           35.642361

{% endhighlight %}

The normalized seasonal trend for <i>Robberies via Firearm</i> is shown below.  

<figure>
  <img src="/images/Seasonal_RobberyFirearm.png" alt="image">
</figure> 

# Step 4: Identify Noise/Irregularity
The noise component, also reffered to as the irregular or random component, is composed of all the leftover signal which is not explained by the combination of the trend and seasonal component.  To quantify this component the trend and seasonal components are subtracted from the original signal (no averages or filtering, just subtraction). The noise component in the <i>Robberies via Firearm</i> data is shown below. 

<figure>
  <img src="/images/Remainder_RobberyFirearm.png" alt="image">
</figure> 


# Summary
Time series decomposition using moving averages is a fast way to view seasonal and overall trends in time series data. There are a variety of different methods for processing and analyzing time series, but this is a good starting point.  If you are interested in performing time series analysis, the [<i>decompose</i>](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/decompose.html) function in <i>R</i> provides the seasonal, trend, and noise components for both additive and multiplicative models as covered in this post.  


# References
[PSU's stat 510 website](https://onlinecourses.science.psu.edu/stat510/node/69)

[Open Data Philly](https://www.opendataphilly.org/dataset/crime-incidents)






<script type="text/javascript" src="https://www.draw.io/js/embed-static.min.js"></script>



[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
