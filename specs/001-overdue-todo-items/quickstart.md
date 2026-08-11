# Quickstart: Validate Overdue Todo Items

## Prerequisites

- Node.js installed; repo dependencies installed via `npm install` at the repo root
  (npm workspaces cover `packages/backend` and `packages/frontend`).

## Run the app

```bash
# Terminal 1: backend API
npm run start --workspace=packages/backend

# Terminal 2: frontend
npm run start --workspace=packages/frontend
```

## Manual validation scenarios

1. **Overdue badge appears (User Story 1)**
   - Create a todo with a due date earlier than today (e.g., yesterday) and leave it
     incomplete.
   - Expected: the todo card shows an "Overdue" badge with the distinct overdue color, next
     to the due date. See [data-model.md](./data-model.md) for the underlying rule and
     [contracts/overdue-utils.md](./contracts/overdue-utils.md) for the exact contract.

2. **Non-overdue cases stay unmarked**
   - Create todos due today, due in the future, and with no due date.
   - Expected: none of these show the "Overdue" badge.

3. **Completed overdue todo is not marked (Edge Case)**
   - Mark the todo from step 1 as complete.
   - Expected: the "Overdue" badge disappears immediately (no refresh), and the overdue
     count (see step 5) decreases by one immediately.

4. **Editing due date updates badge immediately (User Story 2)**
   - Edit an overdue todo's due date to a future date; then edit another (non-overdue) todo's
     due date to a past date.
   - Expected: badges appear/disappear immediately without a page reload, matching
     Acceptance Scenarios 1–3 of User Story 2 in [spec.md](./spec.md).

5. **Overdue count summary line (User Story 3)**
   - With a mix of overdue/non-overdue/completed todos, view the list.
   - Expected: a summary line above the list reads e.g. "2 todos overdue"; toggling or
     editing todos updates the count immediately. With zero overdue todos, the line reads
     "0 todos overdue" (always shown, per clarified FR-007).

## Automated tests

```bash
# Frontend unit/integration tests (includes new overdue utility + component tests)
npm test --workspace=packages/frontend -- --watchAll=false

# Backend tests (unaffected by this feature, should remain green)
npm test --workspace=packages/backend
```

Expected: all existing tests continue to pass, and new tests covering
`packages/frontend/src/utils/overdue.js`, the `TodoCard` badge, and the `App` summary line
pass as part of the suite.
