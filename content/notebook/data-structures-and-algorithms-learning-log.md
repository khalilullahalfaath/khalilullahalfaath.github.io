---
title: Data Structures and Algorithms Learning Log
date: 2026-08-04T14:46:00.000+07:00
lastmod: 2026-08-17T21:53:00.000+07:00
status: ongoing
tags:
  - algorithms
  - data-structures
  - learning
aliases: ["/lab-notebook/data-structures-and-algorithms-learning-log/"]
---
## Study Artefacts


Excalidraw mindmap: [https://excalidraw.com/#json=9peyf5js5-kSwihdWQWRR,iTcxPnsLYjl0Gh5cGyulMw ](https://excalidraw.com/#json=9peyf5js5-kSwihdWQWRR,iTcxPnsLYjl0Gh5cGyulMw) 


## Overview


This month, August 2026, I intend to relearn Data Structures and Algorithms from the Grokking Algorithms book. This is mainly because I want to practice my problem-solving abilities and find new hobbies by solving LeetCode problems xD.


## August 1st, Saturday


* I read Chapter 1, "Introduction to Algorithms," and Chapter 2, "Selection Sort." I finished the first chapter quite late since I had to re-learn logarithms first on Khan Academy based on the book's recommendation.
  ![Khan Academy Logarithms Lesson](screenshot-2026-08-04-145316.png "Khan Academy Logarithms Lesson")
* After finishing it, I returned directly to the book. Oh yeah, for this learning journey, I also use the PACER method from Justin Sung. I am quite fond of this book; I love the analogies and how the material is delivered.
* I also finished the binary search challenge on LeetCode!
* Phone book analogy:


  * Look up a **number** from a **name** → data sorted by name → can jump around, cut half each step → **O(log n)**
  * Look up a **name** from a **number** → not sorted by number → have to scan one by one → **O(n)**


  ```python
  def binary_search(arr, target):
      low, high = 0, len(arr) - 1
      while low <= high:
          mid = (low + high) // 2
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              low = mid + 1
          else:
              high = mid - 1
      return None
  ```
* Turns out it's not always black and white. "Find everyone whose name starts with A" is actually a **combination** of two strategies: binary search to find the starting point (O(log n)) + sequential scan to read through the group (O(k)). Total: O(log n + k).
* Small but important insight: real-world algorithms are often a **mix** of strategies, not one pure type.
* Every binary search step: data gets cut in half. The question: how many times do you halve it until only 1 is left?
  n = 8 → 4 → 2 → 1 (3 steps)
  That's exactly the definition of a log: **2^(steps) = n → steps = log₂(n)**
* The overlap between the Khan Academy logarithm material and Grokking Algorithms' complexity chapter turned out to be right here — same concept, showing up twice from different angles.
* Studying logs led me to compound interest. Turns out it connects too.


  ```
  A = P(1 + r/n)^(nt)
  ```


  If the question is "how long until my money doubles?" → t sits in the exponent → need a log to solve it.
* As compounding frequency increases (n → ∞), the limit converges to the number **e** (2.71828...). It doesn't grow to infinity — there are diminishing returns, because every time n doubles, the rate per period halves, but the "interest on interest" effect doesn't scale proportionally.
* Same pattern: "how many steps until something grows/shrinks to a certain size" — exactly the logic behind O(log n) complexity.
  | Notation | n = 100 |
  |---|---|
  | O(log n) | \~7 |
  | O(n) | 100 |
  | O(n log n) | \~700 |
  | O(n²) | 10,000 |
  | O(2ⁿ) | astronomical |
  | O(n!) | uncomputable |
  The gap between these notations is why algorithm choice matters — it's not about whether the code runs, it's about whether it scales.
* Chapter 1 looked simple but turned into a portal to a bunch of topics: logarithms, compound interest, NP-hardness. What actually stuck wasn't memorizing formulas, it was hitting the **why** — connections between concepts that initially looked unrelated.
* Concept mapping (PACER-style) helped a lot here — plotting binary search and linear search as branches of complexity, not separate topics.


## August 4th, Tuesday


I didn't continue since I have more important things to do (read my [dev log](/notebook/thalassemia-capture-app-dev-log/)). After finishing that project, I started reading the third chapter. However, I didn't finish; I only read 2 pages, hehe.


## August 9th, Sunday


I had been lazing around after my thesis proposal defense (6th August) for two days, Friday and Saturday. I got enough, maybe more than enough sleep :) And I just continued it today.


