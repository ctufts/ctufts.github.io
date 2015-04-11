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

I am currently working on the [Countable Care Challenge](http://www.drivendata.org/competitions/6/) hosted by the [Planned Parenthood Federation of America](http://www.plannedparenthood.org/). The dataset for this challenge has over a thousand features. Feature selection was used to help cut down on runtime and eliminate unecessary features prior to building a prediction model. The random.forest.importance function in the FSelector package was implemented in R to accomplish this task.

To demonstrate how random.forest.importance can be implemented in R, I used the .... dataset provided in the base distribution of R.  

## Sample Heading

### Sample Heading 2

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
