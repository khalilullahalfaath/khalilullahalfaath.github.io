---
title: "Sentiment Analysis on Indonesian Text"
date: 2025-11-20T09:00:00+07:00
status: "failed"
tags: ["nlp", "sentiment-analysis", "indonesian"]
---

## Objective
Build sentiment classifier for Indonesian social media text.

## Approach
- Used pre-trained IndoBERT
- Fine-tuned on Indonesian Twitter dataset
- 3-class classification (positive/neutral/negative)

## Results
- Accuracy: 65% (below target of 80%)
- Model confused by slang and mixed language

## Why It Failed
- Dataset too small (only 5k samples)
- Lots of code-switching (Indonesian + English)
- Slang words not in pre-trained vocabulary

## Lessons Learned
Need larger, more diverse dataset. Consider data augmentation or semi-supervised learning.
