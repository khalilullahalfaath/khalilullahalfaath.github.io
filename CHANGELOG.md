# Changelog

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

Versions 0.1.0 to 1.0.0 were reconstructed from the commit history on 2026-11-24. The repo had no tags then, so each version marks a stage of work after the fact. Content commits from Decap CMS (`Create/Update/Delete <Collection> “…”`) are not listed one by one.

## [Unreleased]

### Added
- Six research logbook entries in the Notebook: KMA transfer functions and native binaries, the KMA Python port with an architecture figure, Sardjito RBC segmentation, the capture app refactor, and the attribute model.
- `docs/notebook-entry-style.md`: rules for writing Notebook entries (frontmatter contract, dated headings, prose, figures, verification).
- This changelog, shown on the site under Back pages and linked from the footer.

### Changed
- Date stamps on entry headings now accept `: ` as a separator (`## November 17, 2026: Topic`) as well as the em dash. The en dash stays out because it appears inside date ranges.
- Brand name in the navbar and `hugo.yaml` changed from "Khalil-lab" to "Kafkuy".
- Rewrote the homepage cover title and description, and the learning and focus sections of the Now page.

### Fixed
- The KMA Python port entry is dated by its work session (2026-11-17) instead of the 2024 scaffolding commit, so it no longer lands in the 2024 year group.

## [1.0.0] - 2026-11-21

The site was redesigned as a lab notebook, with its sections reorganized.

### Added
- New sections: Writing, Notebook (formerly lab-notebook, plus ML and IELTS logs), Work (Projects, CV, Schedule), Back pages (weekly plans, gratitude, reviews, TIL, fun facts, bookshelf, uses), and About.
- Digital CV from `data/cv.yaml` with a year timeline and a lane filter.
- Notebook sheet design: a Medium-style palette, section tabs, entry numbers, status stamps, and divider tabs for Work and Back pages.
- Entry bodies: dated stamps, language labels on code blocks, numbered figures, callouts, margin footnotes, and contents in the margin (`static/js/notes.js`).
- Tags on every post and project, shown as filter buttons on Writing and Projects.
- A category filter on Writing. Each post has one category (Essay, Reflection, Report, Tutorial, Notes).
- Decap CMS: a tags field for posts and projects, and categories as a single-choice select.

### Changed
- Old URLs stay live as aliases. Decap CMS collections moved to the new paths.
- About became the notebook owner's page, and Now was rewritten from the CV.
- Writing and the homepage's latest writing sort and group by `lastmod`.
- Post language moved from a category to the `bahasa-indonesia` tag.
- Site copy edited for plainer wording. The homepage dropped its Subject row.

## [0.5.0] - 2026-10-12

### Changed
- Pagination and date display use `Lastmod`. Post dates moved into a shared `post-dates.html` partial.
- Custom domain `kafkuy.tech` set in `hugo.yaml` and `robots.txt`, and the README link updated.

## [0.4.0] - 2026-08-04

### Added
- A Reviews section with filters and external links, plus its Decap CMS collection.
- Projects as their own collection (list and detail pages) with sorting and filters, replacing the single `projects.md` page.
- A table of contents (`partials/toc.html`) on journal, lab notebook, and project pages.
- Created and updated dates on posts and lab entries, and a last modified field in the Decap CMS posts collection.
- Styles for markdown task lists, and a subtitle on the posts page.

### Changed
- Uses, About, Bookshelf, Fun Facts, Schedule, and Timeline render from data instead of markdown.
- Navbar and footer reworked for mobile. The navbar was trimmed and the homepage's popular posts moved.
- `lab-meta` and `lab-tags` styles made more responsive.

### Fixed
- Several UI fixes, and typos in layouts and the About page.

## [0.3.0] - 2026-04-28

A large redesign in a Medium-inspired style.

### Added
- Lab Notebook, Bookshelf, TIL, Uses, Timeline, Fun Facts, and Schedule sections.
- A navbar with Lab Notebook and a More dropdown.
- A homepage with a category showcase, quick links, a popular posts sidebar, and reading time.
- A new Now page with social links (including LinkedIn), and email in the footer (obfuscated on the Schedule page).
- `ARCHITECTURE.md` and a UI design spec.

### Changed
- The CSS design system was rewritten with Medium-inspired tokens. Bootstrap and Google Fonts were removed from the base template, and the font changed to Poppins.
- All page templates, the navbar, the footer, the dark mode toggle, and the categories page were rewritten.
- README updated.

### Removed
- Old CSS backups.

### Fixed
- Pagination, footer layout, heading hierarchy, and duplicate closing tags in `terms.html`.
- The mobile hamburger menu not working, and showing on desktop.
- Broken footer links.

## [0.2.0] - 2025-07-31

The site moved to Netlify with Decap CMS.

### Added
- Decap CMS (`/admin`) for managing content, with site-wide login (Netlify Identity).
- A new design system and a redesigned navbar.
- Google Search Console verification, `robots.txt`, and a sitemap.
- Math rendering support.
- Search.
- The footer year updates automatically.

### Changed
- Updated the About and Now pages and the introduction post. Adjusted the styles of single pages, category lists, and onboarding.
- Base URL updated.

### Fixed
- Dates not showing, the CMS image field being required, and a boolean written as a quoted string.
- A flash in dark mode, and the theme toggle sometimes failing after the page sat idle.
- Post preview boxes are now clickable. Fixed hover, the search UI, and math rendering.

## [0.1.0] - 2024-07-27

The first version of the blog, built with Hugo and deployed by GitHub Actions.

### Added
- A Hugo site with a homepage, a writing list, single post pages, and LaTeX support.
- Dark mode, a navbar, a footer, and last updated dates from git info.
- About and Now pages with their own single page template.
- A Journals section with a logbooks category.
- A GitHub Actions workflow to build and deploy.

### Fixed
- Responsiveness on small and medium screens (content, font sizes, the onboarding page heading).

[Unreleased]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v0.5.0...v1.0.0
[0.5.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/khalilullahalfaath/aleeeel.github.io/releases/tag/v0.1.0
