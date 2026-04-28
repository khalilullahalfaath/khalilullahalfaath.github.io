---
title: "Fake Image Detection Using Deep Learning"
date: 2026-01-15T10:00:00+07:00
status: "ongoing"
tags: ["computer-vision", "deep-learning", "research"]
---

## Objective
Develop a deep learning model to detect AI-generated fake images with high accuracy.

## Approach
- Using CNN architecture (ResNet50 as baseline)
- Dataset: Mix of real images and AI-generated (DALL-E, Midjourney)
- Training on 10k images, validation on 2k

## Current Results
- Baseline accuracy: 78%
- False positive rate: 12%

## Next Steps
- Try transfer learning with EfficientNet
- Augment dataset with more diverse fake images
- Implement attention mechanisms

## Notes
The model struggles with high-quality AI generations. Need to focus on subtle artifacts.
