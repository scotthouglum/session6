# Contracts: Overdue Todo Items

This feature introduces no new backend endpoints and makes no changes to the existing
todo REST API (`packages/backend/src/app.js`). The only "interfaces" affected are internal
frontend contracts: a shared utility module and the props/rendered output of existing
components. These are documented here since there is no external API surface to contract.

## Utility Contract: `packages/frontend/src/utils/overdue.js`

```text
isOverdue(todo: { dueDate: string|null, completed: 0|1|boolean }, today?: Date): boolean
  - Returns true only if todo.completed is falsy AND todo.dueDate is set AND
    todo.dueDate (date-only) is strictly before today's local date (date-only).
  - Returns false for null/undefined dueDate, completed todos, and dueDate >= today.
  - `today` defaults to `new Date()`; tests MUST pass a fixed `today` for determinism.

getOverdueCount(todos: Array<Todo>, today?: Date): number
  - Returns the count of items in `todos` for which isOverdue(item, today) is true.
  - Returns 0 for an empty array.
```

## Component Contract: `TodoCard`

- **Input (unchanged props)**: `todo`, `onToggle`, `onEdit`, `onDelete`, `isLoading`.
- **New rendered output**: when `isOverdue(todo)` is `true`, the card renders an "Overdue"
  text badge (with a distinct `--overdue-color` styling) adjacent to the due date, in
  addition to the existing due-date text. When `false`, no badge is rendered.
- **No new props are introduced** — the card computes overdue status internally from the
  existing `todo` prop, keeping the contract backward compatible.

## Component Contract: `App` (overdue summary line)

- **New rendered output**: a summary line (e.g., `"3 todos overdue"` / `"0 todos overdue"`)
  rendered above `TodoList`, computed via `getOverdueCount(todos)` from the existing `todos`
  state. Always rendered, regardless of count (per clarified FR-007).
- **No new props on `TodoList`** — `TodoList` continues to receive `todos` as-is; the summary
  line is rendered by `App` alongside `TodoList`, not inside it.

## Backend Contract

Unchanged. No modifications to `GET/POST/PUT/PATCH/DELETE /api/todos` routes or the
`todoService` module are required for this feature.
