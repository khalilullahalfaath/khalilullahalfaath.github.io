# Khalil-lab Blog Architecture

> Dokumentasi internal untuk proyek blog Hugo ini. Supaya gampang ingat lagi kalau mau ngedit atau nambah fitur.

---

## Overview

**Khalil-lab** adalah personal blog yang dibangun dengan Hugo (static site generator). Blog ini **tidak pakai external theme** — semua layout dan styling custom-built.

- **Live URL**: https://khalil-lab.netlify.app/
- **Hugo Version**: 0.129.0 (Netlify) / 0.128.0 (GitHub Actions, disabled)
- **Deployment**: Netlify (primary), GitHub Pages (disabled)
- **CMS**: Decap CMS (formerly Netlify CMS) di `/admin/`
- **Search**: Pagefind (client-side, built saat deploy)
- **Math**: MathJax 3 (conditional per page)
- **Dark Mode**: Custom JS + CSS variables

---

## Struktur Proyek

```
aleeelblogs/
├── .github/
│   └── workflows/hugo.yml      # GitHub Actions (disabled)
├── archetypes/
│   └── default.md              # Template untuk `hugo new`
├── content/
│   ├── posts/                  # Blog posts (15 entries, 7 draft)
│   ├── journals/               # 6 sub-sections (gratitudes, ielts, ml, schedules, reviews, logbooks)
│   ├── about.md                # About page
│   ├── now.md                  # Now page
│   └── search.md               # Search page
├── layouts/
│   ├── _default/
│   │   ├── _markup/
│   │   │   └── render-image.html   # Custom image renderer (wraps in <figure>)
│   │   ├── baseof.html             # Base template (Bootstrap, dark mode, MathJax)
│   │   ├── list.html               # Generic list + pagination
│   │   ├── posts.html              # Posts list
│   │   ├── search.html             # Pagefind search UI
│   │   ├── single.html             # Single post view
│   │   └── terms.html              # Taxonomy terms (categories)
│   ├── journals/
│   │   ├── list.html               # Journals section list (conditional logic)
│   │   └── single.html             # Journal single entry
│   ├── page/
│   │   ├── about.html              # About page layout
│   │   └── now.html                # Now page layout
│   ├── partials/
│   │   ├── footer.html             # Footer (copyright, search, social icons)
│   │   ├── math.html               # MathJax 3 CDN script
│   │   ├── navbar.html             # Bootstrap navbar (hardcoded links)
│   │   └── sanitize-link.html      # Utility: ensures https:// prefix
│   ├── 404.html                    # 404 page
│   └── index.html                  # Homepage (welcome + 3 latest posts)
├── static/
│   ├── admin/
│   │   ├── config.yml              # Decap CMS config
│   │   └── index.html              # Decap CMS admin panel
│   ├── images/
│   │   ├── myself.jpg              # Author portrait
│   │   └── robot.png
│   ├── js/
│   │   └── app.js                  # Dark/light theme toggle
│   ├── styles/
│   │   ├── style.css               # Main stylesheet (668 lines)
│   │   ├── style.old.css           # Backup (old version)
│   │   └── style.old.old.css       # Backup (older version)
│   ├── google75346db6c9c51099.html # Google Search Console verification
│   └── robots.txt                  # SEO: allows all crawlers
├── hugo.yaml                       # Hugo config
├── netlify.toml                    # Netlify deployment config
└── README.md                       # Minimal project docs
```

**Catatan**:
- `assets/`, `data/`, `i18n/`, `themes/` kosong
- `public/` di-gitignore tapi sebagian ter-commit (legacy)

---

## Flow Kerja

### 1. Nulis Post Baru

**Via CMS (Recommended)**:
1. Buka `/admin/` di browser
2. Login pakai Netlify Identity
3. Klik "New Posts"
4. Isi form (title, date, draft, math, description, categories, image, body)
5. Save → auto-commit ke Git

**Manual**:
1. Buat folder baru di `content/posts/slug-post/`
2. Buat `index.md` dengan front matter:
   ```yaml
   ---
   title: "Judul Post"
   date: 2026-04-28T10:00:00+07:00
   lastmod: 2026-04-28T10:00:00+07:00
   draft: false
   math: false
   description: "Deskripsi singkat"
   categories: ["Category1", "Category2"]
   image: "featured.jpg"
   ---
   
   Konten post di sini...
   ```
