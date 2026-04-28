---
title: "Python Walrus Operator (:=)"
date: 2026-04-18T10:00:00+07:00
tags: ["python", "syntax"]
---

The walrus operator (`:=`) in Python 3.8+ lets you assign and use a variable in the same expression:

```python
# Instead of:
data = fetch_data()
if data:
    process(data)

# You can write:
if data := fetch_data():
    process(data)
```

Cleaner code, especially in list comprehensions!
