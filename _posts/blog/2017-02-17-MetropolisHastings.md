---
layout: post
author: Chris_Tufts
share:  true
title: "Metropolis Hastings and the Traveling Politician: Clay Davis Edition"
modified:
categories: blog python
excerpt: ""
tags: [python mcmc thewire]
image:
  feature: metropolis_hastings/clay-davis-the-wire.jpg
date: 2017-02-17 ##T15:39:55-04:00
---

# Intro
I use Python on a somewhat regular basis, but I've always had a half-ass understanding
of object oriented programming (OOP).  I've also never learned how to write unit
tests (gasps). So in an effort to change all this I've slowly been working
 through [Python the Hard Way](https://learnpythonthehardway.org/book/intro.html) to help fill in
the gaps of things I've never learned (or at least never used) in Python. I highly
recommend it. That being said, I was working through some of the exercises for
OOP and unit tests and realized now would be a great opportunity to make a program
which simulates [John Kruschke's 'Traveling Politician' example](https://www.amazon.com/Doing-Bayesian-Data-Analysis-Second/dp/0124058884/ref=sr_1_1?s=instant-video&ie=UTF8&qid=1487790073&sr=8-1&keywords=doing+bayesian+analysis) of the Metropolis Hastings Algorithm.

\[For a more in depth explanation of Metropolis Hastings and Gibbs Sampling check out :[Duke Computational Statistics in Python Example of Metropolis Hastings](http://people.duke.edu/~ccc14/sta-663-2016/16A_MCMC.html)\]


I also happen to be a huge fan of the show <i>The Wire</i>. So to make this a
bit more enjoyable, the politician in my example is none other than Clay
'Sheeeeeeeeeeeeeeeeit' Davis.

<iframe src="//giphy.com/embed/10Vs7qLOUJNxG8" width="480" height="358" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="http://giphy.com/gifs/clay-10Vs7qLOUJNxG8">via GIPHY</a></p>

# Metropolis Hastings

### Example Description:

<b>Goal:</b> Visit Islands based on the population of the island, i.e. visit islands
with higher populations more often. However the politician does not know the
populations of the islands. At best his aids can ask the adjacent islands their
population if a direction is proposed.

How does it work?

Islands have a relative population of 1,2,3,4,5. For now lets just think of
it as (east to west) 1k, 2k, 3k, 4k, 5k people.

The politician flips a coin to determine the direction of the proposed move.
Moves to the west are always accepted (moves to Island of higher population). Moves to
the east occur with a probability of:

p(move) = p(proposed)/p(current)

(i.e. the population of the proposed island divided by the population of the current island).

For the purposes of the example, any island outside the range of the 5
mentioned have zero population
and therefore would never possible moves.

To determine if the politician moves to the east or stays put on the current island
the value of p(move) is compared with a value from a spinning
wheel which is a uniform random number generator that gives us a
value between zero and 1. If the the spinner has a value less than p(move)
the proposed move is accepted (i.e. politician goes east) otherwise the politician
stays put.  

<b>End Result</b>: After enough iterations the distribution of the frequency islands
were visited will be an estimate of the relative population of the Islands.

# The Clay Davis Version
<b>Goal:</b> Clay Davis and his driver Damien 'Day-Day' Price need to pick up money
from various know drug spots. They want to do their pickups proportional to
the amount of money each spot generates.  

Politician: Clay Davis with assistance from his driver.

Possible Locations:

1. The Pit
2. High Rises
3. City Hall
4. Little Johnnies
5. Marlo's Court

Same rules apply, but some changes:

* Proposed moves to east and west occurs with p(move) = p(target)/p(current)
  * To clarify position 0 and 6 have probabilities of 0 so you will never
    move outside of the 5 Baltimore locations specified. However this
    does make is so that the relative populations can be shuffled so that
    the are not in order.
* If the move is accepted - Clay and Day-Day go to collect their money.
* In the case the proposed move is rejected Clay stays put so that Lt.
Daniels and the rest of the squad don't catch him.

## Quick Run Through

Here is what you will see when you run the script:

A short opening about Clay along with the relative populations (money counts)
for each spot. Each time you run the program the populations are shuffled unlike
the original traveling politician example (i.e. the populations don't have
to be increasing east to west to be estimated):

![Opening Screen](/images/clay_davis/opening_screen.png)

If you choose to step through Clay will select his next spot based on
Metropolis Hastings... and of course he will have something to say.
![Step Through](/images/clay_davis/Step_through.png)

A few more steps:

![Clay Davis Step Through](/images/clay_davis.gif)

If you decide to stop following Clay step by step, the simulation will
run through the remaining 5000 iterations and you will see a histogram
showing the frequencies (scaled to fit the command line) the Baltimore
spots were visited along with the relative frequencies assigned to the
spots at the start of the program.

![End Result](/images/Simulation_end.png)

## Gist and Github Repos
You can run an example of this by grabbing the code from this gist:

[claydavis](https://gist.github.com/ctufts/abb05e2b804fc1dbdb16932663b30363)

General Requirements:

* Python 3 (tested using 3.5)
* scipy

Then run it and follow the instructions:

1. type "python claydavis.py"
2. Follow the prompts - type 'y' followed by \<enter\> to step through. Press
any other key followed by \<enter\> to have the simulation run out 5,000 iterations
and estimate the relative populations.


The repo I've been working out of [here](https://github.com/ctufts/metropolis_hastings_example), but as of now different branches (the gist is from the 'thewire_shuffled' branch) are different
versions of the game.

Additional References/Notes:

1. I would highly recommend [Kruschke's book 'Doing Bayesian Data Analysis'](https://sites.google.com/site/doingbayesiandataanalysis/).
2. As well as [Python the hard way](https://www.learnpythonthehardway.org/)
3. [IMDB - Clay Davis Quotes](http://www.imdb.com/character/ch0337428/quotes).


[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
