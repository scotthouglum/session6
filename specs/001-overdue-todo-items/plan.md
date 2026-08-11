# Implementation Plan: Overdue Todo Items

**Branch**: `001-overdue-todo-items` | **Date**: 2026-08-11 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a derived, client-side-only "overdue" visual state to the existing todo list: incomplete
todos with a due date before today get a distinct color + text badge, and a summary line
above the list always shows the current overdue count (e.g., "3 todos overdue" or "0 todos
overdue"). No new persisted data, API endpoints, or schema changes are required — overdue
status is computed from the existing `dueDate` and `completed` fields at render time and
recalculates automatically whenever the todos array changes (toggle, edit, create, delete,
fetch).

## Technical Context

**Language/Version**: JavaScript (ES2020+), React 18.2 (frontend); Node.js/Express (backend, unaffected)

**Primary Dependencies**: React 18 (existing), no new npm dependencies required

**Storage**: N/A — overdue state is derived, not persisted; no changes to the SQLite-backed `todos` table

**Testing**: Jest + React Testing Library (`packages/frontend`), existing Jest/Supertest backend suite (unaffected)

**Target Platform**: Web browser, desktop-focused (per functional-requirements.md)

**Project Type**: Web application (existing frontend + backend monorepo) — this feature is frontend-only

**Performance Goals**: Overdue indicator/count reflect changes within 1 second with no page reload (SC-003); computation is synchronous O(n) over the in-memory todos list, well within budget for expected list sizes

**Constraints**: No backend/API changes; no new stored todo attributes; must meet WCAG AA contrast and not rely on color alone (per constitution Principle V and clarified FR-009); must work in both light and dark themes

**Scale/Scope**: Single-user list, no pagination; touches `TodoCard.js`, `TodoList.js`, `App.js`, `theme.css`, and their colocated tests; adds one small shared utility for overdue computation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. User Value and Scope Discipline**: PASS — feature is a display-only enhancement to existing todo list functionality; no out-of-scope capability (filtering, notifications, etc.) is introduced.
- **II. Simplicity and Single Responsibility**: PASS — overdue computation is isolated in a single small utility function reused by `TodoList`/`TodoCard`/count display, avoiding duplicated date logic.
- **III. Test-First Quality Gate**: PASS (planned) — new/changed behavior (badge rendering, count line, immediate updates) will be covered by colocated unit tests in `__tests__/` before merge.
- **IV. Immediate Persistence and Data Integrity**: PASS — no persistence changes; existing due date/completion persistence rules are untouched.
- **V. Accessible Themed UI Consistency**: PASS — badge uses a distinct color token plus text label (not color alone), and must be verified in both theme modes for WCAG AA contrast.

No violations identified. Complexity Tracking section is not applicable.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todo-items/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
packages/backend/
├── src/
│   ├── app.js
│   ├── index.js
│   └── services/
│       └── todoService.js       # unchanged — no schema/API changes needed
└── __tests__/
    └── app.test.js               # unchanged

packages/frontend/
├── src/
│   ├── App.js                    # render overdue count summary line above TodoList
│   ├── App.css                   # summary line styling
│   ├── components/
│   │   ├── TodoCard.js           # render overdue badge next to due date
│   │   ├── TodoList.js           # unchanged structurally (passes todos through)
│   │   └── __tests__/
│   │       └── TodoCard.test.js  # add overdue badge test cases
│   ├── services/
│   │   └── todoService.js        # unchanged — no API changes
│   ├── utils/
│   │   ├── overdue.js            # NEW: isOverdue(todo, today) + getOverdueCount(todos, today)
│   │   └── __tests__/
│   │       └── overdue.test.js   # NEW: unit tests for the utility
│   └── styles/
│       └── theme.css             # add overdue color token(s) for light/dark modes
└── __tests__/
    └── App.test.js                # add summary line test cases
```

**Structure Decision**: Existing web application layout (`packages/frontend` + `packages/backend` npm workspaces) is preserved. This feature only adds files under `packages/frontend/src/utils/` and modifies existing frontend components/styles; the backend package is untouched since overdue status is a derived, client-only concept.

## Complexity Tracking

> Not applicable — no Constitution Check violations were identified.

