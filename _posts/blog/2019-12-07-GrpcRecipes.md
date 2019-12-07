---
layout: post
author: Chris_Tufts
share:  true
title: "GRPC Recipes"
modified:
categories: blog grpc
excerpt: ""
tags: [grpc, python]
link:
image:
  feature:
date: 2019-12-07 ##T19:39:55-04:00

---

# GRPC Proto Recipes

## What is GRPC

GRPC is a high performance [remote procedure call framework (RPC)](https://en.wikipedia.org/wiki/Remote_procedure_call) developed by Google. It has a variety of applications, one of which is allowing you to write code in two different languages and connect the two pieces of code. This is accomplished by creating a server and client stub, but you only need to define one message protocall. gRPC auto generates message protocall definitions in you specified languages that you can then use to connect your code with. 

## Getting Started

The purpose of this post is to provide some recipes for common message types utilized in gRPC. If you are unfamiliar with gRPC and looking for some tutorials to get your feet wet take a look at the [tutorials page on grpc.io](https://grpc.io/docs/tutorials/). 

## Recipes

### A Basic Message

{% highlight proto %}
syntax = "proto3";
package shopping;

// Service Definition
service ShoppingList {

  // Sends grocery order
  rpc OrderGroceries (MessageRequest) returns (MessageReply) {}
}

// Request for a single shopping item.
message MessageRequest {
  string shoppingItem = 1;
}

// Replies letting the user know if the requested item is in stock
message MessageReply {
  bool inStock = 1;
}
{% endhighlight %}

Run Command:
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. simpleExample.proto



[jekyll-gh]: https://github.com/jekyll/jekyll
[jekyll]:    http://jekyllrb.com
