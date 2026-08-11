---

description: "Task list template for feature implementation"
---

# Tasks: Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todo-items/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/overdue-utils.md](./contracts/overdue-utils.md), [quickstart.md](./quickstart.md)

**Tests**: Included — constitution Principle III (Test-First Quality Gate) is NON-NEGOTIABLE for this project; all behavior-changing tasks below are paired with colocated tests written first.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing of each story. This feature is frontend-only — no backend/API changes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task description

## Path Conventions

This is the existing npm-workspaces web app: `packages/backend/`, `packages/frontend/`. This
feature only touches `packages/frontend/src/`.

---

## Phase 1: Setup

**Purpose**: Establish a clean baseline before making changes

- [X] T001 Run `npm test --workspace=packages/frontend -- --watchAll=false` and confirm the existing suite is green, establishing a clean baseline before adding overdue-related changes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared utility and design token used by all three user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 [P] Add an `--overdue-color` CSS custom property to both the light (`:root`) and dark (`[data-theme="dark"]`) blocks in packages/frontend/src/styles/theme.css, chosen so it is visually distinct from `--danger-color` and `--success-color` and meets WCAG AA contrast against `--bg-surface` in both modes (per research.md)
- [X] T003 [P] Write failing unit tests for `isOverdue(todo, today)` and `getOverdueCount(todos, today)` covering past/today/future/no-due-date/completed cases in packages/frontend/src/utils/__tests__/overdue.test.js (per contracts/overdue-utils.md)
- [X] T004 Implement `isOverdue(todo, today)` and `getOverdueCount(todos, today)` in packages/frontend/src/utils/overdue.js so the tests from T003 pass (depends on T003)

**Checkpoint**: Foundation ready — tested overdue utility and color token are available; user story implementation can now begin.

---

## Phase 3: User Story 1 - Identify overdue todos at a glance (Priority: P1) 🎯 MVP

**Goal**: Incomplete todos with a due date before today show a distinct color + text badge in the todo list; all other todos (today/future/no due date/completed) show no badge.

**Independent Test**: Create todos with due dates in the past, today, and the future (plus one with no due date), and verify only the past-due, incomplete todo displays the "Overdue" badge.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T005 [P] [US1] Add tests to packages/frontend/src/components/__tests__/TodoCard.test.js asserting the "Overdue" badge renders only when the todo is incomplete with a past due date, and is absent for todos due today, due in the future, with no due date, or completed

### Implementation for User Story 1

- [X] T006 [US1] In packages/frontend/src/components/TodoCard.js, import `isOverdue` from ../utils/overdue and render an "Overdue" text badge next to the due date when `isOverdue(todo)` is true (depends on T004, T005)
- [X] T007 [US1] Add `.overdue-badge` styles using the `--overdue-color` token (light & dark) in packages/frontend/src/App.css (depends on T002)

**Checkpoint**: User Story 1 is fully functional and testable independently — the core visual signal works end-to-end.

---

## Phase 4: User Story 2 - Overdue status updates immediately on changes (Priority: P2)

**Goal**: Completing an overdue todo or editing its due date updates the "Overdue" badge immediately, with no page refresh.

**Independent Test**: Mark an overdue todo complete and verify the badge disappears immediately; edit an overdue todo's due date to a future date and verify the badge disappears immediately; edit a non-overdue todo's due date to the past and verify the badge appears immediately.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T008 [P] [US2] Add tests to packages/frontend/src/components/__tests__/TodoCard.test.js (re-render with updated `todo` prop) and packages/frontend/src/__tests__/App.test.js (toggle/edit through the UI) asserting the "Overdue" badge appears/disappears immediately after completion or due-date changes, without any additional refresh action

### Implementation for User Story 2

- [X] T009 [US2] Verify and, if needed, adjust state handling in packages/frontend/src/App.js and packages/frontend/src/components/TodoCard.js so `onToggle`/`onEdit` results flow directly into re-rendered `todo` props with no stale caching of overdue status (depends on T006, T008)

**Checkpoint**: User Stories 1 and 2 both work independently — the badge is accurate and always up to date.

---

## Phase 5: User Story 3 - See how many todos are overdue (Priority: P3)

**Goal**: A summary line above the todo list always shows the current overdue count (e.g., "3 todos overdue" or "0 todos overdue"), updating immediately as todos change.

**Independent Test**: Create a known number of overdue todos and verify the displayed count matches; complete or edit a todo to change its overdue status and verify the count updates immediately, including down to zero.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T010 [P] [US3] Add tests to packages/frontend/src/__tests__/App.test.js asserting the overdue summary line renders the correct count for a mix of overdue/non-overdue/completed todos, updates immediately after toggle/edit, and always renders (including "0 todos overdue" with no overdue items)

### Implementation for User Story 3

- [X] T011 [US3] In packages/frontend/src/App.js, import `getOverdueCount` from ./utils/overdue and render an always-visible summary line (e.g., "3 todos overdue" / "0 todos overdue") above `TodoList` (depends on T004, T010)
- [X] T012 [P] [US3] Add `.overdue-summary` styling in packages/frontend/src/App.css

**Checkpoint**: All three user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation across all stories

- [X] T013 [P] Manually verify `--overdue-color` meets WCAG AA contrast against `--bg-surface` in both light and dark themes (constitution Principle V), adjusting the token in packages/frontend/src/styles/theme.css if needed
- [X] T014 [P] Run `npm test --workspace=packages/frontend -- --watchAll=false` and confirm coverage remains at or above the project's 80% target (testing-guidelines.md)
- [X] T015 Run the manual validation scenarios in [quickstart.md](./quickstart.md) end-to-end against the running app
- [X] T016 Run `npm test --workspace=packages/backend` and confirm the existing backend suite is still green (no regressions expected, since this feature is frontend-only)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational; builds on US1's badge rendering (T006) to verify it updates correctly, but is independently testable
- **User Story 3 (Phase 5)**: Depends on Foundational only — does not depend on US1/US2 implementation, only on the shared utility (T004)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories — deliverable as MVP
- **User Story 2 (P2)**: Reuses US1's badge markup (T006) to validate re-render behavior; independently testable via its own acceptance scenarios
- **User Story 3 (P3)**: No dependency on US1/US2 — only needs the Foundational utility (T004)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Utility/foundational work before component rendering
- Component rendering before styling polish

### Parallel Opportunities

- T002 and T003 (Phase 2) can run in parallel
- T005 (US1 tests) can run in parallel with Foundational styling task T002 once T003/T004 land
- T010 (US3 tests) and T012 (US3 styling) can run in parallel with US1/US2 work since US3 only depends on the Foundational utility
- T013 and T014 (Polish) can run in parallel

---

## Parallel Example: Foundational Phase

```bash
Task: "Add --overdue-color token to theme.css"
Task: "Write failing unit tests for isOverdue/getOverdueCount in overdue.test.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (overdue utility + color token, tested)
3. Complete Phase 3: User Story 1 (badge rendering)
4. **STOP and VALIDATE**: Confirm badge appears/disappears correctly per Independent Test
5. Demo if ready — this alone delivers the feature's core value

### Incremental Delivery

1. Setup + Foundational → shared utility ready
2. Add User Story 1 → validate → demo (MVP!)
3. Add User Story 2 → validate immediate-update behavior → demo
4. Add User Story 3 → validate summary line → demo
5. Polish: accessibility contrast check, coverage check, quickstart run, backend regression check

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No backend/API/schema changes are needed anywhere in this feature (confirmed in plan.md and research.md)
- Verify tests fail before implementing (constitution Principle III)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
