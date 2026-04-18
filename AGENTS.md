# AGENTS.md

## Scope

- This file defines the repository-wide default rules.
- `docs/AGENTS.md` adds rules for the current-version docs under `docs/**`; the closer file takes precedence.
- If a historical version or another subtree needs different behavior, add an `AGENTS.md` or `AGENTS.override.md` in that directory.

## Repository Map

- Current-version docs live in `docs/`.
- Historical docs live in `versioned_docs/`.
- The current sidebar lives in `sidebars.js`.
- Historical sidebars live in `versioned_sidebars/`.
- Site configuration lives in `docusaurus.config.js`.
- Common build validation: `npm run build`.

## Default Review Mode

- When the user asks for a review, default to document review mode.
- Prioritize issues that can mislead readers, break navigation, break anchors, break the build, or introduce factual errors over broad copy-editing.
- Start from the changed scope. If a diff is available, review the diff first and avoid generalized comments on untouched areas.
- Prefer concrete findings with file and line references, and explain reader impact.
- Style preferences alone are not findings. Do not rewrite already-clear text just to make it sound more polished.
- If no issues are found, explicitly say `No findings` and note any remaining risks or unverified areas.

## Severity

- `P1`: Breaks links, anchors, navigation, or builds, or directly misleads users with incorrect steps, commands, parameters, prerequisites, capability claims, or compatibility guidance.
- `P2`: Does not fail immediately, but creates clear confusion or mild misinformation, such as inconsistent terminology, broken heading hierarchy, drifted paths or UI labels, or mismatches between page content and navigation labels.
- `P3`: Typos, grammar issues, minor ambiguity, or other small fixes that do not change the meaning.
- Aesthetic preferences, phrasing taste, or stylistic rewrites alone are not findings.

## Review Output Contract

- Keep one finding focused on one issue.
- Each finding should include the location, the problem itself, and the user impact. Add a verification hint when it is helpful.
- Unless the user explicitly asks for it, do not propose a full-page rewrite. Prefer the smallest actionable correction.
- Do not guess about product behavior, defaults, limits, compatibility, or connector capabilities. Mark them as `unverified` or `needs product/implementation confirmation` instead.
- For inline comments or review-pane feedback, keep the scope tight and target the changed lines first.

## Content Accuracy

- Do not casually change code blocks, commands, parameter names, API field names, UI labels, version numbers, paths, example values, or documented limits.
- Procedure steps should include prerequisites, sequence, and an observable result. If any of the three is missing, raise it as an accuracy or executability issue.
- `versioned_docs/**` represents historical behavior. Do not silently align it with current-version behavior without evidence.
- If both current and historical docs may be affected, call out the sync scope explicitly instead of changing both by default.

## Docusaurus Checks

- When review touches `sidebars.js`, `versioned_sidebars/**`, front matter `id` or `slug`, cross-document links, or heading anchors, check navigation, doc IDs, anchors, and references together.
- If you are fixing rather than only reviewing: after changing links, titles, or relative paths, prefer `npm run remark:once`; after changing sidebars, doc IDs, slugs, versioned docs, or site config, run `npm run build` when feasible.

## Connector Documentation

- When changes touch connector or prerequisite docs such as `docs/connectors/**`, `docs/cloud/prerequisites/**`, or `versioned_docs/**/prerequisites/**`, lightly cross-check implementation or metadata sources when feasible.
- One public reference source is the TapData connectors repository.
- If the corresponding connector source is private, unavailable, or cannot be matched reliably, skip that check and mark it as `unverified`.
- Only flag clear conflicts, such as CDC support, write capability, incremental support, data types, authentication, network or permission prerequisites, or stated limitations that disagree with implementation.
- Lack of external corroboration by itself is not a defect.
