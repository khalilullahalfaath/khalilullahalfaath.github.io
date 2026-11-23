---
title: Porting the Komodo Mlipir Algorithm to Python
date: 2026-11-17T10:00:00+07:00
lastmod: 2026-11-20T00:10:00+07:00
status: ongoing
tags:
  - metaheuristics
  - python
  - research
  - software
aliases: ["/lab-notebook/kma-python-port-log/"]
description: A MATLAB metaheuristic was ported to Python, checked against the original on 23 benchmark functions, and reshaped into a subclassable core so the binary variants could stop copying it.
---

**Project:** Komodo Mlipir Algorithm, Python implementation
**Period:** March 2024, then November 17 - 20, 2026
**Repository:** [github.com/khalilullahalfaath/Komodo-Mlipir-Algorithm](https://github.com/khalilullahalfaath/Komodo-Mlipir-Algorithm)

Package `kma` 0.1.0, `requires-python >= 3.10`, one runtime dependency (numpy), 582 lines across five modules, 11 tests. The repo starts as a 2024 scaffolding and sits untouched for two and a half years before it becomes the shared core for two papers.

![Component structure of the kma package: the core keeps the movement loops, subclasses supply the search space, operators, and movement steps.](/images/kma-python-port-architecture.svg "The core owns the loops; every variant is a subclass")

## March 25, 2024: Scaffolding

Seven commits in one day, and then nothing until 2026.

- Benchmark function lookup returning bounds, dimension, and known optimum per function id.
- A constructor and population initialization.
- The Python version floor set to 3.10.

## November 17, 2026: The port, and the comparison that justified it

- The main algorithm and all 23 benchmark functions were ported from `KMA2D.m`, 645 lines of MATLAB, with the plotting stripped. Fitness evaluation and the two stages were kept as they were.
- A comparison harness was built in the same commit series: a script that generates two MATLAB variants from the original folder, a `matlab -batch` runner, a Python runner, a function-value checker, and a comparator. 30 runs per function, dimension 50 for F1 to F13, 25,000 evaluations, MATLAB R2020a.
- Two MATLAB variants exist because the original cannot run as shipped. `Evaluation.m` labels Foxholes as `case 16`, so F14 errors out and F16 silently becomes Foxholes. That label was changed to `case 14` to get a working reference.
- The second variant fixes a real bug in `KMA2D.m`. The loop over micro-swarms steps `ind` by the swarm size, 5, but each swarm contributes only `NumBM` rows, 2, so `AllHQ(ind:ind+NumBM-1,:)` writes into rows 1-2, 6-7, 11-12 and leaves the rows in between as zeros. `AllHQ` is the set of big males the small males follow, so those zero rows become the origin, and the origin becomes an attractor. The Python port indexes correctly.
- Function values agree to 5.80e-15 relative difference across 110 points, with F7 excluded because it contains `rand`. The port computes the same functions, so the remaining differences come from the search, not from the function evaluation.
- Python against the fixed MATLAB: no significant difference on 22 of 23 functions, and F8 at p = 0.022 does not survive correction across 23 tests. Python against the original: significant differences on F7, F8, F12, and F13, all in the original's favour, all explained by the `AllHQ` bug.
- Evaluation counts match. One deviation: on F9 two of 30 MATLAB runs entered stage two and no Python run did. That is random variation in a branch, not a porting error.
- Wall time per run: Python 2.43 s, fixed MATLAB 3.03 s, original 3.08 s.
- The same commits turn the code into a package with subclass hooks and MATLAB-derived reference tests for the initial population and the initial fitness values.

## November 18, 2026: Hooks for the noisy case

- `num_eva` was exposed as an attribute so a fitness hook can read search progress `t/T` from the first evaluation, which lets the binary variants build time-varying transfer functions without touching the loop.
- Stage-two adaptation was given an explicit step (`adaptive_step`, default the population size as in MATLAB) and four options for noisy fitness: `init_adaptive_size`, `max_improve`, `max_stagnan`, `count_fill_evals`, with defaults equal to the MATLAB behaviour.
- Stage two in the original grows the population up to 40x and evaluates the newcomers without counting them. That is fine on a smooth benchmark and wrong on a staircase fitness like k-nearest-neighbour accuracy. The options let a caller make that trade explicitly instead of editing the algorithm.

## November 20, 2026: Separating the movement steps from the loops

- Four movement steps were extracted as hooks: `_attract`, `_distract`, `_mlipir`, `_sexual`. A move accumulates a step over the followed males and returns the new position, so a bit-vector variant overrides the step instead of the loop that calls it.
- On the continuous benchmark the change is bit-identical, which is the evidence that it changes nothing.
- The result is a three-layer hook surface. Search-space hooks (`_setup_problem`, `fitness`, `trim`) adapt the objective. Operator hooks (`generate_population`, `_crossover`, `_mutation`, `_add_individual`, `_reposition`) adapt the representation. Movement hooks adapt the step. A binary variant subclasses all three layers and keeps `run()`.

## Where it stands

- Published and used as the core for two papers, one on transfer functions and one on combinatorial problems.
- Open: the second stage is still untested at the budget the papers use, and the comparison harness only covers the continuous benchmark. A binary-space equivalence check does not exist yet, because the binary variant lives in a separate repo.