3. Taruh gambar di folder yang sama (co-located)
4. Commit & push

### 2. Preview Lokal

```bash
hugo server -D
```

- `-D` untuk include draft posts
- Buka http://localhost:1313/

### 3. Deploy

**Netlify (Automatic)**:
- Push ke branch `main` → auto-deploy
- Build command: `hugo && npx pagefind --site public`
- Live dalam ~1-2 menit

**GitHub Pages (Disabled)**:
- Workflow di `.github/workflows/hugo.yml` currently disabled
- Trigger: `workflow_dispatch` only (manual)

---

## Content Structure

### Posts (`content/posts/`)

- **15 entries** (7 draft, 8 published)
- **Organization**: Page bundles (folder + `index.md` + images)
- **Languages**: English & Bahasa Indonesia (no Hugo multilingual config, handled via categories)
- **Front Matter**:
  - `title`, `date`, `lastmod`, `draft`, `math`, `description`, `categories`
  - Optional: `image`, `ImageBig`, `mediumLink`, `tags`, `authors`

**Draft Posts** (tidak muncul di production):
- `why-do-i-learn-how-to-write/`
- `solving-recurrence-relations-a-tutorial/`
- `test-math/`
- `mount-everest-roleplay-...`
- `sebuah-kritik-untuk-sesama-fans-rrq/`
- `tujuan-syariat/`
- `why-did-i-move-from-duolingo-...`

### Journals (`content/journals/`)

6 sub-sections dengan 2 tipe rendering:

**List-based** (paginated):
- `gratitudes/` (2 entries)
- `reviews/` (empty)
- `logbooks/` (1 entry)

**Single-page** (article-style):
- `ielts-preparation/` (1 journey log)
- `ml-fundamentals/` (1 journey log)
- `schedules/` (1 schedule file)

Logic ada di `layouts/journals/list.html` (conditional rendering).

### Pages

- `about.md` → `/about/` (portrait, experience, social links)
- `now.md` → `/now/` (current activities)
- `search.md` → `/search/` (Pagefind UI)

---

## Layout & Template

### Template Hierarchy

```
baseof.html (base)
├── index.html (homepage)
├── _default/list.html (generic list)
├── _default/posts.html (posts list)
├── _default/single.html (single post)
├── _default/terms.html (categories page)
├── _default/search.html (search page)
├── journals/list.html (journals section)
├── journals/single.html (journal entry)
├── page/about.html (about page)
└── page/now.html (now page)
```

### Key Templates

| Template | Purpose |
|---|---|
| `baseof.html` | Base layout: Bootstrap 5 CDN, dark mode init, Netlify Identity, MathJax conditional, Google Fonts |
| `index.html` | Homepage: welcome message + 3 latest posts |
| `single.html` | Post view: title, lastmod, categories, description, content, Medium link |
| `list.html` | Generic list dengan pagination (3 items per page) |
| `navbar.html` | Bootstrap navbar (hardcoded links: Home, Now, Categories, Writings, Journals, About) |
| `footer.html` | Footer: copyright, search button, social icons (GitHub, Instagram, X) |
| `render-image.html` | Wraps markdown images in `<figure class="imageBlock">` dengan `<figcaption>` |
| `math.html` | MathJax 3 CDN script dengan config (inline: `\(...\)`, display: `\[...\]`, `$$...$$`) |

### Navbar Links (Hardcoded)

**PENTING**: Navbar di `partials/navbar.html` hardcoded, **tidak pakai** menu config di `hugo.yaml`.

Navbar links:
- Home (`/`)
- Now (`/now/`)
- Categories (`/categories/`)
- Writings (`/posts/`)
- Journals (`/journals/`)
- About (`/about/`)

Menu config di `hugo.yaml` ada tapi tidak dipakai (legacy).

---

## Styling

### CSS Architecture

- **Main stylesheet**: `static/styles/style.css` (668 lines)
- **Framework**: Bootstrap 5.3.7 (CDN, navbar/grid only)
- **Fonts**:
  - Body: Georgia (serif)
  - UI: Inter (sans-serif)
  - Mono: Fira Code
  - Accent: Rubik (Google Fonts)

