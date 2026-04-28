# Khalil-lab UI Redesign - Design Specification

**Date**: 2026-04-28  
**Status**: Approved  
**Goal**: Redesign blog UI dengan inspirasi Medium -- clean, typography-first, readable, dengan karakter sendiri.

---

## Problem Statement

UI blog saat ini terasa generic dan "Bootstrap-y". Banyak elemen visual yang tidak perlu (cards dengan shadow, borders berat, spacing tidak konsisten). Typography kurang optimal untuk reading experience. User ingin blog yang lebih clean, professional, dan enak dibaca -- terinspirasi dari Medium tapi tetap punya karakter sendiri.

---

## Design Approach

**Full rewrite** semua CSS dan templates. Hapus Bootstrap dependency (~200KB). Pure custom CSS/JS. Fokus ke typography, whitespace, dan readability.

**Prinsip desain:**
- Typography-first: Serif untuk reading, sans-serif untuk UI
- Minimal visual noise: No heavy borders/shadows, divider lines saja
- Generous whitespace: Breathing room untuk content
- Consistent spacing: Design tokens untuk semua spacing values
- Mobile-first responsive: Clean breakpoints, no framework bloat

---

## Design System

### Typography

| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---|---|---|---|---|---|
| Post title | Georgia / serif | 42px | 32px | 700 | 1.2 |
| Post body | Georgia / serif | 20px | 18px | 400 | 1.7 |
| H2 in content | Georgia / serif | 30px | 26px | 700 | 1.2 |
| H3 in content | Georgia / serif | 24px | 22px | 700 | 1.2 |
| H4 in content | Georgia / serif | 20px | 18px | 700 | 1.2 |
| Navbar links | Inter / sans-serif | 14px | 14px | 400 | 1.4 |
| Category badges | Inter / sans-serif | 13px | 13px | 500 | 1.3 |
| Date, meta | Inter / sans-serif | 14px | 13px | 400 | 1.4 |
| Footer text | Inter / sans-serif | 13px | 13px | 400 | 1.4 |

**Rationale**: Georgia dan Inter adalah system fonts (no web font loading delay). Serif untuk long-form reading (proven readability), sans-serif untuk UI elements (clarity). Line-height 1.7 untuk body text memberikan breathing room yang cukup.

### Colors

