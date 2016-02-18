---
layout: post
author: Chris_Tufts
share:  true
title: "Getting Set Up for Mapping in R"
modified:
categories: blog R
excerpt:
tags: [R, RStudio, Maps, Philly]
image:
  feature: PhillyMap.png
date: 2016-02-17 ##T19:39:55-04:00

---

# Introduction
The purpose of this post is to provide installation instructions for R, RStudio, and the various packages which will be used during the [Introduction to Mapping with R hosted by GeoPhilly & MaptimePHL](http://www.meetup.com/GeoPhilly/events/228585077/).  

The primary steps to get setup are as follows:

1. Download R.
2. Download RStudio.
3. Install required packages.

The rest of the post will elaborate on each of these steps. 

# Installation of R
To install R I will be using the Berkeley Mirror which contains the R installation packages. Click [here](https://cran.cnr.berkeley.edu/
), then select your operating system:

<figure>
  <img src="/images/RInstall/berkeleyMirror_selectOS.png" alt="image">
</figure>

## Windows
If you are using a Windows machine you will select the <i>base</i> option in the next screen:

<figure>
  <img src="/images/RInstall/baseInstall.png" alt="image">
</figure>

Then you need to download the windows executable installer.

<figure>
  <img src="/images/RInstall/download_tab.png" alt="image">
</figure>

Once the download is complete run the executable using the default settings.  Additional information on installation and FAQ's can be found [here](https://cran.cnr.berkeley.edu/).

## Mac OS X
After selecting the <i>(Mac) OS X</i> option you will need to download a package installer based on the version of OS X you are currently running. 

<figure>
  <img src="/images/RInstall/Options_for_OSX.png" alt="image">
</figure>

Once you have downloaded the appropriate <i>.pkg</i> file, open the file and follow the installation instructions. 

## Linux
After selecting the <i>Linux</i> option select your flavor of Linux. 
<figure>
  <img src="/images/RInstall/Linux_install.png" alt="image">
</figure>

From this point forward follow the installation instructions provided on the page for the selected distribution. 

# RStudio 
[RStudio](https://www.rstudio.com/) is a great IDE which allows you to write and run scripts, view visualizations, and explore data all in one place.  Click [here](https://www.rstudio.com/products/rstudio/download/) to download RStudio. Select the installer package for your OS and download it. 

<figure>
  <img src="/images/RInstall/select_os_specific_Rstudio.png" alt="image">
</figure>

Run the installer with the default options.  For additional references on installation check out the [FAQ's](https://www.rstudio.com/resources/faqs/) and the [RStudio community support forum](https://support.rstudio.com/hc/en-us/community/topics). 

# Installing Packages
R comes with a base set of packages, but we will be using a few addditional packages for to aid in creating maps. A package is essentially a set of software tools built to accomplish specific tasks, in this case the packages will aid us in mapping. To install the packages, first open RStudio.  You will see a screen similar to the one below.

<figure>
  <img src="/images/RInstall/RStudio_screen.png" alt="image">
</figure>

In the lower left you will see the terminal where you can type commands.  Try it out by copying and pasting the following:

{% highlight r %}
2 + 2
{% endhighlight %}

Then hit <i>enter</i>.  The terminal will return the value <i>4</i>.  Now that we know R is up and running, copy and paste the following into the terminal:

{% highlight r %}
map.packages <- c("dplyr", "tidyr",
                  "leaflet", "ggplot2",
                  "lubridate", "readr",
                  "knitr")
install.packages(map.packages)
{% endhighlight %}

Then press <i>enter</i>. Depending on your OS, you may be asked "Do you want to install from sources the packages which need compilation?
y/n:". Just respond with 'y' then press <i>enter</i>. 

Now that R, RStudio, and the required packages are installed you are ready to go for the meetup.  Look forward to seeing you there. 

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
