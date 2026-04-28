---
title: "Git Interactive Rebase for Clean History"
date: 2026-04-20T15:30:00+07:00
tags: ["git", "productivity"]
---

Learned about `git rebase -i` today. You can squash multiple commits into one before pushing!

```bash
git rebase -i HEAD~3
```

Then mark commits as `squash` or `fixup`. Makes PR history much cleaner. Wish I knew this earlier.
