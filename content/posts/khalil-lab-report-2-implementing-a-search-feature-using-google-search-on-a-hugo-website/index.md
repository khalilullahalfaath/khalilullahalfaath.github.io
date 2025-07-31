---
title: "Khalil-lab Report 2: Implementing a Search Feature using Google Search
  on a Hugo Website"
date: 2025-07-29T02:56:00.000+08:00
lastmod: 2025-07-31T23:49:00.000+08:00
draft: false
math: true
description: This is a short tutorial on how I implemented the search button on this site
---
# Overview

This lab documents the step-by-step process of adding a client-side search functionality to a Hugo-powered static site using **Pagefind**, a privacy-focused, JavaScript-based search library.

Before choosing Pagefind as my tool for this search feature, I found [this article](https://gohugo.io/tools/search/) on Hugo's official docs. The official documentation for Pagefind has already done a great job of writing the tutorial; however, since there's no specific tutorial for Hugo, I thought I might try writing one. 


## Tools and Technologies

- [Hugo](https://gohugo.io/) (Static Site Generator)
- [Pagefind](https://pagefind.app/) (Search library)
- Netlify (Deployment target)


## File Structure

```bash
layouts/_default
  └── search.html   # Custom layout for the search page (if search.md in /content)
content/
  └── search.md     # Markdown file using the "search" layout
```


## Step-by-Step Instructions

### 1. Create Search Page Markdown

Create a file at `content/search.md`:

```markdown
---
title: "Search"
layout: "search"
---
```

This file tells Hugo to use a custom layout named `search.html`.


### 2. Create the Layout

In `layouts/_default/search.html`, add:

```html
{{ define "main" }}
  <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
  <script src="/pagefind/pagefind-ui.js"></script>

  <div class="container py-5">
    <h1>Search</h1>
    <div id="search"></div>
  </div>

  <script>
    window.addEventListener("DOMContentLoaded", () => {
      new PagefindUI({ element: "#search", showSubResults: true });
    });
  </script>
{{ end }}
```

One reason why Pagefind is so powerful is that they have already implemented the UI. So I do not bother to create a new one. But you can implement a different one. On this occasion, I only made minor changes to the UI so that it would work with my dark mode. Remember that you can check the element selector in Chrome Dev Tools.

```css
  html.dark .pagefind-ui {
    background-color: #121212;
    color: #e0e0e0;
  }

  html.dark .pagefind-ui * {
    color: #e0e0e0 !important;
  }

  html.dark .pagefind-ui__search-input {
    background-color: #1e1e1e !important;
    color: #ffffff !important;
    border: 1px solid #444 !important;
  }

  html.dark .pagefind-ui__result {
    background-color: #1e1e1e !important;
    border-color: #333 !important;
  }

  html.dark .pagefind-ui__result-link {
    color: #90cdf4 !important;
    text-decoration: none;
  }

  html.dark .pagefind-ui__result-title a:hover {
    color: #63b3ed !important;
  }

  html.dark .pagefind-ui__message {
    color: #ccc !important;
  }

  html.dark .pagefind-ui__drawer {
    background-color: #121212 !important;
  }

  html.dark .pagefind-ui mark {
    background-color: #555 !important;
    color: #fff !important;
  }
```

### 3. Implement a search button

I think it would be easier if I separate the search page from the page I am currently on, so I have to develop a button to move to the search page. This button, I chose to implement it on my footer, so it does not overpopulate my navbar.


### 4. Build the Site

Then I built my Hugo site so that the HTML files are generated:

```bash
hugo
```

This will populate the `public/` directory.


### 5.  Run Pagefind Indexer

From the root of your site, run:

```bash
npx -y pagefind --site public --serve
```

- This indexes all HTML content inside `public/`.
- Pagefind will also serve your site on `localhost:1414`.



### 6. Deploy to Netlify

Since I deploy this site on Netlify, Netlify needs to run Pagefind *after* Hugo builds the site. Create a postbuild script:

#### `netlify.toml`

```toml
[build]
  publish = "public"
  command = "hugo && npx pagefind --site public"
```

This ensures Pagefind runs after the build.
