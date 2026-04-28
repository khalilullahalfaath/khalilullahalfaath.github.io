---
title: "Hugo Page Bundles for Co-located Assets"
date: 2026-04-15T14:00:00+07:00
tags: ["hugo", "web-dev"]
---

Hugo has "page bundles" where you can put images next to your markdown file:

```
content/
  posts/
    my-post/
      index.md
      image1.jpg
      image2.jpg
```

Then reference images with just `![](image1.jpg)`. No need for `/static/` paths. Game changer for organizing content!
