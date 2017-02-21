---
layout: post
author: Chris_Tufts
share:  true
title: "Metropolis Hastings and the Traveling Politician: Clay Davis"
modified:
categories: blog python
excerpt: ""
tags: [python bayesian thewire]
image:
  feature: metropolis_hastings/clay-davis-the-wire.jpg
date: 2017-02-17 ##T15:39:55-04:00
---

# Intro
I use Python on a somewhat regular basis, but I've always had a half-ass understanding
of OOP.  I've also never learned how to write unit tests (gasps). So in an effort to change
all this I've slowly been working through [Python the Hard Way]() to help fill in
the gaps of things I've never learned (or at least never used) in Python. I highly
recommend it. That being said, I was working through some of the exercises for
OOP and unit tests and realized now would be a great opportunity to make a program
which simulates [John Kruschke's 'Traveling Politician' example](Add link to book and add another to Duke) of the Metropolis
Hastings Algorithm.  

I also happen to be a huge fan of the show <i>The Wire</i>. So to make this a
bit more enjoyable, the politician in my example is non other than Clay
'Sheeeeeeeeeeeeeeeeit' Davis.

<iframe src="//giphy.com/embed/10Vs7qLOUJNxG8" width="480" height="358" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/clay-10Vs7qLOUJNxG8">via GIPHY</a></p>

# Metropolis Hastings

### Example Description:
Politician campaigning
Goal: Visit Islands based on the population of the Island - Want to visit Islands
with higher populations more often
How does it work:
Islands have a relative population of 1,2,3,4,5 for now lets just think of
it as (east to west) 1k, 2k, 3k, 4k, 5k people

Politician flips coin to determine direction of the proposed move. Moves
to the west are always accepted (moves to Island of higher population). Moves to
the east occur with a probability of p(proposed)/p(current).

Decision occurs via spinner (uniform distribution).

End result: After enough iterations the distribution of Islands visited will
be an estimate of the relative population of the Islands.

# My Version
Goal: Clay Davis and his driver Damien 'Day-Day' Price need to pick up money
from various know drug spots.  They want to do their pickups proportional to
the amount of money each spot generates.  

Politician: Clay Davis with assistance from his driver.

Possible Locations:

1. The Pit
2. High Rises
3. City Hall
4. Little Johnnies
5. Marlo's Court

Same rules apply:

* Proposed move to the west (more money) is always accepted.
* Proposed move to east occurs with p = p(target)/p(current)
* In the case the proposed move is rejected Clay stays put so that Lt.
Daniels and the rest of the squad don't catch him.


# Code/How it works, go through it
You can find the code here. Clone it, run it and see the outcome. The two
branches are a 'generic version' and 'the wire' version. 


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
