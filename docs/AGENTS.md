# AGENTS.md

## Scope

- This file supplements the default rules in the repository root `AGENTS.md`.
- It applies only to the current-version docs under `docs/**`.
- It does not override the special requirements for `versioned_docs/**`, `versioned_sidebars/**`, or root-level configuration files.

## Writing Style

- Use concise, professional, natural English technical writing.
- Avoid marketing tone, filler, and obvious AI phrasing.
- Explain what the user needs to do, why it matters, what the prerequisites are, and what caveats they should know.
- Keep established local terminology unless there is a strong reason to change it.

## Current-Version Review Focus

- Current product behavior, defaults, limits, and UI labels should reflect the current version. If uncertain, mark the point as `unverified` instead of guessing.
- Steps should clearly state prerequisites, sequence, and expected result. If an action is irreversible or involves permissions, network access, cost, or data risk, call that out explicitly.
- Keep internal links, heading anchors, relative paths, image references, doc IDs, and sidebar references consistent. In Docusaurus, doc IDs are derived from the source path unless front matter overrides them.
- Content under `docs/reuse-content/**` may be reused by multiple pages; when reviewing or editing it, consider downstream impact as well.
- References to files under `docs/images/**` must match the exact path, case, and extension.

## Content Rules

- Do not casually change code blocks, commands, parameter names, API field names, UI labels, version numbers, or documented limits.
- Keep heading hierarchy, list style, terminology, and link style aligned with nearby pages when possible.
- For capability, limitation, and compatibility statements, optimize for correctness over smoother wording.
- If a page claims a feature is `supported`, `enabled by default`, `requires no configuration`, or `has limitations`, ground that statement in page context, product facts, or implementation evidence whenever possible. If you cannot confirm it, say so.

## Connector Documentation

- Apply the following checks only when the change touches connector or prerequisite content under `docs/connectors/**` or `docs/cloud/prerequisites/**`.
- When feasible, lightly cross-check capability claims against connector implementation or metadata sources.
- One public reference source is the TapData connectors repository.
- If the corresponding connector source is private, unavailable, or cannot be matched reliably, skip that check and mark it as `unverified`.
- Only flag clear inconsistencies, such as CDC support, write capability, incremental support, data types, authentication flows, network or permission prerequisites, or stated limitations.
- Lack of external corroboration by itself is not a defect.
