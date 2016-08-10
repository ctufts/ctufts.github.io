---
layout: post
author: Chris_Tufts
share:  true
title: "Gensim LDA Walkthrough"
modified:
categories: blog python lda
excerpt: ""
tags: [lda, topic modeling, gensim, python ]
link:
image:
date: 2016-08-02 ##T19:39:55-04:00

---

# Logging - The most important piece

# Building the dictionary and corpus
## Note on save_as_text
## Filter Extremes - or at least look into the number of features you are using
# Training the LDA Model
## Argument selection/equivalencies

  * iterations: # of iterations in the EM step
  * [chunksize, passes, update_every - how do these all interact/what do they mean?](https://groups.google.com/forum/#!topic/gensim/ojySenxQHi4)
    * passes : # of passes through the entire corpus
    * chunksize: the amount of documents to load into memory at a time and process E step.
    * update_every: number of chunks to process prior to moving onto the M step of EM

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
