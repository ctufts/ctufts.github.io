---
layout: post
author: Chris_Tufts
share:  true
title: "Gensim LDA: Tips and Tricks"
modified:
categories: blog python lda
excerpt: ""
tags: [lda, topic modeling, gensim, python ]
link:
image:
date: 2016-08-13 ##T19:39:55-04:00

---
# Introduction
Gensim is an easy to implement, fast, and efficient tool for topic modeling. The purpose of this post is to share a few of the things I've learned while trying to implement  Latent Dirichlet Allocation (LDA) on different corpora of varying sizes.  This post is not meant to be a full tutorial on LDA in Gensim, but as a supplement to help navigate around any issues you may run into.  If you are getting started with Gensim, or just need a refresher, I would suggest taking a look at their excellent [documentation](https://radimrehurek.com/gensim/apiref.html) and [tutorials](https://radimrehurek.com/gensim/tutorial.html).  

# Troubleshooting Gensim
The [Gensim Google Group](https://groups.google.com/forum/#!forum/gensim) is a great resource.  Most of the information in this post was derived from searching through the group discussions. If you are having issues I'd highly recommend searching the group before doing anything else.  Also make sure to check out the [FAQ and Recipes Github Wiki](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ).

# Logging Logging Logging
When training models in Gensim, you will not see anything printed to the screen. LDA, depending on corpus size may take a few minutes, hours, or even days, so it is extremely important to have some information about the progress of the procedure.  <b>Gensim does not log progress of the training procedure by default</b>. The python [*logging*](https://docs.python.org/2/library/logging.html) can be set up to either dump logs to an external file or to the terminal.

{% highlight python %}
# Set up log to external log file
import logging
logging.basicConfig(filename='lda_model.log', format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

# Set up log to terminal
import logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO
{% endhighlight %}   

# Building the dictionary and corpus
One of the primary strengths of Gensim that it doesn't require the entire corpus be loaded into memory. You can also build a dictionary without loading all your data into memory. All of this is summarised in the [Corpora and Vector Spaces Tutorial](https://radimrehurek.com/gensim/tut1.html). I don't have much to add here except the following: <b><i>save</i> and <i>save_as_text</i> are not interchangeable</b> (this also goes for <i>load</i> and <i>load_as_text</i>)

## What is the difference between <i>save_as_text</i> and <i>save</i>?
[<i>save_as_text</i> is meant for human inspection while <i>save</i> is the preferred method of saving objects in Gensim.](https://github.com/RaRe-Technologies/gensim/issues/56) This also applies to <i>load</i> and <i>load_from_text</i>.  But there is one additional caveat, some <i>Dictionary</i> methods will not work with objects that were saved/loaded from text such as <i>filter_extremes</i> and <i>num_docs</i>. In short if you use <i>save/load</i> you will be able to process the dictionary at a later time, but this is not true with <i>save_as_text/load_from_text</i>.  

## Memory Considerations
Gensim can only do so much to limit the amount of memory used by your analysis. Your program may take an extended amount of time or possibly crash if you do not take into account the amount of memory the program will consume. [Prior to training your model you can get a ballpark estimate of memory use by using the following formula:](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ#q5-i-am-getting-out-of-memory-errors-with-lsi-how-much-memory-do-i-need)

### 8 bytes * num_terms * num_topics * 3

* <b>8 bytes:</b> size of double precision float
* <b>num_terms:</b> number of terms in the dictionary
* <b>num_topics:</b> number of topics
* <b>The magic number 3:</b> The <i>8 bytes * num_terms * num_topic</i> accounts for the model output, but Gensim will need to make temporary copies while modeling.  The scaling factor of 3 gives you an idea of how much memory Gensim will be consuming while running with the temporary copies present.

NOTE: The link above goes to a FAQ about LSI in Gensim, but it also goes for LDA as per this [google discussion](https://groups.google.com/forum/#!topic/gensim/sbf8OmVsCqw)) answered by the Gensim author [Radim Rehurek](https://twitter.com/RadimRehurek)

There are multiple filtering methods available in Gensim that can cut down the number of terms in your dictionary. If you are unsure of how many terms your dictionary contains you can take a look at it by printing the dictionary object after it is created/loaded.
{% highlight python  %}
# load dictionary
dictionary = gensim.corpora.Dictionary.load('mydictionary.dict')
print(dictionary)
>>>Dictionary(500345 unique tokens)
{% endhighlight %}

Most of the Gensim documentation shows 100k terms as the suggested maximum number of terms; it is also the default value for <i>keep_n</i> argument of <i>filter_extremes</i>.  The other options for decreasing the amount of memory usage are limiting the number of topics or get more RAM.   

## Filtering A Previosly Saved Dictionary and Updating the Corpus
If you need to filter your dictionary and update the corpus after the dictionary and corpus have been saved, take a look at the link below to avoid any issues:

* [How Can I Filter A Saved Corpus and Its Corresponding Dictionary?](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ#q8-how-can-i-filter-a-saved-corpus-and-its-corresponding-dictionary)  

I find it useful to save the complete, unfiltered dictionary and corpus, then I can use the steps in the previous link to try out several different filtering methods.  

# Training the LDA Model
If you follow the tutorials the process of setting up lda model training is fairly straight forward.  The one thing that took me a bit to wrap my head around was the relationship between <i>chunksize</i>, <i>passes</i>, and <i>update_every</i>.

## Chunksize, Passes, and Update_every
[The relationship between chunksize, passes, and update_every is the following](https://groups.google.com/forum/#!topic/gensim/ojySenxQHi4):

* <b>passes:</b> Number of passes through the entire corpus
* <b>chunksize:</b> Number of documents to load into memory at a time and process E step of EM.
* <b>update_every:</b> number of chunks to process prior to moving onto the M step of EM.

I'm not going to go into the details of EM/Variational Bayes here, but if you are curious check out this [google forum post](https://groups.google.com/forum/#!topic/gensim/z0wG3cojywM) and the paper it references [here](https://www.google.com/url?q=https%3A%2F%2Fwww.cs.princeton.edu%2F~blei%2Fpapers%2FHoffmanBleiBach2010b.pdf&sa=D&sntz=1&usg=AFQjCNEqb96J5aHxeTva_s_ieCKGzOBbDA).
In general a <i>chunksize</i> of 100k and <i>update_every</i> set to 1 is equivalent to a <i>chunksize</i> of 50k and update_every set to 2. The primary difference is that you will save some memory using the smaller <i>chunksize</i>, but you will be doing multiple loading/processing steps prior to moving onto the maximization step. <i>Passes</i> are not related to <i>chunksize</i> or <i>update_every</i>. <i>Passes</i> is the number of times you want to go through the entire corpus.  Below are a few examples of different combinations of the 3 parameters and the number of online training updates which will occur while training LDA.

* chunksize = 100k, update_every=1, corpus = 1M docs, passes =1   :  <b>10 updates total</b>
* chunksize = 50k&nbsp;, &nbsp;update_every=2, corpus = 1M docs, passes =1   :  <b>10 updates total</b>
* chunksize = 100k, update_every=1, corpus = 1M docs, passes =2   :  <b>20 updates total</b>
* chunksize = 100k, update_every=1, corpus = 1M docs, passes =4   :  <b>40 updates total</b>

# Additional considerations for LdaMulticore
If you are going to implement the <i>LdaMulticore</i> model, the multicore version of LDA, be aware of the limitations of [python's multiprocessing library](https://github.com/RaRe-Technologies/gensim/issues/376) which Gensim relies on.   [Again, this goes back to being aware of your memory usage. If the following is True you may run into this issue:](https://github.com/RaRe-Technologies/gensim/issues/445)

### 8 bytes * num_terms * num_topics >= 1GB

The only way to get around this is to limit the number of topics or terms.

# Summary
Hopefully this post will save you a few minutes if you run into any issues while training your Gensim LDA model.  Please make sure to check out the links below for Gensim news, documentation, tutorials, and troubleshooting resources:

* [Tutorials](https://radimrehurek.com/gensim/tutorial.html)
* [Docs](https://radimrehurek.com/gensim/apiref.html)
* [Github FAQ](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ)
* [Google Group](https://groups.google.com/forum/#!forum/gensim)
* [Git Issues](https://github.com/RaRe-Technologies/gensim/issues)
* [Gensim Twitter](https://twitter.com/gensim_py)

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