* DnC (Divide and Conquer) is maybe the most underrated technique in DSA. It is just simple; however, it can reduce time complexity the most.
* DnC (and its cousin, decrease-and-conquer) is a recursive approach, but true DnC splits the problem into independent halves, not just peels off one element at a time.
* I got a nice insight from the book. If we are working with arrays, to solve it using the DnC approach, first think that most of the time, the base case is either that the array is empty or has just one element.
* Example algorithms that use DnC are binary search, quicksort, and merge sort.


## August 13th, Thursday


I've been postponing this learning project since I have to do my thesis proposal revisions :" Finally, I have some time today to continue this learning journey.


* On August 9th, I only skimmed the quick sort part. So today, I re-read this.
* I noticed that quicksort isn't as abstract as I imagined before. It's just applying a pivot to divide an array into two subarrays: left (less than pivot) and right (more than pivot.
* Unlike the DnC I confused it with before (decrease-and-conquer, which just peels off 1 element), quicksort actually splits the array into 2 independent subarrays — though unlike merge sort, the split isn't guaranteed to be even, which is exactly why worst-case behavior depends on pivot choice.


## August 14th, Friday


This time I learnt the fifth chapter from the Grokking Algorithms book.


* I just learnt about hash functions that map strings into numbers. This number is actually used as an array index since reading an array is only O(1) complexity. 
* To prevent overflow from the array's maximum size, most hash functions use modulo. Refer to that by definition, modulo is x % n, where n is the array size. This returns a number that is always in the range of \[0, n-1] (inclusive).
* However, even though the array is always initially small (8 bytes), every time it reaches a certain threshold value, it doubles the array size. To calculate the threshold, we use a load factor: item filled / array length (in Python the threshold is around 0.66)
* Note that they always rehash evertime they resize.
* When I reimplement the two sums problems, note that always check first the current num exists in results. The key is the difference, while the value is the index


## August 17th, Monday


Today I learnt about Breadth-first search, the 6th chapter of the book. This is also my first time fully implementing the concept of non-linear note-taking, which I'll explain maybe in my next post.


* First, I asked Claude to break down this chapter into subtasks for my bullet journal. Deliberately, Claude separated it into three main subtasks (read, coding, and practice). 
* For my note-taking, I use Justin Sung's method for learning. Started from prepping my environment, then scoping by listing all the keywords. This is my keyword breakdown result.


  ![My list of keyword](screenshot-2026-08-17-210400.png "My list of keyword")
* After that, I "maybe map" by hypothesizing the connection between the keywords. 


  * In this step, I noticed that BFS is a graph algorithm. Each graph consists of nodes and edges, which can be directed or undirected. For directed graphs, there are in-neighbours and out-neighbours. 
  * We can actually represent a graph by using hash tables!
  * BFS travels level-by-level.
  * For node visits, we use a queue (First in, first out)
  * To prevent unlimited visits, we store visited nodes in a set. And check it every time we visit a new node. 
* For evaluation, I fix my previous mind map, that has a lot of clutters :)
* After the evaluation step, I raised three questions:


  * Why do we use queues instead of stacks?
  * How to implement BFS for undirected graph?
  * Can BFS work for weighted graph?
* After answering that questions, I went directly to  LeetCode to test my ability. I solved the problem no 102 "The binary tree level order traversal" 
