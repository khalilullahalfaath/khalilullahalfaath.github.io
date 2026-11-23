# Notebook entry style

Rules for `content/notebook/*.md`. They exist because the section renders entries
through layout hooks that only fire on specific markup, and because the prose
drifted into a house style that is now fixed.

## Frontmatter

Copy the key set from `content/notebook/thalassemia-capture-app-dev-log.md`.

| Key | Rule |
|---|---|
| `title` | Quote it if it contains `: `, otherwise Hugo fails to parse the YAML |
| `date` | The first day of the work, not the first commit of the repo |
| `lastmod` | The last day of the work |
| `status` | One of `ongoing`, `completed`, `failed`. These are literal matches in `layouts/notebook/list.html`; anything else renders a stamp no filter button can select |
| `tags` | List. They become filter buttons on the index |
| `aliases` | One element, `/lab-notebook/<file-stem>/`. Must be unique against every other entry and against the section root alias in `_index.md` |
| `description` | One sentence. It is the index excerpt (truncated to 150 chars) and the standfirst under the title |

`date` decides both the year group and the entry number, since
`layouts/partials/entry-no.html` counts by date across the section. An entry dated
by an old commit lands in an old year group and reads as ancient work.

## Body shape

```
**Project:** ...
**Period:** ...
**Scope:** ...          (or Data:, Labels:, Repository:)

One paragraph of context or method.

## November 18, 2026: Topic in sentence case

## Where it stands
```

The facts block is three bold lead-ins, no heading above them. It answers what,
when, and how big before any prose.

## Date headings

One `##` per working day, formatted `## November 18, 2026: Topic`.

The colon matters. `layouts/_default/_markup/render-heading.html` splits a heading
into a margin date stamp plus a title on `— ` or `: `. Without one of those
separators the heading renders as plain text with no stamp. The separator set
excludes the en dash on purpose, because an en dash appears inside date ranges
such as `August 1–2, 2026`.

A logbook covering one calendar day uses a bare `## November 23, 2026` and puts
phases under `###` sub-headings. Do not invent dates to get more headings.

Close with `## Where it stands`: a short list of done, open, not verified.

## Prose

- English, matching the rest of the section.
- No em dashes and no en dashes. Use periods, commas, colons, parentheses. ASCII
  hyphen only inside numbers, ranges, and code spans.
- Evidence first: a number, a p-value, a threshold, a count. No adjectives doing
  the work a figure could do.
- State what failed and what was abandoned. An entry that only records progress
  is not a logbook.
- Name uncertainty where it exists. Non-significance is not equivalence; a single
  seed is not a result.

Omit from prose: commit hashes, branch names, dataset and result slugs, instance
IDs, dollar amounts, credit balances, private repo names. Name a repo only when it
is public.

## Depth

Helicopter view is the default: decisions, numbers, and what changed the plan, not
a day-by-day narration. Most source repos are private, so detail that cannot be
checked should not be written.

An entry may go to full detail when its repo is public and the commit history can
be read. That is the only exception.

## Figures

Embed with an absolute path and a real title:

```
![Alt text describing the figure](/images/name.svg "Caption text")
```

`layouts/_default/_markup/render-image.html` wraps any Markdown image in
`figure.nb-figure` with a numbered caption taken from the title. `static/styles/style.css`
styles it.

The leading slash is required. A bare relative path 404s from the entry's own URL,
which is how the older screenshots in this section are broken.

Diagrams come from the `diagram-design` skill, exported to `static/images/`, with
the blog's own `:root` tokens rather than the skill's shipped skin. The content
column is a fixed 679px, so a 960-unit viewBox renders at 0.707 scale. Node names
need 17px in SVG units to render at 12px.

## Verification

Before claiming an entry is done:

```
hugo --quiet --cleanDestinationDir
grep -n '[—–]' content/notebook/<entry>.md          # must print nothing
grep -nE '\$[0-9]|[0-9a-f]{40}|vast\.ai' content/notebook/<entry>.md
grep -o '<h2[^>]*class="nb-dated"' public/notebook/<entry>/index.html
```

The last one must print once per date heading. If it prints nothing, the heading
separator is wrong.

Run the `humanizer` skill in file mode over new prose. It rewrites prose only,
leaving frontmatter, code spans, links, and image lines alone. Re-read the file
against the source afterwards: humanizing must not drop a number or a claim.

## Why this is not a skill

These rules are coupled to this repo's layouts. The stamp depends on the regex in
`render-heading.html`, the aliases depend on the existing `/lab-notebook/` paths,
and `status` depends on the literals in `list.html`. A skill would be used in other
repos where none of that is true, and would drift out of sync with the layouts it
describes. Keep it here, next to the code it describes.
