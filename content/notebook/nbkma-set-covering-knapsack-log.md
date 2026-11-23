---
title: Native Binary KMA on Set Covering and Knapsack
date: 2026-11-20T09:00:00+07:00
lastmod: 2026-11-23T20:00:00+07:00
status: ongoing
tags:
  - metaheuristics
  - feature-selection
  - research
  - publication
aliases: ["/lab-notebook/nbkma-set-covering-knapsack-log/"]
description: Dropping the transfer function entirely and operating on bit vectors directly produced a variant that wins on set covering and knapsack, and loses the feature-selection advantage it was designed for.
---

**Project:** A native binary Komodo Mlipir Algorithm
**Period:** ~November 20 - 23, 2026
**Scope:** three problem classes, 25 compute parts, about 605 hours of process time

This is the second paper from the same logbook. The first kept the continuous algorithm and put a transfer function in front of it; this one drops the transfer function and works on bit vectors directly, then tests on combinatorial problems instead of feature selection.

## November 20, 2026: The native variant, initialization, and a fairness test

- The native variant passed its pilot gate with a small population and no transfer function.
- A 560-run ablation of its parts found only repositioning significant (Holm 0.040), and that vanished across 23 datasets (Holm at 0.75 or above).
- Caching mask evaluations saved about 35% of wall time.
- The variant failed to shrink subsets on high-dimensional data: 13.7% of features kept against 1.6% for the transfer-function version.
- Sparse log-uniform initialization lifted high-dimensional validation by 0.046 across 10 of 10 datasets (p = 0.002), test by 0.016 (p = 0.049), and cut the selected subset by 2 to 10x (975 down to 102 features on one dataset). A denser variant scored better in tuning and lost 0.024 on low-dimensional test, so the sparser one was kept.
- Fairness test: give the two published comparators the same initialization and the advantage disappears (Holm at 0.34 or above). What survives is a win over a (1+1) evolutionary algorithm.
- Per-role operators failed their gate (validation +0.0020, p = 0.82). Improvements moved from the big-male role (6.8 to 25.7) to the small-male role (3.1 to 0.9) with no change in the final result, so the roles substitute for each other.
- First combinatorial results at 1,000 evaluations: set-covering gap 4.22% against 5.51 (winning 38 of 45); knapsack 1.40 against 1.64 (winning 243 of 270). The initialization that helped feature selection hurt here, against the hypothesis.

## November 21, 2026: A first draft and a framing question

A draft went to 6 pages with 20 citation placeholders. The initial framing picked the best initialization per algorithm, which is symmetric but chosen after seeing the results, so it was flagged for revision.

## November 22, 2026: The coverage bug

- Nineteen compute parts finished, about 605 hours of process time, and the evaluation counters came out exact. The result set held 91,800 rows and looked complete, but only 210 of 270 knapsack instances were in it, because the run planner filtered to one CPU type when it estimated runtimes. Six extra parts closed the gap and an assertion now enforces full coverage.
- Framing decision: one paper, combinatorial problems first, feature selection as the third problem with an explicitly mixed result. Splitting feature selection into its own paper would reuse the same method, code, and protocol, which reads as salami slicing. Dropping it silently would be selective reporting, since it was designed first.

## November 23, 2026: Final numbers and the manuscript

- All 25 parts finished. Set covering: gap 1.91 against 4.15 for the best comparator, winning 42 of 45. Knapsack: 0.936 against 1.196, winning 193 of 270. All Holm-corrected p below 1e-4.
- The log-initialized variant ties the (1+1) evolutionary algorithm on knapsack (p = 0.27) and beats the rest. Best average in 7 of 9 knapsack instance classes.
- A 3,840-row replication check came out identical run by run, so the sensitivity table was dropped rather than published as new evidence.
- Manuscript: title reordered, abstract at 245 words, 7 to 8 pages, a limitations paragraph stating that nothing in the ablations shows the algorithm's structure causes the advantage, plus a no-free-lunch paragraph. One bibliography entry was added but not yet cited, because the paper behind it has not been read.

## Where it stands

- Open: citation placeholders, the uncited bibliography entry, and the gap to dedicated solvers. The comparators are generic binary metaheuristics, and a 1.9% set-covering gap is far from the state of the art.
