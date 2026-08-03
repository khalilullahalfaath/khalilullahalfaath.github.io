---
title: "Fake Image Detection: ResNet-50 Classification of AI-Generated Images"
date: 2026-08-02T10:00:00+07:00
icon: "🧠"
status: "completed"
role: "Researcher"
period: "August 2025 – December 2025"
tech: ["ResNet-50", "PyTorch", "Model Pruning", "Optuna", "CNN"]
links:
  - label: "Read Paper"
    url: "https://doi.org/10.32664/icobits.v1.58"
description: "Published research on pruning and hyperparameter-tuning ResNet-50 to detect AI-generated (deepfake) images with no loss in accuracy."
---

Published as **"Implementation of ResNet Architecture for Classification of Real and Synthetic (AI-Generated) Digital Images"** in ICoBITS (International Conference on Business, Information Technology, and Science).

**Authors:** Panji Tri Wahyudi (Institut Teknologi dan Bisnis Asia Malang), Ida Wahyuni (Institut Teknologi dan Bisnis Asia Malang), Khalilullah Al Faath (Universitas Gadjah Mada)

**DOI:** [10.32664/icobits.v1.58](https://doi.org/10.32664/icobits.v1.58)

## Abstract

The development of Artificial Intelligence (AI) enables the creation of realistic synthetic images, often referred to as deepfakes, which are increasingly difficult to distinguish from genuine photos. This poses significant social threats, such as disinformation and conflict provocation, making robust, efficient detection mechanisms urgent. While prior research has utilized various CNNs, including lighter variants like ResNet-18, achieving higher accuracy often requires deeper, computationally more expensive models, such as ResNet-50. A critical gap exists in optimizing these powerful, deeper architectures for efficient deployment without substantial performance loss.

To address this, our study classifies AI-generated images using a ResNet-50 baseline, followed by a two-phase optimization. Initially, model pruning is applied at ratios of 10%, 20%, 30%, and 40% to reduce complexity. Subsequently, Optuna-driven hyperparameter tuning systematically fine-tunes these pruned models, aiming to recover accuracy and balance performance with model size. Models were trained on a combined dataset of GAN (140k Real/Fake Faces) and diffusion (SynthBuster) images, and evaluated on the 140k test set.

The baseline model achieved 95.48% accuracy. Critically, all fine-tuned pruned models (up to 40% sparsity) successfully maintained up to 98.87% performance. This research demonstrates that significant parameter reduction can be achieved with no loss in accuracy, producing a robust and computationally efficient detection model.

**Future work** includes integrating attention mechanisms, such as Multi-Head Self-Attention (MHSA), to potentially enhance feature extraction and robustness against evolving generative techniques.

**Keywords:** ResNet50, Model Pruning, AI-Generated Images, Optuna, Convolutional Neural Network, Synthetic Image Classification

---

See the [related lab notebook entry](/lab-notebook/fake-image-detection-experiment/) documenting the earlier experimentation phase of this research.