### Design System (CSS Variables)

```css
:root {
  /* Colors */
  --bg-color: #ffffff;
  --text-color: #1a1a1a;
  --accent-color: #2563eb;
  --border-color: #e5e7eb;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  
  /* Typography */
  --font-size-base: 1rem;
  --line-height-base: 1.6;
  
  /* Borders */
  --border-radius: 0.5rem;
}

.dark {
  --bg-color: #1a1a1a;
  --text-color: #e5e7eb;
  --accent-color: #60a5fa;
  --border-color: #374151;
}
```

### Dark Mode

**Toggle**: `static/js/app.js` (20 lines)
- Detects system preference (`prefers-color-scheme`)
- Saves preference ke `localStorage`
- Toggles `.dark` class di `<html>`

**Initialization**: Inline script di `baseof.html` (prevents flash of unstyled content)

### Responsive Breakpoints

- **991px**: Tablet landscape
- **729px**: Tablet portrait
- **480px**: Mobile

---

## Integrasi

### 1. Decap CMS (Content Management)

- **Admin panel**: `/admin/`
- **Backend**: Netlify Identity + Git Gateway
- **Config**: `static/admin/config.yml`
- **Collections**: `posts` only (journals tidak di-manage via CMS)
- **Auto-commit**: Setiap save di CMS → commit ke Git dengan message `Create Posts "slug/index"` atau `Update Posts "slug/index"`

### 2. Pagefind (Search)

- **Client-side search** (no server needed)
- **Build**: `npx pagefind --site public` (runs saat Netlify deploy)
- **UI**: `layouts/_default/search.html` (custom dark mode styles)
- **Index**: Auto-generated dari semua published pages

### 3. MathJax (Math Rendering)

- **Version**: MathJax 3 (CDN)
- **Config**: `layouts/partials/math.html`
- **Delimiters**:
  - Inline: `\(...\)` atau `$...$`
  - Display: `\[...\]` atau `$$...$$`
- **Activation**: Per-page (`math: true` di front matter) atau global (`params.math: true` di `hugo.yaml`)

### 4. Netlify Identity

- **Purpose**: Authentication untuk Decap CMS
- **Widget**: Loaded di `baseof.html` via CDN
- **Users**: Managed di Netlify dashboard

### 5. Google Search Console

- **Verification**: `static/google75346db6c9c51099.html`
- **Sitemap**: Auto-generated di `/sitemap.xml`

---

## Catatan Penting

### Issues & Quirks

1. **Menu Mismatch**: `hugo.yaml` menu config tidak dipakai. Navbar hardcoded di `partials/navbar.html`.

2. **Footer Social Links**: GitHub, Instagram, X icons di footer semua link ke `/` (homepage), bukan ke social profiles. Social links yang bener ada di About page.

3. **Draft Posts**: 7 dari 15 posts masih draft. Tidak muncul di production kecuali build dengan `-D` flag.

4. **Orphan Post**: `content/posts/test/` cuma ada gambar, tidak ada `index.md`.

5. **YML Content File**: `content/posts/lorem-ipsum/index.yml` pakai YAML, bukan Markdown (CMS-generated test post).

6. **CSS Backups**: `style.old.css` dan `style.old.old.css` ter-commit di repo (legacy).

7. **Hugo Version Discrepancy**: Netlify pakai 0.129.0, GitHub Actions pakai 0.128.0.

8. **No Multilingual Config**: Blog bilingual (EN + ID) tapi tidak pakai Hugo's multilingual feature. Language handled via categories.

9. **Pagination**: 3 items per page (set di `hugo.yaml`).

10. **Git Remote**: `https://github.com/khalilulahalfath/aleeeel.github.io.git`

### Quick Commands

```bash
# Preview lokal (include drafts)
hugo server -D

# Build production
hugo

# Build + search index (Netlify command)
hugo && npx pagefind --site public

# Create new post (manual)
hugo new posts/slug-post/index.md

# Check Hugo version
hugo version
```

### File Locations Cheat Sheet

