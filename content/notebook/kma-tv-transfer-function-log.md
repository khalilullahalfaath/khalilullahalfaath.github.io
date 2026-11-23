---
title: Time-Varying Transfer Functions in the Binary Komodo Mlipir Algorithm
date: 2026-11-17T09:00:00+07:00
lastmod: 2026-11-21T18:00:00+07:00
status: ongoing
tags:
  - metaheuristics
  - feature-selection
  - research
  - publication
aliases: ["/lab-notebook/kma-tv-transfer-function-log/"]
description: A time-varying transfer function for the binary Komodo Mlipir Algorithm was tested against sixteen static variants on twelve datasets, and the schedules mostly failed to separate from their static counterparts.
---

**Project:** Time-varying transfer functions for the binary Komodo Mlipir Algorithm
**Period:** ~November 17 - 21, 2026
**Scope:** 12 datasets, 33 variants, 15 seeds per cell, 5,940 runs in the main grid

Fitness is `0.99 * error_rate + 0.01 * selected/total`, measured with a k-nearest-neighbour classifier at k=5 under a 1,000-evaluation budget. Every variant is judged on validation accuracy first, then confirmed on test with a family-wise correction.

## November 17, 2026: Setup and the decision to disable stage two

The comparison pits sixteen static transfer functions against sixteen time-varying ones. The static set is S1 to S4 and V1 to V4, each crossed with the Standard and the Elitist position-update rule. The time-varying set applies the same functions on a schedule that shrinks with the run.

- k-nearest-neighbours at k=5 was chosen as the classifier because RandomForest cost about 13x more per evaluation at the same budget.
- Stage two of the algorithm was switched off on purpose. At its default growth it builds and evaluates roughly 390 individuals per run that never enter the evaluation counter and never move, so a run that looks like 1,000 evaluations has evaluated more than that.
- The Elitist rule needs a reference mask to decide which features to keep. Three readings of the reference mask were tried: the all-time reading collapses the selected subset to about two features, so the per-generation reading was kept.
- Two pilots ran before the main grid: 509 runs on raw features, 750 on min-max scaled features.

## November 18, 2026: Full run, the tau_max ablation, and the mechanism

The main grid finished in about 3.55 hours on 4 workers.

- Sigmoid schedules showed no difference from their static counterparts (p = 0.30).
- The V-shaped family at the paper's `tau_max = 4` was worse: p = 0.0002, and -0.0116 validation accuracy on the Elitist rule.
- A `tau_max` ablation moved validation accuracy by +0.0015, -0.0070, -0.0118, and -0.0173 for `tau_max` 0.5, 1, 2, and 4. Smaller `tau` walks the variant back toward static, and the published value is the worst of the four. The 0.5 setting was picked after seeing the data, and the manuscript says so.
- Replication against the published tables came out weak: 204 cells, rank correlation 0.10 (p = 0.70), one dataset off by 0.19.
- The mechanism explains the gap. `tau` shrinks about 400x across a run while the algorithm's own step shrinks only 2 to 3x, so the ratio that sets bit probability rises instead of falling. Selected-feature density climbs to 0.4 to 0.8 in the last fifth of the run. The static V-shaped variant that reads `d` as movement is the only one that goes from exploration to exploitation, 0.23 to 0.04.
- A diagnostic killed a planned 27-dataset run before it started. With `d` read as movement, 94.7% of bins land at probability 0.45 to 0.55 and the sharpness measure sits at 0.07 to 0.11, so every bit is a coin flip.
- Population adaptation was tested and dropped. 389 second-stage generations produced one shrink and one grow, because k-nearest-neighbour fitness is a staircase, not a smooth surface. Two grids (16 settings x 384 runs, then 640 runs) did not beat the MATLAB default.
- A fresh-seed check on seeds 15 to 29 repeated the whole grid: validation +0.0037 (p = 0.0005), test p = 0.093. The pilot advantage came from one dataset.

## November 19, 2026: Population 5, the confirmation run, and two failed gates

Population 5 replaced the main setup because it is the original algorithm's own design: 40 stage-one generations plus 20 to 40 stage-two generations, `tau_max` 0.5.

- Hamming diversity moved as intended for one family (0.50 to 0.31) and backwards for the other (0.07 to 0.40).
- Confirmation ran on 27 datasets, seeds 30 to 59, in two waves. Across eight Holm-corrected tests only one variant survived: test +0.0051, winning 22 of 27 (Holm 0.007), validation +0.0053 (Holm 0.021).
- An ablation removed the transfer function entirely, 1,620 runs. No transfer function beat the identity mapping on test at any threshold, all Holm at 0.91 or above.
- Two gates failed in a row. A ramp rule interpolating between the static rules failed. A step-calibrated schedule did move the mechanism, probability 0.33 to 0.08, and still produced nothing (validation -0.0003, p = 0.79; test +0.0010, p = 0.88).
- Population 5 beat the published binary algorithm by +0.0091 (Holm 0.010).

## November 21, 2026: Equivalence, budget accounting, and a claim withdrawn

- Non-significance is not equivalence. Two one-sided tests at a +/-0.01 margin: 4 of 4 families equivalent for the first research question, 29 of 32 for the second.
- The comparison against two published binary optimizers failed equivalence, because one dataset separates them: the comparator wins 24 of 30 runs at p = 1.8e-5, always selecting exactly 6 features. The equivalence claim was removed from the abstract.
- Budget audit: the harness reported about 1,042 evaluations while the fitness function was called about 1,212 times, 21% more. The manuscript was corrected.
- The time-varying effect reproduces on the comparator's own host, so the single-host threat was dropped.

## Where it stands

- Done: the manuscript compiles, the abstract is inside the word limit, and the reference list is complete.
- Open: citation placeholders remain, and the full two-stage configuration is still unrun.
