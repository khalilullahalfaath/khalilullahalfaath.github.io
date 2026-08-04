---
title: Data Structures and Algorithms Learning Log
date: 2026-08-04T14:46:00.000+07:00
lastmod: 2026-08-04T14:46:00.000+07:00
status: ongoing
tags:
  - algorithms
  - data-structures
  - learning
---
 
This month, August 2026, I intend to re-learn Data Structures and Algorithms from the Grokking Algorithms book. This is mainly because I want to practice my problem-solving abilities and find new hobbies by solving LeetCode problems xD.
 
## August 1st, Saturday
 
- I read Chapter 1, "Introduction to Algorithms," and Chapter 2, "Selection Sort." I finished the first chapter quite late since I had to re-learn logarithms first on Khan Academy based on the book's recommendation.
  ![Khan Academy Logarithms Lesson](screenshot-2026-08-04-145316.png "Khan Academy Logarithms Lesson")
- After finishing it, I returned directly to the book. Oh yeah, for this learning journey, I also use the PACER method from Justin Sung. I am quite fond of this book; I love the analogies and how the material is delivered.
- I also finished the binary search challenge on LeetCode!
- Phone book analogy:
  - Look up a **number** from a **name** → data sorted by name → can jump around, cut half each step → **O(log n)**
  - Look up a **name** from a **number** → not sorted by number → have to scan one by one → **O(n)**
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
 
- Turns out it's not always black and white. "Find everyone whose name starts with A" is actually a **combination** of two strategies: binary search to find the starting point (O(log n)) + sequential scan to read through the group (O(k)). Total: O(log n + k).
- Small but important insight: real-world algorithms are often a **mix** of strategies, not one pure type.
- Every binary search step: data gets cut in half. The question: how many times do you halve it until only 1 is left?
  n = 8 → 4 → 2 → 1 (3 steps)
  That's exactly the definition of a log: **2^(steps) = n → steps = log₂(n)**
- The overlap between the Khan Academy logarithm material and Grokking Algorithms' complexity chapter turned out to be right here — same concept, showing up twice from different angles.
- Studying logs led me to compound interest. Turns out it connects too.
  ```
  A = P(1 + r/n)^(nt)
  ```
 
  If the question is "how long until my money doubles?" → t sits in the exponent → need a log to solve it.
- As compounding frequency increases (n → ∞), the limit converges to the number **e** (2.71828...). It doesn't grow to infinity — there are diminishing returns, because every time n doubles, the rate per period halves, but the "interest on interest" effect doesn't scale proportionally.
- Same pattern: "how many steps until something grows/shrinks to a certain size" — exactly the logic behind O(log n) complexity.
  | Notation | n = 100 |
  |---|---|
  | O(log n) | ~7 |
  | O(n) | 100 |
  | O(n log n) | ~700 |
  | O(n²) | 10,000 |
  | O(2ⁿ) | astronomical |
  | O(n!) | uncomputable |
  The gap between these notations is why algorithm choice matters — it's not about whether the code runs, it's about whether it scales.
- Chapter 1 looked simple but turned into a portal to a bunch of topics: logarithms, compound interest, NP-hardness. What actually stuck wasn't memorizing formulas, it was hitting the **why** — connections between concepts that initially looked unrelated.
- Concept mapping (PACER-style) helped a lot here — plotting binary search and linear search as branches of complexity, not separate topics.
## August 4th, Tuesday
 
I didn't continue since I have more important things to do (read my [dev log](https://khalil-lab.netlify.app/lab-notebook/thalassemia-capture-app-dev-log/)). After finishing that project, I started reading the third chapter.