| Task | File/Folder |
|---|---|
| Edit navbar links | `layouts/partials/navbar.html` |
| Edit footer | `layouts/partials/footer.html` |
| Edit homepage | `layouts/index.html` |
| Edit post layout | `layouts/_default/single.html` |
| Edit CSS | `static/styles/style.css` |
| Edit dark mode toggle | `static/js/app.js` |
| Add new post | `content/posts/slug/index.md` |
| Add new journal | `content/journals/section/entry.md` |
| Edit Hugo config | `hugo.yaml` |
| Edit CMS config | `static/admin/config.yml` |
| Edit Netlify config | `netlify.toml` |

---

## Maintenance Tips

1. **Sebelum edit layout**: Preview lokal dulu dengan `hugo server -D`
2. **Setelah edit CSS**: Hard refresh browser (`Ctrl+Shift+R`) untuk clear cache
3. **Kalau search tidak update**: Re-run `npx pagefind --site public` setelah build
4. **Kalau MathJax tidak render**: Check `math: true` di front matter atau `params.math: true` di `hugo.yaml`
5. **Kalau dark mode tidak jalan**: Check `localStorage` di browser DevTools (key: `theme`)

---

**Last Updated**: 2026-04-28

---

## Update April 2026: New Features (Sheldon Cooper-Inspired)

### Fitur Baru yang Ditambahkan

Blog ini sekarang punya 7 fitur baru yang terinspirasi dari Sheldon Cooper's obsessive documentation:

#### 1. ?? Lab Notebook (/lab-notebook)
**Section** untuk research experiments dan observations.

- **Location**: content/lab-notebook/
- **Templates**: layouts/lab-notebook/list.html, layouts/lab-notebook/single.html
- **Features**:
  - Status badges (ongoing/completed/failed)
  - Tags per entry
  - Kronologis dengan tanggal
  - Sample entries: fake image detection, swarm intelligence, NLP sentiment analysis

**Front matter**:
\\\yaml
---
title: "Experiment Title"
date: 2026-01-15T10:00:00+07:00
status: "ongoing"  # ongoing/completed/failed
tags: ["computer-vision", "deep-learning"]
---
\\\

#### 2. ?? Bookshelf (/bookshelf)
**Single page** untuk reading list (books & papers).

- **Location**: content/bookshelf.md
- **Template**: layouts/page/bookshelf.html
- **Features**:
  - Grid cards dengan status (reading/finished/want-to-read)
  - Book icon, title, author, notes
  - Color-coded status badges

#### 3. ?? TIL - Today I Learned (/til)
**Section** untuk short daily learnings.

- **Location**: content/til/
- **Templates**: layouts/til/list.html, layouts/til/single.html
- **Features**:
  - Compact cards
  - Tags per entry
  - Code-friendly formatting
  - Sample entries: Git tips, Python tricks, Hugo features, CSS techniques

**Front matter**:
\\\yaml
---
title: "What I Learned"
date: 2026-04-20T15:30:00+07:00
tags: ["git", "productivity"]
---
\\\

#### 4. ??? Uses (/uses)
**Single page** untuk tools, software, dan setup.

- **Location**: content/uses.md
- **Template**: layouts/page/uses.html
- **Sections**:
  - Hardware
  - Development Tools
  - AI/ML Stack
  - Productivity
  - Web & Blogging
  - Design & Media

#### 5. ?? Timeline (/timeline)
**Single page** dengan visual timeline of milestones.

- **Location**: content/timeline.md
- **Template**: layouts/page/timeline.html
- **Features**:
  - Vertical timeline dengan markers
  - Dates dan descriptions
  - Alternating layout
  - Covers: Telkom University ? Len Industry ? Braincore ? UGM

#### 6. ?? Fun Facts (/fun-facts)
**Single page** dengan random lists ala Sheldon Cooper.

- **Location**: content/fun-facts.md
- **Template**: layouts/page/fun-facts.html
- **Sections**:
  - Favorite Algorithms (Ranked)
  - Things I Learned the Hard Way
  - Tools I Can't Live Without
  - Papers That Blew My Mind
  - Current Obsessions
  - Sheldon Cooper Inspiration

#### 7. ?? Schedule (/schedule)
**Single page** dengan Google Calendar embed untuk availability.

- **Location**: content/schedule.md
- **Template**: layouts/page/schedule.html
- **Features**:
  - Google Calendar iframe embed
  - Calendar ID: \khalilullah.alfaath21@gmail.com\
  - Info cards (best times, contact)
  - Responsive iframe wrapper