**Light Mode:**

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#ffffff` | Page background |
| `--text` | `#242424` | Body text (Medium's exact color) |
| `--text-muted` | `#6b6b6b` | Dates, meta, secondary text |
| `--accent` | `#1a8917` | Links, buttons (Medium's green) |
| `--border` | `#f2f2f2` | Dividers, subtle borders |
| `--surface` | `#f9f9f9` | Card hover, subtle backgrounds |

**Dark Mode:**

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#121212` | Page background |
| `--text` | `#e0e0e0` | Body text |
| `--text-muted` | `#999999` | Secondary text |
| `--accent` | `#4caf50` | Links, buttons (brighter green for dark bg) |
| `--border` | `#2a2a2a` | Dividers |
| `--surface` | `#1e1e1e` | Card hover |

**Rationale**: Light mode colors diambil langsung dari Medium (proven readability). Dark mode menggunakan true dark (`#121212`) dengan contrast ratio yang memenuhi WCAG AA. Accent color disesuaikan untuk visibility di dark background.

### Spacing

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 8px | Tight spacing (inline elements) |
| `--space-sm` | 16px | Small gaps (between meta items) |
| `--space-md` | 24px | Medium gaps (between sections) |
| `--space-lg` | 48px | Large gaps (between major sections) |
| `--space-xl` | 64px | Extra large (page top/bottom padding) |

**Content constraints:**
- Max content width: **680px** (Medium's exact width, optimal for reading)
- Max navbar width: **1200px** (wider container for nav)
- Page horizontal padding: 24px (desktop), 16px (mobile)

### Responsive Breakpoints

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | < 768px | Navbar collapses to hamburger, font sizes reduce, single column layout |
| Tablet | 768px - 1024px | Two-column where applicable, medium font sizes |
| Desktop | > 1024px | Full layout, optimal font sizes |

---

## Component Specifications

### 1. Navbar

**Layout:**
```
┌────────────────────────────────────────┐
│  Khalil-lab     Home / Writings / Journals / About   [sun/moon icon]│
└────────────────────────────────────────┘
```

**Specs:**
- **Position**: Sticky top, `z-index: 100`
- **Background**: Same as page background (transparent feel)
- **Border**: 1px solid `var(--border)` bottom only
- **Height**: 64px
- **Max-width**: 1200px, centered
- **Padding**: 0 24px (desktop), 0 16px (mobile)

**Brand (left):**
- Font: Georgia serif, 18px, weight 700
- Color: `var(--text)`
- Link to `/`

**Nav links (center-right):**
- Font: Inter sans-serif, 14px, weight 400
- Color: `var(--text)`, hover `var(--accent)`
- Separated by `/` with 12px horizontal padding each side
- Links: Home, Writings, Journals, About (4 links)
- Spacing: `gap: 0` (separator handles spacing)

**Dark mode toggle (right):**
- SVG icon (sun for light mode, moon for dark mode)
- Size: 20px × 20px
- Color: `var(--text)`, hover `var(--accent)`
- No border, no background
- Smooth transition 0.2s

**Mobile (< 768px):**
- Hamburger icon (3 horizontal lines SVG) replaces nav links
- Menu slides down from top, full-width
- Links stack vertically, no separators
- Menu background: `var(--bg)` with `var(--border)` top border
- Smooth animation: `max-height` transition 0.3s ease

**Implementation notes:**
- Pure CSS/JS, no Bootstrap
- Hamburger toggle via checkbox hack or minimal JS
- Sticky behavior via `position: sticky; top: 0;`

---

### 2. Homepage (`/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Welcome.                          │
│  Explore my insights, schedules,   │
│  and learning journey.             │
│                                    │
│  ────────────────────              │
│                                    │
│  Latest                            │
│                                    │
│  22nd September 2025               │
│  Yesterday my friend asked me...   │
│  Sep 22, 2025 · Reflection         │
│                                    │
│  ────────────────────              │
│  ...                               │
│                                    │
│  See all posts →                   │
│                                    │
└────────────────────────┘
```

**Welcome section:**
- Heading: Georgia serif, 42px (desktop) / 32px (mobile), weight 700
- Description: Georgia serif, 20px (desktop) / 18px (mobile), weight 400, color `var(--text-muted)`
- Links in description: `var(--accent)`, underline on hover
- Max-width: 680px, centered
- Bottom margin: `var(--space-lg)` (48px)

**Latest posts section:**
- Heading "Latest": Georgia serif, 30px, weight 700, margin-bottom `var(--space-md)`
- Show first 3 posts from `mainSections` (currently "posts")
- Each post:
  - Title: Georgia serif, 24px, weight 700, color `var(--text)`, hover `var(--accent)`
  - Excerpt: Georgia serif, 18px, weight 400, color `var(--text-muted)`, truncated to ~100 chars
  - Meta: Inter sans-serif, 14px, color `var(--text-muted)`, format: "Date · Category"
  - Spacing: `var(--space-md)` between title and excerpt, `var(--space-sm)` between excerpt and meta
- Divider between posts: 1px solid `var(--border)`, margin `var(--space-md)` top/bottom

**"See all posts" link:**
- Text: "See all posts →" (arrow character: `→` or `&rarr;`)
- Font: Inter sans-serif, 14px, weight 500
- Color: `var(--accent)`
- Margin-top: `var(--space-lg)`
- Center-aligned

---

### 3. Post List Page (`/posts/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Writings                          │
│                                    │
│  ┌──────────────────┐              │
│  │ [img]  Title                    │
│  │        Excerpt...               │
│  │        Date · Category          │
│  └──────────────────┘              │
│                                    │
│  ────────────────────              │
│  ...                               │
│                                    │
│  ← Previous  1 2 3  Next →         │
│                                    │
└────────────────────────┘
```

**Page heading:**
- Text: "Writings" (or page title)
- Font: Georgia serif, 42px (desktop) / 32px (mobile), weight 700
- Margin-bottom: `var(--space-lg)`

**Post cards:**
- Layout: Horizontal flexbox
  - Thumbnail (if exists): 120px × 120px, object-fit cover, border-radius 4px, flex-shrink 0
  - Content: flex-grow 1, margin-left 20px (if thumbnail exists)
- Title: Georgia serif, 24px, weight 700, color `var(--text)`, hover `var(--accent)`
- Excerpt: Georgia serif, 18px, weight 400, color `var(--text-muted)`, max 2 lines with ellipsis
- Meta: Inter sans-serif, 14px, color `var(--text-muted)`, format: "Date · Category badge"
- Category badge: inline-block, padding 4px 12px, border-radius 12px, background `var(--surface)`, color `var(--text)`, font-size 13px, weight 500
- Spacing: `var(--space-sm)` between title and excerpt, `var(--space-xs)` between excerpt and meta
- Divider: 1px solid `var(--border)`, margin `var(--space-md)` top/bottom between cards

**No thumbnail case:**
- Content takes full width
- No gap/margin-left

**Pagination:**
- Center-aligned
- Font: Inter sans-serif, 14px
- Current page: weight 700, color `var(--text)`
- Other pages: weight 400, color `var(--text-muted)`, hover `var(--accent)`
- Arrows: "←" and "→" characters
- Spacing: 8px between page numbers
- Margin-top: `var(--space-lg)`

---

### 4. Single Post Page (`/posts/slug/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Post Title Here                   │
│                                    │
│  This is the subtitle/description  │
│  that provides context...          │
│                                    │
│  Khalil · Jun 20, 2025 · Report    │
│                                    │
│  ┌──────────────────┐              │
│  │  [featured image]               │
│  └──────────────────┘              │
│                                    │
│  Body content starts here. Lorem   │
│  ipsum dolor sit amet...           │
│                                    │
│  ## Heading 2                      │
│  ...                               │
│                                    │
│  ────────────────────              │
│                                    │
│  Tags: Report · English            │
│                                    │
│  Also published on Medium →        │
│                                    │
└────────────────────────┘
```

**Title:**
- Font: Georgia serif, 42px (desktop) / 32px (mobile), weight 700
- Color: `var(--text)`
- Margin-bottom: `var(--space-md)`
- Max-width: 680px, centered

**Description/subtitle:**
- Font: Georgia serif, 22px (desktop) / 20px (mobile), weight 400
- Color: `var(--text-muted)`
- Line-height: 1.5
- Margin-bottom: `var(--space-sm)`
- Max-width: 680px, centered
- Rendered via `markdownify` (supports inline formatting)

**Meta line:**
- Font: Inter sans-serif, 14px, weight 400
- Color: `var(--text-muted)`
- Format: "Author · Date · Category"
- Separator: ` · ` (middot with spaces)
- Margin-bottom: `var(--space-lg)`
- Center-aligned

**Featured image:**
- Full content width (680px max)
- Border-radius: 8px
- Margin-bottom: `var(--space-lg)`
- Only shown if `image` exists in front matter

**Body content:**
- Font: Georgia serif, 20px (desktop) / 18px (mobile), weight 400
- Color: `var(--text)`
- Line-height: 1.7
- Max-width: 680px, centered
- Paragraph spacing: `var(--space-md)` (24px)

**Content typography:**
- H2: 30px, weight 700, margin-top `var(--space-lg)`, margin-bottom `var(--space-md)`
- H3: 24px, weight 700, margin-top `var(--space-md)`, margin-bottom `var(--space-sm)`
- H4: 20px, weight 700, margin-top `var(--space-md)`, margin-bottom `var(--space-sm)`
- Blockquote: Left border 4px solid `var(--accent)`, padding-left 20px, font-style italic, color `var(--text-muted)`
- Code inline: Background `var(--surface)`, padding 2px 6px, border-radius 3px, font-family monospace, font-size 0.9em
- Code block: Background `var(--surface)`, padding 16px, border-radius 8px, overflow-x auto, font-family monospace, font-size 0.9em
- Links: Color `var(--accent)`, underline on hover
- Images: Max-width 100%, height auto, border-radius 8px, margin `var(--space-md)` top/bottom

**Bottom section:**
- Divider: 1px solid `var(--border)`, margin `var(--space-lg)` top/bottom
- Tags: "Tags: " label + category badges (same style as list page)
- Medium link (if exists): Font Inter sans-serif, 14px, color `var(--text-muted)`, italic, margin-top `var(--space-sm)`, format: "Also published on Medium →"

---

### 5. Journals Section

**Main journals page (`/journals/`):**

```
┌────────────────────────┐
│                                    │
│  Journals                          │
│                                    │
│  ┌──────────────────┐              │
│  │  Gratitudes                     │
│  │  Things I'm grateful for        │
│  └──────────────────┘              │
│                                    │
│  ┌──────────────────┐              │
│  │  IELTS Preparation              │
│  │  My IELTS learning journey      │
│  └──────────────────┘              │
│  ...                               │
│                                    │
└────────────────────────┘
```

**Sub-section cards:**
- Border: 1px solid `var(--border)`
- Border-radius: 8px
- Padding: 24px
- Margin-bottom: `var(--space-md)`
- Hover: Border color changes to `var(--accent)`, transition 0.2s
- Title: Georgia serif, 24px, weight 700, color `var(--text)`, hover `var(--accent)`
- Description: Georgia serif, 18px, weight 400, color `var(--text-muted)`
- Spacing: `var(--space-sm)` between title and description

**List-based journals (e.g. `/journals/gratitudes/`):**
- Same layout as post list page
- No thumbnails (journals typically don't have images)
- Divider-separated entries

**Single-page journals (e.g. `/journals/ml-fundamentals/`):**
- Same layout as single post page
- Full article view with title, content, meta

---

### 6. About Page (`/about/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│       [portrait photo]             │
│        (circle, 160px)             │
│                                    │
│     Khalilullah Al Fath            │
│                                    │
│  I'm a Computer Science student... │
│                                    │
│  GitHub · Instagram · X            │
│                                    │
│  ────────────────────              │
│                                    │
│  [rest of about content]           │
│                                    │
└────────────────────────┘
```

**Portrait:**
- Size: 160px × 160px
- Border-radius: 50% (circle)
- Border: 2px solid `var(--border)`
- Object-fit: cover
- Center-aligned
- Margin-bottom: `var(--space-md)`

**Name:**
- Font: Georgia serif, 32px, weight 700
- Color: `var(--text)`
- Center-aligned
- Margin-bottom: `var(--space-sm)`

**Bio (short intro):**
- Font: Georgia serif, 18px, weight 400
- Color: `var(--text-muted)`
- Center-aligned
- Max-width: 600px, centered
- Margin-bottom: `var(--space-md)`

**Social links:**
- Font: Inter sans-serif, 14px, weight 500
- Color: `var(--accent)`
- Format: "GitHub · Instagram · X" (text links, not icons)
- Separator: ` · ` (middot with spaces)
- Center-aligned
- Margin-bottom: `var(--space-lg)`

**Divider:**
- 1px solid `var(--border)`
- Max-width: 680px, centered
- Margin-bottom: `var(--space-lg)`

**Content:**
- Same typography as single post body
- Max-width: 680px, centered
- Rendered from page content

---

### 7. Footer

**Layout:**
```
┌────────────────────────┐
│  ────────────────────              │
│                                    │
│  Home / Now / Categories / Search  │
│                                    │
│  GitHub · Instagram · X            │
│                                    │
│  © 2026 Khalilullah Al Fath        │
│                                    │
└────────────────────────┘
```

**Container:**
- Max-width: 1200px, centered
- Padding: `var(--space-xl)` top, `var(--space-lg)` bottom
- Border-top: 1px solid `var(--border)`
- Text-align: center

**Secondary nav:**
- Font: Inter sans-serif, 14px, weight 400
- Color: `var(--text-muted)`, hover `var(--accent)`
- Format: "Home / Now / Categories / Search"
- Separator: ` / ` (slash with spaces)
- Margin-bottom: `var(--space-md)`

**Social links:**
- Font: Inter sans-serif, 14px, weight 400
- Color: `var(--accent)`
- Format: "GitHub · Instagram · X" (text links with actual URLs)
- Separator: ` · ` (middot with spaces)
- Margin-bottom: `var(--space-md)`

**Copyright:**
- Font: Inter sans-serif, 13px, weight 400
- Color: `var(--text-muted)`
- Format: "© [year] Khalilullah Al Fath"
- Year auto-updated via JS

---

### 8. Categories Page (`/categories/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Categories                        │
│                                    │
│  Reflection (3) · Report (2) ·     │
│  Essay (1) · Bahasa Indonesia (4)  │
│                                    │
└────────────────────────┘
```

**Page heading:**
- Text: "Categories"
- Font: Georgia serif, 42px (desktop) / 32px (mobile), weight 700
- Margin-bottom: `var(--space-lg)`

**Category list:**
- Inline layout (not grid)
- Each category: "Name (count)"
- Font: Inter sans-serif, 16px, weight 500
- Color: `var(--text)`, hover `var(--accent)`
- Separator: ` · ` (middot with spaces)
- Wraps naturally on small screens

---

### 9. Search Page (`/search/`)

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Search                            │
│                                    │
│  [search input box]                │
│                                    │
│  [Pagefind results]                │
│                                    │
└────────────────────────┘
```

**Page heading:**
- Text: "Search"
- Font: Georgia serif, 42px (desktop) / 32px (mobile), weight 700
- Margin-bottom: `var(--space-lg)`

**Pagefind UI:**
- Use default Pagefind UI component
- Custom CSS overrides for dark mode:
  - Background: `var(--bg)`
  - Text: `var(--text)`
  - Input border: `var(--border)`
  - Result hover: `var(--surface)`
  - Links: `var(--accent)`
  - Highlight (mark): Background `var(--surface)`, color `var(--accent)`

---

### 10. Now Page (`/now/`)

**Layout:**
- Same as single post page
- Title + content
- No featured image, no meta line, no tags
- Simple article view

---

### 11. 404 Page

**Layout:**
```
┌────────────────────────┐
│                                    │
│  Page not found                    │
│                                    │
│  The page you're looking for       │
│  doesn't exist.                    │
│                                    │
│  ← Back to home                    │
│                                    │
└────────────────────────┘
```

**Uses baseof.html** (not standalone anymore)

**Content:**
- Heading: Georgia serif, 42px, weight 700, center-aligned
- Description: Georgia serif, 18px, weight 400, color `var(--text-muted)`, center-aligned
- Link: Inter sans-serif, 14px, weight 500, color `var(--accent)`, center-aligned, format: "← Back to home"
- Vertical centering: `min-height: 60vh`, flexbox center

---

## Dark Mode Implementation

**Toggle mechanism:**
- SVG icon button in navbar (sun for light mode, moon for dark mode)
- Click toggles `.dark` class on `<html>` element
- Preference saved to `localStorage` (key: `theme`)
- On page load: Check localStorage first, fallback to `prefers-color-scheme` media query
- Instant-apply IIFE in `<head>` to prevent flash of unstyled content

**CSS implementation:**
- All color tokens defined in `:root` (light mode)
- Dark mode overrides in `.dark` selector
- Smooth transition on all color properties: `transition: background-color 0.2s, color 0.2s, border-color 0.2s`

**SVG icons:**
- Sun icon (light mode): `<svg>` with circle + rays
- Moon icon (dark mode): `<svg>` with crescent shape
- Size: 20px × 20px
- Color: `currentColor` (inherits from parent)

---

## Removed Features

1. **Bootstrap CSS + JS** (~200KB total)
   - Replaced with pure custom CSS
   - Navbar responsive logic: Pure CSS/JS hamburger menu
   - Grid system: Flexbox + CSS Grid where needed

2. **Emoji toggle** (🌙/☀️)
   - Replaced with SVG icons (more professional, scalable)

3. **Card shadows and lift effects**
   - Replaced with subtle border color changes on hover
   - Cleaner, more Medium-like aesthetic

4. **Background color on description block**
   - Description now inline with same background as page
   - Less visual noise

5. **SVG social icons in footer**
   - Replaced with text links (GitHub, Instagram, X)
   - Simpler, more accessible

6. **Separate lastmod display**
   - Merged into single meta line with date
   - Less clutter in post header

7. **CSS backup files**
   - `style.old.css` and `style.old.old.css` will be deleted
   - Clean up legacy files

---

## Preserved Features

1. **Dark mode toggle** (localStorage + system preference)
2. **MathJax 3** (conditional per-page)
3. **Pagefind search** (client-side, built during deploy)
4. **Decap CMS** (admin panel at `/admin/`)
5. **Netlify Identity** (authentication for CMS)
6. **Responsive design** (mobile-first, clean breakpoints)
7. **All content sections** (Posts, Journals with 6 sub-sections, Now, About, Categories, Search)
8. **Navbar `/` separators** (user preference)
9. **Pagination** (3 items per page)
10. **Featured images** (co-located in page bundles)
11. **Category badges** (pill-shaped, subtle styling)
12. **Medium cross-post links** (optional per post)

---

## File Changes Summary

### Files to be completely rewritten:
1. `static/styles/style.css` -- Full CSS rewrite from scratch
2. `layouts/_default/baseof.html` -- Remove Bootstrap, update structure
3. `layouts/partials/navbar.html` -- Pure CSS/JS navbar
4. `layouts/partials/footer.html` -- Centered footer with secondary nav
5. `layouts/index.html` -- Homepage with divider-separated posts
6. `layouts/_default/list.html` -- Generic list with horizontal cards
7. `layouts/_default/posts.html` -- Posts list (same as list.html)
8. `layouts/_default/single.html` -- Single post Medium-style
9. `layouts/_default/terms.html` -- Categories inline list
10. `layouts/_default/search.html` -- Search with dark mode overrides
11. `layouts/journals/list.html` -- Journals section with sub-section cards
12. `layouts/journals/single.html` -- Journal single entry
13. `layouts/page/about.html` -- About with circle portrait
14. `layouts/page/now.html` -- Now page (simple article)
15. `layouts/404.html` -- 404 using baseof
16. `static/js/app.js` -- Dark mode toggle with SVG icons

### Files to be deleted:
1. `static/styles/style.old.css`
2. `static/styles/style.old.old.css`

### Files unchanged:
1. `layouts/_default/_markup/render-image.html` -- Image renderer (works as-is)
2. `layouts/partials/math.html` -- MathJax partial (works as-is)
3. `layouts/partials/sanitize-link.html` -- Link sanitizer (works as-is)
4. `hugo.yaml` -- Config (no changes needed)
5. `netlify.toml` -- Deployment config (no changes needed)
6. All content files in `content/`

---

## Testing Checklist

After implementation, verify:

- [ ] Homepage loads without Bootstrap, all styles applied
- [ ] Navbar sticky behavior works, hamburger menu functions on mobile
- [ ] Dark mode toggle works, preference persists across page loads
- [ ] Post list shows horizontal cards with thumbnails (if present)
- [ ] Single post displays correctly: title, description, meta, featured image, body content
- [ ] Journals main page shows sub-section cards
- [ ] List-based journals (gratitudes, reviews, logbooks) render as lists
- [ ] Single-page journals (ielts, ml, schedules) render as articles
- [ ] About page shows circle portrait, social links work
- [ ] Footer secondary nav links work, social links point to actual profiles
- [ ] Categories page shows inline list with counts
- [ ] Search page Pagefind UI works, dark mode styles applied
- [ ] Now page renders as simple article
- [ ] 404 page uses baseof, shows centered message
- [ ] Responsive design works at all breakpoints (mobile, tablet, desktop)
- [ ] All colors match design tokens in both light and dark modes
- [ ] Typography sizes and weights match spec
- [ ] Spacing matches design tokens
- [ ] No console errors, no 404s for assets
- [ ] Page load time improved (no Bootstrap = ~200KB saved)

---

## Success Criteria

1. **Visual**: Blog looks clean, professional, Medium-inspired but with own character
2. **Performance**: Page load faster without Bootstrap (~200KB saved)
3. **Readability**: Typography optimized for long-form reading (serif body, 20px, line-height 1.7)
4. **Consistency**: All pages follow same design system (colors, spacing, typography)
5. **Responsive**: Works perfectly on mobile, tablet, desktop
6. **Dark mode**: Smooth toggle, no flash, preference persists
7. **Accessibility**: Proper contrast ratios (WCAG AA), semantic HTML, keyboard navigation
8. **Maintainability**: Clean CSS with design tokens, no framework bloat

---

**End of Design Specification**
