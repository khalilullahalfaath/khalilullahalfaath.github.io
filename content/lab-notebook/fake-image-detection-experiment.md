---
title: "Fake Image Detection Using Deep Learning"
date: 2026-01-15T10:00:00+07:00
lastmod: 2026-08-02T10:00:00+07:00
status: "completed"
tags: ["computer-vision", "deep-learning", "research", "resnet", "model-pruning"]
---

## Objective
Develop a deep learning model to detect AI-generated fake images with high accuracy, then optimize it for efficient deployment.

## Approach
- CNN architecture: ResNet-50 baseline
- Two-phase optimization: model pruning (10%, 20%, 30%, 40% ratios) followed by Optuna-driven hyperparameter tuning
- Dataset: combined GAN (140k Real/Fake Faces) and diffusion (SynthBuster) images, evaluated on the 140k test set
- Collaboration with Panji Tri Wahyudi and Ida Wahyuni (Institut Teknologi dan Bisnis Asia Malang)

## Results
- Baseline (unpruned) ResNet-50 accuracy: **95.48%**
- All fine-tuned pruned models (up to 40% sparsity) maintained up to **98.87%** performance
- Significant parameter reduction achieved with no loss in accuracy

## Outcome
This research was published in ICoBITS: **"Implementation of ResNet Architecture for Classification of Real and Synthetic (AI-Generated) Digital Images"** (DOI: [10.32664/icobits.v1.58](https://doi.org/10.32664/icobits.v1.58)). See the full write-up on the [Projects page](/projects/fake-image-detection/).

## Next Steps
- Integrate attention mechanisms (Multi-Head Self-Attention) to enhance feature extraction
- Test robustness against evolving generative techniques
