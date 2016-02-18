---
layout: post
author: Chris_Tufts
share:  true
title: "Streaming Twitter to MySQL using Python"
modified:
categories: blog python
excerpt: ""
tags: [Python, MySQL, Twitter]
image:
  
date: 2015-07-17 ##T19:39:55-04:00

---
A couple of weeks ago I wanted to collect data some data from Twitter. In the past I've used different methods including the [TwitteR package in R and IFTTT](http://miningthedetails.com/blog/r/I-95TrafficApp/). However I wanted a more streamlined approach to aggregate data based on a search term.  I found a [great tutorial](http://pythonprogramming.net/twitter-api-streaming-tweets-python-tutorial/) on using the Python library [Tweepy](http://www.tweepy.org/) to set up a Twitter stream listener and import the data into a MySQL database with the [MySQLdb library](https://pypi.python.org/pypi/MySQL-python/1.2.5).  However I ran into two major problems:

<b>1. The MySQLdb library does not support Python-3.</b>

<b>2. Storing data from Twitter, specifically special characters such as emoji, can cause issues when inserting it into a MySQL database. </b>


The primary goal of this post is to address the above issues. I highly recommend reviewing the [PythonProgramming.net tutorials](http://pythonprogramming.net/mysql-intro/) on getting started with MySQL and Tweepy as I am using the code from these tutorials as a template.  

# MySQL and Python-3

There is a simple solution solution for the compatibility issue between MySQLdb and Python 3.  MySQL provides a connector for Python 3 which is similar to the connector used in the MySQLdb library. You can download the connector [here](http://dev.mysql.com/downloads/connector/python/). I'll come back to using the connector later in the post. 

# The Emoji Problem

When collecting Twitter data you are bound to run into Emoji.  [MySQL's UTF8 only allocates 3 bytes per character, but the whole range of of UTF8 characters, including Emoji, requires 4 bytes](http://pjambet.github.io/blog/emojis-and-mysql/).  MySQL defaults to UTF8 when you create a table, therefore you must specify the character set.  The character set we want is <i>utf8mb4</i>.  This character set provides 4 bit UTF8 functionality. Below I create a table to allow for storing the time, username, and tweet text information. 

{% highlight mysql %}
mysql> CREATE TABLE tweetTable (time INT(13), 
	-> username VARCHAR(255) CHARACTER SET utf8mb4, 
	-> tweet VARCHAR(255) CHARACTER SET utf8mb4);
{% endhighlight %}


Usernames are limited to 15 characters and tweets to 140 characters, but I have had issues with tweet text returned by the listener exceeding these limits.  Since memory optimization is not mission critical for this application I allow 255 characters for the username and the text of the tweet just to be safe. 

Now we are ready to run our python script.  The functions provided in the MySQL connector are nearly identical to the functions in the MySQLdb library. When setting up the connector I make sure to specify the character set as <i>utf8mb4</i>. 

{% highlight py3 %}
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import mysql.connector
from mysql.connector import errorcode
import time
import json



# replace mysql.server with "localhost" 
# if you are running via your own server!
# server       MySQL username	MySQL pass  Database name.

cnx = mysql.connector.connect(user='root', password='',
                              host='localhost',
                              database='tweetTable',
                              charset = 'utf8mb4')
cursor=cnx.cursor()
{% endhighlight %}

Now that the connector is set up we are ready to access twitter.  You'll need to enter your API access information and set up the stream listener.  I have it set up to find tweets referencing <i>Philly</i> in this example.  In the past I've received errors that the field was not present in the data streaming in.  To circumvent this issue I added a couple of lines of code to ensure that the text field is present in the data returned by the listener.    

{% highlight py3 %}
#consumer key, consumer secret, 
#access token, access secret.
ckey="type customer key here"
csecret="type customer secret here"
atoken="type access token here"
asecret="type access secret here"


class listener(StreamListener):

    def on_data(self, data):
        all_data = json.loads(data)
        
        # check to ensure there is text in 
        # the json data
        if 'text' in all_data:
          tweet = all_data["text"]
          username = all_data["user"]["screen_name"]
          
          cursor.execute(
            "INSERT INTO taula4bitDefault (time, username, tweet) VALUES (%s,%s,%s)",
            (time.time(), username, tweet))
          
          cnx.commit()
          
          print((username,tweet))
          
          return True
        else:
          return True

    def on_error(self, status):
        print(status)

auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)

twitterStream = Stream(auth, listener())
twitterStream.filter(track=["Philly"],
  languages = ["en"], stall_warnings = True)
{% endhighlight %}


Using the MySQL connector in place of the MySQLdb library provides functionality regardless of the version of Python installed.  Altering the character set allows us to capture tweets containing emoji and other uncommon characters.  Implementing these two changes will allow you to stream tweets directly to your MySQL database. 



# Links to Sources: 

* [Install MySQL](http://dev.mysql.com/downloads/mysql/)
* [Install MySQL Python Connector](http://dev.mysql.com/downloads/connector/python/)
* [Creating a MySQL Table for Tweets](http://pythonprogramming.net/mysql-intro/)
* [Python/MySQL Connector Into](http://dev.mysql.com/doc/connector-python/en/connector-python-example-connecting.html)
* [MySQLdb Package](https://pypi.python.org/pypi/MySQL-python/1.2.5)
* [Streaming Tweets from Twitter to Database](http://pythonprogramming.net/twitter-api-streaming-tweets-python-tutorial/)
* [Emojis and MySQL](http://pjambet.github.io/blog/emojis-and-mysql/)





[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
