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
# Introduction
Gensim is an easy to implement, fast, and efficient tool for topic modeling. The purpose of this post is to share a few of the things I've learned while trying to implement LDA on different corpora of varying sizes.  This post is not meant to be a full tutorial of using LDA in Gensim, but a supplement to help navigate around any issues you may run into.  If you are getting started with Gensim, or just need a refresher, I would suggest taking a look at their excellent [documentation](https://radimrehurek.com/gensim/apiref.html) and [tutorials](https://radimrehurek.com/gensim/tutorial.html).  

# Trouble Shooting Gensim
The [Gensim Google Group](https://groups.google.com/forum/#!forum/gensim) is a great resource.  Most of the information in this post was derived from searching through the group discussions. If you are having issues I'd highly recommend searching the group before doing anything else.  

# Logging Logging Logging
When training models in Gensim, you will not see anything printed to the screen. <b>Gensim does not log progress of the training procedure by default</b>. The python [*logging*](https://docs.python.org/2/library/logging.html) can be set up to either dump logs to an external file or to stdout.

{% highlight python %}
# Set up log to external log file
import logging
logging.basicConfig(filename='lda_model.log', format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

# Set up log to terminal
import logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO
{% endhighlight %}   
# Building the dictionary and corpus
One of the primary strengths of Gensim that it doesn't require the entire corpus to be loaded into memory. The corpus can be stored as a serialized object, which then allows it to be loaded using an iterator.
{% highlight python %}
# take list of tokens
# create dictionary
# create corpus
{% endhighlight %}
## Note on save_as_text
I went through the [Wikipedia tutorial on the Gensim site](https://radimrehurek.com/gensim/wiki.html) and initially used this as a template for the work I was trying to accomplish. The example uses a script called [gensim.scripts.make_wiki](https://github.com/RaRe-Technologies/gensim/blob/develop/gensim/scripts/make_wikicorpus.py) (NOTE: the link actually goes to make_wikicorpus.py which is what make_wiki points to).
  you will see the following:
{% highlight python %}
#dictionary.save_as_text(outp + '\_wordids.txt.bz2')
{% endhighlight %}

## Filter Extremes - or at least look into the number of features you are using
You need to keep a close eye on the number of features you are going to use in your dictionary. A quick way to do this is to just use the print function after importing your saved dictionary:
{% highlight python  %}
# load dictionary
# print(dictionary)
# will show the number of features in the dict
{% endhighlight %}

From what is shown on the Gensim site, it appears feature counts below 100k are ok.  However if the feature count is significantly higher, the model will take a very long time to run and may even fail.
[Memory used by LSI/LDA](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ#q5-i-am-getting-out-of-memory-errors-with-lsi-how-much-memory-do-i-need), ([original google discussion](https://groups.google.com/forum/#!topic/gensim/sbf8OmVsCqw))

[Filtering previously saved corpus](https://github.com/RaRe-Technologies/gensim/wiki/Recipes-&-FAQ)
[Google groups discussion on the above fix:](https://groups.google.com/forum/#!topic/gensim/LGz6hNNF05I)
[Note about save_as_text on github issue](https://github.com/RaRe-Technologies/gensim/issues/92#issuecomment-7678189)
[save_as_text load_from text dangerous (git issue)](https://github.com/RaRe-Technologies/gensim/issues/56)
# Training the LDA Model
## Argument selection/equivalencies

  * iterations: # of iterations in the EM step
  * [chunksize, passes, update_every - how do these all interact/what do they mean?](https://groups.google.com/forum/#!topic/gensim/ojySenxQHi4)
    * passes : # of passes through the entire corpus
    * chunksize: the amount of documents to load into memory at a time and process E step.
    * update_every: number of chunks to process prior to moving onto the M step of EM

# Additional considerations
Drawbacks of the [python's multiprocessing library](https://github.com/RaRe-Technologies/gensim/issues/445)  Only way to get around this is to limit the number of topics or feature [similar issue due to multiprocessing](https://github.com/RaRe-Technologies/gensim/issues/376)

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
