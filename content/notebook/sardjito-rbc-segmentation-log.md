---
title: "Segmenting Red Blood Cells from Sardjito Smears: Three Model Families"
date: 2026-11-23T09:00:00+07:00
lastmod: 2026-11-23T21:00:00+07:00
status: ongoing
tags:
  - thalassemia
  - computer-vision
  - medical-ai
  - deep-learning
  - dataset
aliases: ["/lab-notebook/sardjito-rbc-segmentation-log/"]
description: Three model families were trained on the same Sardjito red blood cell data under one evaluator, and the segmentation came out nearly solved while the classification stayed the bottleneck.
---

**Project:** Red blood cell segmentation and morphology classification on Sardjito smears
**Period:** November 23, 2026
**Data:** 157 images, 14,590 masks, 16 morphology classes

Part of the [Thalassemia Edge Deep Learning Model](/projects/thalassemia-edge-deep-learning-model/) project. Three families were compared on identical data and scored by one evaluator: RF-DETR Seg, YOLO-seg, and a two-stage Cellpose plus ConvNeXt pipeline.

## November 23, 2026

### Setup and data

- 4,891 unlabeled cells were overwritten with background. That suits a detector, but it changes what the model can learn about absence, and it is recorded as a limitation.
- Five folds split by patient, 38 / 30 / 30 / 39 / 20 images, so no patient appears in both training and test. All 16 classes appear in at least 3 test folds. The smallest fold was left small rather than hand-tuned.
- One evaluator for all three families, so the three scores share one scoring convention.

### Building the evaluator

- The first mask-to-run-length conversion took 75.9 s per image at 4100x3075. Encoding once instead of per class dropped it to 19.5 s; building the encoding straight from each mask's bounding box dropped it to 1.0 s. A fold's evaluation went from about 48 minutes to about 3.
- Mean average precision was capped at 100 detections per image while 45 images hold more than 100 cells, so the cap was raised to 1000.

### Evening: smoke runs and four infrastructure failures

- The GPU sat at 0% for over ten minutes while two dataloader workers ran at 100% CPU. Worker count now derives from the container's CPU quota, and an epoch went to about 3 minutes.
- Out-of-memory came from the model's own validation at full resolution, not from training, and one argument fixed it.
- A 1.15 GB pretrained weight file was truncated by a slow link and saved under its final name, producing a corrupt-archive error that took a whole session to diagnose. Downloads now resume.
- Two smaller ones: a GUI OpenCV package pulled in alongside the headless one broke imports on an image with no X11, and installing PyTorch dependencies on an image that already had PyTorch downloaded several gigabytes of it again.
- An archiving step failed with a file-changed-while-reading error, because the archive was being written inside the directory it was packing.

### Overnight: one threshold for two different scores

- The two-stage model scored each instance with a 16-class softmax probability that peaked at 0.236, so at a 0.5 threshold every metric read zero, including the oracle run on ground-truth masks. An upper bound cannot be zero, which is what exposed the bug.
- Fix: score each instance by the segmentation model's own mask confidence (median 0.968) and take the class from the classifier. Two extra metrics were added: score times class probability, and an F1 threshold chosen on 10 validation images per fold.

### The full runs

- Two-stage across five folds: mAP50-95 0.230 +/- 0.036, F1 micro 0.441 +/- 0.068, F1 macro 0.344 +/- 0.022, mask recall about 0.99. Segmentation is nearly solved; the error is in classification.
- Fold 0 detail: 0.215 by mask score, 0.246 once weighted by class probability. The added-data variant reached 0.240 and F1 0.551 over 13 classes.

### The flaw found after the run

- The classifier crops each cell with a proportional margin and resizes to 128x128, so a microcyte and a normocyte arrive at the same size. The size-defined classes cannot be learned from that crop.
- The run was left as is and recorded as a baseline limitation. The fix became a separate experiment, measuring size from the mask instead.

### Operations

- One instance disappeared from the provider dashboard while the machine was still running. Periodic checkpoints pushed to remote storage were the only evidence of progress, which is why it was not destroyed.
- A stale terminal keystroke launched a stray 15-minute run. Clear the input line before sending keys.

## Where it stands

- Not run: knowledge distillation and compression, both waiting on the best model from this wave.
- Limits recorded: one seed per fold, rare classes with 14 to 27 instances, and a comparison that is not fair on the size-defined classes.
