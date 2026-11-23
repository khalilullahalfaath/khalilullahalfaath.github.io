---
title: "Refactoring the Blood Smear Capture App: v0.1.0 to v0.3.0"
date: 2026-11-23T10:00:00+07:00
lastmod: 2026-11-23T22:00:00+07:00
status: ongoing
tags:
  - thalassemia
  - web-app
  - debugging
  - edge-ai
aliases: ["/lab-notebook/thalassemia-capture-app-v020-v030/"]
description: The single-file acquisition app was frozen as v0.1.0, split into backend and frontend releases, and rewritten until 45 tests covered the save path, the capture gates, the rating screen, and the patient report.
---

**Project:** Thalassemia Capture App, November refactor
**Period:** November 23, 2026
**Scope:** v0.1.0 frozen, then v0.2.0 and v0.3.0 as separate releases

This continues the app that [the July and August log](/notebook/thalassemia-capture-app-dev-log/) left as a working monolith, starting where that log stopped: the monolith was tagged v0.1.0 and treated as the specification. The camera work is not retold here. One thing carried over: the microscope camera is unverified again on the development laptop.

## November 23, 2026

### Freezing v0.1.0

- The monolith was tagged v0.1.0 with 29 endpoints and a 14-case characterization suite recorded once from the running app. Because the suite is recorded output rather than re-recorded assertions, it checks behaviour instead of today's code.
- Four known bugs were written down before touching anything: a capture could be overwritten before saving, fetches had no error path, a failed save did not say why, and the counter showed the iteration number instead of the session count.
- Scope was cut on purpose: the backend refactor excluded the frontend, so the split became two releases.

### Splitting the backend

- 90 top-level definitions moved into modules with their original names, 29 routes still point at the same functions, and the entry file shrank to 42 lines.
- The method was a small move script, an AST-based unused-name checker standing in for a linter, and a comparison proving each definition exists exactly once.
- A smoke test with a laptop webcam passed end to end. The microscope camera could not be opened through OpenCV and DirectShow on the development laptop, so the refactor is unverified against the real hardware.

### Rewriting the frontend

- Old element IDs were kept so the existing JavaScript kept working, and one script was split into four.
- A local copy of a legibility-first typeface was added, along with a focus chip above the stream, a stated reason for the disabled save button, a cell inspector, and keyboard shortcuts.

### Fixing the errors

- The save path was rewritten to encode in memory, check free space with a 50 MB floor, and return an errno-derived code and message instead of a bare failure.
- Frozen-stream detection samples every 16th pixel, ignores near-uniform frames, judges only if the stream was read in the last two seconds, and flags after 5 seconds.
- A fetch wrapper turns a dead server into an offline response and probes again every 3 seconds.
- 21 tests. The first one caught a misdiagnosis in the fix itself: a missing folder was being reported as a permission error.

### Automatic capture

- A chain of gates rather than a model: empty frame, then still frame, then new field of view, then focus, stopping at the first failure. Stillness uses normalized cross-correlation at 0.97, duplicates at 0.8.
- A new log column was added by a migration helper rather than a schema change, so older logs keep working.

### Session and recovery

- Session state lives in browser storage, with a recovery snapshot written before save and deleted after it succeeds, plus a draft for the segmentation screen.
- A boot identifier makes the device and storage check run once per power cycle instead of on every page load.

### The rating screen

- Random 6-hex identifiers per file, one row per rater with the last one winning, and a required reason when a cell is marked unusable.
- Three bugs were found by walking the flow: the space bar confirming whichever dialog was under the cursor, a stale image sent to analysis after a new unsaved capture, and a review that recorded only a verdict being discarded as a duplicate. That last one had survived since v0.1.0, because the duplicate check compared per-class counts.

### The patient report

- An A4 print view rendered by the browser's own print dialog, no new dependency. Numbers come from the latest result per image, focus quality from the capture log, and at most four thumbnail examples.
- A report claiming "1 of 28 reviewed" looked wrong and turned out right: the test script had been clicking outside the duplicate dialog, so 14 reviews were never saved. The app was changed so Enter picks the primary choice even when focus has left the button.

### Preparing for the attribute model

- Derived classes are computed on the server, with a temporary mapping for two classes marked as provisional.
- The label mode is written only in attribute mode, so the v0.1.0 snapshot stays byte-identical and the characterization tests keep their value. 45 tests at the end.

## Where it stands

- Not merged: the backend and frontend branches, both awaiting review.
- Not verified: the full test plan on the acquisition laptop, the microscope camera on the development laptop, the touch screen, and a real frozen stream.
