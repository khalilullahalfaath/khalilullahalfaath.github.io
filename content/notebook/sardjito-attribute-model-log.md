---
title: "Teaching the Model Cell Size: The Sardjito Attribute Experiment"
date: 2026-11-23T11:00:00+07:00
lastmod: 2026-11-23T23:00:00+07:00
status: ongoing
tags:
  - thalassemia
  - computer-vision
  - medical-ai
  - dataset
aliases: ["/lab-notebook/sardjito-attribute-model-log/"]
description: The classifier reached 0.51 accuracy while the detector reached 0.99 mask recall, so the experiment moved from 16 morphology classes to three measured attributes taken from the mask itself.
---

**Project:** Attribute-based cell classification on Sardjito smears
**Period:** November 23, 2026
**Labels:** 15,064 doctor-labelled cells

Part of the [Thalassemia Edge Deep Learning Model](/projects/thalassemia-edge-deep-learning-model/) project. The experiment moved to its own repository and to Kaggle rather than rented GPUs, and it covers size, color, and shape against the columns the hematologist actually fills in.

## November 23, 2026

### Why this exists

- Mask recall was 0.99 against class accuracy 0.51. The detector finds the cells; the classifier cannot name them, and the cause turned out to be the input representation rather than the model.
- The crop that feeds the classifier resizes every cell to the same square, so the size-defined classes are destroyed before the model sees them.

### Auditing 15,064 doctor labels

- Size: 8,489 normocytes, 5,474 microcytes, 93 macrocytes, and 1,007 cells with no size at all.
- Color: 6,013 normochromic, 3,300 hypochromic, 5,749 empty. Eight of sixteen batches wrote only the hypochromic finding, so an empty field means something different depending on who filled it. The share of hypochromic cells per batch ranges from 1% to 70%.
- Shape: 3,024 cells with one shape, 3 cells with two.

### Deciding the rules

- The per-batch reading of empty color was first kept, then reversed to a single rule: empty means normochromic everywhere, with the per-batch reading kept only as a sensitivity analysis.
- Size is measured from the mask three ways: an absolute diameter threshold as the primary (the clinical convention), a threshold relative to the median cell in the same field of view (how a slide is read at a glance), and a logistic combination. The absolute one leads because a relative threshold suppresses microcytosis in severe patients, where the median cell shrinks too.
- Microcyte against everything else, with macrocyte kept descriptive because 93 cells cannot carry a class. Shape threshold fixed at 0.5.

### Linking labels to masks

- 14,528 of 14,878 doctor cells matched to a segmentation mask, 97.6%. The misses were counted: 208 unreadable cell numbers, 83 marks on background, and 29 masks carrying a doubled mark.
- The derived class agreed with the existing 16-class annotation for 99.5% of cells, which is what makes the two datasets comparable.

### Protocol fixed before any training

- Thresholds chosen by Cohen's kappa on the training split, not on validation.
- Evaluation restricted to cells matched at IoU of 0.5 or above, and the ground-truth-mask oracle reported separately from the predicted-mask result, so a segmentation error never hides inside a classification number.

## Where it stands

- No model code and no run yet. The implementation plan is written and awaiting review.
- Thresholds uncalibrated, per-attribute metrics unreported, and the label policy for the 3 two-shape cells still open.
