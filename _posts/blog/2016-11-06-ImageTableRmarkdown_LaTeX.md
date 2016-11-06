---
layout: post
author: Chris_Tufts
share:  true
title: "Table of Images: LaTeX Template for Rmarkdown"
modified:
categories: blog r
excerpt: ""
tags: [rstats, LaTeX, markdown]
image:
  feature: LaTeX_tables_post/LaTeX_table_example.png
date: 2016-11-06 ##T15:39:55-04:00
---

# Creating a Table of Images: The LaTeX/PDF Version
In my [previous post](http://miningthedetails.com/blog/r/ImageTableRmarkdown/)
 I provided a template/example to create a table of images in
a RMarkdown document which would be rendered as HTML. The focus of this post is
to provide a method of creating a table of images using LaTeX which can then be
rendered as PDF.

# Prerequisites
Please download/pull the [HTML-Image-Tables-RMarkdown repo](https://github.com/ctufts/HTML-Image-Tables-RMarkdown).
I have updated the repo, so that it also includes the image files created in the [HTML table post](http://miningthedetails.com/blog/r/ImageTableRmarkdown/).  The LaTeX template is titled
'ImageTableTemplate_LaTeX.Rmd'.

# Template
The LaTeX table template is a bit more straight forward in comparison to the
HTML tables. Unlike the HTML table of images, we don't have to specify any specific markdown
extensions.  

As with the HTML example the YAML is specified, in particular we list the
type of output - PDF. Then the file names are gathered into two vectors.  Each
vector will be used to create a row in the table.  From this point it is all
LaTeX using the <i>tabular</i> package. Columns are separated by ''<i>&</i>'' and rows
are separated with ''<i>//</i>''.  The graphics are displayed using the <i>includegraphics</i>
label and the file names are [inserted inline](https://www.rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf).
<i>hline</i> creates a horizontal line between rows.

{% highlight R %}
---
title: "LaTeX image table template"
author: "Chris Tufts @devlintufts"
date: "November 6, 2016"
output: pdf_document
---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = FALSE)
```

```{r pressure, echo=FALSE}
# create file lists
plot_file_0 <- list.files('figures/0/', full.names = T, recursive = F)[1:5]
plot_file_1 <- list.files('figures/1/', full.names = T, recursive = F)[1:5]


```
\begin{tabular}{|c|c|c|c|c|c|}
      \hline
      Plots from directory 2 &
      \includegraphics[width=20mm]{`r plot_file_0[1]`} &
      \includegraphics[width=20mm]{`r plot_file_0[2]`} &
      \includegraphics[width=20mm]{`r plot_file_0[3]`} &
      \includegraphics[width=20mm]{`r plot_file_0[4]`} &
      \includegraphics[width=20mm]{`r plot_file_0[5]`} \\
      \hline
      Plots from directory 1 &
      \includegraphics[width=20mm]{`r plot_file_1[1]`} &
      \includegraphics[width=20mm]{`r plot_file_1[2]`} &
      \includegraphics[width=20mm]{`r plot_file_1[3]`} &
      \includegraphics[width=20mm]{`r plot_file_1[4]`} &
      \includegraphics[width=20mm]{`r plot_file_1[5]`} \\
      \hline
\end{tabular}


{% endhighlight %}

The resulting output is shown below.
<a href="{{ site.url}}/images/LaTeX_tables_post/ImageTableTemplate_LaTeX.pdf" > <img src="/images/LaTeX_tables_post/LaTeX_table_example.png" alt="image"
 style="border:2px solid black" > </a>


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
