---
layout: post
author: Chris_Tufts
share:  true
title: "Web Scraping with Beautiful Soup"
modified:
categories: blog python
excerpt: ""
tags: [Python, webscraping, UFC, Sherdog, beautifulsoup]
image:
  
date: 2015-12-03 ##T19:39:55-04:00

---

Sometimes data comes in a nicely packaged format like a csv or a database table... and sometimes it doesn't.  So what do you do when you need to grab some data from a website, but there is no API available? <b>Scrape It!</b>  

I'm an avid MMA fan and from time to time I want to check out some data on fighters.  [Sherdog.com](http://www.sherdog.com/) provides data on fighters including:

* Win/Loss Record
* Camp
* Weigth/Height
* Specifics about each fight: opponent, result, referee, event, etc. 

However Sherdog doesn't have an API; this is where [beautiful soup](http://www.crummy.com/software/BeautifulSoup/) comes in.  I ran a quick google search for Sherdog web scrapers and found one by [Andrew Valish](https://github.com/Valish/sherdog-api) which was written in Node.js.  I used this as a template and resource for the examples I provide below.  NOTE: In case you are looking for a prebuilt solution using Python, there are a couple of Python based Sherdog scapers available on Github. (Please see <i>References</i> section for links)

Conor McGregor is fighting for the UFC Featherweight title at UFC 194 on December 12th against the reigning champ Jose Aldo.  So let's take a look at some of his stats.  The first step is to import beautiful soup and then read the web page. 

{% highlight python %}
from bs4 import BeautifulSoup
import urllib
import re
r = urllib.urlopen('http://www.sherdog.com/fighter/Conor-McGregor-29688').read()
soup = BeautifulSoup(r)
{% endhighlight %}

The initial contents of <i>soup</i> are shown below (using the <i>soup.prettify()</i> function)

{% highlight html %}
<!DOCTYPE html>
<html version="XHTML+RDFa 1.0">
 <head>
  <title>
   Conor "Notorious" McGregor MMA Stats, Pictures, News, Videos, Biography - Sherdog.com
  </title>
  <meta charset="utf-8"/>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
  <meta content="en-US" http-equiv="Content-Language"/>
  <meta content="Sherdog.com" name="author"/>
  <meta content="Sherdog.com" name="publisher"/>
  <meta content="2015 - Sherdog.com" name="copyright"/>
  <meta content="INDEX, FOLLOW" name="robots"/>
{% endhighlight %}

Ok, so that doesn't look very useful, but there are a variety of tools to help us sort out what pieces of data we want.  The <i>gif</i> below shows how to view developer tools in Chrome.  You can see as I move the cursor over the HTML elements they are highlighted in the page.  

<figure>
  <img src="/images/webscrapingGif/chromeInspector.gif" alt="image">
</figure>

I'll start with collecting the fighter name and nickname: 
{% highlight python %}
fighterName = soup.find('span', class_ = 'fn').get_text()
nickname = soup.find('span', class_ = 'nickname').get_text()
{% endhighlight %}

I reference the name and nickname using the css class in the html. I search <i>soup</i> for the fighter name via the <i>find</i> function using both the html element, <i>span</i>, and the css class name, <i>fn</i>.  The section of HTML containing this text is shown below:

{% highlight html %}
<span class="fn">
         Conor McGregor
        </span>
        <br/>
        <span class="nickname">
         "
         <em>
          Notorious
         </em>
         "
        </span>
{% endhighlight %}

Similarly, I collect Conor's birthday, weight, height, nationality, and association (team): 

{% highlight python %}
birthday = soup.find(itemprop = 'birthDate').get_text()
age = soup.find('span', class_ = 'item birthday').find('strong').get_text()
locality = soup.find(itemprop = "addressLocality").get_text()
nationality = soup.find(itemprop = "nationality").get_text()
association = soup.find(class_ = 'item association').find('span', itemprop = 'name').get_text()
height = soup.find(class_ = 'item height').find('strong').get_text()
weight = soup.find(class_ = 'item weight').find('strong').get_text()
weightClass = soup.find(class_ = 'item wclass').find('strong').get_text()
{% endhighlight %}

