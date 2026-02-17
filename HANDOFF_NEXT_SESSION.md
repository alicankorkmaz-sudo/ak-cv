# Handoff - Alican Korkmaz Portfolio

## Project Summary
A personal portfolio website designed to replace a traditional CV, presented as an Android IDE-like experience.

## Current Status
- Top bar with `Run` and `Debug` actions
- Main area with Project Explorer + Editor
- Bottom area with Terminal + Status bar
- Emulator flow works in run mode (`projects`, `profile`, `contact` screens)
- Terminal commands are active (`help`, `ls`, `open`, `run`, `debug`, `stop`, `clear`, `whoami`, `social`)

## Changes Completed In This Session (2026-02-17)
- Mobile responsiveness was improved.
- Terminal behavior on mobile was converted to a bottom-sheet (expand/collapse).
- Emulator now opens as a full-screen modal on mobile during run/debug.
- Added a mobile `Stop` button in the emulator header.
- Reduced horizontal overflow (especially in the file tree) and improved readability on narrow screens.
- Emulator now auto-runs shortly after full website initialization completes.
- CV copy was updated using LinkedIn/X profile data:
  - `Profile` now highlights `Mobile Software Architect @ adesso Turkey`, location, and social proof chips.
  - `Contact` now includes direct Email, LinkedIn, and X links.
- Added terminal command `social` for quick social link output.
- Removed embedded `Live X Feed`; X is now provided as a clean direct link only.
- Updated contact email to `akorkmaz@pm.me`.
- Removed Galatasaray University reference from Profile.
- Projects screen was rewritten as a latest-to-past timeline based on visible LinkedIn data.
- Removed an incorrect KMP workshop mention and replaced projects copy with verified adesso + pre-adesso experience contexts.

## File-Level Notes
- `index.html`: added mobile terminal/emulator control buttons
- `styles.css`: responsive rules, bottom-sheet behavior, full-screen mobile emulator rules
- `script.js`: mobile terminal toggle state, mobile emulator stop behavior, and delayed auto-run after initialization
- `README.md`: simplified
- `index.html`: profile/contact CV copy refresh + clean social links
- `styles.css`: social link styles + emulator screen vertical scrolling
- `script.js`: updated profile/contact file-content mocks and terminal `social` command

## Suggested Next Steps
1. Add a drag handle + swipe gesture to the mobile terminal sheet.
2. Add a `Back to IDE` flow for the mobile emulator (return without stopping the session).
3. Replace sample project metrics with verified case-study numbers and links.
4. Optionally add a backend-free cache layer (JSON snapshot + last-updated badge) for social/profile data freshness.

## Next Session Starter Prompt
"Read HANDOFF_NEXT_SESSION.md and continue from the current prototype. As the first task, implement <selected item>."
