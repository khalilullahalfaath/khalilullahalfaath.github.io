# Khalil-lab

Personal blog built with Hugo, featuring custom layouts, dark mode, math rendering, full-text search, and comprehensive documentation inspired by Sheldon Cooper's obsessive note-taking.

**Live**: https://khalil-lab.netlify.app/

---

## Features

### 📝 Content Sections
- **Posts** - Long-form blog posts and essays
- **Lab Notebook** - Research experiments and observations
- **Journals** - Learning journey logs (IELTS, ML, schedules, gratitudes, reviews, logbooks)
- **TIL (Today I Learned)** - Short daily learnings
- **Bookshelf** - Reading list with books and papers
- **Timeline** - Visual timeline of milestones
- **Fun Facts** - Random lists and rankings (Sheldon Cooper-inspired)
- **Uses** - Tools, software, and setup
- **Schedule** - Google Calendar integration for availability
- **Now** - Current focus and activities
- **About** - Personal info and experience

### 🎨 Design & UX
- Medium-inspired clean typography
- Custom CSS design system (no Bootstrap)
- Dark mode with persistent toggle
- Responsive mobile-first design
- Sticky navbar with dropdown menu
- Homepage with sidebar featuring popular posts and quick links

### 🔧 Technical Features
- **Hugo** 0.129.0 static site generator
- **Pagefind** client-side search
- **MathJax 3** for math rendering
- **Decap CMS** for content management
- **Google Calendar** embed for scheduling
- **Netlify** hosting with auto-deployment

---

## Tech Stack

- **Hugo** 0.129.0 (static site generator)
- **Netlify** (hosting & deployment)
- **Decap CMS** (content management at `/admin/`)
- **Pagefind** (client-side search)
- **MathJax 3** (math rendering)
- **Poppins** font (Google Fonts)
- Custom CSS with dark mode support

---

## Quick Start

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) 0.128.0+
- Git
- Node.js (for Pagefind)

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

### Rebuild Search Index Locally

```bash
# Install Pagefind (first time only)
npm install -g pagefind

# Rebuild index
hugo
pagefind --site public

# Restart server
hugo server
```

---

## Project Structure

```
aleeelblogs/
├── content/
│   ├── posts/              # Blog posts
│   ├── lab-notebook/       # Research experiments
│   ├── journals/           # Learning journey logs
│   ├── til/                # Today I Learned entries
│   ├── bookshelf.md        # Reading list
│   ├── timeline.md         # Milestones timeline
│   ├── fun-facts.md        # Random lists
│   ├── uses.md             # Tools and setup
│   ├── schedule.md         # Google Calendar
│   ├── now.md              # Current activities
│   └── about.md            # About page
├── layouts/
│   ├── _default/           # Base templates
│   ├── partials/           # Reusable components
│   ├── page/               # Single page layouts
│   ├── lab-notebook/       # Lab notebook templates
│   ├── til/                # TIL templates
│   └── journals/           # Journals templates
├── static/
│   ├── styles/style.css    # Main stylesheet
│   ├── js/app.js           # Dark mode toggle
│   ├── images/             # Images
│   └── admin/              # Decap CMS
├── docs/
│   └── superpowers/
│       └── specs/          # Design specifications
├── hugo.yaml               # Hugo configuration
├── netlify.toml            # Netlify deployment config
├── ARCHITECTURE.md         # Full project documentation
└── README.md               # This file
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

Create new content:

```bash
# Blog post
hugo new posts/my-post/index.md

# Lab notebook entry
hugo new lab-notebook/experiment-name.md

# TIL entry
hugo new til/topic-name.md

# Journal entry
hugo new journals/section-name/entry-name.md
```

Edit the markdown file and add your content. Co-locate images in the same folder for posts.

---

## Navigation

### Desktop Navbar
`Home / Writings / Lab Notebook / About / More ▾`

Dropdown "More" contains:
- Journals
- Bookshelf
- TIL
- Uses
- Timeline
- Fun Facts
- Schedule

### Mobile
All links displayed vertically in hamburger menu.

---

## Deployment

**Automatic**: Push to `main` branch → Netlify auto-deploys in ~1-2 minutes.

Build command: `hugo && npx pagefind --site public`

**Note**: Pagefind search index is rebuilt on every deployment. New pages will be searchable after deployment.

---

## Inspiration

This blog is inspired by:
- **Sheldon Cooper** from The Big Bang Theory - for documenting everything obsessively
- **@ghora** (ghora.net) - for the research scientist perspective
- **Medium** - for clean, typography-first design

---

## Documentation

For detailed architecture, flow, templates, styling, and maintenance tips, see **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

---

## License

Personal project. All content © Khalilullah Al Faath
