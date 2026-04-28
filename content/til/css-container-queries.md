---
title: "CSS Container Queries Are Here!"
date: 2026-04-10T09:00:00+07:00
tags: ["css", "responsive-design"]
---

Container queries let you style elements based on their parent's size, not viewport:

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

Better than media queries for component-based design. Supported in all modern browsers now!
