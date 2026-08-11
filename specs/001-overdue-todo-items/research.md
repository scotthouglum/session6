# Phase 0 Research: Overdue Todo Items

No `NEEDS CLARIFICATION` markers remain in the Technical Context — the `/speckit-clarify`
pass resolved the key open questions (indicator style, count placement, zero-count
behavior). This document records the remaining implementation-level decisions needed
before design.

## Decision: Overdue computation lives in a single frontend utility

- **Decision**: Add `packages/frontend/src/utils/overdue.js` exporting `isOverdue(todo, today)`
  and `getOverdueCount(todos, today)`. Both accept an optional `today` (defaults to
  `new Date()`) so tests can inject a fixed date.
- **Rationale**: Centralizes the date-comparison rule (FR-001–FR-004) in one place used by
  `TodoCard` (badge) and `App`/`TodoList` (count), avoiding duplicated/inconsistent logic
  (constitution Principle II — Simplicity and Single Responsibility).
- **Alternatives considered**: Inline comparison in each component — rejected, duplicates
  date logic and risks drift between the badge and the count. Computing overdue status on
  the backend — rejected, spec confirms this is a derived, presentation-only concept with no
  new stored attribute, and functional-requirements.md restricts backend changes to basic
  todo storage.

## Decision: Date-only comparison, local device clock

- **Decision**: Compare `dueDate` (stored as `YYYY-MM-DD`, matching the existing `<input
  type="date">` field) against the local date portion of `today`, both truncated to
  midnight, so a due date is overdue only if `dueDate < today` (strictly before).
- **Rationale**: Matches the spec's explicit assumption ("due date is a date only ... due
  today is not overdue") and the existing due-date input already stores date-only strings —
  no timezone/time-of-day ambiguity to resolve.
- **Alternatives considered**: Comparing full timestamps — rejected, due dates have no
  time-of-day component in the current data model.

## Decision: Recompute on existing re-renders, no polling timer

- **Decision**: Overdue status and count recompute naturally whenever the `todos` state
  changes (create/toggle/edit/delete/fetch) since React re-renders on state change. No
  `setInterval`/polling is introduced to detect a midnight rollover mid-session.
- **Rationale**: Spec's edge case explicitly accepts this: "overdue status is recalculated
  the next time the list is viewed or refreshed." Adding a timer would be unnecessary
  complexity not required by any acceptance scenario (constitution Principle II).
- **Alternatives considered**: Interval-based re-render every minute — rejected as
  over-engineering for a requirement that only asks for recalculation on next view/refresh.

## Decision: Dedicated overdue color token, distinct from the existing danger color

- **Decision**: Add a new CSS custom property (e.g., `--overdue-color`) per theme in
  `theme.css` rather than reusing `--danger-color`.
- **Rationale**: `--danger-color` is already semantically tied to destructive delete actions
  (per ui-guidelines.md). Reusing it for "overdue" would blur that meaning and could confuse
  users about which red elements are destructive vs. informational. A dedicated token keeps
  FR-008 (distinguishable from completion) and FR-009 (color + label) clean, and must be
  checked for WCAG AA contrast in both light and dark modes (constitution Principle V).
- **Alternatives considered**: Reuse `--danger-color` — rejected for the semantic-overlap
  reason above; introduce a third-party badge library — rejected, unnecessary dependency for
  a simple text badge already achievable with existing CSS tokens.

## Output

All unknowns resolved. Proceeding to Phase 1 design (data-model.md, contracts/, quickstart.md).
