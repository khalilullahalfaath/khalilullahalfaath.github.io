# Khalil-lab

Personal blog built with Hugo, featuring custom layouts, dark mode, math rendering, and full-text search.

**Live**: https://khalil-lab.netlify.app/

---

## Tech Stack

- **Hugo** 0.129.0 (static site generator)
- **Netlify** (hosting & deployment)
- **Decap CMS** (content management at `/admin/`)
- **Pagefind** (client-side search)
- **MathJax 3** (math rendering)
- **Bootstrap 5** (navbar & grid only)
- Custom CSS with dark mode support

---

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) 0.128.0+
- Git

### Local Development

```bash
# Clone the repo
git clone https://github.com/khalilulahalfath/aleeeel.github.io.git
cd aleeeel.github.io

# Run local server (includes draft posts)
hugo server -D

# Open http://localhost:1313/
```

### Build

```bash
# Production build
hugo

# Build with search index (Netlify command)
hugo && npx pagefind --site public
```

---

## Project Structure

```
aleeelblogs/
├── content/          # Blog posts, journals, pages
├── layouts/          # Custom templates (no external theme)
├── static/           # CSS, JS, images, CMS admin panel
├── hugo.yaml         # Hugo configuration
├── netlify.toml      # Netlify deployment config
└── ARCHITECTURE.md   # Full project documentation
```

**No external theme** — all layouts and styling are custom-built in `layouts/` and `static/`.

---

## Content Management

### Via CMS (Recommended)

1. Go to `/admin/` on the live site
2. Login with Netlify Identity
3. Create/edit posts through the UI
4. Changes auto-commit to Git

### Manual

Create a new post:

```bash
hugo new posts/my-post/index.md
```

Edit `content/posts/my-post/index.md` and add your content. Co-locate images in the same folder.

---

## Deployment

**Automatic**: Push to `main` branch → Netlify auto-deploys in ~1-2 minutes.

Build command: `hugo && npx pagefind --site public`

---

## Documentation

For detailed architecture, flow, templates, styling, and maintenance tips, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

---

## License

Personal project. All content © Khalilullah Al Faath