---

### Navigasi Update

#### Desktop Navbar
\Home / Writings / Lab Notebook / About / More ?\

**Dropdown "More"** berisi:
- Journals
- Bookshelf
- TIL
- Uses
- Timeline
- Fun Facts
- Schedule

#### Mobile Navbar
Semua 11 links ditampilkan flat (vertical stack) di hamburger menu.

#### Homepage Sidebar
Ditambahkan section "Explore More" dengan links ke:
- ?? Lab Notebook
- ?? Bookshelf
- ?? TIL
- ??? Uses
- ?? Timeline
- ?? Fun Facts

#### Footer
Ditambahkan ke secondary nav:
- Lab Notebook
- Bookshelf
- TIL

---

### CSS Updates

Semua fitur baru punya dedicated CSS di \static/styles/style.css\:

- **Lab Notebook**: Status badges dengan color coding, lab entry cards
- **Bookshelf**: Grid cards dengan status badges (reading/finished/want)
- **TIL**: Compact cards dengan code formatting
- **Uses**: Grouped sections dengan left border accent
- **Timeline**: Vertical timeline dengan dots dan markers
- **Fun Facts**: Card-based sections dengan ranked/bullet lists
- **Schedule**: Calendar wrapper dengan responsive iframe
- **Navbar Dropdown**: Hover-triggered dropdown (pure CSS)

---

### Design System Updates

#### Typography
- **Font**: Poppins (Google Fonts) untuk semua text
- **Sizes**: Dikurangi untuk better hierarchy (H1: 32px, H2: 24px, H3: 20px)
- **Line height**: 1.7 untuk body, 1.2 untuk headings

#### Colors (Unchanged)
- Light mode: \#ffffff\ bg, \#242424\ text, \#1a8917\ accent
- Dark mode: \#121212\ bg, \#e0e0e0\ text, \#4caf50\ accent

#### Spacing
- Reduced spacing antar posts di homepage (lebih compact)
- Footer lebih compact (horizontal layout)
- Post header dengan visual separation (background box dengan border-left accent)

---

### File Locations Cheat Sheet (Updated)

| Task | File/Folder |
|---|---|
| Edit navbar links | \layouts/partials/navbar.html\ |
| Edit footer | \layouts/partials/footer.html\ |
| Edit homepage | \layouts/index.html\ |
| Edit post layout | \layouts/_default/single.html\ |
| Edit CSS | \static/styles/style.css\ |
| Edit dark mode toggle | \static/js/app.js\ |
| Add new post | \content/posts/slug/index.md\ |
| Add new lab entry | \content/lab-notebook/entry.md\ |
| Add new TIL | \content/til/entry.md\ |
| Add new journal | \content/journals/section/entry.md\ |
| Edit bookshelf | \content/bookshelf.md\ + \layouts/page/bookshelf.html\ |
| Edit timeline | \content/timeline.md\ + \layouts/page/timeline.html\ |
| Edit fun facts | \content/fun-facts.md\ + \layouts/page/fun-facts.html\ |
| Edit uses | \content/uses.md\ + \layouts/page/uses.html\ |
| Edit schedule | \content/schedule.md\ + \layouts/page/schedule.html\ |
| Edit Hugo config | \hugo.yaml\ |
| Edit CMS config | \static/admin/config.yml\ |
| Edit Netlify config | \
etlify.toml\ |

---

### Pagefind Search Index

**Important**: Pagefind index di-rebuild saat deployment ke Netlify. Untuk rebuild lokal:

\\\ash
# Install Pagefind (first time)
npm install -g pagefind

# Rebuild index
hugo
pagefind --site public

# Restart server
hugo server
\\\

Semua halaman baru (Lab Notebook, Bookshelf, TIL, Uses, Timeline, Fun Facts, Schedule) akan muncul di search setelah index di-rebuild.

---

### Inspiration & Philosophy

Blog ini terinspirasi dari:

1. **Sheldon Cooper** (The Big Bang Theory) - Dokumentasi obsesif tentang segala hal
2. **@ghora** (ghora.net) - Research scientist perspective
3. **Medium** - Clean, typography-first design

Filosofi: "Document everything, organize systematically, make it accessible."

---

**Last Updated**: April 28, 2026