In this case I will identify the birth date by searching on the <i>itemprop</i> field <i>birthDate</i>.  To isolate the fighter's age I access the <i>strong</i> tag located in the <i>item birthday</i> class.   

{% highlight html %}
<div class="data">
          <div class="bio">
           <div class="birth_info">
            <span class="item birthday">
             Birthday:
             <span itemprop="birthDate">
              1988-07-14
             </span>
             <br/>
             <strong>
              AGE: 27
             </strong>
            </span>
{% endhighlight %}

Sherdog also provides information about each of a fighter's fights in a table.  We can scrape this data as shown below:

{% highlight python %}
fight_history_table = soup.find(string = 'Fight History').find_parent(class_ = 'module fight_history').find('table')
{% endhighlight %}

The table is inside of a <i>div</i> of class <i>module fight_history</i>, but there is also another table which displays the amateur record of the fighter in a similar <i>div</i>.  To identify the table with the professional record, I need to first identify the location of the text string <i>Fight History</i> which is the header for the table we want.  Conversely the amateur record is labeled with the string <i>Amateur Fights</i>.  Once the string is identified I locate the parent tag with a class of <i>module fight_history</i> and then search for a <i>table</i> element. To clarify, when using the <i>find</i> function you are searching down the html tree, but when using <i>find_parent</i> you are working your way up the tree. Below are snippets showing the similarity of the amateur and professional tables.

{% highlight html %}
<div class="module fight_history">
       <div class="module_header">
        <h2>
         Amateur Fights
        </h2>
       </div>
       <div class="content table">
{% endhighlight %}

{% highlight html %}
 <div class="module fight_history">
       <div class="module_header">
        <h2>
         Fight History
        </h2>
       </div>
       <div class="content table">
{% endhighlight %}

Next we want to go row by row and collect the information about each fight.  The code below outlines how to do this.  The rows of the table are identified by the css classes <i>odd</i> and <i>even</i>.  For each row we isolate the desired data. For more information on iterating through tables check out this [Stack Overflow post](http://stackoverflow.com/questions/10309550/python-beautifulsoup-iterate-over-table).

{% highlight python %}
rows = fight_history_table.find_all(class_ = {'odd','even'})

for row in rows:
    cells      = row.find_all("td")
    result     = cells[0].get_text()
    opponent   = cells[1].get_text()
    event_name = cells[2].find('a').get_text()
    event_url  = cells[2].find('a').get('href')
    event_date = cells[2].find(class_ = 'sub_line').get_text()
    method     = cells[3].get_text()
    referee    = re.split('\)', method)[1]
    method     = re.sub(referee, "", method)
    rd         = cells[4].get_text()
    time       = cells[5].get_text()
{% endhighlight %}

The first couple of results are shown below:

{% highlight python %}
print result + " : " + opponent + " : " + event_name  + " : " + \
        event_url + " : " + event_date + " : " + method + " : " + \
        referee + " : " + rd + " : " + time + "\n\n"


win : Chad Mendes : UFC 189 - Mendes vs. McGregor : /events/UFC-189-Mendes-vs-McGregor-42211 : Jul / 11 / 2015 : TKO (Punches) : Herb Dean : 2 : 4:57


win : Dennis Siver : UFC Fight Night 59 - McGregor vs. Siver : /events/UFC-Fight-Night-59-McGregor-vs-Siver-41773 : Jan / 18 / 2015 : TKO (Punches) : Herb Dean : 2 : 1:54

{% endhighlight %}

As I pointed out earlier, this was just an example to help highlight what can be done with beautiful soup.  Check out the sources below for prebuilt solutions in both Python and Node.js (specifically for scraping Sherdog)

# References: 

* [Sherdog](http://www.sherdog.com/)
* [Andrew Valish - Sherdog-API](https://github.com/Valish/sherdog-api)
* [Patrick Carey - Sherdog Fight Scraper](https://github.com/paddycarey/sherdog-fighter-scraper)
* [John O'Connor - Sherdog Scraper](https://github.com/jc0n/sherdog-scraper)
* [Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/)
* [Stack Overflow example for iterating over a table](http://stackoverflow.com/questions/10309550/python-beautifulsoup-iterate-over-table)




[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
