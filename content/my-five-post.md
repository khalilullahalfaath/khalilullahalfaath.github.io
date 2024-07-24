+++
title = 'My Five Post'
date = 2024-07-23T20:35:17+07:00
lastmod = 2024-07-23T20:35:17+07:00
draft = true
description = "This is a placeholder desc"
Image = ""
ImageBig = ""
categories = ["Music","Sport", "General"]
authors = "Khalilullah Al Faath"
mediumLink = ""
+++

# End-to-end Machine Learning Projects Codebase

This repository will be customized for my upcoming data science projects based on [this tutorial](https://www.youtube.com/watch?v=Rv6UFGNmNZg&list=PLZoTAELRMXVPS-dOaVbAux22vzqdgoGhG&index=2&pp=iAQB). I am using this tutorial to learn how ML projects were used in production. For machine learning steps and flow, I read [this book](https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/).

---

## Preface

### 1. Set up the github repository

#### Create a new environment

```bash
conda create -p {environment_name} python=={python_version} -y
```

```bash
conda activate venv/
```

#### Create setup.py

See this [docs](https://docs.python.org/3.11/distutils/setupscript.html). Setup.py is basically used to build the entire projects as a package.

```python
setup(
    name="end-to-end ml project",
    version="0.0.1",
    author="Aleeel",
    author_email="khalilullah.alfaath21@gmail.com",
    packages=find_packages(),
    install_requires=get_requirements("requirements.txt"),
)
# find_packages() will return all of the requirements needed. Above that define the function to get requirements from requirements.txt
```

> Note that each folder must have an __init__.py file so it can be detected as a package in this setup file.

#### Create requirements.txt

requirements.txt include all of the library needed to run the project. It ends with ``-e .`` to automatically trigger the setup.py to download and install those packages.

### 2. Create project /src and __init__.py file

### 3. Create project structures

The project's source code resides in the ```src``` directory. This directory is organized with key folders for specific functionalities to make the code clean.

<!-- markdownlint-disable code-block-style -->
```markdown
.
├── ... 
├── src  
│   ├── components  
│   │   ├── __init__.py 
│   │   ├── data_ingestion.py  # data acquisition and preprocessing
│   │   ├── data_transformation.py  # feature engineering and data preparation
│   │   ├── model_training.py  # training and evaluating machine learning models
│   │   ├── pipeline  # Pre-defined pipelines for common workflows
│   │   │   ├── __init__.py 
│   │   │   ├── predict_pipeline.py  # creating and executing prediction pipelines
│   │   │   └── train_pipeline.py  #creating and executing training pipelines
│   │   ├── __init__.py 
│   │   ├── exception.py  # Custom exceptions for project-specific machine learning errors
│   │   ├── logger.py  # structured logging during training, evaluation, and deployment
│   │   └── utils.py  # Helper functions
├── venv  # Virtual environment directory
├── .gitignore  
├── README.md  # Project documentation (purpose, usage instructions, dependencies)
├── requirements.txt  # Text file listing project dependencies for easy installation
└── setup.py  # Script for packaging and distributing the project
```

Description:

- __src__ directory: Houses the core, well-structured source code for the machine learning project.
- __components__ subdirectory: Contains reusable Python modules for various aspects of the machine learning workflow.
- `__init__.py` files (optional): Can be used to establish these directories as Python packages, allowing for organized imports.
- __data_ingestion.py__: Defines functions for acquiring data from various sources and performing any necessary preprocessing steps.
- __data_transformation.py__: Implements methods for feature engineering and data preparation, ensuring data is suitable for machine learning algorithms.
- __model_training.py__: Encapsulates functions for training and evaluating various machine learning models. Includes mechanisms for data loading, splitting, training, and performance assessment.
- __pipeline__ subdirectory (optional): Houses pre-defined pipelines for common machine learning workflows (e.g., training, prediction) to promote code efficiency and maintainability.
  - `predict_pipeline.py`: Encapsulates the logic for creating and executing prediction pipelines, enabling inference on new data.
  - `train_pipeline.py`: Defines functions for creating and executing training pipelines, encompassing data loading, training, evaluation, and potentially model saving.
- __exception.py__: Defines custom exceptions specifically related to the project's machine learning operations for more informative error handling.
- __logger.py__: Provides structured logging functionalities during training, evaluation, and deployment, allowing for debugging, monitoring, and analysis.
- __utils.py__: Contains helper functions for common tasks across different parts of the project, promoting code reusability.
- __venv__ directory: If using virtual environments for dependency management, this directory would contain the isolated environment for the project.
- __.gitignore__ file: Specifies files or patterns to be excluded from version control using Git, keeping the repository clean and avoiding unnecessary commits for files like configuration settings or temporary data.
- __README.md__ file: Provides essential documentation for the project, including its purpose, usage instructions, dependencies, and any relevant setup steps.
- __requirements.txt__ file: Lists the project's external dependencies, enabling easy installation and replication of the project's environment.
- __setup.py__ file (optional): If the project is intended for distribution or reusability, this script can be used to package it as a Python library.
<!-- markdownlint-restore -->

### Flow

1. Look at the big picture
2. Get the data
3. Explore and visualize the data to gain insights
4. Prepare the data fro machine learning algorithms
5. Select a model and train it
6. Fine-tune the model
7. Present the solution
8. Launch, monitor, and maintain the system

#### 1. Look at the big picture

As a data scientist, I'm interested in using house pricing as a problem to develop a predictive model. This model can unlock valuable insights into the real estate market.The data taken by scraping [this web](https://www.rumah123.com/), the code for scraping will be provided. This data is expected to encompass metrics such as location, house features (e.g., number of bedrooms, bathrooms, square footage), price, and land/building area.

##### Frame the problem

The aim of this project is "to construct __a multiple regression model__ that learns from the scraped data. This model should be able to predict the asking price of a house based on the provided features (such as bedrooms, bathrooms, and area) and location."

It is s a supervised learning task and a multiple regression problem because this model will use multiple features to make a prediction. In the other hand, this is a univariate regression problem because I want to predict a single value for each house.

##### Select a Performance Measure

Performance measures for this problem is:

1. RMSE (_root mean square error_)
$$RMSE = \sqrt{\frac{\sum_{i=1}^{n} (y_i - \hat{y}_i)^2}{n}}$$

where:

- $n$ is the number of samples
- $y_i$ is the actual value for sample $i$
- $\hat{y}_i$ is the predicted value for sample $i$

2. If outlier is expected, we should also consider MAE (_mean absolute error_)
$$MAE = \frac{\sum_{i=1}^{n} |y_i - \hat{y}_i|}{n}$$

where:

- $n$ is the number of samples
- $y_i$ is the actual value for sample $i$
- $\hat{y}_i$ is the predicted value for sample $i$

##### Check the assumptions

- Some features need to be transformed, such as the house pricing and the area which are in the data represented as a string.
- Some value are missing so we need to do something

##### Summary

- __Goal__: Develop a model to predict house asking prices based on scraped data.
- __Data__:
  - Scraped from a website (legality and ethics to be considered).
  - Includes location, house features (bedrooms, bathrooms, area), price (string), and land/building area (string).
  - Missing values require attention (imputation or removal).
- __Model__:
  - Multiple regression due to multiple features used for prediction.
- __Performance__:
  - RMSE evaluates prediction accuracy.
  - MAE might be considered for potential outliers.
- __Data Preprocessing__:
  - Transform price and area from strings to numbers.
  - Address missing values.
- __Additional Considerations__:
  - Explore feature engineering for better model performance.
  - Be aware of potential biases in scraped data and how to address them.
- __Outcome__: A robust model to estimate house prices based on available features.

#### 2. Get the data

The data we used on this project is a scraped data from website <www.rumah123.com>. After completing the scraping process, we then cleaning the data as seems on <notebooks/cleaning.ipynb>

#### 3. Explore and visualize the data to gain insights

Then we visualize the data. For the full exploration and visualization. I've created
